import React, { useState } from 'react';
import { TradingInputs } from '../types';
import { Loader2, TrendingUp, ShieldCheck, UserCircle, Globe, Activity, Layers, Plus, X, FileText } from 'lucide-react';

interface InputFormProps {
  onGenerate: (inputs: TradingInputs) => void;
  isLoading: boolean;
}

const LANGUAGES = [
  "English", "Hindi (हिंदी)", "Spanish (Español)", "French (Français)", "German (Deutsch)", 
  "Chinese (Simplified)", "Japanese (日本語)", "Russian (Русский)", "Portuguese (Português)",
  "Arabic (العربية)", "Korean (한국어)", "Italian (Italiano)", "Turkish (Türkçe)", 
  "Dutch (Nederlands)", "Polish (Polski)", "Swedish (Svenska)", "Indonesian (Bahasa Indonesia)",
  "Vietnamese (Tiếng Việt)", "Thai (ไทย)", "Greek (Ελληνικά)"
];

const STRATEGIES = [
  "Smart Money Concepts (ICT/SMC)",
  "Price Action (Pure)",
  "Supply & Demand Zones",
  "Wyckoff Method",
  "Trend Following (Swing)",
  "Scalping (High Frequency)",
  "Mean Reversion (Quant)",
  "Breakout Trading",
  "Harmonic Patterns",
  "Volume Spread Analysis (VSA)",
  "RSI/MACD Divergence",
  "Elliott Wave Theory"
];

