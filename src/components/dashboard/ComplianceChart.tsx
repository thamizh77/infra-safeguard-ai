import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { TrendingUp } from "lucide-react";

const data = [
  { time: "08:00", compliance: 95 },
  { time: "09:00", compliance: 92 },
  { time: "10:00", compliance: 88 },
  { time: "11:00", compliance: 90 },
  { time: "12:00", compliance: 85 },
  { time: "13:00", compliance: 87 },
  { time: "14:00", compliance: 91 },
  { time: "15:00", compliance: 94 },
];

export function ComplianceChart() {
  return (
    <Card className="p-6 shadow-card">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Compliance Trend (Today)</h3>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="complianceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(158, 100%, 50%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(158, 100%, 50%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 12%, 20%)" />
          <XAxis 
            dataKey="time" 
            stroke="hsl(0, 0%, 60%)"
            tick={{ fill: 'hsl(0, 0%, 60%)' }}
          />
          <YAxis 
            stroke="hsl(0, 0%, 60%)"
            tick={{ fill: 'hsl(0, 0%, 60%)' }}
            domain={[0, 100]}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(220, 15%, 12%)',
              border: '1px solid hsl(220, 12%, 20%)',
              borderRadius: '0.5rem',
              color: 'hsl(0, 0%, 95%)'
            }}
          />
          <Area
            type="monotone"
            dataKey="compliance"
            stroke="hsl(158, 100%, 50%)"
            strokeWidth={2}
            fill="url(#complianceGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
