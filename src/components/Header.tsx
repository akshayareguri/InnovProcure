import React from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import {
  ShieldCheck,
  Building2,
  Rocket,
  Award,
  Settings,
  FileCheck2,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export const Header: React.FC = () => {
  const { role, setRole, setIsPassportModalOpen, resetAllDemoData, journeyStage } = useApp();

  const roleConfigs: Record<
    UserRole,
    { label: string; icon: React.ReactNode; user: string; dept: string; badgeColor: string }
  > = {
    gov_officer: {
      label: 'Government Officer',
      icon: <Building2 className="w-4 h-4 text-blue-700" />,
      user: 'Shri Rajesh Patil, IAS',
      dept: 'Brihanmumbai Municipal Corp (BMC)',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    startup: {
      label: 'Startup',
      icon: <Rocket className="w-4 h-4 text-amber-600" />,
      user: 'Aditya Deshmukh',
      dept: 'EcoSight Analytics (DPIIT #DIPP94812)',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-200'
    },
    evaluator: {
      label: 'Expert Evaluator',
      icon: <Award className="w-4 h-4 text-purple-700" />,
      user: 'Prof. Dr. A. Kulkarni',
      dept: 'Centre for Urban Science, IIT Bombay',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200'
    },
    admin: {
      label: 'Administrator',
      icon: <Settings className="w-4 h-4 text-slate-700" />,
      user: 'InnovProcure Admin Cell',
      dept: 'Maharashtra State Innovation Society',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-200'
    },
    passport_view: {
      label: 'Innovation Passport',
      icon: <FileCheck2 className="w-4 h-4 text-emerald-700" />,
      user: 'Public Verification Record',
      dept: 'Govt of Maharashtra Sanction Registry',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200'
    }
  };

  const currentConfig = roleConfigs[role];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Tricolor Strip */}
      <div className="h-1 w-full flex">
        <div className="w-1/3 bg-amber-500"></div>
        <div className="w-1/3 bg-white border-y border-slate-100"></div>
        <div className="w-1/3 bg-emerald-600"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Portal Identity */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-blue-900 to-slate-900 flex items-center justify-center text-amber-400 font-bold shadow-xs border border-blue-950/20 relative">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
              <span className="absolute -bottom-1 -right-1 text-[8px] font-bold bg-amber-500 text-slate-950 px-1 rounded-sm leading-tight">
                MH
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                  महाराष्ट्र शासन | Govt of Maharashtra
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-xs text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
                  SIH 26136
                </span>
              </div>
              <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                InnovProcure Maharashtra
                <span className="hidden md:inline-block text-xs font-normal text-slate-500">
                  Outcome-Based Innovation Procurement Portal
                </span>
              </h1>
            </div>
          </div>

          {/* Right Controls: Role Selector + Passport + Reset */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Passport Action */}
            <button
              id="header-passport-btn"
              onClick={() => setIsPassportModalOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 transition-colors shadow-xs"
              title="View Certified Digital Innovation Passport"
            >
              <FileCheck2 className="w-4 h-4 text-emerald-600" />
              <span>Innovation Passport</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </button>

            {/* Role Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <span className="text-[11px] font-medium text-slate-500 px-2 hidden xl:inline-block">
                Active Persona:
              </span>
              <div className="relative inline-block">
                <select
                  id="role-selector"
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="bg-white text-slate-900 text-xs font-semibold pl-2.5 pr-8 py-1.5 rounded-lg border border-slate-300 shadow-xs appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                >
                  <option value="gov_officer">🏛️ Government Officer (BMC)</option>
                  <option value="startup">🚀 Startup (EcoSight Analytics)</option>
                  <option value="evaluator">🎓 Expert Evaluator (IIT Bombay)</option>
                  <option value="admin">⚙️ Administrator (MSInS)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Reset Demo Button */}
            <button
              id="reset-demo-btn"
              onClick={resetAllDemoData}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg border border-transparent hover:border-slate-200 transition-colors"
              title="Reset All Mock Data to Initial Stage"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* User Profile Capsule */}
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-blue-800 text-white font-semibold text-xs flex items-center justify-center">
                {currentConfig.user.substring(0, 2).toUpperCase()}
              </div>
              <div className="text-left leading-tight hidden md:block">
                <div className="text-xs font-semibold text-slate-800 truncate max-w-[140px]">
                  {currentConfig.user}
                </div>
                <div className="text-[10px] text-slate-500 truncate max-w-[150px]">
                  {currentConfig.dept}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
