import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Calendar,
  MapPin,
  IndianRupee,
  Award,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  FileCheck2,
  ArrowRight
} from 'lucide-react';

export const ChallengeDetailView: React.FC = () => {
  const {
    selectedChallenge,
    proposals,
    selectStartupForPilot,
    setActiveTab,
    setIsPassportModalOpen,
    approveScaleUpDecision
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'applications' | 'specifications' | 'decision'>('applications');
  const [decisionNotes, setDecisionNotes] = useState(
    'Pilot demonstrated extraordinary field resilience through high monsoon conditions. Key target of 30% reduction exceeded at 34%. Fuel savings accrued to BMC total ₹8.4 Lakhs in 4 months across just 50 locations. Approved for direct commercial scaling to 4,000 bins under Rule 149 GFR exemption.'
  );

  if (!selectedChallenge) {
    return <div className="p-8 text-center text-slate-500">No challenge selected.</div>;
  }

  const challengeProposals = proposals.filter((p) => p.challengeId === selectedChallenge.id);

  // Sorted by composite score descending
  const sortedProposals = [...challengeProposals].sort(
    (a, b) => (b.compositeScore || 0) - (a.compositeScore || 0)
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                {selectedChallenge.challengeCode}
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs font-semibold text-slate-600">
                {selectedChallenge.department}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                {selectedChallenge.status.toUpperCase().replace('_', ' ')}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 tracking-tight">
              {selectedChallenge.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              {selectedChallenge.expectedOutcome}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('pilot_view')}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <span>View Pilot Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPassportModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-300 transition-all cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4 text-emerald-600" />
              <span>Innovation Passport</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px] font-medium">Pilot Grant Budget</span>
            <span className="font-mono font-bold text-slate-900 text-sm">
              ₹{selectedChallenge.budget.pilotBudgetInLakhs} Lakhs
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px] font-medium">Scale-up Budget</span>
            <span className="font-mono font-bold text-slate-900 text-sm">
              ₹{selectedChallenge.budget.commercialScaleBudgetInCrores} Crores
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px] font-medium">Location & Target</span>
            <span className="font-semibold text-slate-900 text-xs">
              {selectedChallenge.location.city} ({selectedChallenge.location.wardsCount} Wards)
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px] font-medium">Selected Startup</span>
            <span className="font-bold text-emerald-700 text-xs truncate block">
              {selectedChallenge.selectedStartupName || 'Pending Selection'}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 text-xs font-semibold text-slate-500 gap-6">
        <button
          onClick={() => setActiveSubTab('applications')}
          className={`pb-3 transition-colors cursor-pointer ${
            activeSubTab === 'applications'
              ? 'text-blue-700 border-b-2 border-blue-700 font-bold'
              : 'hover:text-slate-900'
          }`}
        >
          Startup Proposals & Evaluation Rankings ({sortedProposals.length})
        </button>
        <button
          onClick={() => setActiveSubTab('specifications')}
          className={`pb-3 transition-colors cursor-pointer ${
            activeSubTab === 'specifications'
              ? 'text-blue-700 border-b-2 border-blue-700 font-bold'
              : 'hover:text-slate-900'
          }`}
        >
          Outcome KPIs & Evaluation Rubric Weights
        </button>
        <button
          onClick={() => setActiveSubTab('decision')}
          className={`pb-3 transition-colors cursor-pointer ${
            activeSubTab === 'decision'
              ? 'text-blue-700 border-b-2 border-blue-700 font-bold'
              : 'hover:text-slate-900'
          }`}
        >
          Scale-Up Procurement Decision (Rule 149 GFR)
        </button>
      </div>

      {/* Sub-Tab 1: Applications & Rankings */}
      {activeSubTab === 'applications' && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-950 flex items-start gap-3">
            <Award className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Transparent Multi-Expert Composite Scoring:</span> Each startup proposal is blind-evaluated by empanelled domain specialists from IIT Bombay and VJTI using 7 weighted criteria. The top-ranked startup is eligible for the 4-month field pilot grant.
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3.5">Rank & Startup</th>
                    <th className="px-4 py-3.5">Solution & Tech</th>
                    <th className="px-4 py-3.5">TRL & Budget</th>
                    <th className="px-4 py-3.5">Composite Score</th>
                    <th className="px-4 py-3.5">Reviewer Verdict</th>
                    <th className="px-4 py-3.5 text-right">Selection Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {sortedProposals.map((prop, idx) => {
                    const isSelected = selectedChallenge.selectedStartupId === prop.startupId;

                    return (
                      <tr
                        key={prop.id}
                        className={`hover:bg-slate-50/80 transition-colors ${
                          isSelected ? 'bg-emerald-50/40' : ''
                        }`}
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                                idx === 0
                                  ? 'bg-amber-500 text-slate-950'
                                  : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              #{idx + 1}
                            </span>
                            <div>
                              <div className="font-bold text-slate-900 text-sm">{prop.startupName}</div>
                              <div className="text-[11px] text-slate-500">Submitted: {prop.submissionDate}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 max-w-sm">
                          <div className="font-semibold text-slate-800 text-xs">{prop.title}</div>
                          <div className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                            {prop.executiveSummary}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="font-bold text-slate-900 font-mono text-xs">
                            ₹{prop.costBreakdownLakhs}L
                          </div>
                          <div className="text-[10px] text-emerald-700 font-bold">
                            {prop.aiSummary.trlAssessment.split(' - ')[0]}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-baseline gap-1">
                            <span className="text-base font-extrabold text-slate-900 font-mono">
                              {prop.compositeScore}
                            </span>
                            <span className="text-[10px] text-slate-400">/100</span>
                          </div>
                          <div className="w-20 bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                            <div
                              className="bg-blue-600 h-full rounded-full"
                              style={{ width: `${prop.compositeScore}%` }}
                            ></div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          {idx === 0 ? (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                              ✓ Strongly Recommend (IIT Bombay & VJTI)
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-slate-100 text-slate-700">
                              Under Technical Review
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-right">
                          {isSelected ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 text-white shadow-2xs">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Awarded Pilot</span>
                            </span>
                          ) : (
                            <button
                              onClick={() =>
                                selectStartupForPilot(
                                  selectedChallenge.id,
                                  prop.startupId,
                                  prop.startupName
                                )
                              }
                              className="px-3.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-2xs"
                            >
                              Select for Pilot
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 2: Outcome KPIs & Rubric */}
      {activeSubTab === 'specifications' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Outcome KPIs Required for Scale-up</h3>
            <div className="space-y-3 text-xs">
              {selectedChallenge.pilotKPIs.map((k) => (
                <div key={k.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>{k.name}</span>
                    <span className="font-mono text-blue-700">
                      Target: {k.targetValue} {k.unit}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Baseline: {k.baselineValue} {k.unit} • Verified via: {k.verificationMethod}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Evaluation Criteria Weights</h3>
            <div className="space-y-2 text-xs">
              {selectedChallenge.evaluationWeights.map((w) => (
                <div key={w.id} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
                  <div>
                    <span className="font-semibold text-slate-800 block">{w.name}</span>
                    <span className="text-[10px] text-slate-500">{w.description}</span>
                  </div>
                  <span className="font-mono font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-sm">
                    {w.weight}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 3: Scale-up Decision Flow */}
      {activeSubTab === 'decision' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5 max-w-4xl">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 text-xs leading-relaxed">
            <div className="font-bold flex items-center gap-1.5 mb-1 text-sm text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Pilot Verification Status: Certified by IIT Bombay</span>
            </div>
            The 4-month trial concluded with <strong>34% reduction</strong> in overflow incidents (exceeding 30% outcome target). Independent verification report <code>IITB-CUSE-2026-VAL-094</code> confirms complete data reliability and citizen grievance drop.
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Official Sanction Note / Justification under Rule 149 GFR:
            </label>
            <textarea
              rows={4}
              value={decisionNotes}
              onChange={(e) => setDecisionNotes(e.target.value)}
              className="w-full p-3 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none leading-relaxed"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100">
            <button
              onClick={() => approveScaleUpDecision(decisionNotes)}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Approve Commercial Scale-Up (₹2.80 Cr)</span>
            </button>
            <button
              onClick={() => setActiveTab('pilot_view')}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-all cursor-pointer"
            >
              Inspect Telemetry Charts First
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
