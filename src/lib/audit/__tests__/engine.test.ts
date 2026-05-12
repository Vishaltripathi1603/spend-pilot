import { describe, it, expect } from 'vitest';
import { runAuditEngine } from '../engine';
import { AuditFormState } from '../types';

const BASE_STATE: AuditFormState = {
  teamSize: 1,
  primaryUseCase: 'coding',
  tools: {
    cursor: { enabled: false, planId: 'hobby', seats: 1, monthlySpend: 0 },
    copilot: { enabled: false, planId: 'individual', seats: 1, monthlySpend: 0 },
    claude: { enabled: false, planId: 'pro', seats: 1, monthlySpend: 0 },
    chatgpt: { enabled: false, planId: 'plus', seats: 1, monthlySpend: 0 },
    anthropic_api: { enabled: false, planId: 'direct', seats: 1, monthlySpend: 0 },
    openai_api: { enabled: false, planId: 'direct', seats: 1, monthlySpend: 0 },
    gemini: { enabled: false, planId: 'business', seats: 1, monthlySpend: 0 },
    windsurf: { enabled: false, planId: 'individual', seats: 1, monthlySpend: 0 },
    v0: { enabled: false, planId: 'free', seats: 1, monthlySpend: 0 },
  }
};

describe('Audit Engine Logic', () => {
  it('identifies redundancy between Cursor and Copilot', () => {
    const state = {
      ...BASE_STATE,
      tools: {
        ...BASE_STATE.tools,
        cursor: { enabled: true, planId: 'pro', seats: 1, monthlySpend: 20 },
        copilot: { enabled: true, planId: 'individual', seats: 1, monthlySpend: 10 },
      }
    };
    const result = runAuditEngine(state);
    const copilotRec = result.recommendations.find(r => r.toolId === 'copilot');
    expect(copilotRec?.action).toBe('switch');
    expect(result.monthlySavings).toBeGreaterThan(0);
  });

  it('recommends rightsizing Claude Team plan for small teams (< 5 users)', () => {
    const state = {
      ...BASE_STATE,
      teamSize: 2,
      tools: {
        ...BASE_STATE.tools,
        claude: { enabled: true, planId: 'team', seats: 2, monthlySpend: 125 },
      }
    };
    const result = runAuditEngine(state);
    const claudeRec = result.recommendations.find(r => r.toolId === 'claude');
    expect(claudeRec?.recommendedPlan).toBe('Pro');
    expect(claudeRec?.action).toBe('downgrade');
  });

  it('triggers optimization status for API spend', () => {
    const state = {
      ...BASE_STATE,
      tools: {
        ...BASE_STATE.tools,
        openai_api: { enabled: true, planId: 'direct', seats: 1, monthlySpend: 600 },
      }
    };
    const result = runAuditEngine(state);
    expect(result.status).toBe('needs_optimization'); // 20% of 600 = 120 (which is < 500)
    const openaiRec = result.recommendations.find(r => r.toolId === 'openai_api');
    expect(openaiRec?.reason).toContain('Credex');
  });

  it('honestly reports "optimal" for a correctly configured stack', () => {
    const state = {
      ...BASE_STATE,
      tools: {
        ...BASE_STATE.tools,
        cursor: { enabled: true, planId: 'pro', seats: 1, monthlySpend: 20 },
      }
    };
    const result = runAuditEngine(state);
    expect(result.monthlySavings).toBe(0);
    const cursorRec = result.recommendations.find(r => r.toolId === 'cursor');
    expect(cursorRec?.action).toBe('keep');
  });

  it('handles empty input gracefully', () => {
    const result = runAuditEngine(BASE_STATE);
    expect(result.currentMonthlyTotal).toBe(0);
    expect(result.monthlySavings).toBe(0);
  });
});
