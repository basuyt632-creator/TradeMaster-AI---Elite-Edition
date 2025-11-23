export interface TradingInputs {
  capital: number;
  currency: string;
  market: string;
  durationDays: number;
  experienceLevel: string;
  riskStyle: 'Conservative' | 'Balanced' | 'Aggressive';
  language: string;
  strategies: string[]; // Changed from single string to array for mixing
  reportDepth: 'Standard' | 'Deep' | 'GodMode'; // Page selection
}

export interface WeekPlan {
  weekNumber: number;
  focus: string;
  goal: string;
  rules: string[];
  microHabits: string[];
}

export interface ChartPoint {
  day: number;
  projectedBalance: number;
  worstCaseBalance: number;
  riskCap: number;
}

export interface GlossaryItem {
  term: string;
  definition: string;
}

export interface ChecklistItem {
  item: string;
  importance: 'High' | 'Medium';
}

export interface ResourceItem {
  title: string;
  type: 'Book' | 'Video' | 'Tool';
  description: string;
}

export interface PsychologyTopic {
  topic: string;
  content: string;
}

export interface TradingPlanData {
  title: string;
  executiveSummary: string;
  
  // Strategy Section
  strategyName: string;
  strategyDescription: string;
  strategyPhilosophy: string; 
  setupExplanation: string; 
  timeframe: string;
  bestSessions: string[];
  entryCriteria: string[];
  exitCriteria: string[];
  
  // Risk Section
  riskManagement: {
    maxRiskPerTradePercent: number;
    maxDailyLossPercent: number;
    maxOpenPositions: number;
    riskOfRuinProbability: string; 
    positionSizingRule: string;
    stopLossGuideline: string;
    drawdownRecoveryRule: string;
    riskOverview: string; 
  };

  allocationStats: {
    name: string;
    value: number;
  }[];

  // Psychology Section
  psychologyRules: string[];
  psychologyDetailed: PsychologyTopic[]; 

  // Execution
  preTradeChecklist: ChecklistItem[];
  postTradeRoutine: string[]; 
  weeklyRoadmap: WeekPlan[];
  
  // Financials
  equityCurveData: ChartPoint[];
  
  // Extras
  dailyRoutine: string[];
  contractTerms: string[];
  glossary: GlossaryItem[];
  recommendedResources: ResourceItem[];
  visualPatternsToLookFor: string[];
  winRateScenarios: { winRate: number; outcome: string }[];
}