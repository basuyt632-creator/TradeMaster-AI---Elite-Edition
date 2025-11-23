import { GoogleGenAI, Type, Schema } from "@google/genai";
import { TradingInputs, TradingPlanData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    executiveSummary: { type: Type.STRING },
    strategyName: { type: Type.STRING },
    strategyDescription: { type: Type.STRING },
    strategyPhilosophy: { type: Type.STRING },
    setupExplanation: { type: Type.STRING },
    timeframe: { type: Type.STRING },
    bestSessions: { type: Type.ARRAY, items: { type: Type.STRING } },
    entryCriteria: { type: Type.ARRAY, items: { type: Type.STRING } },
    exitCriteria: { type: Type.ARRAY, items: { type: Type.STRING } },
    riskManagement: {
      type: Type.OBJECT,
      properties: {
        maxRiskPerTradePercent: { type: Type.NUMBER },
        maxDailyLossPercent: { type: Type.NUMBER },
        maxOpenPositions: { type: Type.NUMBER },
        riskOfRuinProbability: { type: Type.STRING },
        positionSizingRule: { type: Type.STRING },
        stopLossGuideline: { type: Type.STRING },
        drawdownRecoveryRule: { type: Type.STRING },
        riskOverview: { type: Type.STRING }
      },
      required: ["maxRiskPerTradePercent", "maxDailyLossPercent", "maxOpenPositions", "riskOfRuinProbability", "positionSizingRule", "stopLossGuideline", "drawdownRecoveryRule", "riskOverview"]
    },
    allocationStats: {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                name: { type: Type.STRING },
                value: { type: Type.NUMBER }
            },
            required: ["name", "value"]
        }
    },
    psychologyRules: { type: Type.ARRAY, items: { type: Type.STRING } },
    psychologyDetailed: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          topic: { type: Type.STRING },
          content: { type: Type.STRING }
        },
        required: ["topic", "content"]
      }
    },
    preTradeChecklist: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          item: { type: Type.STRING },
          importance: { type: Type.STRING, enum: ["High", "Medium"] }
        },
        required: ["item", "importance"]
      }
    },
    postTradeRoutine: { type: Type.ARRAY, items: { type: Type.STRING } },
    weeklyRoadmap: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          weekNumber: { type: Type.INTEGER },
          focus: { type: Type.STRING },
          goal: { type: Type.STRING },
          rules: { type: Type.ARRAY, items: { type: Type.STRING } },
          microHabits: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["weekNumber", "focus", "goal", "rules", "microHabits"]
      }
    },
    equityCurveData: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.INTEGER },
          projectedBalance: { type: Type.NUMBER },
          worstCaseBalance: { type: Type.NUMBER },
          riskCap: { type: Type.NUMBER }
        },
        required: ["day", "projectedBalance", "worstCaseBalance", "riskCap"]
      }
    },
    dailyRoutine: { type: Type.ARRAY, items: { type: Type.STRING } },
    contractTerms: { type: Type.ARRAY, items: { type: Type.STRING } },
    glossary: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          term: { type: Type.STRING },
          definition: { type: Type.STRING }
        },
        required: ["term", "definition"]
      }
    },
    recommendedResources: {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING },
                type: { type: Type.STRING, enum: ["Book", "Video", "Tool"] },
                description: { type: Type.STRING }
            },
            required: ["title", "type", "description"]
        }
    },
    visualPatternsToLookFor: { type: Type.ARRAY, items: { type: Type.STRING } },
    winRateScenarios: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          winRate: { type: Type.NUMBER },
          outcome: { type: Type.STRING }
        },
        required: ["winRate", "outcome"]
      }
    }
  },
  required: ["title", "executiveSummary", "strategyName", "strategyDescription", "strategyPhilosophy", "setupExplanation", "timeframe", "bestSessions", "entryCriteria", "exitCriteria", "riskManagement", "allocationStats", "psychologyRules", "psychologyDetailed", "preTradeChecklist", "postTradeRoutine", "weeklyRoadmap", "equityCurveData", "dailyRoutine", "contractTerms", "glossary", "recommendedResources", "visualPatternsToLookFor", "winRateScenarios"]
};

export const generateTradingPlan = async (inputs: TradingInputs): Promise<TradingPlanData> => {
  // Logic to adjust prompt depth based on user selection
  let depthInstruction = "";
  if (inputs.reportDepth === 'Standard') {
    depthInstruction = "Provide a concise professional plan (approx 10 pages content). Focus on core mechanics.";
  } else if (inputs.reportDepth === 'Deep') {
    depthInstruction = "Provide a deep-dive analysis (approx 20 pages content). Include nuances, caveats, and detailed psychology.";
  } else {
    depthInstruction = "GOD MODE: Provide extreme detail (30+ pages content). Cover every possible edge case, advanced institutional concepts, and exhaustive risk modeling. This must be the ultimate trading bible.";
  }

  // Logic to synthesize multiple strategies
  const strategiesList = inputs.strategies.join(', ');
  const strategyInstruction = inputs.strategies.length > 1 
    ? `**CRITICAL - HYBRID STRATEGY SYNTHESIS**: The user wants to combine these methodologies: [${strategiesList}]. DO NOT treat them separately. You must INVENT a specific system that uses the strengths of each (e.g., Use ${inputs.strategies[0]} for direction bias, and ${inputs.strategies[1]} for entry triggers). Create a unified, conflict-free algorithm.`
    : `Strategy Focus: ${strategiesList}.`;

  const prompt = `
    Act as a World-Class Hedge Fund Manager, Quantitative Risk Analyst, and Elite Trading Psychologist.
    Create a "Master Level", Institutional-Grade Trading Bible.

    **LANGUAGE INSTRUCTION: GENERATE EVERYTHING IN ${inputs.language}.**
    
    User Profile:
    - Capital: ${inputs.currency} ${inputs.capital}
    - Market: ${inputs.market}
    - Experience: ${inputs.experienceLevel}
    - Risk Style: ${inputs.riskStyle}
    - Report Depth: ${inputs.reportDepth} (${depthInstruction})

    ${strategyInstruction}

    REQUIREMENTS:
    1. **Workable Strategy (High Accuracy)**: 
       - Define the "Philosophy" (Why it works).
       - Define the "Setup" (Visual description).
       - **Entry Criteria**: Must be Step-by-Step (e.g., 1. Wait for liquidity sweep, 2. MSS, 3. Entry on FVG).
       - **Exit Criteria**: Precise invalidation points.
    2. **Math & Risk**:
       - Calculate "Risk of Ruin".
       - Define position sizing relative to ${inputs.capital}.
       - Provide a "Risk Overview" narrative.
    3. **Psychology Deep Dive**:
       - Provide detailed content on specific topics (e.g., Tilt, FOMO, Process over Outcome).
    4. **30-Day Roadmap**:
       - Break down into weeks. Each week has a focus, goal, rules, and habits.
    5. **Journaling**:
       - Create Pre-trade and Post-trade routines.
    6. **Financials**:
       - Generate realistic 30-day equity curve data points.

    Output must be extremely detailed, professional, and ready for print.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', 
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as TradingPlanData;
    }
    throw new Error("No content generated");
  } catch (error) {
    console.error("Error generating plan:", error);
    throw error;
  }
};