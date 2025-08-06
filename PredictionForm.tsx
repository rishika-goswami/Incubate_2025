import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { Progress } from "./ui/progress";
import { Clock, AlertTriangle, CheckCircle, Target, FileText } from "lucide-react";

interface PredictionResult {
  antibiotic: string;
  resistance: 'High' | 'Medium' | 'Low';
  confidence: number;
  recommendation: string;
}

export function PredictionForm() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PredictionResult[] | null>(null);
  const [predictionTime, setPredictionTime] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    umr: "",
    pathogen: "",
    specimen: "",
    ward: "",
    age: "",
    gender: ""
  });

  const simulatePrediction = async () => {
    setLoading(true);
    const startTime = Date.now();
    
    // Simulate ML prediction delay (1-2 seconds)
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const endTime = Date.now();
    setPredictionTime(endTime - startTime);
    
    // Mock prediction results
    const mockResults: PredictionResult[] = [
      { antibiotic: "Ceftriaxone", resistance: "High", confidence: 92, recommendation: "Avoid - High resistance predicted" },
      { antibiotic: "Ciprofloxacin", resistance: "High", confidence: 88, recommendation: "Avoid - High resistance predicted" },
      { antibiotic: "Amikacin", resistance: "Low", confidence: 85, recommendation: "Good choice - Low resistance predicted" },
      { antibiotic: "Meropenem", resistance: "Medium", confidence: 76, recommendation: "Use with caution - Monitor closely" },
      { antibiotic: "Colistin", resistance: "Low", confidence: 91, recommendation: "Reserve for severe cases only" },
      { antibiotic: "Tigecycline", resistance: "Low", confidence: 79, recommendation: "Good alternative option" }
    ];
    
    setResults(mockResults);
    setLoading(false);
  };

  const getResistanceBadge = (resistance: string, confidence: number) => {
    const variant = resistance === 'High' ? 'destructive' : resistance === 'Medium' ? 'secondary' : 'default';
    return (
      <div className="flex items-center space-x-2">
        <Badge variant={variant}>{resistance} Risk</Badge>
        <span className="text-sm text-muted-foreground">{confidence}% confident</span>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Patient Information & Prediction</span>
          </CardTitle>
          <CardDescription>
            Enter patient details to get instant antibiotic resistance predictions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="umr">UMR/Patient ID</Label>
              <Input
                id="umr"
                placeholder="e.g., UMR12345"
                value={formData.umr}
                onChange={(e) => setFormData({...formData, umr: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ward">Ward/Department</Label>
              <Select value={formData.ward} onValueChange={(value) => setFormData({...formData, ward: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select ward" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="icu">ICU</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="medicine">General Medicine</SelectItem>
                  <SelectItem value="surgery">Surgery</SelectItem>
                  <SelectItem value="pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="orthopedics">Orthopedics</SelectItem>
                  <SelectItem value="urology">Urology</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pathogen">Suspected/Identified Pathogen</Label>
            <Select value={formData.pathogen} onValueChange={(value) => setFormData({...formData, pathogen: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select pathogen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ecoli">E. coli</SelectItem>
                <SelectItem value="klebsiella">Klebsiella pneumoniae</SelectItem>
                <SelectItem value="pseudomonas">Pseudomonas aeruginosa</SelectItem>
                <SelectItem value="acinetobacter">Acinetobacter baumannii</SelectItem>
                <SelectItem value="staph-aureus">Staphylococcus aureus</SelectItem>
                <SelectItem value="enterococcus">Enterococcus faecium</SelectItem>
                <SelectItem value="strep-pneumoniae">Streptococcus pneumoniae</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specimen">Specimen Type</Label>
            <Select value={formData.specimen} onValueChange={(value) => setFormData({...formData, specimen: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select specimen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blood">Blood</SelectItem>
                <SelectItem value="urine">Urine</SelectItem>
                <SelectItem value="sputum">Sputum</SelectItem>
                <SelectItem value="wound">Wound swab</SelectItem>
                <SelectItem value="csf">CSF</SelectItem>
                <SelectItem value="stool">Stool</SelectItem>
                <SelectItem value="catheter">Catheter tip</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="Years"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => setFormData({...formData, gender: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={simulatePrediction} 
            disabled={loading || !formData.pathogen || !formData.specimen || !formData.ward}
            className="w-full"
          >
            {loading ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Get Resistance Prediction"
            )}
          </Button>

          {predictionTime && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Prediction completed in {predictionTime}ms. Ready for clinical decision-making.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Resistance Predictions</span>
          </CardTitle>
          <CardDescription>
            ML-powered antibiotic recommendations based on local resistance patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!results ? (
            <div className="text-center py-8 text-muted-foreground">
              <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Enter patient information and click "Get Prediction" to see results</p>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{result.antibiotic}</h4>
                    {getResistanceBadge(result.resistance, result.confidence)}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Confidence:</span>
                      <Progress value={result.confidence} className="flex-1" />
                      <span className="text-sm">{result.confidence}%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{result.recommendation}</p>
                  </div>
                </div>
              ))}
              
              <Alert className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Clinical Note:</strong> These predictions are based on local resistance patterns. 
                  Always consider patient-specific factors and await culture results when possible.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}