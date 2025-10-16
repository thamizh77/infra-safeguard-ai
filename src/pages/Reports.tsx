import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Download, FileText, Calendar } from "lucide-react";

const departmentData = [
  { name: "Assembly", violations: 12 },
  { name: "Packaging", violations: 8 },
  { name: "Quality Check", violations: 5 },
  { name: "Warehouse", violations: 15 },
  { name: "Maintenance", violations: 7 },
];

const violationTypeData = [
  { name: "Helmet Missing", value: 18, color: "#ff6b35" },
  { name: "Gloves Missing", value: 15, color: "#ffa600" },
  { name: "Jacket Not Worn", value: 10, color: "#bc5090" },
  { name: "Boots Missing", value: 4, color: "#58508d" },
];

const weeklyData = [
  { day: "Mon", compliance: 88 },
  { day: "Tue", compliance: 91 },
  { day: "Wed", compliance: 87 },
  { day: "Thu", compliance: 92 },
  { day: "Fri", compliance: 89 },
  { day: "Sat", compliance: 94 },
  { day: "Sun", compliance: 93 },
];

const Reports = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Safety Reports</h2>
          <p className="text-muted-foreground">Analyze safety compliance trends and violations</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Date Range
          </Button>
          <Button className="gap-2 bg-primary text-primary-foreground">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Violations per Department */}
        <Card className="p-6 shadow-card">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Violations per Department</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 12%, 20%)" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(0, 0%, 60%)"
                tick={{ fill: 'hsl(0, 0%, 60%)' }}
              />
              <YAxis 
                stroke="hsl(0, 0%, 60%)"
                tick={{ fill: 'hsl(0, 0%, 60%)' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(220, 15%, 12%)',
                  border: '1px solid hsl(220, 12%, 20%)',
                  borderRadius: '0.5rem',
                  color: 'hsl(0, 0%, 95%)'
                }}
              />
              <Bar dataKey="violations" fill="hsl(25, 100%, 60%)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Violation Types */}
        <Card className="p-6 shadow-card">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Violation Types Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={violationTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {violationTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(220, 15%, 12%)',
                  border: '1px solid hsl(220, 12%, 20%)',
                  borderRadius: '0.5rem',
                  color: 'hsl(0, 0%, 95%)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Weekly Compliance Trend */}
        <Card className="p-6 shadow-card lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Weekly Compliance Trend</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 12%, 20%)" />
              <XAxis 
                dataKey="day" 
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
              <Line 
                type="monotone" 
                dataKey="compliance" 
                stroke="hsl(158, 100%, 50%)" 
                strokeWidth={3}
                dot={{ fill: 'hsl(158, 100%, 50%)', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
