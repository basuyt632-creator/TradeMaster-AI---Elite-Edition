import React, { useState, useEffect } from 'react';
import { TradingPlanData, TradingInputs } from '../types';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { 
  Printer, Shield, Target, Brain, Activity, CheckCircle2, AlertTriangle, BookOpen, Clock, PenTool, 
  Layout, TrendingUp, BookCheck, Layers, Scale, Eye, FileDown, Lock, GitMerge
} from 'lucide-react';

interface PlanDisplayProps {
  data: TradingPlanData;
  inputs: TradingInputs;
  onReset: () => void;
}

const COLORS = ['#10b981', '#0ea5e9', '#6366f1', '#8b5cf6', '#f43f5e'];

const PlanDisplay: React.FC<PlanDisplayProps> = ({ data, inputs, onReset }) => {
  const [isPrinting, setIsPrinting] = useState(false);

  // Robust PDF Generation Logic
  const handlePrint = () => {
    setIsPrinting(true);
    // Give DOM time to update state
    setTimeout(() => {
        window.print();
    }, 1000);
  };

  // Listen for print cancel to restore state
  useEffect(() => {
    const handleAfterPrint = () => {
        setIsPrinting(false);
    };
    window.addEventListener('afterprint', handleAfterPrint);
    return () => window.removeEventListener('afterprint', handleAfterPrint);
  }, []);

  const Page: React.FC<{ children: React.ReactNode, className?: string, hideFooter?: boolean, pageNum?: number }> = ({ children, className = "", hideFooter = false, pageNum }) => (
    <div className={`bg-white text-slate-900 w-full max-w-[210mm] mx-auto min-h-[297mm] shadow-2xl md:mb-16 print:shadow-none print:mb-0 print:w-full print:max-w-none page-break overflow-hidden relative print:border-none print:m-0 ${className}`}>
      {children}
      {!hideFooter && (
        <div className="absolute bottom-6 left-10 text-[10px] text-slate-400 font-mono print:block hidden uppercase tracking-widest">
          TradeMaster AI • {inputs.strategies.join(' + ')} • {inputs.capital} {inputs.currency}
        </div>
      )}
      {!hideFooter && (
        <div className="absolute bottom-6 right-10 text-[10px] text-slate-400 font-mono print:block hidden uppercase tracking-widest">
          {pageNum ? `Page ${pageNum}` : 'CONFIDENTIAL'}
        </div>
      )}
    </div>
  );

  const SectionTitle = ({ icon: Icon, title, subtitle }: { icon: any, title: string, subtitle?: string }) => (
    <div className="border-b-2 border-slate-900 pb-4 mb-10 print:mb-6 print:pb-2">
      <div className="flex items-center gap-4 mb-2">
        <div className="p-2 bg-slate-900 text-white rounded print:bg-slate-900 print:text-white print-force-dark">
          <Icon className="w-8 h-8 print:w-6 print:h-6" />
        </div>
        <h2 className="text-3xl font-bold font-serif uppercase tracking-wider print:text-2xl">{title}</h2>
      </div>
      {subtitle && <p className="text-slate-500 font-serif italic text-lg">{subtitle}</p>}
    </div>
  );

  return (
    <div className={`w-full animate-fade-in ${isPrinting ? 'print-mode-active' : 'pb-32'}`}>
      
      {/* Print Overlay - Visible only on screen during prep */}
      {isPrinting && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center text-slate-900 no-print">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-500 mb-6"></div>
          <h2 className="text-3xl font-bold mb-2">Generating PDF Document...</h2>
          <p className="text-slate-500 text-lg max-w-md text-center">
            Your browser print dialog will open shortly. <br/>
            Please select <strong>"Save as PDF"</strong> in the destination.
          </p>
        </div>
      )}

      {/* Floating Action Bar */}
      <div className="no-print fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-4 bg-slate-900/90 backdrop-blur-md p-2 rounded-2xl border border-slate-700 shadow-2xl shadow-black/50">
        <button onClick={onReset} className="px-6 py-3 rounded-xl hover:bg-slate-800 text-slate-300 font-medium transition-all flex items-center gap-2">
          &larr; Edit Strategy
        </button>
        <button onClick={handlePrint} className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-emerald-500/25 active:scale-95 group">
          <FileDown className="w-5 h-5 group-hover:animate-bounce" />
          Download / Print PDF
        </button>
      </div>

      <div className="text-center mb-8 no-print">
         <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-500 px-4 py-2 rounded-lg border border-yellow-500/20 mb-4">
            <Printer className="w-4 h-4" />
            <span className="text-sm font-bold">PDF Export Fixed: Use the download button below</span>
         </div>
      </div>

      {/* PAGE 1: COVER PAGE */}
      <Page className="flex flex-col justify-center p-0 print:p-0" hideFooter>
         <div className="h-full w-full bg-slate-900 text-white p-16 flex flex-col justify-between relative overflow-hidden print:bg-slate-900 print:text-white print-force-dark">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 print:hidden"></div>
            
            <div className="relative z-10 text-right">
              <h3 className="text-emerald-400 font-mono text-sm tracking-[0.4em] uppercase mb-4 font-bold">Confidential Strategy Document</h3>
              <div className="h-1 w-24 bg-emerald-500 ml-auto shadow-[0_0_10px_#10b981]"></div>
            </div>

            <div className="relative z-10">
              <div className="inline-block border border-emerald-500/30 px-4 py-1 rounded-full text-emerald-400 text-xs tracking-widest uppercase mb-6 bg-emerald-900/20">
                {inputs.reportDepth} Edition v4.0
              </div>
              <h1 className="text-7xl font-serif font-black leading-tight mb-8 tracking-tight">
                MASTER<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 print:text-emerald-400">TRADING</span><br/>
                PROTOCOL
              </h1>
              <div className="flex flex-wrap gap-2 mb-8">
                 {inputs.strategies.map((s, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded text-sm text-slate-300">
                        {s}
                    </span>
                 ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-16 border-t border-slate-700 pt-12 relative z-10">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 block mb-2">Strategy Model</span>
                <span className="text-xl font-bold font-mono text-emerald-400">Hybrid Synthesis</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 block mb-2">Account Size</span>
                <span className="text-2xl font-bold font-mono text-white">{inputs.currency} {inputs.capital.toLocaleString()}</span>
              </div>
            </div>
         </div>
      </Page>

      {/* PAGE 2: EXECUTIVE SUMMARY */}
      <Page className="p-16" pageNum={2}>
         <SectionTitle icon={Layout} title="Executive Summary" subtitle="Mission Statement & Strategic Overview" />
         <div className="prose prose-slate max-w-none text-justify text-lg leading-8 font-serif text-slate-700">
           {data.executiveSummary}
         </div>
         
         <div className="mt-12 p-8 bg-slate-50 border border-slate-200 rounded-xl">
           <h3 className="font-bold text-slate-900 mb-4 uppercase tracking-widest text-sm">Key Objectives</h3>
           <div className="grid grid-cols-2 gap-6">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">1</div>
               <span className="font-medium">Capital Preservation First</span>
             </div>
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">2</div>
               <span className="font-medium">Process Over Outcome</span>
             </div>
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold">3</div>
               <span className="font-medium">Flawless Execution</span>
             </div>
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold">4</div>
               <span className="font-medium">Data-Driven Compounding</span>
             </div>
           </div>
         </div>
      </Page>

      {/* PAGE 3: STRATEGY PHILOSOPHY */}
      <Page className="p-16" pageNum={3}>
        <SectionTitle icon={Brain} title="Strategic Philosophy" subtitle="The Logic Behind The Edge" />
        
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
             {inputs.strategies.length > 1 && (
                 <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                     <GitMerge className="w-3 h-3" /> Hybrid Logic
                 </span>
             )}
             <h3 className="text-xl font-bold text-slate-900">Why This Works</h3>
          </div>
          <p className="text-lg text-slate-700 leading-relaxed font-serif bg-slate-50 p-6 rounded-xl border-l-4 border-emerald-500">
            {data.strategyPhilosophy}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="border border-slate-200 p-6 rounded-xl shadow-sm">
            <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              Timeframe Dominance
            </h4>
            <p className="text-slate-600">{data.timeframe} is the primary execution timeframe to balance noise vs. signal.</p>
          </div>
          <div className="border border-slate-200 p-6 rounded-xl shadow-sm">
            <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Activity className="w-5 h-5 text-amber-500" />
              Kill Zones (Best Sessions)
            </h4>
            <div className="flex gap-2 mt-2">
              {data.bestSessions.map(s => (
                <span key={s} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-bold">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </Page>

      {/* PAGE 4: THE SETUP (VISUAL) */}
      <Page className="p-16" pageNum={4}>
         <SectionTitle icon={Eye} title="The Setup Anatomy" subtitle="Visual & Structural Requirements" />
         
         <div className="bg-slate-900 text-white p-8 rounded-xl mb-12 print:print-force-dark">
           <h3 className="font-mono text-emerald-400 font-bold mb-4 text-lg">PATTERN RECOGNITION MATRIX</h3>
           <p className="text-lg leading-relaxed text-slate-300 font-light">
             {data.setupExplanation}
           </p>
         </div>

         <div className="space-y-4">
           <h3 className="font-bold text-slate-900 uppercase tracking-widest text-sm mb-4">Key Visual Confirmations</h3>
           {data.visualPatternsToLookFor.map((pat, i) => (
             <div key={i} className="flex items-start gap-4 p-4 border border-slate-100 rounded-lg shadow-sm">
               <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">{i+1}</div>
               <p className="text-slate-700 font-medium pt-1">{pat}</p>
             </div>
           ))}
         </div>
      </Page>

      {/* PAGE 5: ENTRY & EXIT RULES */}
      <Page className="p-16" pageNum={5}>
        <SectionTitle icon={Target} title="Execution Algorithms" subtitle="Binary Rules for Entry & Exit" />

        <div className="grid grid-cols-1 gap-12">
          <div>
            <h3 className="bg-emerald-600 text-white px-6 py-3 rounded-t-xl font-bold flex items-center gap-2 print:bg-emerald-600 print:text-white print-force-dark">
              <CheckCircle2 className="w-5 h-5" />
              Long/Short Entry Criteria
            </h3>
            <div className="bg-slate-50 border border-t-0 border-slate-200 rounded-b-xl p-6">
              <ul className="space-y-6">
                {data.entryCriteria.map((rule, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-mono text-emerald-600 font-bold text-xl opacity-50">0{i+1}</span>
                    <span className="text-slate-800 font-medium text-lg">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="bg-rose-600 text-white px-6 py-3 rounded-t-xl font-bold flex items-center gap-2 print:bg-rose-600 print:text-white print-force-dark">
              <AlertTriangle className="w-5 h-5" />
              Invalidation & Exit Criteria
            </h3>
            <div className="bg-slate-50 border border-t-0 border-slate-200 rounded-b-xl p-6">
              <ul className="space-y-6">
                {data.exitCriteria.map((rule, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-mono text-rose-600 font-bold text-xl opacity-50">0{i+1}</span>
                    <span className="text-slate-800 font-medium text-lg">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Page>

      {/* PAGE 6: RISK MANAGEMENT OVERVIEW */}
      <Page className="p-16" pageNum={6}>
        <SectionTitle icon={Shield} title="Risk Management" subtitle="Defense wins Championships" />
        
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-900 text-white p-8 rounded-2xl flex flex-col justify-between h-48 print:print-force-dark">
             <span className="text-slate-400 uppercase tracking-widest text-xs font-bold">Max Risk Per Trade</span>
             <div className="text-6xl font-black font-mono">{data.riskManagement.maxRiskPerTradePercent}%</div>
          </div>
          <div className="bg-slate-100 text-slate-900 p-8 rounded-2xl flex flex-col justify-between h-48 border border-slate-200">
             <span className="text-slate-500 uppercase tracking-widest text-xs font-bold">Daily Stop Loss</span>
             <div className="text-6xl font-black font-mono text-rose-600">{data.riskManagement.maxDailyLossPercent}%</div>
          </div>
        </div>

        <div className="prose prose-slate text-justify">
          <h3 className="font-bold">Risk Protocol Narrative</h3>
          <p>{data.riskManagement.riskOverview}</p>
        </div>
        
        <div className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
           <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
             <AlertTriangle className="w-5 h-5" /> Risk of Ruin Probability
           </h4>
           <p className="text-yellow-900 text-lg">
             Based on your parameters, the mathematical probability of blowing this account is <span className="font-bold">{data.riskManagement.riskOfRuinProbability}</span> assuming adherence to rules.
           </p>
        </div>
      </Page>

      {/* PAGE 7: POSITION SIZING & DRAWDOWN */}
      <Page className="p-16" pageNum={7}>
        <SectionTitle icon={Scale} title="Sizing & Recovery" subtitle="The Mathematics of Survival" />

        <div className="space-y-8">
           <div className="border border-slate-200 p-8 rounded-xl shadow-sm">
             <h3 className="text-xl font-bold text-slate-900 mb-4">Position Sizing Algorithm</h3>
             <div className="font-mono bg-slate-100 p-6 rounded-lg text-slate-700 text-sm">
               {data.riskManagement.positionSizingRule}
             </div>
           </div>

           <div className="border border-slate-200 p-8 rounded-xl shadow-sm">
             <h3 className="text-xl font-bold text-slate-900 mb-4">Drawdown Recovery Protocol</h3>
             <p className="text-slate-700 mb-4">If equity drops by significant percentages, the following rules activate immediately:</p>
             <div className="bg-rose-50 p-6 rounded-lg border-l-4 border-rose-500 text-rose-900 font-medium">
               {data.riskManagement.drawdownRecoveryRule}
             </div>
           </div>

           <div className="border border-slate-200 p-8 rounded-xl shadow-sm">
             <h3 className="text-xl font-bold text-slate-900 mb-4">Win Rate Sensitivity</h3>
             <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left">
                  <tr>
                    <th className="p-3">Win Rate</th>
                    <th className="p-3">Projected Outcome (100 Trades)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.winRateScenarios.map((s, i) => (
                    <tr key={i} className="border-t border-slate-100">
                      <td className="p-3 font-bold font-mono">{s.winRate}%</td>
                      <td className="p-3 text-slate-600">{s.outcome}</td>
                    </tr>
                  ))}
                </tbody>
             </table>
           </div>
        </div>
      </Page>

      {/* PAGE 8: PSYCHOLOGY CORE */}
      <Page className="p-16" pageNum={8}>
        <SectionTitle icon={Brain} title="Psychological Warfare" subtitle="Mastering the Inner Game" />
        
        <div className="grid grid-cols-1 gap-6 mb-12">
          {data.psychologyRules.map((rule, i) => (
            <div key={i} className="flex items-center gap-6 p-4 border-b border-slate-100">
               <span className="text-4xl font-black text-slate-200">0{i+1}</span>
               <p className="text-lg font-medium text-slate-800">{rule}</p>
            </div>
          ))}
        </div>
      </Page>

      {/* PAGE 9+: DETAILED PSYCHOLOGY TOPICS */}
      {data.psychologyDetailed.map((topic, index) => (
        <Page key={index} className="p-16" pageNum={9 + index}>
           <SectionTitle icon={Brain} title={`Psychology Deep Dive: ${topic.topic}`} />
           <div className="prose prose-lg prose-slate max-w-none text-justify font-serif">
             {topic.content}
           </div>
        </Page>
      ))}

      {/* FINANCIAL PROJECTIONS */}
      <Page className="p-16">
        <SectionTitle icon={TrendingUp} title="Financial Projections" subtitle="Equity Curve Simulation" />
        
        <div className="h-96 w-full bg-white border border-slate-200 rounded-2xl p-6 mb-8 shadow-sm print:border-slate-300">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.equityCurveData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `D${val}`} />
              <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
              <Area type="monotone" dataKey="projectedBalance" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorGrowth)" />
              <Area type="monotone" dataKey="worstCaseBalance" stroke="#f43f5e" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-6 text-center">
           <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
             <div className="text-xs uppercase text-slate-500 font-bold mb-2">Starting</div>
             <div className="text-xl font-mono font-bold">{inputs.currency}{inputs.capital}</div>
           </div>
           <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200">
             <div className="text-xs uppercase text-emerald-600 font-bold mb-2">Projected End</div>
             <div className="text-xl font-mono font-bold text-emerald-700">{inputs.currency}{data.equityCurveData[data.equityCurveData.length-1].projectedBalance}</div>
           </div>
           <div className="p-6 bg-rose-50 rounded-xl border border-rose-200">
             <div className="text-xs uppercase text-rose-600 font-bold mb-2">Worst Case</div>
             <div className="text-xl font-mono font-bold text-rose-700">{inputs.currency}{data.equityCurveData[data.equityCurveData.length-1].worstCaseBalance}</div>
           </div>
        </div>
      </Page>

      {/* WEEKLY ROADMAPS - ONE PAGE PER WEEK */}
      {data.weeklyRoadmap.map((week, index) => (
        <Page key={`week-${index}`} className="p-16">
          <SectionTitle icon={Layers} title={`Phase: Week ${week.weekNumber}`} subtitle={week.focus} />
          
          <div className="bg-slate-900 text-white p-8 rounded-xl mb-12 shadow-xl print:print-force-dark">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Primary Objective</h3>
            <p className="text-2xl font-bold">{week.goal}</p>
          </div>

          <div className="grid grid-cols-1 gap-8 mb-12">
            <div className="bg-slate-50 p-8 rounded-xl border border-slate-200">
               <h4 className="font-bold text-slate-900 mb-6 uppercase text-sm tracking-wide">Weekly Rules</h4>
               <ul className="space-y-4">
                 {week.rules.map((rule, r) => (
                   <li key={r} className="flex gap-3 text-lg">
                     <span className="text-emerald-500 font-bold">›</span>
                     {rule}
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </Page>
      ))}

      {/* CONTRACT */}
      <Page className="p-16">
        <SectionTitle icon={PenTool} title="Trader's Contract" subtitle="Legally Binding Agreement With Self" />
        
        <div className="border-[8px] border-double border-slate-300 p-12 h-[800px] relative">
           <h3 className="text-center font-serif text-4xl font-black mb-12 uppercase tracking-widest text-slate-900">Oath of Discipline</h3>
           
           <div className="space-y-8 text-xl font-serif text-slate-800 leading-relaxed italic">
             {data.contractTerms.map((term, i) => (
               <p key={i}>"{term}"</p>
             ))}
           </div>

           <div className="absolute bottom-12 left-12 right-12 flex justify-between">
              <div className="w-1/3">
                 <div className="border-b-2 border-black h-12 mb-2"></div>
                 <p className="text-center text-xs font-bold uppercase tracking-widest">Trader Signature</p>
              </div>
              <div className="w-1/3">
                 <div className="border-b-2 border-black h-12 mb-2"></div>
                 <p className="text-center text-xs font-bold uppercase tracking-widest">Witness Date</p>
              </div>
           </div>
        </div>
      </Page>

      {/* JOURNAL TEMPLATE (CHECKLIST) */}
      <Page className="p-10">
         <div className="border-2 border-slate-900 h-full p-6 flex flex-col justify-center items-center text-center">
            <Shield className="w-24 h-24 text-slate-200 mb-8" />
            <h2 className="text-4xl font-black uppercase mb-12">The Execution Checklist</h2>
            
            <div className="w-full max-w-lg space-y-6 text-left">
              {data.preTradeChecklist.map((item, i) => (
                <div key={i} className="flex items-center gap-6 p-4 border-b border-slate-200">
                   <div className="w-8 h-8 border-2 border-slate-400 rounded"></div>
                   <span className="text-xl font-serif text-slate-800">{item.item}</span>
                </div>
              ))}
            </div>
            
            <p className="mt-16 text-slate-400 uppercase tracking-widest text-xs">Do not proceed unless all boxes are checked.</p>
         </div>
      </Page>

    </div>
  );
};

export default PlanDisplay;