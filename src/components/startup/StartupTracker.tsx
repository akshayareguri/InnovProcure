import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PilotMilestone } from '../../types';
import {
  CheckCircle2,
  Clock,
  Activity,
  FileCheck2,
  UploadCloud,
  Send,
  AlertTriangle,
  TrendingUp,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const StartupTracker: React.FC = () => {
  const {
    proposals,
    pilotState,
    updatePilotMilestone,
    updatePilotKPI,
    setIsPassportModalOpen,
    setActiveTab,
    showToast
  } = useApp();

  const [activeReportTab, setActiveReportTab] = useState<'applications' | 'pilot_reporting'>('pilot_reporting');

  // Interactive Form State for Startup to report field progress
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>('m-3');
  const [kpiOverflowAchieved, setKpiOverflowAchieved] = useState<number>(34.0);
  const [kpiRouteAchieved, setKpiRouteAchieved] = useState<number>(18.2);
  const [kpiUptimeAchieved, setKpiUptimeAchieved] = useState<number>(96.4);
  const [progressNotes, setProgressNotes] = useState<string>(
    'All 50 ultrasonic fill sensors reporting continuously across Dadar, Dharavi, and Andheri. 12 municipal compactor drivers adopted dynamic rerouting with avg 14-minute arrival before bin full.'
  );
  const [blockers, setBlockers] = useState<string>(
    'Minor optical lens grime from street food frying near Dadar Flower Market; solved via routine weekly wiper blade wipe-down protocol.'
  );
  const [evidenceName, setEvidenceName] = useState<string>(
    'BMC_VTS_API_Telemetry_Audit_Week15.json'
  );

  const handleUpdateTelemetry = (e: React.FormEvent) => {
    e.preventDefault();
    updatePilotKPI('kpi-1', kpiOverflowAchieved);
    updatePilotKPI('kpi-2', kpiRouteAchieved);
    updatePilotKPI('kpi-3', kpiUptimeAchieved);
    updatePilotMilestone(selectedMilestoneId, 'verified', evidenceName);
    showToast('Telemetry & Report Submitted', 'Milestone telemetry synchronized with BMC Smart City Command Centre.', 'success');
  };

  const ecoSightProposal = proposals.find((p) => p.startupId === 'startup-001') || proposals[0];

  const appStages = [
    { title: 'Proposal Submitted', date: '2026-07-08', status: 'completed' },
    { title: 'Blind Expert Evaluation', date: '2026-07-21', status: 'completed' },
    { title: 'Technical Shortlist (Rank #1)', date: '2026-07-25', status: 'completed' },
    { title: '4-Month Pilot Awarded', date: '2026-08-01', status: 'completed' },
    { title: 'Scale-Up Recommended (94/100)', date: '2026-11-28', status: 'completed' }
  ];

  return (
    <div className="space-y-6">
      {/* Sub-navigation */}
      <div className="flex border-b border-slate-200 text-xs font-semibold text-slate-500 gap-6">
        <button
          onClick={() => setActiveReportTab('pilot_reporting')}
          className={`pb-3 transition-colors cursor-pointer ${
            activeReportTab === 'pilot_reporting'
              ? 'text-blue-700 border-b-2 border-blue-700 font-bold'
              : 'hover:text-slate-900'
          }`}
        >
          Active Pilot Field Progress & KPI Reporting (50 Bins)
        </button>
        <button
          onClick={() => setActiveReportTab('applications')}
          className={`pb-3 transition-colors cursor-pointer ${
            activeReportTab === 'applications'
              ? 'text-blue-700 border-b-2 border-blue-700 font-bold'
              : 'hover:text-slate-900'
          }`}
        >
          Application Status Lifecycle Tracker
        </button>
      </div>

      {activeReportTab === 'pilot_reporting' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Pilot Milestones & Reporting Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Pilot Performance Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-sm border border-emerald-200">
                    Live Pilot Execution • Month 4 of 4
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    BMC Municipal Waste-Bin Overflow Pilot
                  </h3>
                  <p className="text-xs text-slate-500">
                    50 High-Density Field Locations • Grant: ₹24.50L Disbursed
                  </p>
                </div>
                <button
                  onClick={() => setIsPassportModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-300 transition-colors cursor-pointer"
                >
                  <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Innovation Passport</span>
                </button>
              </div>

              {/* KPI Outcome Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                    Overflow Incident Reduction
                  </span>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-2xl font-black font-mono text-emerald-950">
                      {kpiOverflowAchieved}%
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700">Target: 30%</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 block mt-1">
                    ✓ +4.0% Exceeded (Baseline 142/wk ➔ 93.7/wk)
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200">
                  <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block">
                    Route Dispatch Efficiency
                  </span>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-2xl font-black font-mono text-blue-950">
                      +{kpiRouteAchieved}%
                    </span>
                    <span className="text-[11px] font-semibold text-blue-700">Target: +15%</span>
                  </div>
                  <span className="text-[10px] text-blue-700 block mt-1">
                    ✓ 18.2% fuel & turnaround savings
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200">
                  <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wider block">
                    Sensor Telemetry Uptime
                  </span>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-2xl font-black font-mono text-purple-950">
                      {kpiUptimeAchieved}%
                    </span>
                    <span className="text-[11px] font-semibold text-purple-700">Target: 95%</span>
                  </div>
                  <span className="text-[10px] text-purple-700 block mt-1">
                    ✓ Continuous MahaState cloud sync
                  </span>
                </div>
              </div>
            </div>

            {/* Pilot Progress Report Form */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Submit Milestone Progress & Field KPI Telemetry
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Direct feed to BMC Urban Development nodal officer and IIT Bombay audit console
                  </p>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Rule 149 Audit Trail</span>
              </div>

              <form onSubmit={handleUpdateTelemetry} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Target Milestone to Update
                  </label>
                  <select
                    value={selectedMilestoneId}
                    onChange={(e) => setSelectedMilestoneId(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-xl bg-white font-medium"
                  >
                    {pilotState.milestones.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.title} ({m.tranchePercentage}% Tranche - Status: {m.status.toUpperCase()})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Overflow Reduction Achieved (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={kpiOverflowAchieved}
                      onChange={(e) => setKpiOverflowAchieved(Number(e.target.value))}
                      className="w-full p-2 border border-slate-300 rounded-xl font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Route Efficiency Gain (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={kpiRouteAchieved}
                      onChange={(e) => setKpiRouteAchieved(Number(e.target.value))}
                      className="w-full p-2 border border-slate-300 rounded-xl font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      System Uptime (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={kpiUptimeAchieved}
                      onChange={(e) => setKpiUptimeAchieved(Number(e.target.value))}
                      className="w-full p-2 border border-slate-300 rounded-xl font-mono font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Operational Field Notes & Driver Interaction Updates
                  </label>
                  <textarea
                    rows={3}
                    value={progressNotes}
                    onChange={(e) => setProgressNotes(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Blockers, Environmental Factors & Mitigation Strategies
                  </label>
                  <textarea
                    rows={2}
                    value={blockers}
                    onChange={(e) => setBlockers(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-xl"
                  />
                </div>

                {/* Evidence Upload Placeholder */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Attach Telemetry Log / Third-Party Audit Evidence
                  </label>
                  <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-4 text-center bg-slate-50 transition-colors">
                    <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                    <div className="text-xs font-semibold text-slate-700">
                      {evidenceName}
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Supports CSV, JSON telemetry dumps, geotagged photos (Max 25MB)
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Synchronize Field Telemetry & Update Milestone</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Col: Milestones Tranches & Validation State */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Pilot Milestone Disbursement Tranches
              </h4>
              <div className="space-y-3 text-xs">
                {pilotState.milestones.map((m) => (
                  <div key={m.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span>{m.title}</span>
                      <span className="text-emerald-700 font-mono">
                        {m.tranchePercentage}% (₹{(24.5 * (m.tranchePercentage / 100)).toFixed(1)}L)
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">{m.deliverables}</p>
                    <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px]">
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Disbursed & Verified
                      </span>
                      <span className="text-slate-400">{m.completionDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Independent Validation Agency Stamp */}
            <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white p-5 rounded-2xl border border-blue-800 shadow-sm space-y-3 text-xs">
              <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider text-[10px]">
                <ShieldCheck className="w-4 h-4" />
                <span>Third-Party Independent Audit</span>
              </div>
              <div className="font-bold text-sm">
                IIT Bombay & VJTI Joint Validation Consortium
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Lead Auditor: Prof. Dr. Aniruddha Kulkarni. Report Ref: <code>IITB-CUSE-2026-VAL-094</code>. Confirmed 34% reduction in overflow incidents.
              </p>
              <div className="pt-2 border-t border-blue-800/80 flex items-center justify-between text-[11px]">
                <span className="text-emerald-400 font-bold">Readiness Score: 94/100</span>
                <span className="text-amber-300 font-bold">Category A (Scale-Ready)</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Application Status Lifecycle Tracker */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6 max-w-3xl">
          <div>
            <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-sm">
              Proposal ID: {ecoSightProposal.id}
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-2">{ecoSightProposal.title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Challenge: Municipal Waste-Bin Overflow Reduction (BMC)
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Procurement Lifecycle Timeline
            </h4>
            <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-500">
              {appStages.map((stg, i) => (
                <div key={stg.title} className="relative">
                  <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </span>
                  <div className="font-bold text-slate-900 text-sm">{stg.title}</div>
                  <div className="text-[11px] text-slate-500">{stg.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
