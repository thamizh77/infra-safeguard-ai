import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Camera, Users, Bell, Shield } from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground">Manage system configuration and preferences</p>
      </div>

      {/* Camera Management */}
      <Card className="p-6 shadow-card">
        <div className="flex items-center gap-2 mb-6">
          <Camera className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Camera Management</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="camera1">Camera 1 - Assembly Line</Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="camera1"
                placeholder="rtsp://192.168.1.100:554/stream"
                className="flex-1"
              />
              <Button variant="outline">Test</Button>
              <Button variant="destructive">Remove</Button>
            </div>
          </div>
          
          <div>
            <Label htmlFor="camera2">Camera 2 - Packaging Area</Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="camera2"
                placeholder="rtsp://192.168.1.101:554/stream"
                className="flex-1"
              />
              <Button variant="outline">Test</Button>
              <Button variant="destructive">Remove</Button>
            </div>
          </div>
          
          <Button className="w-full mt-4 bg-primary text-primary-foreground">
            Add New Camera
          </Button>
        </div>
      </Card>

      {/* User Roles */}
      <Card className="p-6 shadow-card">
        <div className="flex items-center gap-2 mb-6">
          <Users className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">User Roles & Permissions</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
            <div>
              <p className="font-medium text-foreground">Admin Access</p>
              <p className="text-sm text-muted-foreground">Full system access and configuration</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
            <div>
              <p className="font-medium text-foreground">Supervisor Access</p>
              <p className="text-sm text-muted-foreground">View reports and manage alerts</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
            <div>
              <p className="font-medium text-foreground">Viewer Access</p>
              <p className="text-sm text-muted-foreground">Read-only access to dashboard</p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6 shadow-card">
        <div className="flex items-center gap-2 mb-6">
          <Bell className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Notification Settings</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
            <div>
              <p className="font-medium text-foreground">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive alerts via email</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
            <div>
              <p className="font-medium text-foreground">SMS Notifications</p>
              <p className="text-sm text-muted-foreground">Receive urgent alerts via SMS</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
            <div>
              <p className="font-medium text-foreground">Push Notifications</p>
              <p className="text-sm text-muted-foreground">Browser push notifications</p>
            </div>
            <Switch />
          </div>
          
          <div className="mt-4">
            <Label htmlFor="email">Notification Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@company.com"
              className="mt-2"
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Notification Phone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              className="mt-2"
            />
          </div>
        </div>
      </Card>

      {/* AI Detection Settings */}
      <Card className="p-6 shadow-card">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">AI Detection Settings</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label>Detection Confidence Threshold</Label>
            <div className="flex items-center gap-4 mt-2">
              <Input type="range" min="0" max="100" defaultValue="85" className="flex-1" />
              <span className="text-sm text-muted-foreground w-12">85%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
            <div>
              <p className="font-medium text-foreground">Helmet Detection</p>
              <p className="text-sm text-muted-foreground">Monitor helmet compliance</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
            <div>
              <p className="font-medium text-foreground">Gloves Detection</p>
              <p className="text-sm text-muted-foreground">Monitor glove usage</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
            <div>
              <p className="font-medium text-foreground">Safety Jacket Detection</p>
              <p className="text-sm text-muted-foreground">Monitor jacket compliance</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button className="bg-primary text-primary-foreground">Save Changes</Button>
      </div>
    </div>
  );
};

export default Settings;
