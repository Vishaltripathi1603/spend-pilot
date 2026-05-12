import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, Sparkles, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { runAuditEngine } from "@/lib/audit/engine";
import { AuditFormState } from "@/lib/audit/types";

// In a real app, we would fetch this from Supabase by ID.
// For the MVP, we'll mock the data fetching.
async function getAuditData(id: string) {
  // Simulating a fetch
  // If id is "demo", return some sample data
  if (id === "demo") {
    const mockState: AuditFormState = {
      teamSize: 10,
      primaryUseCase: "coding",
      tools: {
        cursor: { enabled: true, planId: "business", seats: 10, monthlySpend: 400 },
        copilot: { enabled: true, planId: "business", seats: 10, monthlySpend: 190 },
        claude: { enabled: true, planId: "team", seats: 10, monthlySpend: 250 },
        chatgpt: { enabled: false, planId: "plus", seats: 0, monthlySpend: 0 },
        anthropic_api: { enabled: true, planId: "direct", seats: 1, monthlySpend: 600 },
        openai_api: { enabled: false, planId: "direct", seats: 0, monthlySpend: 0 },
        gemini: { enabled: false, planId: "business", seats: 0, monthlySpend: 0 },
        windsurf: { enabled: false, planId: "individual", seats: 0, monthlySpend: 0 },
        v0: { enabled: false, planId: "free", seats: 0, monthlySpend: 0 },
      }
    };
    return {
      state: mockState,
      result: runAuditEngine(mockState)
    };
  }
  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const data = await getAuditData(resolvedParams.id);
  if (!data) return { title: "Audit Not Found" };

  const savings = data.result.annualSavings.toLocaleString();
  return {
    title: `SpendPilot Audit - $${savings} Annual Savings Found`,
    description: `See how this team of ${data.state.teamSize} is optimizing their AI infrastructure spend.`,
    openGraph: {
      title: `SpendPilot Audit - $${savings} Annual Savings`,
      description: `Detailed AI spend audit for a team of ${data.state.teamSize}. Instant savings identified.`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `SpendPilot Audit - $${savings} Annual Savings`,
      description: `See the exact optimizations used to cut AI infrastructure costs.`,
    }
  };
}

export default async function SharedAuditPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const data = await getAuditData(resolvedParams.id);

  if (!data) {
    notFound();
  }

  const { result, state } = data;

  return (
    <main className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950/50 pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary-foreground fill-current" />
              </div>
              <span className="text-xl font-bold tracking-tight">SpendPilot</span>
            </div>
          </Link>
          <Link href="/audit" className="text-sm font-semibold bg-primary text-primary-foreground px-4 py-2 rounded-full">
            Run Your Own Audit
          </Link>
        </div>

        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Public Audit Results</h1>
          <p className="text-muted-foreground">Team Size: {state.teamSize} | Primary Use Case: {state.primaryUseCase}</p>
        </div>

        {/* Savings Hero */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
              <CardDescription className="text-primary font-medium uppercase tracking-wider text-center">Monthly Savings</CardDescription>
              <CardTitle className="text-5xl font-bold tracking-tight text-center">${result.monthlySavings.toLocaleString()}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
              <CardDescription className="text-primary font-medium uppercase tracking-wider text-center">Annual Savings</CardDescription>
              <CardTitle className="text-5xl font-bold tracking-tight text-center text-primary">${result.annualSavings.toLocaleString()}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Recommendations */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Optimization Recommendations</h3>
          <div className="grid gap-4">
            {result.recommendations.map((rec, i) => (
              <Card key={i} className={rec.action !== "keep" ? "border-l-4 border-l-amber-500 shadow-sm" : "opacity-70"}>
                <CardHeader className="py-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg uppercase">{rec.toolId}</span>
                    <span className={`font-bold ${rec.monthlySavings > 0 ? "text-green-600" : "text-muted-foreground"}`}>
                      {rec.monthlySavings > 0 ? `-$${rec.monthlySavings}/mo` : "Optimal"}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-sm text-muted-foreground">{rec.reason}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-primary/5 rounded-2xl p-8 text-center space-y-4 border border-primary/10">
          <h3 className="text-xl font-bold">Want these savings for your startup?</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            SpendPilot uses real-time market data from Credex to find optimizations most founders miss. Run your own audit in 2 minutes.
          </p>
          <Link href="/audit" className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-lg font-semibold text-primary-foreground">
            Audit My AI Spend Now
          </Link>
        </div>
      </div>
    </main>
  );
}
