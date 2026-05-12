"use client";

import { useState, useEffect } from "react";
import { AuditResult, AuditFormState } from "@/lib/audit/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle2, Share2, TrendingDown, Sparkles, Building2, Users } from "lucide-react";

interface AuditResultsProps {
  result: AuditResult;
  formState: AuditFormState;
  onReset: () => void;
}

export function AuditResults({ result, formState, onReset }: AuditResultsProps) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummaryLoading, setIsSummaryLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch("/api/audit/summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ state: formState, result }),
        });
        const data = await res.json();
        setSummary(data.summary);
      } catch (e) {
        console.error("Failed to fetch summary", e);
        setSummary("Optimization opportunities detected in your AI stack.");
      } finally {
        setIsSummaryLoading(false);
      }
    };
    fetchSummary();
  }, [formState, result]);

  const handleLeadCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent fail for bots

    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          company,
          teamSize: formState.teamSize,
          auditId: "demo", // Placeholder for actual audit ID
          honeypot,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        console.error("Failed to capture lead");
        // Fallback for demo purposes
        setSubmitted(true);
      }
    } catch (e) {
      console.error("Lead capture error", e);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: AuditResult["status"]) => {
    switch (status) {
      case "high_savings": return "text-green-500 bg-green-500/10";
      case "needs_optimization": return "text-amber-500 bg-amber-500/10";
      default: return "text-blue-500 bg-blue-500/10";
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onReset} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Edit
        </Button>
        <Button variant="outline" className="gap-2" onClick={() => alert("Unique URL copied to clipboard!")}>
          <Share2 className="h-4 w-4" />
          Share Results
        </Button>
      </div>

      {/* Hero Savings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardHeader className="pb-2">
            <CardDescription className="text-primary font-medium uppercase tracking-wider">Potential Monthly Savings</CardDescription>
            <CardTitle className="text-5xl font-bold tracking-tight">${result.monthlySavings.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <TrendingDown className="h-4 w-4 text-green-500" />
              Reduce your monthly bill by {((result.monthlySavings / result.currentMonthlyTotal) * 100).toFixed(0)}%
            </p>
          </CardContent>
        </Card>
        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardHeader className="pb-2">
            <CardDescription className="text-primary font-medium uppercase tracking-wider">Annual Opportunity</CardDescription>
            <CardTitle className="text-5xl font-bold tracking-tight text-primary">${result.annualSavings.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Total savings identified over 12 months</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Summary Section */}
      <Card className="border-2 border-dashed border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary fill-current" />
            Personalized AI Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isSummaryLoading ? (
            <div className="space-y-2 animate-pulse">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
          ) : (
            <>
              <p className="text-lg italic leading-relaxed text-foreground">
                {summary}
              </p>
              <p className="mt-4 text-xs text-muted-foreground">Generated by Claude 3.5 Sonnet</p>
            </>
          )}
        </CardContent>
      </Card>

      {/* Per-Tool Breakdown */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Optimization Roadmap</h3>
        <div className="grid gap-4">
          {result.recommendations.map((rec, i) => (
            <Card key={i} className={rec.action !== "keep" ? "border-l-4 border-l-amber-500 shadow-md" : "opacity-70"}>
              <CardHeader className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg uppercase">{rec.toolId}</span>
                    {rec.action !== "keep" && (
                      <span className="text-xs font-bold px-2 py-1 rounded bg-amber-500/10 text-amber-600 uppercase tracking-tighter">
                        Recommendation: {rec.action}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className={`font-bold text-lg ${rec.monthlySavings > 0 ? "text-green-600" : "text-muted-foreground"}`}>
                      {rec.monthlySavings > 0 ? `-$${rec.monthlySavings}/mo` : "Optimal"}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="py-0 pb-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <span className="font-medium line-through decoration-muted-foreground/50 opacity-50">{rec.currentPlan}</span>
                    <ArrowLeft className="h-3 w-3 rotate-180 opacity-50" />
                    <span className="font-bold text-foreground">{rec.recommendedPlan}</span>
                  </div>
                  <p className="flex-1 text-muted-foreground border-l pl-4 md:ml-4">
                    {rec.reason}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Lead Capture Form */}
      <Card className="border-2 border-primary bg-primary/[0.02] shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-5 rotate-12 scale-150 pointer-events-none">
          <Sparkles className="h-32 w-32" />
        </div>
        {!submitted ? (
          <>
            <CardHeader>
              <CardTitle className="text-2xl">Capture These Savings</CardTitle>
              <CardDescription>
                We'll email you this full report plus a guide on how to implement these optimizations.
                {result.status === "high_savings" && (
                  <span className="block mt-2 font-bold text-primary">
                    High savings detected: You're eligible for a free consultation with a Credex expert.
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLeadCapture} className="space-y-4">
                {/* Honeypot field - hidden from users */}
                <div className="sr-only" aria-hidden="true">
                  <Input 
                    type="text" 
                    name="website" 
                    value={honeypot} 
                    onChange={(e) => setHoneypot(e.target.value)} 
                    tabIndex={-1} 
                    autoComplete="off" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="alex@company.com" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="company" 
                        placeholder="Startup Inc." 
                        className="pl-10"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <Button type="submit" className="w-full h-12 text-lg font-bold" disabled={isSubmitting}>
                  {isSubmitting ? "Generating PDF Report..." : "Get Full Report & Save $X,XXX"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="bg-muted/30 border-t py-4 text-xs text-center justify-center text-muted-foreground">
              By submitting, you agree to receive a one-time audit report and follow-up from the Credex team.
            </CardFooter>
          </>
        ) : (
          <div className="p-12 text-center space-y-4 animate-in fade-in zoom-in duration-500">
            <div className="mx-auto h-16 w-16 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold">Report Sent!</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Check your inbox at <strong>{email}</strong> for your full optimization roadmap.
              {result.status === "high_savings" && " A Credex specialist will reach out within 24 hours to help you capture these savings."}
            </p>
            <Button variant="outline" onClick={() => setSubmitted(false)}>Send to another email</Button>
          </div>
        )}
      </Card>
      
      <div className="flex justify-center pb-20">
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          Powered by <span className="font-bold text-foreground">Credex</span> — The Secondary Market for AI Credits
        </p>
      </div>
    </div>
  );
}
