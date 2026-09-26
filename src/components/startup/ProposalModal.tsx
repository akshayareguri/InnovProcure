import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Send,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Cpu,
  IndianRupee,
  Sparkles,
  Layers
} from 'lucide-react';

export const ProposalModal: React.FC = () => {
  const { isProposalModalOpen, setIsProposalModalOpen, submitProposal, selectedChallenge, startupProfile } = useApp();

  const [form, setForm] = useState({
    title: 'EcoSight SenseNet: Dual-Beam Ultrasonic IoT & Edge Vision for Zero Waste-Bin Overflow',
    summary: 'We deploy ruggedized solar/battery dual-beam ultrasonic fill sensors coupled with low-power edge computer vision modules on 50 chronic overflow bins in Mumbai. Our predictive dispatch algorithm dynamically alerts BMC ward supervisors 45 minutes before estimated overflow, integrating seamlessly into existing municipal GPS truck fleets.',
    architecture: '1. Sensor Layer: IP67 dual-beam ultrasound + optical camera lens with mechanical wiper blade to survive toxic landfill gases and heavy monsoons.\n2. Connectivity: Dual SIM (Airtel/Jio) NB-IoT with LoRaWAN fallback on MahaNet gateway.\n3. Analytics & GIS: Predictive ARIMA + spatial regression on historical ward waste cycles hosted on MahaState Cloud.\n4. Integration: Webhook & REST API to BMC SAP Waste Management System and WhatsApp alerts for ward supervisors.',
    deploymentPlan: 'Week 1-2: Mechanical bracket fabrication & sensor installation on 50 designated bins in Dadar, Dharavi, Andheri.\nWeek 3: Calibration with BMC truck route data & supervisor training.\nWeek 4-16: Active pilot telemetry, automated dispatching, weekly milestone audits.',
    costBreakdown: 24.50,
    cybersecurity: 'Hardware tamper detection triggers instant zeroize; TLS 1.3 AES-256 telemetry encryption; hosted on STQC-certified cloud within Mumbai; strictly no PII captured (faces and vehicle numbers auto-blurred on edge chip before transmission).'
  });

  if (!isProposalModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitProposal({
      challengeId: selectedChallenge?.id || 'chal-001',
      title: form.title,
      executiveSummary: form.summary,
      technicalArchitecture: form.architecture,
      deploymentPlan: form.deploymentPlan,
      costBreakdownLakhs: form.costBreakdown,
      cybersecuritySafeguards: form.cybersecurity
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-sm border border-amber-200">
                Outcome-Based Procurement Proposal
              </span>
              <span className="text-xs text-slate-500 font-mono">DPIIT # {startupProfile.dpiitRecognitionNumber}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
              Submit Innovation Proposal
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 truncate max-w-lg">
              Challenge: {selectedChallenge?.title || 'Municipal Waste-Bin Overflow Reduction'}
            </p>
          </div>
          <button
            onClick={() => setIsProposalModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Solution Proposal Title *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none font-medium"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Executive Solution Summary (How does it achieve the 30% outcome target?) *
            </label>
            <textarea
              rows={3}
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Technical Architecture & Sensor Specifications *
            </label>
            <textarea
              rows={4}
              value={form.architecture}
              onChange={(e) => setForm({ ...form, architecture: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono text-[11px]"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              4-Month Field Deployment Plan (50 High-Density Locations) *
            </label>
            <textarea
              rows={3}
              value={form.deploymentPlan}
              onChange={(e) => setForm({ ...form, deploymentPlan: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Pilot Grant Request (in Lakhs INR) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-slate-500 font-bold">₹</span>
                <input
                  type="number"
                  step="0.1"
                  value={form.costBreakdown}
                  onChange={(e) => setForm({ ...form, costBreakdown: Number(e.target.value) })}
                  className="w-full pl-7 pr-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono font-bold"
                  required
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Grant Cap: ₹{selectedChallenge?.budget.pilotBudgetInLakhs || 25} Lakhs
              </span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Startup TRL Level
              </label>
              <input
                type="text"
                disabled
                value={`TRL ${startupProfile.trlLevel} (Demonstrated in Operational Environment)`}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Cybersecurity, Data Privacy & CERT-In Safeguards *
            </label>
            <textarea
              rows={2}
              value={form.cybersecurity}
              onChange={(e) => setForm({ ...form, cybersecurity: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              required
            />
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-[11px] text-blue-900 leading-snug">
            <strong>Statutory Declaration:</strong> By submitting, EcoSight Analytics confirms zero conflict of interest with municipal evaluation committee members and agrees to provide open API telemetry logs for third-party validation by IIT Bombay.
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsProposalModalOpen(false)}
              className="px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit & Log Verification Hash</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
