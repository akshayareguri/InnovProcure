import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Target,
  FileCheck2,
  Activity,
  IndianRupee,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  PlusCircle,
  Building2,
  Users,
  Award
} from 'lucide-react';

export const GovDashboard: React.FC = () => {
  const {
    challenges,
    setSelectedChallengeId,
    setActiveTab,
    setIsCreateChallengeOpen,
    setIsPassportModalOpen,
    proposals,
    pilotState
  } = useApp();

  const activeChallengesCount = challenges.filter((c) => c.status !== 'closed').length;
  const totalProposals = proposals.length;
  const pilotsInProgress = challenges.filter((c) => c.status === 'pilot_active').length;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-950 to-slate-900 rounded-2xl p-6 text-white shadow-sm border border-blue-800/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-full opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
              <span>Department Portal</span>
              <span>•</span>
              <span>Urban Development & BMC</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Innovation Procurement Officer Dashboard
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Publish outcome-based challenges, monitor live startup pilots, and execute evidence-backed scale-up procurement under Maharashtra Innovation Rules.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setIsCreateChallengeOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create New Challenge</span>
            </button>
            <button
              onClick={() => setIsPassportModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2.5 bg-blue-800/60 hover:bg-blue-800 text-white text-xs font-semibold rounded-xl border border-blue-700 transition-all cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4 text-emerald-400" />
              <span>Innovation Passports</span>
            </button>
          </div>
        </div>
      </div>

      {/* High-Level Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Challenges</span>
            <div className="p-2 bg-blue-50 text-blue-700 rounded-lg">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">{activeChallengesCount}</span>
            <span className="text-xs text-slate-500 font-medium">Outcome-based</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Across BMC, PWD, and MEDA</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Startup Proposals</span>
            <div className="p-2 bg-amber-50 text-amber-700 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">{totalProposals}</span>
            <span className="text-xs text-emerald-700 font-medium font-mono">100% Evaluated</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Dual-expert blind evaluated</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pilots In Progress</span>
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">{pilotsInProgress}</span>
            <span className="text-xs text-emerald-700 font-medium font-mono">50 Field Bins</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Total Pilot Value: ₹25.0 Lakhs</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Scale-up Sanctions</span>
            <div className="p-2 bg-purple-50 text-purple-700 rounded-lg">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-purple-900">1 Ready</span>
            <span className="text-xs text-purple-700 font-bold font-mono">Score: 94/100</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Commercial value: ₹2.80 Crores</p>
        </div>
      </div>

      {/* High-Priority Scale-up Alert Card (Scenario Focus) */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white p-5 rounded-2xl border border-emerald-700 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-emerald-500 text-slate-950 rounded-xl font-bold mt-1">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Actionable Milestone Achieved
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-800 text-emerald-200 border border-emerald-600 font-mono">
                IIT Bombay Verified
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold mt-0.5">
              EcoSight Analytics Pilot Exceeded Targets (34% Waste Overflow Reduction)
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl mt-1 leading-relaxed">
              Target was 30% reduction; achieved 34.0% with 18.2% route efficiency improvement across 50 bins in Mumbai Wards A, G-North, and K-East. Independent evaluation recommends commercial scale-up to 4,000 bins.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
          <button
            onClick={() => {
              setSelectedChallengeId('chal-001');
              setActiveTab('pilot_view');
            }}
            className="px-4 py-2 bg-white text-emerald-950 hover:bg-emerald-50 text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
          >
            Review Pilot Telemetry
          </button>
          <button
            onClick={() => setIsPassportModalOpen(true)}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
          >
            Issue Passport
          </button>
        </div>
      </div>

      {/* Active Outcome-Based Challenges Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Outcome-Based Procurement Challenges
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Measurable problem statements published by Maharashtra state departments
            </p>
          </div>
          <button
            onClick={() => setActiveTab('challenges')}
            className="text-xs font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>View All Challenges</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3">Challenge Code & Title</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Target Outcome</th>
                <th className="px-4 py-3">Pilot Budget</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {challenges.map((c) => {
                let statusBadge = (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    Published
                  </span>
                );

                if (c.status === 'pilot_active') {
                  statusBadge = (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center gap-1 w-max">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                      Pilot Active
                    </span>
                  );
                } else if (c.status === 'scale_up_approved') {
                  statusBadge = (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-purple-50 text-purple-800 border border-purple-200">
                      Scale-up Approved
                    </span>
                  );
                }

                return (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-mono text-[10px] text-slate-400 font-semibold">{c.challengeCode}</div>
                      <div className="font-bold text-slate-900 text-xs mt-0.5 line-clamp-1 max-w-md">{c.title}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {c.proposalsCount} Proposals • Pilot: {c.timeline.pilotDurationMonths} Months
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-slate-600 max-w-xs truncate">
                      {c.department}
                    </td>
                    <td className="px-4 py-3.5 text-slate-700 font-medium max-w-xs">
                      <span className="line-clamp-2">{c.expectedOutcome}</span>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-slate-900 font-bold">
                      ₹{c.budget.pilotBudgetInLakhs} Lakhs
                    </td>
                    <td className="px-4 py-3.5">
                      {statusBadge}
                    </td>
                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => {
                          setSelectedChallengeId(c.id);
                          setActiveTab('challenge_detail');
                        }}
                        className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-lg border border-blue-200 transition-colors cursor-pointer"
                      >
                        Manage
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