const InputForm: React.FC<InputFormProps> = ({ onGenerate, isLoading }) => {
  const [capital, setCapital] = useState<number>(2000);
  const [currency, setCurrency] = useState<string>('₹');
  const [market, setMarket] = useState<string>('Crypto (Futures/Spot)');
  const [duration, setDuration] = useState<number>(30);
  const [experience, setExperience] = useState<string>('Intermediate');
  const [riskStyle, setRiskStyle] = useState<'Conservative' | 'Balanced' | 'Aggressive'>('Balanced');
  const [language, setLanguage] = useState<string>('English');
  const [selectedStrategies, setSelectedStrategies] = useState<string[]>(['Smart Money Concepts (ICT/SMC)']);
  const [reportDepth, setReportDepth] = useState<'Standard' | 'Deep' | 'GodMode'>('Deep');

  const toggleStrategy = (strategy: string) => {
    if (selectedStrategies.includes(strategy)) {
      if (selectedStrategies.length > 1) {
        setSelectedStrategies(selectedStrategies.filter(s => s !== strategy));
      }
    } else {
      if (selectedStrategies.length < 3) {
        setSelectedStrategies([...selectedStrategies, strategy]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      capital,
      currency,
      market,
      durationDays: duration,
      experienceLevel: experience,
      riskStyle,
      language,
      strategies: selectedStrategies,
      reportDepth
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 p-8 rounded-3xl shadow-2xl relative overflow-hidden animate-fade-in-up">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500"></div>
      
      <div className="flex items-center gap-4 mb-8 text-emerald-400">
        <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-700 shadow-lg">
          <Layers className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Plan Configuration</h2>
          <p className="text-slate-400 text-sm">Design your custom institutional algorithm</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Strategy Mixer */}
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50">
           <label className="block text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
             <Activity className="w-4 h-4" /> Strategy Mixer (Select up to 3)
           </label>
           <div className="flex flex-wrap gap-2 mb-4">
              {STRATEGIES.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleStrategy(s)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all border ${
                    selectedStrategies.includes(s)
                    ? 'bg-cyan-900/50 border-cyan-500 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                    : 'bg-slate-800 border-slate-700 text-slate-500 hover:border-slate-500'
                  }`}
                >
                  {selectedStrategies.includes(s) && <span className="mr-1 text-cyan-500">✓</span>}
                  {s}
                </button>
              ))}
           </div>
           <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
             <span className="text-xs text-slate-400 block mb-1">Active Synthesis:</span>
             <div className="flex flex-wrap gap-2">
               {selectedStrategies.map(s => (
                 <span key={s} className="flex items-center gap-1 bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded text-xs border border-cyan-500/20">
                   {s} <X className="w-3 h-3 cursor-pointer" onClick={() => toggleStrategy(s)} />
                 </span>
               ))}
               {selectedStrategies.length < 3 && (
                 <span className="text-xs text-slate-600 flex items-center px-2 py-1 italic">+ Select {3 - selectedStrategies.length} more to mix</span>
               )}
             </div>
           </div>
        </div>

        {/* Report Depth & Language */}
        <div className="grid md:grid-cols-2 gap-6">
           <div>
             <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Report Depth (Page Count)</label>
             <div className="relative group">
                <FileText className="absolute left-3 top-3.5 text-slate-500 w-5 h-5 group-hover:text-emerald-400 transition-colors" />
                <select 
                  value={reportDepth}
                  onChange={(e) => setReportDepth(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none appearance-none cursor-pointer hover:border-slate-600 transition-all"
                >
                  <option value="Standard">Standard Edition (~10 Pages)</option>
                  <option value="Deep">Professional Edition (~20 Pages)</option>
                  <option value="GodMode">God Mode / Institutional (~30+ Pages)</option>
                </select>
             </div>
           </div>
           <div>
             <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Output Language</label>
             <div className="relative group">
                <Globe className="absolute left-3 top-3.5 text-slate-500 w-5 h-5 group-hover:text-emerald-400 transition-colors" />
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none appearance-none cursor-pointer hover:border-slate-600 transition-all"
                >
                  {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
             </div>
           </div>
        </div>

        {/* Capital & Duration */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Initial Capital</label>
            <div className="relative group">
              <span className="absolute left-3 top-3 text-slate-500 font-mono group-focus-within:text-emerald-400 transition-colors text-lg">{currency}</span>
              <input
                type="number"
                value={capital}
                onChange={(e) => setCapital(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-mono text-lg"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Target Duration</label>
            <div className="relative">
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-mono text-lg"
              />
              <span className="absolute right-4 top-3.5 text-slate-500 text-sm font-semibold">DAYS</span>
            </div>
          </div>
        </div>

        {/* Experience & Risk */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
             <label className="block text-sm font-semibold text-slate-300 mb-2">Experience Level</label>
             <div className="relative">
               <UserCircle className="absolute left-3 top-3 text-slate-500 w-5 h-5" />
               <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none appearance-none hover:bg-slate-800 transition-colors"
              >
                <option>Beginner (0-1 Years)</option>
                <option>Intermediate (1-3 Years)</option>
                <option>Advanced (3+ Years)</option>
                <option>Professional (Full Time)</option>
              </select>
             </div>
          </div>

          <div>
             <label className="block text-sm font-semibold text-slate-300 mb-2">Risk Appetite</label>
             <div className="relative">
               <ShieldCheck className="absolute left-3 top-3 text-slate-500 w-5 h-5" />
               <select
                value={riskStyle}
                onChange={(e) => setRiskStyle(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none appearance-none hover:bg-slate-800 transition-colors"
              >
                <option value="Conservative">Conservative (Capital Preservation)</option>
                <option value="Balanced">Balanced (Steady Growth)</option>
                <option value="Aggressive">Aggressive (Maximum Alpha)</option>
              </select>
             </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-5 rounded-xl transition-all transform hover:scale-[1.01] active:scale-[0.99] flex justify-center items-center shadow-lg shadow-emerald-900/30 disabled:opacity-50 disabled:cursor-not-allowed mt-6 border border-emerald-500/20 text-lg tracking-wide group"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-6 h-6 mr-3 animate-spin" />
              Synthesizing Hybrid Algorithm...
            </>
          ) : (
            <>
               Generate {reportDepth === 'GodMode' ? 'God Mode' : ''} Plan
               <Plus className="w-5 h-5 ml-2 group-hover:rotate-90 text-emerald-200" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default InputForm;