import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video, Circle } from "lucide-react";

export function LiveFeed() {
  return (
    <Card className="p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Video className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Live Camera Feed</h3>
        </div>
        <Badge variant="outline" className="bg-success/10 text-success border-success/30">
          <Circle className="h-2 w-2 mr-1 fill-success" />
          Live
        </Badge>
      </div>
      
      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden border border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
          <div className="text-center">
            <Video className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Camera feed simulation</p>
            <p className="text-xs text-muted-foreground mt-2">Connect camera to view live stream</p>
          </div>
        </div>
        
        {/* Simulated detection boxes */}
        <div className="absolute top-20 left-20 w-32 h-40 border-2 border-success rounded-md">
          <span className="absolute -top-6 left-0 text-xs bg-success text-success-foreground px-2 py-1 rounded">
            Worker #1 - Safe
          </span>
        </div>
        
        <div className="absolute top-32 right-24 w-32 h-40 border-2 border-destructive rounded-md glow-alert">
          <span className="absolute -top-6 left-0 text-xs bg-destructive text-destructive-foreground px-2 py-1 rounded">
            Worker #2 - No Helmet
          </span>
        </div>
        
        {/* Camera info overlay */}
        <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-2 rounded-md">
          <p className="text-xs text-foreground">Camera: Main Factory Floor</p>
          <p className="text-xs text-muted-foreground">Zone A - Assembly Line</p>
        </div>
      </div>
    </Card>
  );
}
