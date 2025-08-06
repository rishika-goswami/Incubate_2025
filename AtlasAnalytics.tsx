import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Download, Globe, TrendingUp, BarChart3, Map, Activity } from "lucide-react";

export function AtlasAnalytics() {
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedSpecies, setSelectedSpecies] = useState("E. coli");
  const [selectedAntibiotic, setSelectedAntibiotic] = useState("Ciprofloxacin");
  const [selectedYear, setSelectedYear] = useState([2021]);
  const [selectedCountries, setSelectedCountries] = useState(["India", "China", "USA", "Brazil"]);

  // Mock data for various visualizations
  const statusData = [
    { status: 'Sensitive', count: 245, concentration: '≤0.5' },
    { status: 'Intermediate', count: 56, concentration: '1-2' },
    { status: 'Resistant', count: 189, concentration: '>4' }
  ];

  const micDistribution = [
    { concentration: '≤0.5', sensitive: 180, intermediate: 12, resistant: 8 },
    { concentration: '1', sensitive: 45, intermediate: 25, resistant: 15 },
    { concentration: '2', sensitive: 20, intermediate: 19, resistant: 31 },
    { concentration: '4', sensitive: 5, intermediate: 8, resistant: 42 },
    { concentration: '>4', sensitive: 2, intermediate: 3, resistant: 93 }
  ];

  const resistanceTrends = [
    { year: 2018, resistance: 52 },
    { year: 2019, resistance: 58 },
    { year: 2020, resistance: 61 },
    { year: 2021, resistance: 67 },
    { year: 2022, resistance: 72 },
    { year: 2023, resistance: 74 }
  ];

  const comparativeData = [
    { group: 'Penicillins', India: 78, China: 65, USA: 45, Brazil: 82 },
    { group: 'Cephalosporins', India: 67, China: 58, USA: 38, Brazil: 71 },
    { group: 'Fluoroquinolones', India: 74, China: 69, USA: 42, Brazil: 76 },
    { group: 'Carbapenems', India: 45, China: 38, USA: 18, Brazil: 52 },
    { group: 'Aminoglycosides', India: 52, China: 45, USA: 28, Brazil: 58 }
  ];

  const worldMapData = [
    { country: 'India', resistance: 74, isolates: 2847 },
    { country: 'China', resistance: 69, isolates: 3241 },
    { country: 'USA', resistance: 42, isolates: 1956 },
    { country: 'Brazil', resistance: 76, isolates: 1523 },
    { country: 'Nigeria', resistance: 81, isolates: 892 },
    { country: 'Germany', resistance: 35, isolates: 1245 }
  ];

  const antibioticGroups = {
    'Amikacin': 'Aminoglycosides',
    'Cefepime': 'Cephalosporins',
    'Ceftazidime': 'Cephalosporins',
    'Levofloxacin': 'Fluoroquinolones',
    'Meropenem': 'Carbapenems',
    'Piperacillin tazobactam': 'Penicillins',
    'Ceftriaxone': 'Cephalosporins',
    'Ciprofloxacin': 'Fluoroquinolones',
    'Colistin': 'Colistin',
    'Gentamicin': 'Aminoglycosides'
  };

  const countries = ['India', 'China', 'USA', 'Brazil', 'Nigeria', 'Germany', 'France', 'Japan', 'UK', 'Australia'];
  const species = ['E. coli', 'K. pneumoniae', 'P. aeruginosa', 'A. baumannii', 'S. aureus', 'E. faecium'];
  const antibiotics = Object.keys(antibioticGroups);

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>ATLAS Global AMR Analytics</span>
          </CardTitle>
          <CardDescription>
            Comprehensive analysis of global antimicrobial resistance patterns from ATLAS surveillance data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Country</label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countries.map(country => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Species</label>
              <Select value={selectedSpecies} onValueChange={setSelectedSpecies}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {species.map(spec => (
                    <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Antibiotic</label>
              <Select value={selectedAntibiotic} onValueChange={setSelectedAntibiotic}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {antibiotics.map(antibiotic => (
                    <SelectItem key={antibiotic} value={antibiotic}>{antibiotic}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Year: {selectedYear[0]}</label>
              <Slider
                value={selectedYear}
                onValueChange={setSelectedYear}
                min={2004}
                max={2023}
                step={1}
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="distribution" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="distribution">AMR Distribution</TabsTrigger>
          <TabsTrigger value="trends">Temporal Trends</TabsTrigger>
          <TabsTrigger value="comparative">Comparative Analysis</TabsTrigger>
          <TabsTrigger value="geographic">Geographic Patterns</TabsTrigger>
        </TabsList>

        <TabsContent value="distribution">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Susceptibility Status</span>
                  <Badge variant="outline">{selectedSpecies} vs {selectedAntibiotic}</Badge>
                </CardTitle>
                <CardDescription>
                  Distribution of resistance, intermediate, and sensitive isolates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={statusData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="status" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>MIC Distribution</CardTitle>
                <CardDescription>
                  Minimum Inhibitory Concentration patterns by resistance status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={micDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="concentration" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sensitive" stackId="a" fill="#22c55e" name="Sensitive" />
                    <Bar dataKey="intermediate" stackId="a" fill="#eab308" name="Intermediate" />
                    <Bar dataKey="resistant" stackId="a" fill="#dc2626" name="Resistant" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>AMR Percentage Trends</span>
              </CardTitle>
              <CardDescription>
                Temporal evolution of resistance rates for {selectedSpecies} against {selectedAntibiotic} in {selectedCountry}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={resistanceTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis label={{ value: 'Resistance %', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="resistance" 
                    stroke="#dc2626" 
                    strokeWidth={3}
                    dot={{ fill: '#dc2626', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              
              <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm text-orange-800">
                  <strong>Trend Analysis:</strong> Resistance to {selectedAntibiotic} in {selectedSpecies} has increased by 
                  {' '}{((resistanceTrends[resistanceTrends.length - 1].resistance - resistanceTrends[0].resistance) / resistanceTrends[0].resistance * 100).toFixed(1)}% 
                  over the past {resistanceTrends.length} years, indicating a concerning upward trend.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparative">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Comparative Antibiotic Class Analysis</span>
              </CardTitle>
              <CardDescription>
                Resistance rates across different antibiotic classes and countries for {selectedSpecies}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={comparativeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="group" />
                  <YAxis label={{ value: 'Resistance %', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar dataKey="India" fill="#dc2626" name="India" />
                  <Bar dataKey="China" fill="#ea580c" name="China" />
                  <Bar dataKey="USA" fill="#3b82f6" name="USA" />
                  <Bar dataKey="Brazil" fill="#16a34a" name="Brazil" />
                </BarChart>
              </ResponsiveContainer>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Key Insights</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Carbapenem resistance remains lowest across all countries</li>
                    <li>• Fluoroquinolone resistance shows highest rates in most regions</li>
                    <li>• USA demonstrates consistently lower resistance rates</li>
                    <li>• Brazil and India show similar high-resistance patterns</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Recommendations</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Prioritize carbapenem stewardship programs</li>
                    <li>• Implement fluoroquinolone restrictions</li>
                    <li>• Enhance surveillance in high-burden countries</li>
                    <li>• Share best practices from low-resistance regions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geographic">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Map className="h-5 w-5" />
                  <span>Global Resistance Patterns</span>
                </CardTitle>
                <CardDescription>
                  Resistance rates for {selectedSpecies} against {selectedAntibiotic} by country ({selectedYear[0]})
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {worldMapData.map((country, index) => (
                    <div key={country.country} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          country.resistance > 70 ? 'bg-red-500' :
                          country.resistance > 50 ? 'bg-orange-500' :
                          country.resistance > 30 ? 'bg-yellow-500' : 'bg-green-500'
                        }`} />
                        <span className="font-medium">{country.country}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{country.resistance}% resistant</p>
                        <p className="text-sm text-muted-foreground">{country.isolates} isolates</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resistance Distribution</CardTitle>
                <CardDescription>
                  Global resistance rate categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Low (≤30%)', value: 1, color: '#22c55e' },
                        { name: 'Medium (31-50%)', value: 1, color: '#eab308' },
                        { name: 'High (51-70%)', value: 2, color: '#ea580c' },
                        { name: 'Critical (>70%)', value: 2, color: '#dc2626' }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {[
                        { name: 'Low (≤30%)', value: 1, color: '#22c55e' },
                        { name: 'Medium (31-50%)', value: 1, color: '#eab308' },
                        { name: 'High (51-70%)', value: 2, color: '#ea580c' },
                        { name: 'Critical (>70%)', value: 2, color: '#dc2626' }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Countries monitored:</span>
                    <span className="font-medium">{worldMapData.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Total isolates:</span>
                    <span className="font-medium">{worldMapData.reduce((sum, country) => sum + country.isolates, 0).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Average resistance:</span>
                    <span className="font-medium">
                      {(worldMapData.reduce((sum, country) => sum + country.resistance, 0) / worldMapData.length).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Export Options */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Data Export</h3>
              <p className="text-sm text-muted-foreground">Download analysis results for further research</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Charts
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Data (CSV)
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}