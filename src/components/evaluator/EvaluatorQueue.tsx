import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ShieldCheck,
  Building2,
  FileText
} from 'lucide-react';

export const EvaluatorQueue: React.FC = () => {
  const { proposals, setSelectedProposalId, setActiveTab } = useApp();

  // Evaluator has assigned proposals: prop-001 (EcoSight Analytics) and prop-002 (UrbanClean)
  const assignedProposals = proposals.filter(
    (p) => p.assignedEvaluatorIds.includes('eval-001') || p.id === 'prop-001'
  );

  return (
    <div className="space-y-6">
      {/* Evaluator Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-sm border border-purple-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 uppercase tracking-wider mb-1">
              <span>Empanelled Expert Panel</span>
              <span>•</span>
              <span>Centre for Urban Science, IIT Bombay</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight">
              Assigned Proposal Evaluation Queue
            </h2>
            <p className="text-xs sm:text-sm text-purple-100 max-w-2xl mt-1 leading-relaxed">
              Conduct objective, double-blind evaluation of startup technical bids against the 7-criteria weighted rubric under Maharashtra Procurement Rules.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 bg-purple-800/80 rounded-xl text-xs font-mono font-bold text-purple-200 border border-purple-600">
              Evaluator ID: EXP-IITB-042
            </span>
          </div>
        </div>
      </div>

      {/* Queue Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Assigned Technical Proposals ({assignedProposals.length})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Review solution architecture, inspect AI summary, and score the weighted rubric
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Mandatory GFR 2017 COI Check
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Startup & Proposal Title</th>
                <th className="px-4 py-3.5">Challenge Code</th>
                <th className="px-4 py-3.5">TRL & Budget</th>
                <th className="px-4 py-3.5">AI Risk & Fit Score</th>
                <th className="px-4 py-3.5">Evaluation Status</th>
                <th className="px-4 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {assignedProposals.map((prop) => {
                const isEvaluated = prop.evaluations.some((e) => e.evaluatorId === 'eval-001');

                return (
                  <tr key={prop.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-4 max-w-md">
                      <div className="font-bold text-slate-900 text-sm">{prop.startupName}</div>
                      <div className="font-semibold text-blue-700 text-xs mt-0.5">{prop.title}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {prop.executiveSummary}
                      </div>
                    </td>
                    <td className="px-4 py-4 font-mono text-slate-600">
                      MH-BMC-2026-PS26136
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-bold text-slate-900 font-mono">
                        ₹{prop.costBreakdownLakhs} Lakhs
                      </div>
                      <span className="text-[10px] text-emerald-700 font-bold block">
                        TRL 7 Verified
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5 font-bold font-mono text-emerald-700">
                        <span>{prop.aiSummary.alignmentScore}% Fit</span>
                      </div>
                      <div className="text-[10px] text-slate-500">Low Risk • Clean IP</div>
                    </td>
                    <td className="px-4 py-4">
                      {isEvaluated ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Scored: 90.0/100
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                          <Clock className="w-3 h-3 text-amber-600" />
                          Pending Scoring
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedProposalId(prop.id);
                          setActiveTab('scoring');
                        }}
                        className="px-4 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-2xs transition-colors cursor-pointer"
                      >
                        {isEvaluated ? 'Edit Scoring Rubric' : 'Score Proposal'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
