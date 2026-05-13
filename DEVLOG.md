# SpendPilot Development Log

## Day 1 — 2026-05-07
**Hours worked:** 3
**What I did:** Initial architecture brainstorming. Decided on Next.js App Router for speed and SEO. Researched the pricing for Cursor, Copilot, and Claude.
**What I learned:** Claude Team plans have a 5-seat minimum, which is a major "gotcha" for small startups.
**Blockers / what I'm stuck on:** Deciding between AI-calculated vs. rule-based audits.
**Plan for tomorrow:** Build the core TypeScript audit engine.

## Day 2 — 2026-05-08
**Hours worked:** 5
**What I did:** Built the core `engine.ts`. Implemented the logic for Cursor vs. Copilot redundancy.
**What I learned:** Hardcoded math is much more reliable than LLM math for finance tools.
**Blockers:** Formatting the audit results so they are "screenshot-worthy."
**Plan for tomorrow:** Start the front-end layout and the "Audit Wizard."

## Day 3 — 2026-05-09
**Hours worked:** 4
**What I did:** Built the `AuditWizard` with shadcn/ui. Implemented the "ToolRow" component.
**What I learned:** `localStorage` is perfect for this—no one wants to sign in just to "see" if they're overspending.
**Blockers:** Module resolution errors with relative imports.
**Plan for tomorrow:** Fix imports and build the results dashboard.

## Day 4 — 2026-05-10
**Hours worked:** 0
**What I did:** Day off. Took a break to clear my head and look at the project from a "cold visitor" perspective.

## Day 5 — 2026-05-11
**Hours worked:** 6
**What I did:** Finalized the `AuditResults` page. Integrated the Anthropic API for the personalized summary.
**What I learned:** Prompt engineering for Claude 3.5 requires very specific length constraints to keep the UI clean.
**Blockers:** Handling API failures for the summary without crashing the page.
**Plan for tomorrow:** Implement lead capture and shareable URLs.

## Day 6 — 2026-05-12
**Hours worked:** 5
**What I did:** Set up Supabase and Resend. Built the public shareable result page with OG tags.
**What I learned:** Next.js 15+ handles `params` as promises, which required a quick refactor of my dynamic routes.
**Blockers:** Port 3000 conflicts on local machine.
**Plan for tomorrow:** Write tests, finish documentation, and deploy.

## Day 7 — 2026-05-13
**Hours worked:** 4
**What I did:** Wrote the 5 mandatory tests for the audit engine. Finalized ARCHITECTURE.md and all entrepreneurial files.
**What I learned:** Writing the "Economics" of your own app makes you realize the importance of the viral loop.
**Blockers:** None. Everything is green.
**Plan for tomorrow:** Submit and wait for feedback!
