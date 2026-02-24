export interface ClauseAnalysis {
  clauseNumber: string;
  title: string;
  originalText: string;
  explanation: string;
  riskLevel: "low" | "medium" | "high" | "critical";
  concern: string | null;
}

export interface AnalysisResult {
  summary: string;
  riskScore: number;
  clauseAnalysis: ClauseAnalysis[];
  recommendations: string[];
  redFlags: string[];
  actionChecklist: string[];
}
