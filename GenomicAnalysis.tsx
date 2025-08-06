import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Upload, 
  Search, 
  TestTubes, 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  Bot,
  Download,
  RefreshCw
} from "lucide-react";

interface BlastResult {
  targetId: string;
  identity: number;
  numMatches: number;
  numMismatches: number;
  numGaps: number;
  geneName: string;
  antibioticClass: string;
  mechanism: string;
  phenotype: string;
}

export function GenomicAnalysis() {
  const [organism, setOrganism] = useState("");
  const [fastaSequence, setFastaSequence] = useState("");
  const [blastResults, setBlastResults] = useState<BlastResult[] | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiInterpretation, setAiInterpretation] = useState("");
  const [isGeneratingInterpretation, setIsGeneratingInterpretation] = useState(false);

  // Mock BLAST results
  const mockBlastResults: BlastResult[] = [
    {
      targetId: "ARO:3000026",
      identity: 99.2,
      numMatches: 248,
      numMismatches: 2,
      numGaps: 0,
      geneName: "blaCTX-M-15",
      antibioticClass: "beta-lactam",
      mechanism: "antibiotic inactivation",
      phenotype: "ceftriaxone resistance, cefotaxime resistance"
    },
    {
      targetId: "ARO:3000027",
      identity: 95.8,
      numMatches: 191,
      numMismatches: 8,
      numGaps: 1,
      geneName: "aac(6')-Ib-cr",
      antibioticClass: "aminoglycoside, fluoroquinolone",
      mechanism: "antibiotic inactivation",
      phenotype: "amikacin resistance, ciprofloxacin resistance"
    },
    {
      targetId: "ARO:3001234",
      identity: 97.5,
      numMatches: 156,
      numMismatches: 4,
      numGaps: 0,
      geneName: "qnrS1",
      antibioticClass: "fluoroquinolone",
      mechanism: "antibiotic target protection",
      phenotype: "ciprofloxacin resistance, levofloxacin resistance"
    }
  ];

  const simulateBlast = async () => {
    if (!fastaSequence.trim() || !organism.trim()) return;
    
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setBlastResults(null);
    setAiInterpretation("");
    
    // Simulate BLAST processing
    for (let i = 0; i <= 100; i += 20) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setAnalysisProgress(i);
    }
    
    setBlastResults(mockBlastResults);
    setIsAnalyzing(false);
    setAnalysisProgress(0);
  };

  const generateAiInterpretation = async () => {
    if (!blastResults) return;
    
    setIsGeneratingInterpretation(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockInterpretation = `
**Antimicrobial Resistance Analysis for ${organism}**

**Identified Resistance Genes:**

**1. Beta-lactam Resistance:**
- **blaCTX-M-15** (99.2% identity): This gene encodes an extended-spectrum beta-lactamase (ESBL) that confers resistance to ceftriaxone, cefotaxime, and other third-generation cephalosporins. This is a high-confidence match indicating significant resistance to beta-lactam antibiotics.

**2. Aminoglycoside and Fluoroquinolone Resistance:**
- **aac(6')-Ib-cr** (95.8% identity): This bifunctional enzyme provides resistance to both aminoglycosides (particularly amikacin) and fluoroquinolones (ciprofloxacin). The good identity match suggests clinically relevant resistance.

**3. Fluoroquinolone Resistance:**
- **qnrS1** (97.5% identity): This plasmid-mediated quinolone resistance gene provides protection against fluoroquinolones through target protection mechanism.

**Clinical Implications:**
Based on the detected resistance genes, this ${organism} isolate shows multi-drug resistance patterns. The organism is predicted to be resistant to:
- Third-generation cephalosporins (ceftriaxone, cefotaxime)
- Fluoroquinolones (ciprofloxacin, levofloxacin)
- Aminoglycosides (amikacin)

**Recommended Alternative Antibiotics:**
Given the resistance profile, consider the following alternatives:
- **Carbapenems** (meropenem, imipenem) - First-line choice for ESBL-producing organisms
- **Colistin** - Reserve for carbapenem-resistant cases
- **Tigecycline** - Alternative for multi-drug resistant organisms
- **Fosfomycin** - Particularly for urinary tract infections
- **Nitrofurantoin** - For uncomplicated urinary tract infections (if isolate is from urine)

**Important Notes:**
- These predictions are based on genotypic analysis and should be confirmed with phenotypic susceptibility testing
- Consider local resistance patterns and patient-specific factors when selecting therapy
- Implement strict infection control measures due to the multi-drug resistant nature of this isolate
    `;
    
    setAiInterpretation(mockInterpretation);
    setIsGeneratingInterpretation(false);
  };

  const getIdentityBadge = (identity: number) => {
    if (identity >= 95) return <Badge variant="default">High Confidence</Badge>;
    if (identity >= 90) return <Badge variant="secondary">Medium Confidence</Badge>;
    return <Badge variant="destructive">Low Confidence</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TestTubes className="h-5 w-5" />
            <span>PATHFINDER Genomic Analysis Tool</span>
          </CardTitle>
          <CardDescription>
            BLAST-based antimicrobial resistance gene detection and AI-powered clinical interpretation
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="upload" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Sequence Upload</TabsTrigger>
          <TabsTrigger value="results">BLAST Results</TabsTrigger>
          <TabsTrigger value="interpretation">AI Interpretation</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload Genomic Sequence</CardTitle>
              <CardDescription>
                Provide organism information and FASTA sequence for AMR gene analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="organism">Organism Name</Label>
                <Input
                  id="organism"
                  placeholder="e.g., Escherichia coli, Klebsiella pneumoniae"
                  value={organism}
                  onChange={(e) => setOrganism(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fasta">FASTA Sequence</Label>
                <Textarea
                  id="fasta"
                  placeholder={`>sequence_1
ATGAAAAAACAATTTGCGCTGGCGGCAGTGAATGGGGAAGAAAATAACAGAAACACTATTCCTTACAGTAAAT
TCAATGCCTTTTTCCGCTTTACCAGGGATTTACTGCGTTATCCTGTTCGGTCTGATGGAATTGATGGGCAAT
GGCAAATACCTAGATGCTTACCAAGATAACCTGAAAGAGGATCACGGGCTGTCTGGGCATTTGCTGGGGATG`}
                  rows={8}
                  value={fastaSequence}
                  onChange={(e) => setFastaSequence(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Paste your nucleotide sequence in FASTA format. Include the header line starting with "&gt;"
                </p>
              </div>

              {isAnalyzing && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Running BLAST analysis...</span>
                    <span>{analysisProgress}%</span>
                  </div>
                  <Progress value={analysisProgress} />
                </div>
              )}

              <div className="flex space-x-2">
                <Button 
                  onClick={simulateBlast} 
                  disabled={!organism.trim() || !fastaSequence.trim() || isAnalyzing}
                  className="flex-1"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Run BLAST Analysis
                    </>
                  )}
                </Button>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload File
                </Button>
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  This tool compares your sequence against a curated database of known AMR genes. 
                  Results should be confirmed with phenotypic testing.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>BLAST Results</span>
                {blastResults && (
                  <Badge variant="outline">
                    {blastResults.length} genes detected
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                Antimicrobial resistance genes detected in {organism || "uploaded sequence"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!blastResults ? (
                <div className="text-center py-8 text-muted-foreground">
                  <TestTubes className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Upload a sequence and run BLAST analysis to see results</p>
                </div>
              ) : blastResults.length === 0 ? (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    No antimicrobial resistance genes detected in the analyzed sequence.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-4">
                  {blastResults.map((result, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-lg">{result.geneName}</h4>
                          <p className="text-sm text-muted-foreground">Target ID: {result.targetId}</p>
                        </div>
                        {getIdentityBadge(result.identity)}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Identity:</span>
                          <p className="font-medium">{result.identity}%</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Matches:</span>
                          <p className="font-medium">{result.numMatches}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Mismatches:</span>
                          <p className="font-medium">{result.numMismatches}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Gaps:</span>
                          <p className="font-medium">{result.numGaps}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <span className="text-sm text-muted-foreground">Antibiotic Class:</span>
                          <p className="font-medium">{result.antibioticClass}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Resistance Mechanism:</span>
                          <p className="font-medium">{result.mechanism}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Predicted Phenotype:</span>
                          <p className="font-medium">{result.phenotype}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex space-x-2 pt-4">
                    <Button onClick={generateAiInterpretation} disabled={isGeneratingInterpretation}>
                      <Bot className="h-4 w-4 mr-2" />
                      Generate AI Interpretation
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export Results
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interpretation">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <span>AI-Powered Clinical Interpretation</span>
              </CardTitle>
              <CardDescription>
                Comprehensive analysis and clinical recommendations based on detected AMR genes
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isGeneratingInterpretation ? (
                <div className="text-center py-8">
                  <RefreshCw className="h-8 w-8 mx-auto mb-4 animate-spin text-muted-foreground" />
                  <p className="text-muted-foreground">Generating AI interpretation...</p>
                </div>
              ) : !aiInterpretation ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Run BLAST analysis first, then generate AI interpretation</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-line">{aiInterpretation}</div>
                  </div>
                  
                  <Alert className="mt-6">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Disclaimer:</strong> This AI interpretation is for research and educational purposes. 
                      Always consult with clinical professionals and perform phenotypic testing for patient care decisions.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="flex space-x-2 pt-4">
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Save to Cases
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}