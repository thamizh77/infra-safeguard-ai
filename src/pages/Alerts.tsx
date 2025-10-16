import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, MapPin, CheckCircle, XCircle } from "lucide-react";

interface Alert {
  id: string;
  title: string;
  description: string;
  time: string;
  zone: string;
  status: "pending" | "resolved" | "ignored";
  severity: "high" | "medium" | "low";
}

const alerts: Alert[] = [
  {
    id: "1",
    title: "Worker without Helmet detected",
    description: "Worker #2 detected without safety helmet in restricted zone",
    time: "2 minutes ago",
    zone: "Zone A - Assembly Line",
    status: "pending",
    severity: "high",
  },
  {
    id: "2",
    title: "Missing Gloves",
    description: "Worker #5 operating machinery without protective gloves",
    time: "5 minutes ago",
    zone: "Zone B - Packaging",
    status: "pending",
    severity: "medium",
  },
  {
    id: "3",
    title: "Safety Jacket Not Worn",
    description: "Worker #8 entered high-visibility zone without safety jacket",
    time: "8 minutes ago",
    zone: "Zone C - Warehouse",
    status: "resolved",
    severity: "high",
  },
  {
    id: "4",
    title: "Missing Gloves",
    description: "Worker #12 handling materials without gloves",
    time: "12 minutes ago",
    zone: "Zone A - Assembly Line",
    status: "resolved",
    severity: "medium",
  },
  {
    id: "5",
    title: "Helmet Missing",
    description: "Worker #15 detected without helmet near heavy machinery",
    time: "18 minutes ago",
    zone: "Zone D - Maintenance",
    status: "ignored",
    severity: "high",
  },
];

const Alerts = () => {
  const severityColors = {
    high: "bg-destructive/10 text-destructive border-destructive/30",
    medium: "bg-warning/10 text-warning border-warning/30",
    low: "bg-muted text-muted-foreground border-muted-foreground/30",
  };

  const statusColors = {
    pending: "bg-warning/10 text-warning border-warning/30",
    resolved: "bg-success/10 text-success border-success/30",
    ignored: "bg-muted text-muted-foreground border-muted-foreground/30",
  };

  const statusIcons = {
    pending: AlertTriangle,
    resolved: CheckCircle,
    ignored: XCircle,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Safety Alerts</h2>
          <p className="text-muted-foreground">Monitor and manage safety violations</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className={statusColors.pending}>
            {alerts.filter(a => a.status === "pending").length} Pending
          </Badge>
          <Badge variant="outline" className={statusColors.resolved}>
            {alerts.filter(a => a.status === "resolved").length} Resolved
          </Badge>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.map((alert) => {
          const StatusIcon = statusIcons[alert.status];
          
          return (
            <Card key={alert.id} className="p-6 shadow-card transition-smooth hover:shadow-elevated">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-3 rounded-lg ${alert.severity === 'high' ? 'bg-destructive/10' : 'bg-warning/10'}`}>
                    <AlertTriangle className={`h-6 w-6 ${alert.severity === 'high' ? 'text-destructive' : 'text-warning'}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{alert.title}</h3>
                      <Badge className={severityColors[alert.severity]}>
                        {alert.severity}
                      </Badge>
                      <Badge className={statusColors[alert.status]}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {alert.status}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-3">{alert.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{alert.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{alert.zone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {alert.status === "pending" && (
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline" className="text-success border-success/30">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Resolve
                    </Button>
                    <Button size="sm" variant="outline" className="text-muted-foreground">
                      <XCircle className="h-4 w-4 mr-1" />
                      Ignore
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Alerts;
