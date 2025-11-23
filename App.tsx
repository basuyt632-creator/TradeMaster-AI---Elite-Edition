import React, { useState } from 'react';
import InputForm from './components/InputForm';
import PlanDisplay from './components/PlanDisplay';
import { generateTradingPlan } from './services/geminiService';
import { TradingInputs, TradingPlanData } from './types';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [plan, setPlan] = useState<TradingPlanData | null>(null);
  const [inputs, setInputs] = useState<TradingInputs | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (inputData: TradingInputs) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateTradingPlan(inputData);
      setInputs(inputData);
      setPlan(result);
    } catch (err) {
      setError("Failed to generate plan. Please verify your API key and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPlan(null);
    setInputs(null);
  };

  return (
    <div className="min-h-screen">
      {/* Background decoration */}
      <div className="fixed inset-0 z-[-1] overflow-hidden no-print">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black"></div>
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-emerald-900/10 rounded-full blur-3xl"></div>
        <div className="absolute top-[20%] -left-[10%] w-[30%] h-[30%] bg-blue-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        {!plan ? (
          <div className="flex flex-col items-center justify-center min-h-[80vh] animate-fade-in-up">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 tracking-tight mb-4">
                TradeMaster AI
              </h1>
              <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
                Generate a master-level, 30-day trading roadmap tailored to your capital. 
                Strict risk management. Professional strategies. Printable format.
              </p>
            </div>
            
            <InputForm onGenerate={handleGenerate} isLoading={loading} />
            
            {error && (
              <div className="mt-6 flex items-center gap-2 text-red-400 bg-red-900/20 px-4 py-2 rounded-lg border border-red-900/50">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}
          </div>
        ) : (
          inputs && <PlanDisplay data={plan} inputs={inputs} onReset={handleReset} />
        )}
      </div>
    </div>
  );
};

export default App;
