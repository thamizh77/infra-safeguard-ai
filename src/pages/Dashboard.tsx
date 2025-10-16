import { Users, AlertTriangle, CheckCircle, Bell } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { LiveFeed } from "@/components/dashboard/LiveFeed";
import { ViolationsPanel } from "@/components/dashboard/ViolationsPanel";
import { ComplianceChart } from "@/components/dashboard/ComplianceChart";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Workers Detected"
          value={24}
          icon={Users}
          trend="Active on floor"
          variant="default"
        />
        <StatCard
          title="Safety Violations Today"
          value={8}
          icon={AlertTriangle}
          trend="-2 from yesterday"
          variant="warning"
        />
        <StatCard
          title="Compliance Rate"
          value="91%"
          icon={CheckCircle}
          trend="+3% from yesterday"
          variant="success"
        />
        <StatCard
          title="Alerts Triggered"
          value={12}
          icon={Bell}
          trend="Last 24 hours"
          variant="danger"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LiveFeed />
        </div>
        <div>
          <ViolationsPanel />
        </div>
      </div>

      {/* Compliance Chart */}
      <ComplianceChart />
    </div>
  );
};

export default Dashboard;
