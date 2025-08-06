import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Shield, 
  Globe, 
  TestTubes, 
  Activity, 
  BarChart3, 
  AlertTriangle, 
  Database,
  Zap,
  Target,
  Brain,
  Network
} from "lucide-react";

export function Welcome() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Shield className="h-12 w-12 text-primary" />
          <h1 className="text-4xl font-bold">KAVACH</h1>
        </div>
        <h2 className="text-2xl text-muted-foreground">
          Predictive Analysis of AMR Trends For Healthcare Decision Making And Forecasting
        </h2>
        <p className="text-lg max-w-3xl mx-auto">
          A comprehensive, AI-powered antimicrobial resistance surveillance and decision support system 
          designed to combat the global AMR crisis through real-time intelligence and genomic analysis.
        </p>
      </div>

      {/* What is KAVACH */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">What is KAVACH?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            KAVACH is a comprehensive two-tiered interactive platform that addresses India's critical need for 
            scalable, integrated AMR surveillance. The system combines real-time resistance prediction with 
            historical pattern analysis, providing healthcare providers with both immediate clinical decision 
            support and long-term epidemiological insights.
          </p>
          <p>
            By integrating machine learning-powered predictions, global surveillance data from ATLAS, and 
            genomic analysis capabilities, KAVACH transforms raw antimicrobial resistance data into 
            actionable intelligence for healthcare decision-making at multiple levels - from individual 
            patient care to national health policy.
          </p>
        </CardContent>
      </Card>

      {/* Key Capabilities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-blue-500" />
              <span>Real-Time Prediction Engine</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Instant resistance predictions using Random Forest ML models trained on local resistance patterns.
            </p>
            <ul className="text-sm space-y-1">
              <li>• Sub-2-second prediction delivery</li>
              <li>• 94.7% accuracy on local validation</li>
              <li>• Works completely offline when needed</li>
              <li>• Confidence scoring for clinical safety</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-green-500" />
              <span>Global Surveillance Analytics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Comprehensive analysis of global AMR patterns using ATLAS surveillance data.
            </p>
            <ul className="text-sm space-y-1">
              <li>• 45 countries, 2004-2023 data coverage</li>
              <li>• Interactive spatiotemporal visualizations</li>
              <li>• Comparative resistance trend analysis</li>
              <li>• Real-time pattern recognition</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TestTubes className="h-5 w-5 text-purple-500" />
              <span>Genomic Decision Support</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              BLAST-based AMR gene detection with AI-powered clinical interpretation.
            </p>
            <ul className="text-sm space-y-1">
              <li>• Curated AMR gene database analysis</li>
              <li>• Resistance mechanism identification</li>
              <li>• AI-generated clinical recommendations</li>
              <li>• Alternative therapy suggestions</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span>Multi-Level Alert System</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Intelligent outbreak detection and automated alerting across patient, ward, and zone levels.
            </p>
            <ul className="text-sm space-y-1">
              <li>• Patient-level risk notifications</li>
              <li>• Ward-level threshold monitoring</li>
              <li>• Zone-level outbreak detection</li>
              <li>• Multi-channel alert delivery</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* System Architecture */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">KAVACH's Comprehensive Functionality</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-blue-500" />
                <h3 className="font-medium">Bedside Decision Support</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Instant resistance predictions for clinicians at the point of care, reducing inappropriate 
                antibiotic use and improving patient outcomes through data-driven therapy selection.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-green-500" />
                <h3 className="font-medium">Intelligent Stewardship</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Automated antibiogram generation, usage analytics, and evidence-based policy recommendations 
                to optimize antimicrobial stewardship programs across healthcare facilities.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Network className="h-5 w-5 text-purple-500" />
                <h3 className="font-medium">Scalable Infrastructure</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Built for India's diverse healthcare ecosystem - from primary care clinics to tertiary 
                hospitals - with offline capability for resource-constrained settings.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Problem Statement */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="text-2xl text-orange-800">Addressing India's AMR Crisis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-orange-800">
          <p>
            India faces a critical antimicrobial resistance crisis characterized by fragmented surveillance, 
            data silos, and limited real-time intelligence. KAVACH directly addresses these challenges by:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Current Challenges:</h4>
              <ul className="text-sm space-y-1">
                <li>• Isolated surveillance in tertiary centers only</li>
                <li>• No standardized national data platform</li>
                <li>• Limited analytical capacity for trend detection</li>
                <li>• Exclusion of primary care facilities</li>
                <li>• Delayed resistance pattern recognition</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">KAVACH Solutions:</h4>
              <ul className="text-sm space-y-1">
                <li>• Scalable surveillance across all care levels</li>
                <li>• Integrated national coordination platform</li>
                <li>• AI-powered predictive analytics</li>
                <li>• Offline capability for resource-limited settings</li>
                <li>• Real-time outbreak detection and response</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Activity className="h-8 w-8 mx-auto mb-3 text-blue-500" />
            <h3 className="font-medium mb-2">Real-Time Predictions</h3>
            <p className="text-sm text-muted-foreground">
              Instant resistance predictions for clinical decision-making
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <BarChart3 className="h-8 w-8 mx-auto mb-3 text-green-500" />
            <h3 className="font-medium mb-2">Analytics Dashboard</h3>
            <p className="text-sm text-muted-foreground">
              Comprehensive resistance pattern visualization and trends
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <Globe className="h-8 w-8 mx-auto mb-3 text-purple-500" />
            <h3 className="font-medium mb-2">Global Intelligence</h3>
            <p className="text-sm text-muted-foreground">
              ATLAS surveillance data for global context and benchmarking
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <TestTubes className="h-8 w-8 mx-auto mb-3 text-orange-500" />
            <h3 className="font-medium mb-2">Genomic Analysis</h3>
            <p className="text-sm text-muted-foreground">
              BLAST-based AMR gene detection and interpretation
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <AlertTriangle className="h-8 w-8 mx-auto mb-3 text-red-500" />
            <h3 className="font-medium mb-2">Smart Alerts</h3>
            <p className="text-sm text-muted-foreground">
              Multi-level outbreak detection and automated notifications
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <Database className="h-8 w-8 mx-auto mb-3 text-gray-500" />
            <h3 className="font-medium mb-2">Offline Capability</h3>
            <p className="text-sm text-muted-foreground">
              Full functionality without internet connectivity
            </p>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <Card className="text-center">
        <CardContent className="pt-6 space-y-4">
          <h3 className="text-xl font-medium">Ready to Transform AMR Surveillance?</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join the next generation of antimicrobial resistance monitoring. KAVACH provides the tools 
            and intelligence needed to make informed decisions and combat the AMR crisis effectively.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button size="lg">
              <Activity className="h-4 w-4 mr-2" />
              Start Prediction Analysis
            </Button>
            <Button variant="outline" size="lg">
              <TestTubes className="h-4 w-4 mr-2" />
              Genomic Analysis
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}