import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { state, result } = await req.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      // Fallback to a templated summary if no API key is provided
      const summary = `Based on your team of ${state.teamSize} focusing on ${state.primaryUseCase}, you have a significant opportunity to consolidate your developer tools. Your potential annual savings of $${result.annualSavings.toLocaleString()} come primarily from rightsizing plan tiers and eliminating tool redundancy. We recommend immediate action on ${result.recommendations.filter((r: any) => r.action !== "keep").length} items identified in this audit.`;
      return NextResponse.json({ summary, isFallback: true });
    }

    const recommendationsText = result.recommendations
      .filter((r: any) => r.action !== "keep")
      .map((r: any) => `- ${r.toolId}: ${r.action} to ${r.recommendedPlan} ($${r.monthlySavings}/mo savings)`)
      .join("\n");

    const prompt = `Please analyze this audit for a team of ${state.teamSize} focusing on ${state.primaryUseCase}:
Current Spend: $${result.currentMonthlyTotal}/mo
Potential Savings: $${result.monthlySavings}/mo ($${result.annualSavings}/yr)
Recommendations:
${recommendationsText}

Provide a personalized summary of where they are overspending and why the suggested changes make sense. Exactly one paragraph, about 100 words.`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 300,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    const summary = data.content[0].text;

    return NextResponse.json({ summary, isFallback: false });
  } catch (error) {
    console.error("AI Summary Error:", error);
    return NextResponse.json({ 
      summary: "We encountered an error generating your AI summary, but your audit data is ready below.",
      isError: true 
    }, { status: 500 });
  }
}
