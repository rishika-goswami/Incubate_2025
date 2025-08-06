import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Alert, AlertDescription } from "./ui/alert";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { AlertTriangle, Bell, User, MapPin, Building, Clock, Phone, Mail, MessageSquare } from "lucide-react";

interface AlertItem {
  id: string;
  level: 'Patient' | 'Zone' | 'Ward';
  severity: 'Critical' | 'High' | 'Medium';
  pathogen: string;
  resistance: string;
  location: string;
  timestamp: string;
  status: 'Active' | 'Acknowledged' | 'Resolved';
  details: string;
}

export function AlertSystem() {
  const [alerts] = useState<AlertItem[]>([
    {
      id: "ALT001",
      level: "Ward",
      severity: "Critical",
      pathogen: "Klebsiella pneumoniae",
      resistance: "Carbapenem",
      location: "ICU Ward 3",
      timestamp: "2025-01-15 14:32",
      status: "Active",
      details: "95% resistance rate detected, 8 cases in last 48 hours"
    },
    {
      id: "ALT002",
      level: "Patient",
      severity: "High",
      pathogen: "E. coli",
      resistance: "Fluoroquinolone",
      location: "UMR12345 - Emergency",
      timestamp: "2025-01-15 13:45",
      status: "Active",
      details: "Patient from high-resistance zone, immediate culture recommended"
    },
    {
      id: "ALT003",
      level: "Zone",
      severity: "High",
      pathogen: "P. aeruginosa",
      resistance: "Multidrug",
      location: "Mumbai Central Zone",
      timestamp: "2025-01-15 12:15",
      status: "Acknowledged",
      details: "Outbreak detected across 3 facilities in zone"
    },
    {
      id: "ALT004",
      level: "Ward",
      severity: "Medium",
      pathogen: "S. aureus",
      resistance: "Methicillin",
      location: "Surgery Ward 2",
      timestamp: "2025-01-15 09:20",
      status: "Acknowledged",
      details: "Increased MRSA cases, enhanced screening recommended"
    }
  ]);

  const [alertSettings, setAlertSettings] = useState({
    sms: true,
    email: true,
    slack: false,
    whatsapp: true,
    threshold: "10"
  });

  const getSeverityBadge = (severity: string) => {
    const variant = severity === 'Critical' ? 'destructive' : severity === 'High' ? 'secondary' : 'outline';
    return <Badge variant={variant}>{severity}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const variant = status === 'Active' ? 'destructive' : status === 'Acknowledged' ? 'secondary' : 'default';
    return <Badge variant={variant}>{status}</Badge>;
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'Patient': return <User className="h-4 w-4" />;
      case 'Zone': return <MapPin className="h-4 w-4" />;
      case 'Ward': return <Building className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <Tabs defaultValue="active" className="space-y-4">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="active">Active Alerts</TabsTrigger>
          <TabsTrigger value="history">Alert History</TabsTrigger>
          <TabsTrigger value="settings">Alert Settings</TabsTrigger>
        </TabsList>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Test Alert
          </Button>
          <Button variant="outline" size="sm">
            Mark All Read
          </Button>
        </div>
      </div>

      <TabsContent value="active">
        <div className="space-y-4">
          {/* Critical Alerts Banner */}
          <Alert className="border-destructive/50 bg-destructive/10">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive">
              <strong>1 Critical Alert:</strong> Immediate attention required for ICU Ward 3 outbreak.
            </AlertDescription>
          </Alert>

          {/* Alert List */}
          {alerts.filter(alert => alert.status === 'Active').map((alert) => (
            <Card key={alert.id} className={`${alert.severity === 'Critical' ? 'border-destructive' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getLevelIcon(alert.level)}
                    <div>
                      <CardTitle className="text-base">
                        {alert.level} Level Alert - {alert.pathogen}
                      </CardTitle>
                      <CardDescription className="flex items-center space-x-2 mt-1">
                        <span>{alert.location}</span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{alert.timestamp}</span>
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getSeverityBadge(alert.severity)}
                    {getStatusBadge(alert.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-4 text-sm">
                    <span><strong>Resistance:</strong> {alert.resistance}</span>
                    <span><strong>Alert ID:</strong> {alert.id}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.details}</p>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <Button size="sm" variant={alert.severity === 'Critical' ? 'destructive' : 'default'}>
                      Acknowledge
                    </Button>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      Contact Team
                    </Button>
                    {alert.level === 'Patient' && (
                      <Button size="sm" variant="outline">
                        View Patient
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="history">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="patient">Patient Level</SelectItem>
                <SelectItem value="zone">Zone Level</SelectItem>
                <SelectItem value="ward">Ward Level</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="7days">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24hours">Last 24 Hours</SelectItem>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {alerts.map((alert) => (
            <Card key={alert.id} className="opacity-80">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getLevelIcon(alert.level)}
                    <div>
                      <p className="font-medium text-sm">
                        {alert.level}: {alert.pathogen} - {alert.resistance} Resistance
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {alert.location} • {alert.timestamp}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getSeverityBadge(alert.severity)}
                    {getStatusBadge(alert.status)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="settings">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Channels</CardTitle>
              <CardDescription>
                Configure how you receive AMR alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <Label htmlFor="sms">SMS Alerts</Label>
                </div>
                <Switch 
                  id="sms" 
                  checked={alertSettings.sms}
                  onCheckedChange={(checked) => setAlertSettings({...alertSettings, sms: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <Label htmlFor="email">Email Notifications</Label>
                </div>
                <Switch 
                  id="email" 
                  checked={alertSettings.email}
                  onCheckedChange={(checked) => setAlertSettings({...alertSettings, email: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4" />
                  <Label htmlFor="slack">Slack Integration</Label>
                </div>
                <Switch 
                  id="slack" 
                  checked={alertSettings.slack}
                  onCheckedChange={(checked) => setAlertSettings({...alertSettings, slack: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <Label htmlFor="whatsapp">WhatsApp Alerts</Label>
                </div>
                <Switch 
                  id="whatsapp" 
                  checked={alertSettings.whatsapp}
                  onCheckedChange={(checked) => setAlertSettings({...alertSettings, whatsapp: checked})}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alert Thresholds</CardTitle>
              <CardDescription>
                Set resistance rate thresholds for automatic alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="threshold">Ward Alert Threshold (%)</Label>
                <Input
                  id="threshold"
                  type="number"
                  value={alertSettings.threshold}
                  onChange={(e) => setAlertSettings({...alertSettings, threshold: e.target.value})}
                  placeholder="Enter percentage"
                />
                <p className="text-xs text-muted-foreground">
                  Alert when resistance rate exceeds this percentage in any ward
                </p>
              </div>

              <div className="space-y-3">
                <Label>Alert Recipients</Label>
                <div className="space-y-2">
                  <Input placeholder="Infection Control Team Email" />
                  <Input placeholder="Pharmacy Director Phone" />
                  <Input placeholder="Medical Director Email" />
                  <Button variant="outline" size="sm" className="w-full">
                    + Add Recipient
                  </Button>
                </div>
              </div>

              <Button className="w-full">Save Settings</Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}