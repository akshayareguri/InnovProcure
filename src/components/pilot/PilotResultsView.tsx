import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Activity,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  MapPin,
  Calendar,
  IndianRupee,
  ShieldCheck,
  FileCheck2,
  Download,
  Share2,
  ExternalLink,
  Award,
  Layers,
  ChevronRight
} from 'lucide-react';

export const PilotResultsView: React.FC = () => {
  const { pilotState, selectedChallenge, setIsPassportModalOpen, approveScaleUpDecision } = useApp();

  const [activeChartMetric, setActiveChartMetric] = useState<'overflow' | 'fuel' | 'uptime'>('overflow');

  const monthlyData = [
    { month: 'Month 1 (Aug)', incidents: 136, fuelSavings: 4.2, uptime: 91.2 },
    { month: 'Month 2 (Sep)', incidents: 118, fuelSavings: 9.8, uptime: 94.0 },
    { month: 'Month 3 (Oct)', incidents: 104, fuelSavings: 14.5, uptime: 95.8 },
    { month: 'Month 4 (Nov)', incidents: 93.7, fuelSavings: 18.2, uptime: 96.4 }
  ];

  return (
    <div className="space-y-6">
      {/* Pilot Overview Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                PILOT REF: MH-PILOT-2026-001
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                COMPLETED & VALIDATED (MONTH 4/4)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 tracking-tight">
              Brihanmumbai Municipal Corporation (BMC) Waste-Bin IoT Pilot
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Awarded to <strong>{pilotState.startupName}</strong> for testing IoT ultrasonic sensors and predictive compactor routing in 50 high-density bins across Dadar, Dharavi, and Andheri.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsPassportModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Generate Innovation Passport</span>
            </button>
          </div>
        </div>

        {/* Quick Pilot Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px] font-medium">Pilot Period</span>
            <span className="font-semibold text-slate-900 text-xs">
              {pilotState.startDate} to {pilotState.scheduledEndDate}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px] font-medium">Grant Disbursed</span>
            <span className="font-mono font-bold text-slate-900 text-sm">
              ₹24.5 / ₹25.0 Lakhs (100%)
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px] font-medium">Locations & Hardware</span>
            <span className="font-semibold text-slate-900 text-xs">
              50 Bins across 3 BMC Wards
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px] font-medium">Independent Auditor</span>
            <span className="font-bold text-blue-700 text-xs">
              IIT Bombay & VJTI Consortium
            </span>
          </div>
        </div>
      </div>

      {/* KPI Visual Performance & Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* KPI 1: Overflow Incidents */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Primary Civic Target
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
              Target Exceeded
            </span>
          </div>
          <h3 className="text-sm font-bold text-slate-900">Waste-Bin Overflow Incidents</h3>

          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Baseline (Pre-Pilot):</span>
              <span className="font-mono font-semibold text-slate-700">142.0 / week</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Target (30% reduction):</span>
              <span className="font-mono font-semibold text-blue-700">99.4 / week</span>
            </div>
            <div className="flex items-center justify-between text-xs p-2.5 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="font-bold text-emerald-900">Actual Achieved:</span>
              <span className="font-mono font-extrabold text-emerald-950 text-sm">
                93.7 / week (-34.0%)
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="pt-2">
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full" style={{ width: '113%' }}></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>0%</span>
              <span>Target: 100%</span>
              <span className="font-bold text-emerald-700">113% of Target</span>
            </div>
          </div>
        </div>

        {/* KPI 2: Route Dispatch Efficiency */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Fleet Cost Savings
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
              +18.2% Gain
            </span>
          </div>
          <h3 className="text-sm font-bold text-slate-900">Compactor Route Efficiency</h3>

          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Baseline:</span>
              <span className="font-mono font-semibold text-slate-700">0% Optimization</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Target Gain:</span>
              <span className="font-mono font-semibold text-blue-700">+15.0%</span>
            </div>
            <div className="flex items-center justify-between text-xs p-2.5 bg-blue-50 rounded-xl border border-blue-200">
              <span className="font-bold text-blue-900">Actual Efficiency Gain:</span>
              <span className="font-mono font-extrabold text-blue-950 text-sm">+18.2%</span>
            </div>
          </div>

          <div className="pt-2">
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: '121%' }}></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>Target: 15%</span>
              <span className="font-bold text-blue-700">121% Target Delivery</span>
            </div>
          </div>
        </div>

        {/* KPI 3: Telemetry & Hardware Uptime */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Reliability SLA
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
              96.4% Uptime
            </span>
          </div>
          <h3 className="text-sm font-bold text-slate-900">Sensor Network Uptime</h3>

          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Baseline Industry Average:</span>
              <span className="font-mono font-semibold text-slate-700">80.0%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Target SLA:</span>
              <span className="font-mono font-semibold text-blue-700">&gt;= 95.0%</span>
            </div>
            <div className="flex items-center justify-between text-xs p-2.5 bg-purple-50 rounded-xl border border-purple-200">
              <span className="font-bold text-purple-900">Actual Certified Uptime:</span>
              <span className="font-mono font-extrabold text-purple-950 text-sm">96.4%</span>
            </div>
          </div>

          <div className="pt-2">
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-purple-600 h-full rounded-full" style={{ width: '96.4%' }}></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>90%</span>
              <span className="font-bold text-purple-700">SLA Maintained</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Month Progression Trendline & Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left (7 Cols): Monthly Progression Chart */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                4-Month Measurable Outcome Trajectory
              </h3>
              <p className="text-xs text-slate-500">
                Progressive reduction in weekly bin overflow incidents across Dadar, Dharavi, Andheri
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
              <span className="text-[11px] font-semibold text-slate-600">Incidents/Week</span>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="space-y-3 pt-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400 font-mono text-[11px]">
                <span>Pre-Pilot Baseline</span>
                <span className="font-bold text-slate-600">142.0 incidents/wk</span>
              </div>
              <div className="w-full bg-slate-100 h-6 rounded-lg overflow-hidden flex items-center px-2">
                <div className="bg-slate-400 h-3 rounded-sm" style={{ width: '100%' }}></div>
              </div>
            </div>

            {monthlyData.map((d) => {
              const widthPct = (d.incidents / 142) * 100;
              return (
                <div key={d.month} className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-700 font-medium">
                    <span>{d.month}</span>
                    <span className="font-mono font-bold text-emerald-800">
                      {d.incidents} incidents/wk (
                      {(((142 - d.incidents) / 142) * 100).toFixed(1)}% reduction)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-6 rounded-lg overflow-hidden flex items-center px-2">
                    <div
                      className="bg-emerald-600 h-3 rounded-sm transition-all"
                      style={{ width: `${widthPct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-center justify-between">
            <span>Overall Fuel & Vehicle Running Cost Savings for BMC:</span>
            <span className="font-bold text-slate-900 font-mono">₹8.4 Lakhs Accrued</span>
          </div>
        </div>

        {/* Right (5 Cols): Milestone Verification Cards */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Disbursement Tranches & Milestones
            </h3>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200">
              100% Disbursed
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            {pilotState.milestones.map((m) => (
              <div key={m.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{m.title}</span>
                  </span>
                  <span className="font-mono text-emerald-700">
                    {m.tranchePercentage}% (₹{(24.5 * (m.tranchePercentage / 100)).toFixed(1)}L)
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 pl-5.5">{m.deliverables}</p>
                <div className="text-[10px] text-slate-400 pl-5.5 font-mono">
                  Verified by IIT Bombay • Completed: {m.completionDate}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Independent Validation Checklist & Evidence Gallery */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Independent Validation Checklist (IIT Bombay & VJTI)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Statutory verification required to unlock Rule 149 GFR Scale-Up Exemption
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
            AUDIT SCORE: 94 / 100
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {pilotState.validationChecklist.map((item, idx) => (
            <div
              key={item.id || idx}
              className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-1 flex items-start gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">{item.check}</span>
                <span className="text-[11px] text-slate-600 font-mono block">
                  Remarks: {item.remarks}
                </span>
                <span className="text-[10px] text-emerald-800 font-bold block mt-1">
                  ✓ Verified by {item.validatorAgency} ({item.verifiedOn})
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Evidence Photos & Live Telemetry Feed */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Field Inspection Gallery & IoT Telemetry Feeds
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <div className="h-28 bg-slate-200 rounded-lg flex items-center justify-center text-slate-500 font-bold text-xs relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/10 flex flex-col items-center justify-center p-2 text-center">
                  <MapPin className="w-5 h-5 text-blue-700 mb-1" />
                  <span className="font-bold text-slate-800 text-[11px]">Dadar Market Bin #04</span>
                  <span className="text-[10px] text-slate-600">Dual-beam sensor installation</span>
                </div>
              </div>
              <div className="mt-2 text-[11px] text-slate-600 font-mono flex justify-between">
                <span>GPS: 19.0178° N, 72.8478° E</span>
                <span className="text-emerald-700 font-bold">Online</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <div className="h-28 bg-slate-200 rounded-lg flex items-center justify-center text-slate-500 font-bold text-xs relative overflow-hidden">
                <div className="absolute inset-0 bg-emerald-900/10 flex flex-col items-center justify-center p-2 text-center">
                  <Activity className="w-5 h-5 text-emerald-700 mb-1" />
                  <span className="font-bold text-slate-800 text-[11px]">Dharavi Transit Station</span>
                  <span className="text-[10px] text-slate-600">Edge camera wiper module</span>
                </div>
              </div>
              <div className="mt-2 text-[11px] text-slate-600 font-mono flex justify-between">
                <span>GPS: 19.0434° N, 72.8567° E</span>
                <span className="text-emerald-700 font-bold">Online</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <div className="h-28 bg-slate-200 rounded-lg flex items-center justify-center text-slate-500 font-bold text-xs relative overflow-hidden">
                <div className="absolute inset-0 bg-purple-900/10 flex flex-col items-center justify-center p-2 text-center">
                  <Layers className="w-5 h-5 text-purple-700 mb-1" />
                  <span className="font-bold text-slate-800 text-[11px]">Andheri West Junction</span>
                  <span className="text-[10px] text-slate-600">NB-IoT telemetry gateway</span>
                </div>
              </div>
              <div className="mt-2 text-[11px] text-slate-600 font-mono flex justify-between">
                <span>GPS: 19.1197° N, 72.8468° E</span>
                <span className="text-emerald-700 font-bold">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
