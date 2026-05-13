# SpendPilot Metrics

## The North Star Metric
**Qualified Leads Generated (QLG):** This is the number of users who complete an audit, show >$500/mo in savings, and successfully submit their email.
*   **Why:** For Credex, a "visit" or even a "minor audit" isn't valuable. We only win when we find high-savings cases that can be converted into Credex credit customers.

## Input Metrics
1. **Audit Completion Rate (ACR):** The percentage of visitors who enter at least 1 tool and click "Generate Audit." This measures the friction of our UI.
2. **Savings Discovery Rate (SDR):** The percentage of audits that identify >$500/mo in wastage. If this is too low, we need to target "fatter" companies or refine our logic to find more subtle wastage.
3. **Viral Share Rate:** Percentage of users who click "Share Results" after seeing their savings. This is our $0 CAC engine.

## Instrumentation
1. **First Step:** PostHog or Plausible. I need to track precisely which step of the wizard people drop off at.
2. **Conversion:** Custom event tracking on the "Capture Report" button, segmented by the dollar amount of savings identified.

## Pivot Decision Number
**< 2% Conversion to Consultation:** If fewer than 2% of "High Savings" users book a Credex call after seeing their report, it means the tool provides "entertainment value" but not "transactional urgency." 
*   **The Pivot:** If this happens, I would pivot the UI from a "Self-Service Audit" to a "Managed Audit Request," where we do the work for them in exchange for the lead data.
