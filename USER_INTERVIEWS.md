# User Interviews

## Interview 1: A.K., CTO of Seed-Stage Fintech
**Company Stage:** Seed (12 employees)
**Key Quotes:**
- *"I have no idea who is using Claude vs Cursor. I just see the Stripe bill hitting $600 and wonder where it's going."*
- *"If you ask me to 'Connect my AWS' or 'Connect my Stripe' to see savings, I'm closing the tab. Too much security risk for a random tool."*
- *"We are definitely over-provisioned on GitHub Copilot since 4 devs switched to Cursor. I just haven't had the 10 minutes to audit it."*

**Most Surprising Moment:** 
The visceral reaction to "Connecting Stripe." Even though it would make the audit easier, the trust barrier for a new tool is extremely high in Fintech. 

**Design Change:** 
I removed all "automated" data fetching and went with a manual, high-speed "Wizard" instead. Security through zero-data-access.

---

## Interview 2: M.S., Founding Engineer at EdTech Startup
**Company Stage:** Pre-seed (4 employees)
**Key Quotes:**
- *"We signed up for Claude Team because we wanted the bigger context window, but we only have 3 people. Are we paying for 5?"* (Yes, they were).
- *"I'd share this with my CEO immediately if it showed an 'Annual Savings' number. He doesn't care about $20/month, he cares about $2k/year."*
- *"Pricing is moving so fast I can't keep up. Didn't OpenAI just drop prices again?"*

**Most Surprising Moment:** 
The user was unaware of the 5-seat minimum on Claude Team. They were effectively paying a "stupid tax" of $60/month without knowing it.

**Design Change:** 
I added the "Annual Savings" hero metric in large font. Shifting the frame from "monthly pocket change" to "annual runway" is what drives the lead capture.

---

## Interview 3: J.L., Fractional CFO for 5 AI Startups
**Company Stage:** Multiple (Series A focus)
**Key Quotes:**
- *"My clients are spending $2k+ on API credits and getting 0% discount. I keep telling them to look at secondary markets but they think it's 'shady'."*
- *"A 'defensible' report is what I need. If I show a recommendation to a CEO, I need to point to a URL and say 'Here is the math'."*
- *"The biggest wastage isn't the $20 plans, it's the $500 API spikes that go unnoticed."*

**Most Surprising Moment:** 
The fear of "shady" secondary markets. This highlighted that SpendPilot's role isn't just to find savings, but to **legitimize** Credex as the professional solution.

**Design Change:** 
I added the PRICING_DATA.md and linked every engine result to official URLs. I also added the "High Spend" Credex logic to educate users on credit safety.
