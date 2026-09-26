import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
  Award,
  PlayCircle
} from 'lucide-react';

export const JourneyBanner: React.FC = () => {
  const { journeyStage, setJourneyStage, advanceJourneyStage } = useApp();
  const [isExpanded, setIsExpanded] = useState(true);

  const steps = [
    { number: 1, title: 'Challenge Published', role: 'Gov Officer', desc: 'Outcome-based challenge (30% overflow cut in 50 bins)' },
    { number: 2, title: 'AI Match & Proposal', role: 'Startup', desc: 'EcoSight Analytics matches 98% & submits proposal' },
    { number: 3, title: 'Experts Assigned', role: 'Administrator', desc: 'Admin empanels IIT Bombay & VJTI reviewers' },
    { number: 4, title: 'Rubric Evaluation', role: 'Evaluator', desc: '7-criteria weighted scoring (89.4/100 awarded)' },
    { number: 5, title: 'Pilot Awarded', role: 'Gov Officer', desc: 'EcoSight selected; ₹25L grant & 4-month pilot' },
    { number: 6, title: 'Pilot Telemetry', role: 'Startup & Gov', desc: '50 field units tracked; 34% drop & 18% route savings' },
    { number: 7, title: 'Independent Audit', role: 'IIT Bombay', desc: 'Field & statistical verification certified p < 0.01' },
    { number: 8, title: 'Scale-up Sanctioned', role: 'Gov Officer', desc: 'Passport issued; ₹2.80 Cr scaling for 4,000 bins' }
  ];

  const currentStepInfo = steps[journeyStage - 1] || steps[0];

  return (
    <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white border-b border-blue-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        {/* Top bar with quick status and expand toggle */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-sm border border-amber-400/20">
              SIH 26136 End-to-End Simulation
            </span>
            <span className="text-xs text-slate-300 hidden md:inline">
              Scenario: <strong className="text-white font-semibold">BMC Waste-Bin Overflow Reduction</strong> (50 Locations) ➔ <strong className="text-amber-300 font-semibold">EcoSight Analytics</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 hidden sm:inline">
              Step {journeyStage} of 8: <span className="text-white font-medium">{currentStepInfo.title}</span> ({currentStepInfo.role})
            </span>
            <button
              onClick={advanceJourneyStage}
              className="flex items-center gap-1.5 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer active:scale-95"
              title="Jump to Next Stage in the Process"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Next Stage ({journeyStage < 8 ? journeyStage + 1 : 1})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-slate-400 hover:text-white p-1 rounded-sm"
              title={isExpanded ? 'Collapse Journey Bar' : 'Expand Journey Bar'}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Expandable Step Visualizer */}
        {isExpanded && (
          <div className="mt-3 pt-2.5 border-t border-slate-800/80">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
              {steps.map((s) => {
                const isCompleted = s.number < journeyStage;
                const isCurrent = s.number === journeyStage;

                let cardBg = 'bg-slate-800/50 border-slate-700/60 text-slate-400 hover:bg-slate-800 hover:border-slate-600';
                let badgeBg = 'bg-slate-700 text-slate-300';

                if (isCurrent) {
                  cardBg = 'bg-blue-900/60 border-amber-400 text-white ring-1 ring-amber-400/40 shadow-sm';
                  badgeBg = 'bg-amber-500 text-slate-950 font-bold';
                } else if (isCompleted) {
                  cardBg = 'bg-slate-800/80 border-emerald-500/40 text-slate-200';
                  badgeBg = 'bg-emerald-600 text-white';
                }

                return (
                  <button
                    key={s.number}
                    onClick={() => setJourneyStage(s.number)}
                    className={`text-left p-2 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${cardBg}`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-semibold ${badgeBg}`}>
                        {isCompleted ? '✓' : `#${s.number}`}
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono">
                        {s.role}
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold tracking-tight leading-tight truncate">
                      {s.title}
                    </div>
                    <p className="text-[9px] text-slate-400 leading-tight mt-1 line-clamp-2">
                      {s.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
