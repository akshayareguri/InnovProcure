import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Printer,
  Download,
  CheckCircle2,
  ShieldCheck,
  Award,
  Building2,
  Calendar,
  IndianRupee,
  Share2
} from 'lucide-react';

export const InnovationPassportModal: React.FC = () => {
  const { isPassportModalOpen, setIsPassportModalOpen, pilotState, startupProfile, selectedChallenge } = useApp();

  if (!isPassportModalOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] flex flex-col shadow-2xl border border-slate-300 overflow-hidden my-auto">
        {/* Action Header (Not printed) */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-xs sm:text-sm font-bold">
              Official Maharashtra State Innovation Passport (GovTech Verification Dossier)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={() => setIsPassportModalOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Passport Document Body */}
        <div className="p-8 sm:p-10 overflow-y-auto flex-1 bg-white text-slate-900 font-sans space-y-6">
          {/* Government Official Letterhead */}
          <div className="border-b-2 border-slate-900 pb-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center font-serif font-black text-xl border-2 border-amber-500 shadow-xs">
                MH
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-serif font-extrabold tracking-tight uppercase text-slate-950">
                  Government of Maharashtra
                </h1>
                <p className="text-xs font-semibold text-slate-700">
                  Maharashtra State Innovation Society (MSInS) • Dept of Skill Development & Innovation
                </p>
                <p className="text-[11px] text-slate-500">
                  GovTech Innovation Procurement Cell • Mantralaya, Mumbai - 400032
                </p>
              </div>
            </div>

            <div className="text-center sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
              <div className="font-mono text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded border border-blue-200 inline-block">
                PASSPORT REF: MH-INNOV-PASS-2026-0042
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                Issued: {pilotState.independentValidator.certificationDate || '2026-11-26'}
              </div>
            </div>
          </div>

          {/* Title Banner */}
          <div className="text-center py-2 bg-gradient-to-r from-amber-500/10 via-blue-500/10 to-amber-500/10 rounded-xl border border-amber-200">
            <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-slate-900">
              State Innovation Passport & Outcome Validation Certificate
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Conferred under the Maharashtra Public Procurement (Preference to Make in Maharashtra & Startups) Policy
            </p>
          </div>

          {/* Startup Profile Credentials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">
                Accredited Startup Entity
              </span>
              <div className="text-base font-extrabold text-slate-900 mt-0.5">
                {startupProfile.name}
              </div>
              <div className="text-slate-600 mt-0.5">
                DPIIT Reg: <strong className="font-mono">{startupProfile.dpiitRecognitionNumber}</strong>
              </div>
              <div className="text-slate-600">
                MahaStart ID: <strong className="font-mono">{startupProfile.maharashtraStartupId}</strong>
              </div>
              <div className="text-slate-600">
                Udyam: <strong className="font-mono">{startupProfile.udyamRegistration}</strong>
              </div>
            </div>

            <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200 flex flex-col sm:items-end justify-between">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">
                  Innovation Readiness Index
                </span>
                <span className="text-3xl font-black font-mono text-emerald-800">
                  {pilotState.scaleReadinessScore}/100
                </span>
              </div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                ★ Category A: Direct Scale-Up Approved
              </span>
            </div>
          </div>

          {/* Completed Challenge & Outcomes Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              Field Pilot Outcome Performance Audit (50 High-Density Locations)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Key Outcome Indicator</th>
                    <th className="p-2.5">Pre-Pilot Baseline</th>
                    <th className="p-2.5">Sanctioned Target</th>
                    <th className="p-2.5">Audited Actual Outcome</th>
                    <th className="p-2.5">Outcome Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">
                      Waste-Bin Overflow Incidents
                    </td>
                    <td className="p-2.5 font-mono">142.0 incidents/week</td>
                    <td className="p-2.5 font-mono">99.4 incidents/week (-30%)</td>
                    <td className="p-2.5 font-mono font-bold text-emerald-800">
                      93.7 incidents/week (-34.0%)
                    </td>
                    <td className="p-2.5">
                      <span className="text-emerald-800 font-bold text-[11px]">✓ Exceeded Target</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">
                      Compactor Route Dispatch Efficiency
                    </td>
                    <td className="p-2.5 font-mono">0% (Fixed Daily Routes)</td>
                    <td className="p-2.5 font-mono">+15.0% Fuel / Mileage</td>
                    <td className="p-2.5 font-mono font-bold text-emerald-800">
                      +18.2% Fuel Savings
                    </td>
                    <td className="p-2.5">
                      <span className="text-emerald-800 font-bold text-[11px]">✓ Exceeded Target</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">
                      Sensor Hardware Telemetry Uptime
                    </td>
                    <td className="p-2.5 font-mono">80.0% Industry Avg</td>
                    <td className="p-2.5 font-mono">&gt;= 95.0% Network SLA</td>
                    <td className="p-2.5 font-mono font-bold text-emerald-800">
                      96.4% Operational Uptime
                    </td>
                    <td className="p-2.5">
                      <span className="text-emerald-800 font-bold text-[11px]">✓ SLA Met</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Third-Party Certification & Endorsement */}
          <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-2 text-xs text-slate-800">
            <div className="flex items-center gap-2 text-emerald-900 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Independent Technical Certification (IIT Bombay & VJTI)</span>
            </div>
            <p className="leading-relaxed text-slate-700">
              "The joint technical evaluation consortium certifies that the field deployment of 50 smart IoT sensors across BMC Wards A and G-North was rigorously audited. The target 30% reduction in overflow incidents was exceeded at 34.0%, and telemetry uptime was sustained at 96.4% under full monsoon conditions."
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Auditor: {pilotState.independentValidator.leadValidator}</span>
              <span>Audit Report Ref: {pilotState.independentValidator.reportRef}</span>
            </div>
          </div>

          {/* Statutory Exemption Certificate */}
          <div className="p-4 bg-blue-50/50 border border-blue-200 rounded-xl space-y-2 text-xs text-slate-800">
            <div className="flex items-center gap-2 text-blue-950 font-bold">
              <Award className="w-4 h-4 text-blue-700" />
              <span>Statutory Rule 149 GFR Tender Exemption Certificate</span>
            </div>
            <p className="leading-relaxed text-slate-700">
              This certifies that <strong>EcoSight Analytics Private Limited</strong> has successfully demonstrated measurable outcome delivery in live municipal field operations. Under Rule 149 of General Financial Rules (GFR) 2017 and Government of Maharashtra Resolution No. MAT-2021/C.R.34/Ind-7, this startup is <strong>exempted from mandatory prior turnover and prior experience criteria</strong> for municipal waste-bin monitoring scale-up procurements across all 28+ Municipal Corporations in Maharashtra.
            </p>
          </div>

          {/* Signatures and Cryptographic Seal */}
          <div className="pt-6 border-t-2 border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs">
            <div>
              <div className="h-10 border-b border-dashed border-slate-400 flex items-end justify-center pb-1 text-slate-700 font-serif italic">
                Dr. Rajeshwar Patil, IAS
              </div>
              <div className="font-bold text-slate-900 mt-1">Nodal Officer & Addl. MC</div>
              <div className="text-[10px] text-slate-500">Brihanmumbai Municipal Corporation</div>
            </div>

            <div>
              <div className="h-10 border-b border-dashed border-slate-400 flex items-end justify-center pb-1 text-slate-700 font-serif italic">
                Prof. Dr. Aniruddha Kulkarni
              </div>
              <div className="font-bold text-slate-900 mt-1">Lead Independent Auditor</div>
              <div className="text-[10px] text-slate-500">Centre for Urban Science, IIT Bombay</div>
            </div>

            <div>
              <div className="h-10 border-b border-dashed border-slate-400 flex items-end justify-center pb-1 text-emerald-800 font-mono text-[10px] font-bold">
                SHA256: 9e88b...7d3a
              </div>
              <div className="font-bold text-slate-900 mt-1">Chief Executive Officer</div>
              <div className="text-[10px] text-slate-500">Maharashtra State Innovation Society</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
