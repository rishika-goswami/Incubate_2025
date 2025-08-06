import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { Activity, AlertTriangle, BarChart3, Database, Shield, Users, Globe, TestTubes } from "lucide-react";
import { PredictionForm } from "./PredictionForm";
import { StewardshipAnalytics } from "./StewardshipAnalytics";
import { AlertSystem } from "./AlertSystem";
import { OfflineMode } from "./OfflineMode";
import { AtlasAnalytics } from "./AtlasAnalytics";
import { GenomicAnalysis } from "./GenomicAnalysis";

export function Dashboard() {
  const [connectionStatus, setConnectionStatus] = useState<'online' | 'offline' | 'syncing'>('online');
  const [activeAlerts, setActiveAlerts] = useState(3);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-lg font-medium">KAVACH AMR Intelligence System</h1>
              <p className="text-sm text-muted-foreground">Comprehensive Antimicrobial Resistance Surveillance & Analysis</p>
            </div>
          </div>
          
          <div className="ml-auto flex items-center space-x-4">
            <Badge variant={connectionStatus === 'online' ? 'default' : connectionStatus === 'offline' ? 'destructive' : 'secondary'}>
              {connectionStatus === 'online' && "Online"}
              {connectionStatus === 'offline' && "Offline Mode"}
              {connectionStatus === 'syncing' && "Syncing..."}
            </Badge>
            
            {activeAlerts > 0 && (
              <Badge variant="destructive" className="flex items-center space-x-1">
                <AlertTriangle className="h-3 w-3" />
                <span>{activeAlerts} Active Alerts</span>
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Predictions</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">147</div>
              <p className="text-xs text-muted-foreground">+12% from yesterday</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High-Risk Cases</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">23</div>
              <p className="text-xs text-muted-foreground">Immediate attention required</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Connected Facilities</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">856</div>
              <p className="text-xs text-muted-foreground">Across 12 states</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ATLAS Countries</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">Global surveillance</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accuracy Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.7%</div>
              <p className="text-xs text-muted-foreground">Model performance this week</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Alerts Banner */}
        {activeAlerts > 0 && (
          <Alert className="mb-6 border-destructive/50 bg-destructive/10">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive">
              <strong>Outbreak Alert:</strong> High resistance detected in ICU Ward 3 - Klebsiella pneumoniae showing 95% resistance to Carbapenem. 
              <button className="ml-2 underline">View Details</button>
            </AlertDescription>
          </Alert>
        )}

        {/* Main Content Tabs */}
        <Tabs defaultValue="prediction" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="prediction" className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span>Prediction</span>
            </TabsTrigger>
            <TabsTrigger value="stewardship" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Stewardship</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="atlas" className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>ATLAS Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="genomic" className="flex items-center space-x-2">
              <TestTubes className="h-4 w-4" />
              <span>Genomic Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="offline" className="flex items-center space-x-2">
              <Database className="h-4 w-4" />
              <span>Offline Mode</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prediction">
            <PredictionForm />
          </TabsContent>

          <TabsContent value="stewardship">
            <StewardshipAnalytics />
          </TabsContent>

          <TabsContent value="alerts">
            <AlertSystem />
          </TabsContent>

          <TabsContent value="atlas">
            <AtlasAnalytics />
          </TabsContent>

          <TabsContent value="genomic">
            <GenomicAnalysis />
          </TabsContent>

          <TabsContent value="offline">
            <OfflineMode connectionStatus={connectionStatus} setConnectionStatus={setConnectionStatus} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}