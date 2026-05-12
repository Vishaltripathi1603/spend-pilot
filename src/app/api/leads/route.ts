import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, company, teamSize, auditId, honeypot } = body;

    // 1. Abuse Protection (Honeypot)
    if (honeypot) {
      console.log("Bot detected via honeypot");
      return NextResponse.json({ success: true, message: "Bot detected" }, { status: 200 });
    }

    // 2. Save to Supabase
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { data, error } = await supabase
        .from('leads')
        .insert([{ 
          email, 
          company, 
          team_size: teamSize, 
          audit_id: auditId,
          created_at: new Date().toISOString()
        }]);
      
      if (error) {
        console.error("Supabase Insertion Error:", error);
      } else {
        console.log("Lead saved to Supabase:", email);
      }
    }

    // 3. Send Transactional Email via Resend
    if (process.env.RESEND_API_KEY) {
      const { data, error } = await resend.emails.send({
        from: "SpendPilot <audits@spendpilot.ai>",
        to: [email],
        subject: "Your AI Spend Audit - Optimized Roadmap inside",
        html: `
          <h1>Your SpendPilot Audit is Ready</h1>
          <p>Hi there,</p>
          <p>We've analyzed the AI stack for <strong>${company}</strong>. We found potential annual savings that could significantly impact your bottom line.</p>
          <p>A Credex optimization expert will review your specific case and reach out if there are further high-impact savings available through our secondary market credits.</p>
          <p>Best,<br/>The SpendPilot Team</p>
        `,
      });

      if (error) {
        console.error("Resend Email Error:", error);
      } else {
        console.log("Audit email sent to:", email);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead Capture API Error:", error);
    return NextResponse.json({ error: "Failed to capture lead" }, { status: 500 });
  }
}
