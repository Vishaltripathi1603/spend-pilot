import { AuditFormState, AuditResult, AuditRecommendation, ToolId } from "./types";
import { PRICING } from "./pricing-data";

export function runAuditEngine(state: AuditFormState): AuditResult {
  const recommendations: AuditRecommendation[] = [];
  let currentMonthlyTotal = 0;
  let optimizedMonthlyTotal = 0;

  const toolIds = Object.keys(state.tools) as ToolId[];

  for (const toolId of toolIds) {
    const tool = state.tools[toolId];
    if (!tool.enabled) continue;

    const planData = PRICING[toolId].find(p => p.id === tool.planId);
    if (!planData) continue;

    const currentCost = tool.monthlySpend || (planData.pricePerSeat * tool.seats);
    currentMonthlyTotal += currentCost;

    let rec: AuditRecommendation = {
      toolId,
      currentPlan: planData.name,
      recommendedPlan: planData.name,
      action: "keep",
      monthlySavings: 0,
      reason: "Your current plan is optimal for your usage.",
    };

    // 1. Rightsizing Logic (Seat-based)
    if (toolId === "cursor" && tool.planId === "business" && tool.seats < 3) {
      rec = {
        toolId,
        currentPlan: "Business",
        recommendedPlan: "Pro",
        action: "downgrade",
        monthlySavings: (40 - 20) * tool.seats,
        reason: "Business features like centralized billing are overkill for teams smaller than 3.",
      };
    } else if (toolId === "claude" && tool.planId === "team" && tool.seats < 5) {
       // Claude Team has a 5-seat minimum ($125/mo)
       const proCost = 20 * tool.seats;
       const teamCost = 125; // 25 * 5
       if (proCost < teamCost) {
         rec = {
           toolId,
           currentPlan: "Team",
           recommendedPlan: "Pro",
           action: "downgrade",
           monthlySavings: teamCost - proCost,
           reason: `Claude Team has a 5-seat minimum ($125/mo). Pro accounts save $${teamCost - proCost}/mo for ${tool.seats} seats.`,
         };
       }
    }

    // 2. Redundancy Logic
    const hasCursor = state.tools.cursor?.enabled;
    const hasCopilot = state.tools.copilot?.enabled;
    if (toolId === "copilot" && hasCursor && hasCopilot) {
      rec = {
        toolId,
        currentPlan: planData.name,
        recommendedPlan: "None (Consolidate)",
        action: "switch",
        monthlySavings: currentCost,
        reason: "Cursor includes powerful autocomplete; GitHub Copilot is largely redundant in this stack.",
      };
    }

    // 3. API Optimization (High Spend)
    if ((toolId === "openai_api" || toolId === "anthropic_api") && tool.monthlySpend > 500) {
      rec = {
        toolId,
        currentPlan: "Direct API",
        recommendedPlan: "Credex Credits",
        action: "switch",
        monthlySavings: tool.monthlySpend * 0.2, // 20% savings via credits
        reason: "At this spend level, you qualify for high-volume credits via Credex, typically saving 20%.",
      };
    }

    recommendations.push(rec);
    optimizedMonthlyTotal += (currentCost - rec.monthlySavings);
  }

  const monthlySavings = currentMonthlyTotal - optimizedMonthlyTotal;
  const annualSavings = monthlySavings * 12;

  let status: AuditResult["status"] = "optimal";
  if (monthlySavings > 500) status = "high_savings";
  else if (monthlySavings > 0) status = "needs_optimization";

  return {
    currentMonthlyTotal,
    optimizedMonthlyTotal,
    monthlySavings,
    annualSavings,
    recommendations,
    status,
  };
}
