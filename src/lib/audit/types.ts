export type UseCase = "coding" | "writing" | "data" | "research" | "mixed";

export type ToolId = 
  | "cursor" 
  | "copilot" 
  | "claude" 
  | "chatgpt" 
  | "anthropic_api" 
  | "openai_api" 
  | "gemini" 
  | "windsurf" 
  | "v0";

export interface ToolState {
  enabled: boolean;
  planId: string;
  seats: number;
  monthlySpend: number;
}

export interface AuditFormState {
  teamSize: number;
  primaryUseCase: UseCase;
  tools: Record<ToolId, ToolState>;
}

export interface AuditRecommendation {
  toolId: ToolId;
  currentPlan: string;
  recommendedPlan: string;
  action: "keep" | "downgrade" | "switch" | "rightsize";
  monthlySavings: number;
  reason: string;
}

export interface AuditResult {
  currentMonthlyTotal: number;
  optimizedMonthlyTotal: number;
  monthlySavings: number;
  annualSavings: number;
  recommendations: AuditRecommendation[];
  status: "optimal" | "needs_optimization" | "high_savings";
}
