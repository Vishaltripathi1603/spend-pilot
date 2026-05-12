import { Metadata } from "next";
import { AuditWizard } from "@/components/audit/AuditWizard";

export const metadata: Metadata = {
  title: "SpendPilot Audit | Stop overpaying for AI",
  description: "Calculate your potential savings on AI infrastructure in minutes.",
};

export default function AuditPage() {
  return (
    <main className="flex-1 bg-zinc-50/50 dark:bg-zinc-950/50 pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <AuditWizard />
      </div>
    </main>
  );
}
