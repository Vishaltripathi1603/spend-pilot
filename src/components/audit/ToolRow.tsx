import { ToolId, ToolState } from "@/lib/audit/types";
import { PRICING } from "@/lib/audit/pricing-data";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ToolRowProps {
  toolId: ToolId;
  name: string;
  state: ToolState;
  onUpdate: (updates: Partial<ToolState>) => void;
}

export function ToolRow({ toolId, name, state, onUpdate }: ToolRowProps) {
  const plans = PRICING[toolId];

  return (
    <div className={`p-4 rounded-xl border transition-all ${state.enabled ? 'bg-card border-primary/20 ring-1 ring-primary/5' : 'bg-muted/30 border-transparent opacity-60'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-xs ${state.enabled ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
            {name[0]}
          </div>
          <Label htmlFor={`${toolId}-toggle`} className="text-base font-semibold cursor-pointer">
            {name}
          </Label>
        </div>
        <Switch
          id={`${toolId}-toggle`}
          checked={state.enabled}
          onCheckedChange={(checked) => onUpdate({ enabled: checked })}
        />
      </div>

      {state.enabled && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Plan</Label>
            <Select
              value={state.planId}
              onValueChange={(val) => { if (val) onUpdate({ planId: val }) }}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select plan" />
              </SelectTrigger>
              <SelectContent>
                {plans.map((plan) => (
                  <SelectItem key={plan.id} value={plan.id}>
                    {plan.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Seats</Label>
            <Input
              type="number"
              min={1}
              value={state.seats}
              onChange={(e) => onUpdate({ seats: parseInt(e.target.value) || 1 })}
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Monthly Spend ($)</Label>
            <Input
              type="number"
              min={0}
              placeholder="Auto-calculated"
              value={state.monthlySpend || ""}
              onChange={(e) => onUpdate({ monthlySpend: parseFloat(e.target.value) || 0 })}
              className="bg-background"
            />
          </div>
        </div>
      )}
    </div>
  );
}
