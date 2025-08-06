import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { BarChart3, TrendingUp, Download, Calendar, MapPin, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

export function StewardshipAnalytics() {
  // Mock data for resistance trends
  const resistanceTrends = [
    { month: 'Jan', ecoli: 45, klebsiella: 65, pseudomonas: 78 },
    { month: 'Feb', ecoli: 48, klebsiella: 67, pseudomonas: 82 },
    { month: 'Mar', ecoli: 52, klebsiella: 71, pseudomonas: 85 },
    { month: 'Apr', ecoli: 49, klebsiella: 73, pseudomonas: 87 },
    { month: 'May', ecoli: 51, klebsiella: 69, pseudomonas: 84 },
    { month: 'Jun', ecoli: 54, klebsiella: 72, pseudomonas: 89 }
  ];

  const antibioticUsage = [
    { antibiotic: 'Ceftriaxone', usage: 85, resistance: 68 },
    { antibiotic: 'Ciprofloxacin', usage: 72, resistance: 74 },
    { antibiotic: 'Amikacin', usage: 45, resistance: 28 },
    { antibiotic: 'Meropenem', usage: 38, resistance: 45 },
    { antibiotic: 'Colistin', usage: 15, resistance: 12 }
  ];

  const wardData = [
    { name: 'ICU', value: 35, color: '#dc2626' },
    { name: 'Emergency', value: 28, color: '#ea580c' },
    { name: 'Medicine', value: 22, color: '#ca8a04' },
    { name: 'Surgery', value: 15, color: '#16a34a' }
  ];

  const antibiogram = [
    { pathogen: 'E. coli', amp: 15, cft: 32, cip: 68, ami: 72, mer: 88, col: 95 },
    { pathogen: 'K. pneumoniae', amp: 5, cft: 28, cip: 74, ami: 69, mer: 85, col: 92 },
    { pathogen: 'P. aeruginosa', amp: 0, cft: 12, cip: 45, ami: 78, mer: 65, col: 88 },
    { pathogen: 'A. baumannii', amp: 0, cft: 8, cip: 25, ami: 45, mer: 38, col: 82 }
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Resistance Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">64.2%</div>
            <p className="text-xs text-muted-foreground">+2.3% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Samples Analyzed</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Pathogens</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">WHO priority list detected</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="trends">Resistance Trends</TabsTrigger>
            <TabsTrigger value="antibiogram">Antibiogram</TabsTrigger>
            <TabsTrigger value="usage">Usage Analysis</TabsTrigger>
            <TabsTrigger value="distribution">Ward Distribution</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2">
            <Select defaultValue="6months">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">1 Month</SelectItem>
                <SelectItem value="3months">3 Months</SelectItem>
                <SelectItem value="6months">6 Months</SelectItem>
                <SelectItem value="1year">1 Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Resistance Trends by Pathogen</CardTitle>
              <CardDescription>
                Monthly resistance rates for priority pathogens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={resistanceTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: 'Resistance %', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="ecoli" stroke="#dc2626" strokeWidth={2} name="E. coli" />
                  <Line type="monotone" dataKey="klebsiella" stroke="#ea580c" strokeWidth={2} name="K. pneumoniae" />
                  <Line type="monotone" dataKey="pseudomonas" stroke="#ca8a04" strokeWidth={2} name="P. aeruginosa" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="antibiogram">
          <Card>
            <CardHeader>
              <CardTitle>Local Antibiogram</CardTitle>
              <CardDescription>
                Sensitivity percentages for key pathogen-antibiotic combinations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Pathogen</th>
                      <th className="text-center p-2">AMP</th>
                      <th className="text-center p-2">CFT</th>
                      <th className="text-center p-2">CIP</th>
                      <th className="text-center p-2">AMI</th>
                      <th className="text-center p-2">MER</th>
                      <th className="text-center p-2">COL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {antibiogram.map((row, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2 font-medium">{row.pathogen}</td>
                        <td className="text-center p-2">
                          <Badge variant={row.amp > 70 ? 'default' : row.amp > 40 ? 'secondary' : 'destructive'}>
                            {row.amp}%
                          </Badge>
                        </td>
                        <td className="text-center p-2">
                          <Badge variant={row.cft > 70 ? 'default' : row.cft > 40 ? 'secondary' : 'destructive'}>
                            {row.cft}%
                          </Badge>
                        </td>
                        <td className="text-center p-2">
                          <Badge variant={row.cip > 70 ? 'default' : row.cip > 40 ? 'secondary' : 'destructive'}>
                            {row.cip}%
                          </Badge>
                        </td>
                        <td className="text-center p-2">
                          <Badge variant={row.ami > 70 ? 'default' : row.ami > 40 ? 'secondary' : 'destructive'}>
                            {row.ami}%
                          </Badge>
                        </td>
                        <td className="text-center p-2">
                          <Badge variant={row.mer > 70 ? 'default' : row.mer > 40 ? 'secondary' : 'destructive'}>
                            {row.mer}%
                          </Badge>
                        </td>
                        <td className="text-center p-2">
                          <Badge variant={row.col > 70 ? 'default' : row.col > 40 ? 'secondary' : 'destructive'}>
                            {row.col}%
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                AMP: Ampicillin, CFT: Ceftriaxone, CIP: Ciprofloxacin, AMI: Amikacin, MER: Meropenem, COL: Colistin
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage">
          <Card>
            <CardHeader>
              <CardTitle>Antibiotic Usage vs Resistance</CardTitle>
              <CardDescription>
                Correlation between usage frequency and resistance rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={antibioticUsage}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="antibiotic" />
                  <YAxis label={{ value: 'Percentage', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar dataKey="usage" fill="#3b82f6" name="Usage %" />
                  <Bar dataKey="resistance" fill="#dc2626" name="Resistance %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Resistance by Ward</CardTitle>
                <CardDescription>
                  Distribution of resistant cases across departments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={wardData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {wardData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Priority Actions</CardTitle>
                <CardDescription>
                  Recommended stewardship interventions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-destructive pl-4">
                  <h4 className="font-medium text-destructive">Urgent</h4>
                  <p className="text-sm text-muted-foreground">
                    Review ICU carbapenem use - 45% resistance rate detected
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-medium text-orange-500">High Priority</h4>
                  <p className="text-sm text-muted-foreground">
                    Implement fluoroquinolone restrictions in Emergency ward
                  </p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-medium text-yellow-500">Medium Priority</h4>
                  <p className="text-sm text-muted-foreground">
                    Update empirical therapy guidelines for UTI management
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-medium text-green-500">Low Priority</h4>
                  <p className="text-sm text-muted-foreground">
                    Continue current amikacin stewardship protocols
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}