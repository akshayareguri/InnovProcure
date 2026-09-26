import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SystemUser, EvaluationCriteriaWeight } from '../../types';
import {
  Users,
  ShieldCheck,
  Settings2,
  FileText,
  UserCheck,
  UserPlus,
  CheckCircle2,
  Lock,
  Search,
  Sliders,
  ExternalLink
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    users,
    proposals,
    assignEvaluators,
    auditLogs,
    activeTab,
    setActiveTab,
    showToast
  } = useApp();

  const [adminSubTab, setAdminSubTab] = useState<'users' | 'assignments' | 'criteria' | 'audit'>('users');
  const [selectedProposalForAssign, setSelectedProposalForAssign] = useState<string>('prop-001');
  const [assignedEvaluatorsList, setAssignedEvaluatorsList] = useState<string[]>(['eval-001', 'eval-002']);

  // Criteria Weight Settings
  const [defaultWeights, setDefaultWeights] = useState<EvaluationCriteriaWeight[]>([
    { id: 'crit-1', name: 'Problem Fit & Alignment', weight: 20, description: 'Directness of technical solution to civic need' },
    { id: 'crit-2', name: 'Innovation & Technical Novelty', weight: 15, description: 'Novelty of approach & IP protection' },
    { id: 'crit-3', name: 'Feasibility & Pilot Readiness', weight: 20, description: 'TRL level and ease of rapid deployment' },
    { id: 'crit-4', name: 'Team Capability & Track Record', weight: 10, description: 'Founding team and engineering strength' },
    { id: 'crit-5', name: 'Cybersecurity & Data Safeguards', weight: 10, description: 'Safe-to-host and DPDP Act 2023 compliance' },
    { id: 'crit-6', name: 'Cost-Effectiveness & Unit Economics', weight: 10, description: 'Unit economics and scaling feasibility' },
    { id: 'crit-7', name: 'Scale Potential across Maharashtra', weight: 15, description: 'Replicability across 28+ municipal corporations' }
  ]);

  const totalWeightsSum = defaultWeights.reduce((acc, curr) => acc + curr.weight, 0);

  const handleUpdateWeight = (id: string, newWeight: number) => {
    setDefaultWeights((prev) =>
      prev.map((w) => (w.id === id ? { ...w, weight: newWeight } : w))
    );
  };

  const handleSaveWeights = () => {
    if (totalWeightsSum !== 100) {
      showToast('Validation Error', 'Total weight must equal exactly 100%.', 'error');
      return;
    }
    showToast('Criteria Updated', 'Default statewide evaluation rubric synchronized.', 'success');
  };

  const handleSaveAssignment = () => {
    assignEvaluators(selectedProposalForAssign, assignedEvaluatorsList);
  };

  return (
    <div className="space-y-6">
      {/* Admin Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-blue-950 rounded-2xl p-6 text-white shadow-sm border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
              <span>Platform Administration</span>
              <span>•</span>
              <span>Maharashtra State Innovation Society (MSInS)</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight">
              InnovProcure Platform Governance & Review Management
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Empanel evaluators, allocate double-blind reviewers to proposals, configure standardized rubric weights, and inspect immutable audit trails.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 bg-slate-800 rounded-xl text-xs font-mono font-bold text-slate-200 border border-slate-700">
              Admin Cell: MSInS-HQ-01
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 text-xs font-semibold text-slate-500 gap-6">
        <button
          onClick={() => setAdminSubTab('users')}
          className={`pb-3 transition-colors cursor-pointer ${
            adminSubTab === 'users'
              ? 'text-blue-700 border-b-2 border-blue-700 font-bold'
              : 'hover:text-slate-900'
          }`}
        >
          User & Role Management ({users.length})
        </button>
        <button
          onClick={() => setAdminSubTab('assignments')}
          className={`pb-3 transition-colors cursor-pointer ${
            adminSubTab === 'assignments'
              ? 'text-blue-700 border-b-2 border-blue-700 font-bold'
              : 'hover:text-slate-900'
          }`}
        >
          Expert Reviewer Assignment
        </button>
        <button
          onClick={() => setAdminSubTab('criteria')}
          className={`pb-3 transition-colors cursor-pointer ${
            adminSubTab === 'criteria'
              ? 'text-blue-700 border-b-2 border-blue-700 font-bold'
              : 'hover:text-slate-900'
          }`}
        >
          Evaluation Weights & Rubrics
        </button>
        <button
          onClick={() => setAdminSubTab('audit')}
          className={`pb-3 transition-colors cursor-pointer ${
            adminSubTab === 'audit'
              ? 'text-blue-700 border-b-2 border-blue-700 font-bold'
              : 'hover:text-slate-900'
          }`}
        >
          Immutable Audit Log ({auditLogs.length})
        </button>
      </div>

      {/* Tab 1: User & Role Directory */}
      {adminSubTab === 'users' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Empanelled Stakeholders & Platform Users
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Government officers, accredited startups, and academic evaluators
              </p>
            </div>
            <button
              onClick={() => showToast('User Empanelled', 'New evaluator invite dispatched.', 'info')}
              className="flex items-center gap-1.5 px-3 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Empanel Expert / Officer</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">Name & Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Department / Institution</th>
                  <th className="px-4 py-3">Expertise / Domain</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {users.map((u) => {
                  let roleBadge = (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800">
                      {u.role}
                    </span>
                  );

                  if (u.role === 'gov_officer') {
                    roleBadge = (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                        Government Officer
                      </span>
                    );
                  } else if (u.role === 'startup') {
                    roleBadge = (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                        DPIIT Startup
                      </span>
                    );
                  } else if (u.role === 'evaluator') {
                    roleBadge = (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
                        Academic Evaluator
                      </span>
                    );
                  }

                  return (
                    <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="font-bold text-slate-900 text-xs">{u.name}</div>
                        <div className="font-mono text-[11px] text-slate-500">{u.email}</div>
                      </td>
                      <td className="px-4 py-3.5">{roleBadge}</td>
                      <td className="px-4 py-3.5 text-slate-700 max-w-xs truncate">
                        {u.departmentOrOrganization}
                      </td>
                      <td className="px-4 py-3.5 text-slate-600">
                        {u.expertiseArea ? u.expertiseArea.join(', ') : 'Procurement Administration'}
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Active
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Reviewer Allocation */}
      {adminSubTab === 'assignments' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6 max-w-3xl">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Allocate Empanelled Reviewers to Submitted Proposals
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Enforce independent multi-expert technical evaluation with automatic conflict-of-interest checks.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Select Startup Proposal *
              </label>
              <select
                value={selectedProposalForAssign}
                onChange={(e) => setSelectedProposalForAssign(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl bg-white font-medium"
              >
                {proposals.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.startupName} - {p.title} (Status: {p.status.toUpperCase()})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-2">
                Assign Evaluators (Minimum 2 recommended for statistical rigor)
              </label>
              <div className="space-y-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="eval-1"
                      checked={assignedEvaluatorsList.includes('eval-001')}
                      onChange={(e) => {
                        if (e.target.checked) setAssignedEvaluatorsList([...assignedEvaluatorsList, 'eval-001']);
                        else setAssignedEvaluatorsList(assignedEvaluatorsList.filter((id) => id !== 'eval-001'));
                      }}
                      className="w-4 h-4 text-blue-600 rounded-sm"
                    />
                    <label htmlFor="eval-1">
                      <span className="font-bold text-slate-900 block">Prof. Dr. Aniruddha Kulkarni</span>
                      <span className="text-[11px] text-slate-500">Centre for Urban Science & Engineering, IIT Bombay</span>
                    </label>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold font-mono">Expertise: Urban IoT</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="eval-2"
                      checked={assignedEvaluatorsList.includes('eval-002')}
                      onChange={(e) => {
                        if (e.target.checked) setAssignedEvaluatorsList([...assignedEvaluatorsList, 'eval-002']);
                        else setAssignedEvaluatorsList(assignedEvaluatorsList.filter((id) => id !== 'eval-002'));
                      }}
                      className="w-4 h-4 text-blue-600 rounded-sm"
                    />
                    <label htmlFor="eval-2">
                      <span className="font-bold text-slate-900 block">Prof. Sunita Deshmukh</span>
                      <span className="text-[11px] text-slate-500">Dept of Smart Cities & IoT, VJTI Mumbai</span>
                    </label>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold font-mono">Expertise: LPWAN & GIS</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Double-Blind Governance Mode Active:</strong> Evaluator identities are masked from the applicant startup, and financial tender envelopes remain sealed until technical scoring reaches &gt;= 75/100.
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleSaveAssignment}
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Confirm Reviewer Allocation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Criteria & Weights Settings */}
      {adminSubTab === 'criteria' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5 max-w-3xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Standardized Outcome Evaluation Criteria Weights
              </h3>
              <p className="text-xs text-slate-500">
                Configure default weights applied to municipal challenges across Maharashtra.
              </p>
            </div>
            <span
              className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg ${
                totalWeightsSum === 100
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-rose-100 text-rose-800 border border-rose-300'
              }`}
            >
              Total Weight: {totalWeightsSum}% {totalWeightsSum === 100 ? '(Balanced)' : '(Invalid)'}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {defaultWeights.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 gap-4"
              >
                <div>
                  <div className="font-bold text-slate-800">{item.name}</div>
                  <div className="text-[11px] text-slate-500">{item.description}</div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <input
                    type="number"
                    value={item.weight}
                    onChange={(e) => handleUpdateWeight(item.id, Number(e.target.value))}
                    className="w-16 p-1.5 text-right font-mono font-bold border border-slate-300 rounded-lg bg-white"
                  />
                  <span className="font-bold text-slate-600">%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleSaveWeights}
              disabled={totalWeightsSum !== 100}
              className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
            >
              Save Rubric Weights
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Immutable Audit Log */}
      {adminSubTab === 'audit' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Cryptographic Activity & Compliance Audit Trail
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Every procurement action, scoring event, and sanction decision is hashed and logged
              </p>
            </div>
            <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200 font-semibold">
              Tamper-Proof Ledger
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">Timestamp</th>
                  <th className="px-4 py-3">User & Persona</th>
                  <th className="px-4 py-3">Event Action</th>
                  <th className="px-4 py-3">Details</th>
                  <th className="px-4 py-3 text-right">Verification Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-3 font-mono text-slate-500 text-[11px]">
                      {log.timestamp}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-900 text-xs">{log.user}</div>
                      <div className="text-[10px] text-slate-400 capitalize">{log.role.replace('_', ' ')}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200">
                        {log.action}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-700 max-w-md text-xs leading-snug">
                      {log.details}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-[11px] text-slate-400">
                      {log.hash}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
