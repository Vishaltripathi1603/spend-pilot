"use client";

import { useState, useEffect } from "react";
import { AuditFormState, ToolId, UseCase } from "@/lib/audit/types";
import { runAuditEngine } from "@/lib/audit/engine";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ToolRow } from "@/components/audit/ToolRow";
import { AuditResults } from "@/components/audit/AuditResults";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";

const INITIAL_STATE: AuditFormState = {
  teamSize: 1,
  primaryUseCase: "coding",
  tools: {
    cursor: { enabled: false, planId: "hobby", seats: 1, monthlySpend: 0 },
    copilot: { enabled: false, planId: "individual", seats: 1, monthlySpend: 0 },
    claude: { enabled: false, planId: "pro", seats: 1, monthlySpend: 0 },
    chatgpt: { enabled: false, planId: "plus", seats: 1, monthlySpend: 0 },
    anthropic_api: { enabled: false, planId: "direct", seats: 1, monthlySpend: 0 },
    openai_api: { enabled: false, planId: "direct", seats: 1, monthlySpend: 0 },
    gemini: { enabled: false, planId: "business", seats: 1, monthlySpend: 0 },
    windsurf: { enabled: false, planId: "individual", seats: 1, monthlySpend: 0 },
    v0: { enabled: false, planId: "free", seats: 1, monthlySpend: 0 },
  },
};

export function AuditWizard() {
  const [state, setState] = useState<AuditFormState>(INITIAL_STATE);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof runAuditEngine> | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("spendpilot_state");
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load state", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("spendpilot_state", JSON.stringify(state));
    }
  }, [state, isLoaded]);

  const updateTool = (toolId: ToolId, updates: Partial<AuditFormState["tools"][ToolId]>) => {
    setState((prev) => ({
      ...prev,
      tools: {
        ...prev.tools,
        [toolId]: { ...prev.tools[toolId], ...updates },
      },
    }));
  };

  const handleAudit = () => {
    setIsAuditing(true);
    // Artificial delay for "polish" and to simulate analysis
    setTimeout(() => {
      const auditResult = runAuditEngine(state);
      setResult(auditResult);
      setIsAuditing(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1500);
  };

  if (!isLoaded) return null;

  if (result) {
    return <AuditResults result={result} formState={state} onReset={() => setResult(null)} />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Configure Your AI Stack</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Tell us which tools you use and how much you're paying. We'll run them through our audit engine to find savings.
        </p>
      </div>

      <Card className="border-2">
        <CardHeader className="bg-muted/30">
          <CardTitle className="text-lg">General Info</CardTitle>
          <CardDescription>Basic details about your team and usage.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="team-size">Total Team Size</Label>
            <Input
              id="team-size"
              type="number"
              min={1}
              value={state.teamSize}
              onChange={(e) => setState({ ...state, teamSize: parseInt(e.target.value) || 1 })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="use-case">Primary Use Case</Label>
            <Select
              value={state.primaryUseCase}
              onValueChange={(val) => { if (val) setState({ ...state, primaryUseCase: val as UseCase }) }}
            >
              <SelectTrigger id="use-case">
                <SelectValue placeholder="Select use case" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="coding">Coding / Engineering</SelectItem>
                <SelectItem value="writing">Content / Writing</SelectItem>
                <SelectItem value="data">Data Analysis</SelectItem>
                <SelectItem value="research">Research</SelectItem>
                <SelectItem value="mixed">Mixed / General</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Tools & Spend</h3>
          <p className="text-sm text-muted-foreground">Select the tools your team pays for</p>
        </div>
        
        <div className="grid gap-4">
          <ToolRow toolId="cursor" name="Cursor" state={state.tools.cursor} onUpdate={(u) => updateTool("cursor", u)} />
          <ToolRow toolId="copilot" name="GitHub Copilot" state={state.tools.copilot} onUpdate={(u) => updateTool("copilot", u)} />
          <ToolRow toolId="claude" name="Claude" state={state.tools.claude} onUpdate={(u) => updateTool("claude", u)} />
          <ToolRow toolId="chatgpt" name="ChatGPT" state={state.tools.chatgpt} onUpdate={(u) => updateTool("chatgpt", u)} />
          <ToolRow toolId="anthropic_api" name="Anthropic API" state={state.tools.anthropic_api} onUpdate={(u) => updateTool("anthropic_api", u)} />
          <ToolRow toolId="openai_api" name="OpenAI API" state={state.tools.openai_api} onUpdate={(u) => updateTool("openai_api", u)} />
          <ToolRow toolId="gemini" name="Google Gemini" state={state.tools.gemini} onUpdate={(u) => updateTool("gemini", u)} />
          <ToolRow toolId="windsurf" name="Windsurf" state={state.tools.windsurf} onUpdate={(u) => updateTool("windsurf", u)} />
          <ToolRow toolId="v0" name="Vercel v0" state={state.tools.v0} onUpdate={(u) => updateTool("v0", u)} />
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <Button 
          size="lg" 
          className="rounded-full px-12 h-14 text-lg font-bold shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
          onClick={handleAudit}
          disabled={isAuditing}
        >
          {isAuditing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Running AI Audit...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5 fill-current" />
              Generate My Audit
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
