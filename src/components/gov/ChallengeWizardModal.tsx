import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Challenge } from '../../types';
import {
  X,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Building2,
  Target,
  FileText,
  MapPin,
  IndianRupee,
  Calendar,
  Sliders,
  Sparkles,
  HelpCircle
} from 'lucide-react';

export const ChallengeWizardModal: React.FC = () => {
  const { isCreateChallengeOpen, setIsCreateChallengeOpen, createChallenge } = useApp();
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    title: 'Automated AI Solid Waste Segregation at Municipal Transfer Stations',
    department: 'Urban Development Department & Pune Municipal Corporation (PMC)',
    officerName: 'Shri Anand Shende, IAS',
    officerDesignation: 'Chief Sanitation Officer',
    officerEmail: 'anand.shende@pmc.gov.in',
    officerPhone: '+91 20 2550 1000',
    problemStatement: 'Manual waste segregation at secondary transfer stations causes worker health hazards and limits dry/wet recovery efficiency below 45%. Existing mechanical trommels frequently clog.',
    expectedOutcome: 'Achieve >= 80% dry waste segregation purity and 50% speed improvement on secondary sorting belts across 4 transfer stations over a 4-month pilot.',
    dpiitRequired: true,
    minTRL: 6,
    sectors: 'GovTech, WasteTech, Robotics, Computer Vision',
    mahaPreference: true,
    city: 'Pune',
    wardsCount: 2,
    locationDetails: 'Kothrud & Hadapsar Waste Transfer Facilities',
    pilotBudget: 25.0,
    commercialBudget: 3.50,
    pilotDuration: 4,
    deadline: '2026-10-15',
    // Evaluation weights
    weightFit: 20,
    weightInno: 15,
    weightFeas: 20,
    weightTeam: 10,
    weightSec: 10,
    weightCost: 10,
    weightScale: 15,
    // KPIs
    kpiName: 'Waste Segregation Optical Purity',
    kpiBaseline: 42,
    kpiTarget: 80,
    kpiUnit: '% purity',
    kpiVerification: 'Automated chemical-spectral audit + PMC laboratory batch checks'
  });

  if (!isCreateChallengeOpen) return null;

  const totalWeights =
    formData.weightFit +
    formData.weightInno +
    formData.weightFeas +
    formData.weightTeam +
    formData.weightSec +
    formData.weightCost +
    formData.weightScale;

  const handlePublish = () => {
    createChallenge({
      title: formData.title,
      department: formData.department,
      nodalOfficer: {
        name: formData.officerName,
        designation: formData.officerDesignation,
        email: formData.officerEmail,
        phone: formData.officerPhone
      },
      problemStatement: formData.problemStatement,
      expectedOutcome: formData.expectedOutcome,
      eligibility: {
        dpiitRequired: formData.dpiitRequired,
        minTRL: formData.minTRL,
        sectors: formData.sectors.split(',').map((s) => s.trim()),
        incorporationYearsMax: 10,
        maharashtraRegisteredPreference: formData.mahaPreference
      },
      location: {
        city: formData.city,
        wardsCount: formData.wardsCount,
        details: formData.locationDetails
      },
      budget: {
        pilotBudgetInLakhs: formData.pilotBudget,
        commercialScaleBudgetInCrores: formData.commercialBudget,
        currency: 'INR (₹)'
      },
      timeline: {
        publishDate: new Date().toISOString().substring(0, 10),
        applicationDeadline: formData.deadline,
        pilotDurationMonths: formData.pilotDuration
      },
      evaluationWeights: [
        { id: 'crit-1', name: 'Problem Fit & Alignment', weight: formData.weightFit, description: 'Alignment with municipal need' },
        { id: 'crit-2', name: 'Innovation & Technical Novelty', weight: formData.weightInno, description: 'Novelty of approach' },
        { id: 'crit-3', name: 'Feasibility & Pilot Readiness', weight: formData.weightFeas, description: 'Ease of field deployment' },
        { id: 'crit-4', name: 'Team Capability & Track Record', weight: formData.weightTeam, description: 'Technical expertise' },
        { id: 'crit-5', name: 'Cybersecurity & Data Safeguards', weight: formData.weightSec, description: 'Safe-to-host and data safety' },
        { id: 'crit-6', name: 'Cost-Effectiveness & Unit Economics', weight: formData.weightCost, description: 'Pricing feasibility' },
        { id: 'crit-7', name: 'Scale Potential across Maharashtra', weight: formData.weightScale, description: 'Replicability across ULBs' }
      ],
      pilotKPIs: [
        {
          id: `kpi-${Date.now()}`,
          name: formData.kpiName,
          baselineValue: formData.kpiBaseline,
          targetValue: formData.kpiTarget,
          unit: formData.kpiUnit,
          direction: 'increase',
          verificationMethod: formData.kpiVerification
        }
      ]
    });
    setIsCreateChallengeOpen(false);
  };

  const steps = [
    { num: 1, label: 'Problem' },
    { num: 2, label: 'Outcome' },
    { num: 3, label: 'Eligibility' },
    { num: 4, label: 'Location' },
    { num: 5, label: 'Budget' },
    { num: 6, label: 'Timeline' },
    { num: 7, label: 'Weights' },
    { num: 8, label: 'KPIs & Publish' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-sm border border-amber-200">
                Rule 149 GFR Innovation Mechanism
              </span>
              <span className="text-xs text-slate-500">Step {currentStep} of 8</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              Create Outcome-Based Procurement Challenge
            </h3>
          </div>
          <button
            onClick={() => setIsCreateChallengeOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Stepper Progress Bar */}
        <div className="px-6 py-2.5 bg-slate-100 border-b border-slate-200 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[500px]">
            {steps.map((s) => (
              <div key={s.num} className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentStep(s.num)}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                    currentStep === s.num
                      ? 'bg-blue-700 text-white shadow-xs'
                      : s.num < currentStep
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {s.num < currentStep ? '✓' : s.num}
                </button>
                <span className={`text-[11px] font-medium ${currentStep === s.num ? 'text-blue-900 font-semibold' : 'text-slate-500'}`}>
                  {s.label}
                </span>
                {s.num < 8 && <div className="w-4 h-0.5 bg-slate-300 mx-1"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Step Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Challenge Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  placeholder="e.g., Reduction of Municipal Waste-Bin Overflow in High-Density Wards"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Procuring Department / Municipal Corporation *
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nodal Officer Name & Designation
                  </label>
                  <input
                    type="text"
                    value={formData.officerName}
                    onChange={(e) => setFormData({ ...formData, officerName: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Official Email
                  </label>
                  <input
                    type="email"
                    value={formData.officerEmail}
                    onChange={(e) => setFormData({ ...formData, officerEmail: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Problem Statement (What civic challenge needs solving?) *
                </label>
                <textarea
                  rows={4}
                  value={formData.problemStatement}
                  onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  placeholder="Describe the current baseline, failure points, and operational hurdles."
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 leading-relaxed">
                <strong>Outcome-Based Procurement Principle:</strong> Unlike traditional tender specifications that dictate exact hardware brands, define the <em>measurable end outcome</em> you want the startup innovation to achieve.
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Expected Measurable Target Outcome *
                </label>
                <textarea
                  rows={4}
                  value={formData.expectedOutcome}
                  onChange={(e) => setFormData({ ...formData, expectedOutcome: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  placeholder="e.g., Minimum 30% reduction in overflow incidents across 50 high-density locations with >=95% telemetry uptime."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary Baseline Metric
                  </label>
                  <input
                    type="text"
                    defaultValue="142 incidents per week"
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Independent Verification Agency
                  </label>
                  <input
                    type="text"
                    defaultValue="IIT Bombay / VJTI Mumbai / MRSAC"
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <input
                  type="checkbox"
                  id="dpiit-req"
                  checked={formData.dpiitRequired}
                  onChange={(e) => setFormData({ ...formData, dpiitRequired: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded-sm"
                />
                <label htmlFor="dpiit-req" className="text-xs font-medium text-slate-800">
                  Require DPIIT Startup Recognition (Dept for Promotion of Industry and Internal Trade)
                </label>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <input
                  type="checkbox"
                  id="maha-pref"
                  checked={formData.mahaPreference}
                  onChange={(e) => setFormData({ ...formData, mahaPreference: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded-sm"
                />
                <label htmlFor="maha-pref" className="text-xs font-medium text-slate-800">
                  Preference for Maharashtra-incorporated or MSInS-registered startups
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Minimum Technology Readiness Level (TRL)
                  </label>
                  <select
                    value={formData.minTRL}
                    onChange={(e) => setFormData({ ...formData, minTRL: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value={5}>TRL 5 - Component validated in lab</option>
                    <option value={6}>TRL 6 - Prototype demonstrated in relevant environment</option>
                    <option value={7}>TRL 7 - System prototype demonstrated in operational environment</option>
                    <option value={8}>TRL 8 - System complete and qualified</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Permitted Domain Sectors
                  </label>
                  <input
                    type="text"
                    value={formData.sectors}
                    onChange={(e) => setFormData({ ...formData, sectors: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Target City / District *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Number of Test Wards / Zones
                  </label>
                  <input
                    type="number"
                    value={formData.wardsCount}
                    onChange={(e) => setFormData({ ...formData, wardsCount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Identified High-Density Field Locations & Infrastructure Details
                </label>
                <textarea
                  rows={3}
                  value={formData.locationDetails}
                  onChange={(e) => setFormData({ ...formData, locationDetails: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  placeholder="Specify chronic stress points, e.g. vegetable markets, railway station forecourts, industrial transfer points."
                />
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                    Stage 1: Pilot Grant Budget
                  </span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-xl font-extrabold text-amber-950">₹</span>
                    <input
                      type="number"
                      step="0.5"
                      value={formData.pilotBudget}
                      onChange={(e) => setFormData({ ...formData, pilotBudget: Number(e.target.value) })}
                      className="w-28 px-2 py-1 text-sm font-bold border border-amber-300 rounded-lg bg-white"
                    />
                    <span className="text-xs font-bold text-amber-900">Lakhs</span>
                  </div>
                  <p className="text-[11px] text-amber-700 mt-2">
                    Disbursed in tranches against verified milestones. Zero upfront tender fee for startups.
                  </p>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800">
                    Stage 2: Scale-Up Commercial Budget
                  </span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-xl font-extrabold text-blue-950">₹</span>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.commercialBudget}
                      onChange={(e) => setFormData({ ...formData, commercialBudget: Number(e.target.value) })}
                      className="w-28 px-2 py-1 text-sm font-bold border border-blue-300 rounded-lg bg-white"
                    />
                    <span className="text-xs font-bold text-blue-900">Crores</span>
                  </div>
                  <p className="text-[11px] text-blue-700 mt-2">
                    Estimated commercial procurement value for pan-city roll-out upon successful pilot validation.
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Pilot Duration (Months)
                  </label>
                  <input
                    type="number"
                    value={formData.pilotDuration}
                    onChange={(e) => setFormData({ ...formData, pilotDuration: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="text-xs font-semibold text-slate-800">Standard 4-Month Milestone Tranches:</div>
                <div className="text-[11px] text-slate-600 flex justify-between">
                  <span>Month 1: Field Installation & Calibration (30% Grant)</span>
                  <span className="text-emerald-700 font-semibold">Tranche 1</span>
                </div>
                <div className="text-[11px] text-slate-600 flex justify-between">
                  <span>Month 2: Integration & Live Telemetry (40% Grant)</span>
                  <span className="text-emerald-700 font-semibold">Tranche 2</span>
                </div>
                <div className="text-[11px] text-slate-600 flex justify-between">
                  <span>Month 4: 60-Day Telemetry & Third-Party Audit (30% Grant)</span>
                  <span className="text-emerald-700 font-semibold">Tranche 3</span>
                </div>
              </div>
            </div>
          )}

          {currentStep === 7 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-800">Evaluation Criteria Rubric</span>
                <span
                  className={`text-xs font-bold font-mono px-2 py-0.5 rounded-sm ${
                    totalWeights === 100
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  Total: {totalWeights}% {totalWeights === 100 ? '(Valid)' : '(Must equal 100%)'}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between gap-4 p-2 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-800">1. Problem Fit & Municipal Alignment</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={formData.weightFit}
                      onChange={(e) => setFormData({ ...formData, weightFit: Number(e.target.value) })}
                      className="w-14 px-2 py-1 text-right font-mono border rounded-sm"
                    />
                    <span>%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 p-2 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-800">2. Innovation & Technical Novelty</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={formData.weightInno}
                      onChange={(e) => setFormData({ ...formData, weightInno: Number(e.target.value) })}
                      className="w-14 px-2 py-1 text-right font-mono border rounded-sm"
                    />
                    <span>%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 p-2 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-800">3. Feasibility & Pilot Readiness (TRL)</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={formData.weightFeas}
                      onChange={(e) => setFormData({ ...formData, weightFeas: Number(e.target.value) })}
                      className="w-14 px-2 py-1 text-right font-mono border rounded-sm"
                    />
                    <span>%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 p-2 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-800">4. Team Capability & Domain Track Record</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={formData.weightTeam}
                      onChange={(e) => setFormData({ ...formData, weightTeam: Number(e.target.value) })}
                      className="w-14 px-2 py-1 text-right font-mono border rounded-sm"
                    />
                    <span>%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 p-2 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-800">5. Cybersecurity & Safe-to-Host Data Safeguards</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={formData.weightSec}
                      onChange={(e) => setFormData({ ...formData, weightSec: Number(e.target.value) })}
                      className="w-14 px-2 py-1 text-right font-mono border rounded-sm"
                    />
                    <span>%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 p-2 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-800">6. Cost-Effectiveness & Unit Economics</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={formData.weightCost}
                      onChange={(e) => setFormData({ ...formData, weightCost: Number(e.target.value) })}
                      className="w-14 px-2 py-1 text-right font-mono border rounded-sm"
                    />
                    <span>%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 p-2 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-800">7. Scale Potential across Maharashtra ULBs</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={formData.weightScale}
                      onChange={(e) => setFormData({ ...formData, weightScale: Number(e.target.value) })}
                      className="w-14 px-2 py-1 text-right font-mono border rounded-sm"
                    />
                    <span>%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 8 && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                <div className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                  Summary for Publication
                </div>
                <div className="text-sm font-bold text-slate-900">{formData.title}</div>
                <div className="text-xs text-slate-600">
                  {formData.department} • City: {formData.city} ({formData.wardsCount} Wards)
                </div>
                <div className="text-xs text-emerald-800 font-semibold mt-1">
                  Target Outcome: {formData.expectedOutcome}
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-slate-700 pt-2 border-t border-emerald-200">
                  <span>Pilot Grant: ₹{formData.pilotBudget}L</span>
                  <span>Scale Budget: ₹{formData.commercialBudget}Cr</span>
                  <span>Duration: {formData.pilotDuration} Mo</span>
                </div>
              </div>

              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-950 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-700" />
                  <span>Maharashtra Innovation Procurement Compliance Check</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Upon publishing, this challenge will be broadcasted to over 1,400+ DPIIT registered startups in Maharashtra, and our AI Matching engine will notify high-compatibility innovators immediately.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Navigation */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            disabled={currentStep === 1}
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-xl disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-2">
            {currentStep < 8 ? (
              <button
                onClick={() => setCurrentStep((prev) => Math.min(8, prev + 1))}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white rounded-xl shadow-xs cursor-pointer"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handlePublish}
                disabled={totalWeights !== 100}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm disabled:opacity-50 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Publish Challenge</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
