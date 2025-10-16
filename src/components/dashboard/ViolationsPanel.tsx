import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

interface Violation {
  id: string;
  worker: string;
  type: string;
  time: string;
  zone: string;
  severity: "high" | "medium" | "low";
}

const violations: Violation[] = [
  { id: "1", worker: "Worker #2", type: "Helmet Missing", time: "2 min ago", zone: "Zone A", severity: "high" },
  { id: "2", worker: "Worker #5", type: "Gloves Missing", time: "5 min ago", zone: "Zone B", severity: "medium" },
  { id: "3", worker: "Worker #8", type: "Safety Jacket Not Worn", time: "8 min ago", zone: "Zone C", severity: "high" },
  { id: "4", worker: "Worker #12", type: "Gloves Missing", time: "12 min ago", zone: "Zone A", severity: "medium" },
];

export function ViolationsPanel() {
  const severityColors = {
    high: "bg-destructive/10 text-destructive border-destructive/30",
    medium: "bg-warning/10 text-warning border-warning/30",
    low: "bg-muted text-muted-foreground border-muted-foreground/30",
  };

  return (
    <Card className="p-6 shadow-card">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-warning" />
        <h3 className="text-lg font-semibold text-foreground">Current Violations</h3>
        <Badge variant="destructive" className="ml-auto">
          {violations.length}
        </Badge>
      </div>
      
      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {violations.map((violation) => (
          <div
            key={violation.id}
            className="p-4 bg-secondary rounded-lg border border-border transition-smooth hover:border-primary/50"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-medium text-foreground">{violation.worker}</p>
                <p className="text-sm text-muted-foreground">{violation.zone}</p>
              </div>
              <Badge className={severityColors[violation.severity]}>
                {violation.severity}
              </Badge>
            </div>
            <p className="text-sm text-foreground mb-2">{violation.type}</p>
            <p className="text-xs text-muted-foreground">{violation.time}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
