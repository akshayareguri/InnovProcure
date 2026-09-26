import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Target,
  FileText,
  Activity,
  Award,
  Sparkles,
  Building,
  Users,
  Settings2,
  ShieldAlert,
  ClipboardList,
  PlusCircle,
  FileCheck2,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { role, activeTab, setActiveTab, setIsCreateChallengeOpen, setIsPassportModalOpen } = useApp();

  // Navigation configurations per role
  const navItems = {
    gov_officer: [
      { id: 'dashboard', label: 'Overview & Metrics', icon: LayoutDashboard },
      { id: 'challenges', label: 'Challenges Management', icon: Target },
      { id: 'challenge_detail', label: 'Active Challenge & Applications', icon: FileText },
      { id: 'pilot_view', label: 'Pilot & Outcome Tracker', icon: Activity },
      { id: 'passport_view', label: 'Innovation Passports', icon: FileCheck2 }
    ],
    startup: [
      { id: 'challenges', label: 'Challenge Explorer & AI Match', icon: Sparkles },
      { id: 'tracker', label: 'Applications & Pilot Reports', icon: ClipboardList },
      { id: 'pilot_view', label: 'Live Pilot Telemetry & KPIs', icon: Activity },
      { id: 'profile', label: 'Startup Profile & DPIIT Accreditations', icon: Building },
      { id: 'passport_view', label: 'Our Innovation Passport', icon: FileCheck2 }
    ],
    evaluator: [
      { id: 'queue', label: 'Assigned Proposals Queue', icon: ClipboardList },
      { id: 'scoring', label: 'Rubric Scoring & COI', icon: Award },
      { id: 'completed_evals', label: 'Submitted Evaluations', icon: CheckCircle2 },
      { id: 'pilot_view', label: 'Field Pilot Audit Validation', icon: Activity }
    ],
    admin: [
      { id: 'users', label: 'User & Role Directory', icon: Users },
      { id: 'assignments', label: 'Reviewer Allocation', icon: Target },
      { id: 'criteria', label: 'Evaluation Weights & Rubrics', icon: Settings2 },
      { id: 'audit', label: 'Audit & Compliance Ledger', icon: ShieldAlert }
    ],
    passport_view: []
  };

  const currentNav = navItems[role] || navItems.gov_officer;

  const handleTabClick = (tabId: string) => {
    if (tabId === 'passport_view') {
      setIsPassportModalOpen(true);
    } else {
      setActiveTab(tabId);
    }
  };

  return (
    <aside className="w-full lg:w-64 bg-slate-50 border-r border-slate-200 lg:min-h-[calc(100vh-125px)] p-4 flex flex-col justify-between flex-shrink-0">
      <div>
        {/* Role Quick Callout */}
        <div className="mb-4 pb-3 border-b border-slate-200">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Current Workspace
          </div>
          <div className="text-sm font-bold text-slate-800 flex items-center gap-2">
            {role === 'gov_officer' && <span>🏛️ Dept Dashboard</span>}
            {role === 'startup' && <span>🚀 Startup Portal</span>}
            {role === 'evaluator' && <span>🎓 Expert Panel</span>}
            {role === 'admin' && <span>⚙️ MSInS Admin</span>}
          </div>
        </div>

        {/* Primary Action Button for Gov Officer */}
        {role === 'gov_officer' && (
          <button
            id="sidebar-create-challenge-btn"
            onClick={() => setIsCreateChallengeOpen(true)}
            className="w-full mb-4 flex items-center justify-center gap-2 px-3.5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-white" />
            <span>Create New Challenge</span>
          </button>
        )}

        {/* Navigation links */}
        <nav className="space-y-1">
          {currentNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-xl text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-blue-800 shadow-xs border border-slate-200 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Icon
                  className={`w-4 h-4 flex-shrink-0 ${
                    isActive ? 'text-blue-700' : 'text-slate-400'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info Box */}
      <div className="mt-8 pt-4 border-t border-slate-200">
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>MahaState Cloud V2</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-snug">
            Connected to STQC-Certified MahaState Data Centre Node.
          </p>
          <div className="mt-2 text-[10px] font-mono text-slate-400 border-t border-slate-100 pt-1 flex justify-between">
            <span>Rule 149 GFR Compliant</span>
            <span className="text-emerald-700 font-semibold">Active</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
