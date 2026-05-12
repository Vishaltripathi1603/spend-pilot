# Architecture & Tech Stack Justification

## Tech Stack

- **Framework:** Next.js (App Router)
  - *Justification:* Provides built-in server-side rendering (SSR) for fast initial load times (Lighthouse Performance), seamless API routing for server-side logic (lead capture, AI generation), and excellent SEO/Open Graph support for shareable URLs.
- **Language:** TypeScript
  - *Justification:* Ensures type safety, maintainability, and aligns with the strong preference in the assignment constraints.
- **Styling:** Tailwind CSS v4
  - *Justification:* Offers maximum flexibility and high performance with minimal runtime overhead. Perfect for building a custom, polished UI without using pre-built templates.
- **Components:** shadcn/ui
  - *Justification:* Provides accessible, unstyled primitives (built on Radix UI) that allow for a unique, premium design while maintaining high accessibility scores.
- **Animations:** Framer Motion
  - *Justification:* Adds subtle, premium micro-animations to enhance user engagement.
- **Database:** Supabase
  - *Justification:* Provides a robust, scalable backend for storing leads and audit data with zero configuration required.
- **Emails:** Resend
  - *Justification:* Offers a modern, developer-friendly API for high-deliverability transactional emails.
- **AI Summary:** Anthropic (Claude 3.5 Sonnet)
  - *Justification:* Industry-leading reasoning capabilities for complex infrastructure spend analysis.

## Design Decisions

- **Client-Side State Management:** Using React `useState` and `useEffect` with local storage persistence to keep the audit flow fast and responsive without requiring a login.
- **Performance Optimization:** Leveraging Next.js Image optimization and Font optimization (Next Font) to ensure Lighthouse scores remain above the required thresholds.
- **Lead Generation Flow:** Implementation of a "Value-First" model where the audit is shown immediately, and email capture is presented as an upgrade for a more detailed report or consultation.
