import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { Textarea } from "./ui/textarea";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Download, 
  Upload, 
  Wifi, 
  WifiOff, 
  Database, 
  FileText, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle,
  HardDrive
} from "lucide-react";

interface OfflineModeProps {
  connectionStatus: 'online' | 'offline' | 'syncing';
  setConnectionStatus: (status: 'online' | 'offline' | 'syncing') => void;
}

export function OfflineMode({ connectionStatus, setConnectionStatus }: OfflineModeProps) {
  const [localData, setLocalData] = useState({
    predictions: 47,
    labResults: 23,
    alerts: 2,
    lastSync: "2025-01-15 12:30"
  });
  
  const [csvData, setCsvData] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [syncProgress, setSyncProgress] = useState(0);

  const simulateSync = async () => {
    setConnectionStatus('syncing');
    setSyncProgress(0);
    
    // Simulate sync progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setSyncProgress(i);
    }
    
    setConnectionStatus('online');
    setLocalData({...localData, lastSync: new Date().toLocaleString()});
    setSyncProgress(0);
  };

  const toggleConnection = () => {
    if (connectionStatus === 'online') {
      setConnectionStatus('offline');
    } else if (connectionStatus === 'offline') {
      simulateSync();
    }
  };

  const processCsvData = () => {
    if (!csvData.trim()) return;
    
    // Simulate processing uploaded CSV data
    setUploadProgress(0);
    const processData = async () => {
      for (let i = 0; i <= 100; i += 20) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setUploadProgress(i);
      }
      
      // Update local data count
      const lines = csvData.split('\n').filter(line => line.trim()).length - 1; // Exclude header
      setLocalData({
        ...localData,
        predictions: localData.predictions + lines
      });
      
      setCsvData("");
      setUploadProgress(0);
    };
    
    processData();
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {connectionStatus === 'online' ? <Wifi className="h-5 w-5 text-green-500" /> : 
             connectionStatus === 'offline' ? <WifiOff className="h-5 w-5 text-red-500" /> :
             <RefreshCw className="h-5 w-5 text-yellow-500 animate-spin" />}
            <span>Connection Status</span>
          </CardTitle>
          <CardDescription>
            Current system connectivity and synchronization status
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">
                {connectionStatus === 'online' && "Connected to Central System"}
                {connectionStatus === 'offline' && "Operating in Offline Mode"}
                {connectionStatus === 'syncing' && "Synchronizing Data..."}
              </p>
              <p className="text-sm text-muted-foreground">
                Last sync: {localData.lastSync}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={connectionStatus === 'online' ? 'default' : connectionStatus === 'offline' ? 'destructive' : 'secondary'}>
                {connectionStatus.charAt(0).toUpperCase() + connectionStatus.slice(1)}
              </Badge>
              <Button onClick={toggleConnection} variant="outline" size="sm">
                {connectionStatus === 'offline' ? 'Connect' : 'Simulate Offline'}
              </Button>
            </div>
          </div>
          
          {connectionStatus === 'syncing' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Syncing data...</span>
                <span>{syncProgress}%</span>
              </div>
              <Progress value={syncProgress} />
            </div>
          )}

          {connectionStatus === 'offline' && (
            <Alert>
              <HardDrive className="h-4 w-4" />
              <AlertDescription>
                System is running offline. All predictions and data are stored locally. 
                Data will sync automatically when connection is restored.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="local-data" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="local-data">Local Data</TabsTrigger>
          <TabsTrigger value="csv-upload">CSV Upload</TabsTrigger>
          <TabsTrigger value="export">Export Data</TabsTrigger>
        </TabsList>

        <TabsContent value="local-data">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Stored Predictions</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{localData.predictions}</div>
                <p className="text-xs text-muted-foreground">
                  {connectionStatus === 'offline' ? 'Pending sync' : 'Synced'}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lab Results</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{localData.labResults}</div>
                <p className="text-xs text-muted-foreground">
                  {connectionStatus === 'offline' ? 'Pending sync' : 'Synced'}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{localData.alerts}</div>
                <p className="text-xs text-muted-foreground">
                  Require attention
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>System Capabilities</CardTitle>
              <CardDescription>
                What works in offline mode
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-green-600">Available Offline</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Resistance predictions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Local data storage</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>CSV data processing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>PDF report generation</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-orange-600">Requires Connection</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      <span>Real-time alerts</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      <span>Multi-facility analytics</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      <span>Model updates</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      <span>Zone-level monitoring</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="csv-upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload Lab Data</CardTitle>
              <CardDescription>
                Paste CSV data or upload file for batch processing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">CSV Data</label>
                <Textarea
                  placeholder="UMR,Pathogen,Specimen,Ward,Age,Gender&#10;UMR12345,E. coli,Urine,ICU,65,Male&#10;UMR12346,K. pneumoniae,Blood,Emergency,45,Female"
                  value={csvData}
                  onChange={(e) => setCsvData(e.target.value)}
                  rows={8}
                />
                <p className="text-xs text-muted-foreground">
                  Format: UMR,Pathogen,Specimen,Ward,Age,Gender (header row required)
                </p>
              </div>

              {uploadProgress > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Processing data...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}

              <div className="flex space-x-2">
                <Button onClick={processCsvData} disabled={!csvData.trim() || uploadProgress > 0}>
                  <Upload className="h-4 w-4 mr-2" />
                  Process Data
                </Button>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Upload File
                </Button>
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  In offline mode, processed data is stored locally and will sync when connection is restored.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
                <CardDescription>
                  Download data for external analysis or backup
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Predictions (CSV)
                </Button>
                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Lab Results (CSV)
                </Button>
                <Button className="w-full" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Summary Report (PDF)
                </Button>
                <Button className="w-full" variant="outline">
                  <Database className="h-4 w-4 mr-2" />
                  Full Data Backup (JSON)
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Summary</CardTitle>
                <CardDescription>
                  Overview of exportable data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Predictions:</span>
                    <span className="font-medium">{localData.predictions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Lab Results:</span>
                    <span className="font-medium">{localData.labResults}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Alert History:</span>
                    <span className="font-medium">156</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Date Range:</span>
                    <span className="font-medium">Last 30 days</span>
                  </div>
                </div>

                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    All data exports maintain patient privacy and comply with local data protection regulations.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}