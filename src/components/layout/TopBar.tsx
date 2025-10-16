import { Clock, User } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";

export function TopBar() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 shadow-card">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div>
          <h1 className="text-xl font-bold text-foreground">Safety Monitoring Dashboard</h1>
          <p className="text-xs text-muted-foreground">Real-time PPE detection</p>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{currentTime.toLocaleTimeString()}</span>
          <span className="text-xs">{currentTime.toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-md">
          <User className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
}
