# Project Reflection

## 1. The Hardest Bug
The hardest bug I hit this week was a module resolution error in Next.js 15+ related to lowercase vs. PascalCase filenames. Initially, I used `audit-results.tsx`, but the TypeScript compiler in the build environment was intermittently failing to find the module, even though it worked in `npm run dev`. 
**Hypotheses:** 1) Next.js caching issue, 2) Case-sensitivity in the Turbopack engine, 3) Typo in the export.
**Debugging:** I cleared `.next` folders and restarted the TS server, but the error persisted in production builds. I tried using relative paths versus aliases. Finally, I realized that while macOS is case-insensitive, the strict resolution logic in modern Next.js/Turbopack prefers component filenames to match their exports exactly. Renaming to `AuditResults.tsx` and switching to absolute path aliases (@/) fixed the resolution permanently.

## 2. A Decision Reversed Mid-Week
Mid-week, I reversed the decision to use a "multi-page" form for the audit. I initially thought a Step 1 (Tool Selection) and Step 2 (Usage Data) flow would be cleaner. 
**Why I reversed it:** After testing the flow myself, I realized that the "cold visitor" intent is very high-friction. Having to click "Next" before even seeing how many inputs were required felt like a trap. I changed the design to a "Single-Page Power Wizard." This allows the user to see exactly what is needed upfront, toggle only the tools they use, and reduces the time-to-value. Entrepreneurially, this reduced my estimated bounce rate during user testing.

## 3. Week 2 Roadmap
If I had a second week, I would build:
1. **SSO / Team Invite:** Currently, the tool is for one person. Startups need to invite their Finance lead and Engineering lead to the same dashboard to agree on the "Audit Roadmap."
2. **Dynamic Benchmarking:** I would use the data captured from the thousands of audits to show users: "You are spending $200/dev/mo, but the average for seed-stage startups in your sector is $120." This creates a stronger emotional "need" to optimize.
3. **Automated Implementation:** A "Click to Cancel/Downgrade" button that uses browser automation (or vendor APIs) to actually implement the recommendations, rather than just suggesting them.

## 4. How you used AI tools
I used **Antigravity (built on Claude 3.5 Sonnet)** throughout the build. 
- **Tasks:** Scaffolding Tailwind layouts, generating the initial pricing registry types, and writing the CI workflow.
- **What I didn't trust:** I never trusted the AI with the actual audit math. I wrote the logic for seat minimums and tool redundancies manually in `engine.ts` to ensure it was 100% defensible.
- **When the AI was wrong:** At one point, the AI suggested using a simple `number` input for the plan selection. I caught this because many AI tools have discrete tiers (e.g., Cursor Hobby vs Pro) that aren't just "higher numbers." I had to override it with a strictly typed `Select` component to match reality.

## 5. Self-rating (1–10)
- **Discipline (9):** I maintained a strict 7-day log and didn't cut corners on documentation. One sentence: I focused on high-depth entries that accurately reflect the week's blockers.
- **Code Quality (8):** The engine is modular and well-tested, though some UI components could be more decomposed. One sentence: Strict TypeScript usage and passing unit tests ensure the happy path is robust.
- **Design Sense (9):** Used a dark-mode first, premium aesthetic that feels like a professional B2B tool. One sentence: Focus on high-contrast visuals and responsive layouts for a "Product Hunt" feel.
- **Problem Solving (8):** Resolved several tricky Next.js 15+ build errors independently. One sentence: Methodical debugging of hydration and module resolution issues.
- **Entrepreneurial Thinking (10):** Focus on the "viral loop" and the Credex lead-gen intent was central to every design decision. One sentence: The tool exists primarily to drive high-intent consultation leads for Credex.
