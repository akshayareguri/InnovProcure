import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EvaluationRecord } from '../../types';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Building2,
  Sparkles,
  Save,
  Send,
  Lock,
  ArrowLeft
} from 'lucide-react';

export const ProposalEvaluationView: React.FC = () => {
  const { proposals, selectedProposalId, submitEvaluationRecord, setActiveTab, startupProfile } = useApp();

  const proposal =
    proposals.find((p) => p.id === selectedProposalId) ||
    proposals.find((p) => p.id === 'prop-001') ||
    proposals[0];

  // Conflict of Interest state
  const [coiDeclared, setCoiDeclared] = useState<boolean>(true);

  // 7 Weighted Criteria Scores (Out of 10)
  const [scores, setScores] = useState({
    problemFit: 9.5, // 20%
    innovation: 9.0, // 15%
    feasibility: 9.0, // 20%
    team: 8.5, // 10%
    security: 9.0, // 10%
    cost: 8.5, // 10%
    scale: 9.0 // 15%
  });

  const [notes, setNotes] = useState({
    problemFit: 'Direct match to BMC Ward A & G-North chronic overflow problem.',
    innovation: 'Edge vision combined with dual ultrasonic eliminates false alerts effectively.',
    feasibility: 'Brackets require zero drilling into municipal masonry; rapid deployment.',
    team: 'Strong engineering team with municipal domain understanding.',
    security: 'Edge-blurring for privacy is compliant with DPDP Act 2023.',
    cost: 'Competitive unit economics under ₹1,200/month per bin maintenance.',
    scale: 'High scale potential for Pune, Pimpri-Chinchwad, and Nagpur.'
  });

  const [strengths, setStrengths] = useState(
    'Technically solid, robust hardware enclosure suited for humid coastal Mumbai climate, clear API integration design.'
  );
  const [concerns, setConcerns] = useState(
    'Ensure local ward supervisors are given Marathi language UI alerts on WhatsApp.'
  );
  const [recommendation, setRecommendation] = useState<
    'strongly_recommend' | 'recommend' | 'needs_revision' | 'reject'
  >('strongly_recommend');

  // Weighted score calculation
  const weightedProblemFit = (scores.problemFit / 10) * 20;
  const weightedInnovation = (scores.innovation / 10) * 15;
  const weightedFeasibility = (scores.feasibility / 10) * 20;
  const weightedTeam = (scores.team / 10) * 10;
  const weightedSecurity = (scores.security / 10) * 10;
  const weightedCost = (scores.cost / 10) * 10;
  const weightedScale = (scores.scale / 10) * 15;

  const totalWeightedScore = Number(
    (
      weightedProblemFit +
      weightedInnovation +
      weightedFeasibility +
      weightedTeam +
      weightedSecurity +
      weightedCost +
      weightedScale
    ).toFixed(1)
  );

  const handleSubmit = (isDraft = false) => {
    if (!coiDeclared) {
      alert('Please confirm the Conflict of Interest declaration before submitting.');
      return;
    }

    const evalRecord: EvaluationRecord = {
      id: `eval-rec-${Date.now()}`,
      proposalId: proposal.id,
      evaluatorId: 'eval-001',
      evaluatorName: 'Prof. Dr. Aniruddha Kulkarni',
      evaluatorAffiliation: 'Centre for Urban Science & Engineering, IIT Bombay',
      conflictOfInterestDeclared: coiDeclared,
      scores: [
        { criteriaId: 'crit-1', criteriaName: 'Problem Fit & Alignment', score: scores.problemFit, maxScore: 10, weightedScore: weightedProblemFit, evaluatorNotes: notes.problemFit },
        { criteriaId: 'crit-2', criteriaName: 'Innovation & Technical Novelty', score: scores.innovation, maxScore: 10, weightedScore: weightedInnovation, evaluatorNotes: notes.innovation },
        { criteriaId: 'crit-3', criteriaName: 'Feasibility & Pilot Readiness', score: scores.feasibility, maxScore: 10, weightedScore: weightedFeasibility, evaluatorNotes: notes.feasibility },
        { criteriaId: 'crit-4', criteriaName: 'Team Capability & Track Record', score: scores.team, maxScore: 10, weightedScore: weightedTeam, evaluatorNotes: notes.team },
        { criteriaId: 'crit-5', criteriaName: 'Cybersecurity & Data Safeguards', score: scores.security, maxScore: 10, weightedScore: weightedSecurity, evaluatorNotes: notes.security },
        { criteriaId: 'crit-6', criteriaName: 'Cost-Effectiveness & Unit Economics', score: scores.cost, maxScore: 10, weightedScore: weightedCost, evaluatorNotes: notes.cost },
        { criteriaId: 'crit-7', criteriaName: 'Scale Potential across Maharashtra', score: scores.scale, maxScore: 10, weightedScore: weightedScale, evaluatorNotes: notes.scale }
      ],
      totalScore: totalWeightedScore,
      strengths,
      concerns,
      recommendation,
      submittedAt: new Date().toISOString().substring(0, 16).replace('T', ' '),
      status: isDraft ? 'draft' : 'submitted'
    };

    submitEvaluationRecord(evalRecord);
    setActiveTab('queue');
  };

  return (
    <div className="space-y-6">
      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('queue')}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Proposal Queue</span>
        </button>
        <span className="font-mono text-xs text-purple-800 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200 font-bold">
          Reviewer: Prof. Dr. A. Kulkarni (IIT Bombay)
        </span>
      </div>

      {/* Conflict of Interest Declaration Card (Mandatory First Step) */}
      <div
        className={`p-4 rounded-2xl border transition-all ${
          coiDeclared
            ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950'
            : 'bg-amber-50 border-amber-300 text-amber-950'
        }`}
      >
        <div className="flex items-start gap-3">
          <ShieldCheck
            className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
              coiDeclared ? 'text-emerald-700' : 'text-amber-700'
            }`}
          />
          <div className="flex-1">
            <h4 className="text-xs font-bold uppercase tracking-wider">
              Statutory Conflict of Interest Declaration (Rule 149 GFR 2017)
            </h4>
            <p className="text-xs mt-1 leading-relaxed">
              I solemnly declare that neither I nor any of my immediate family members hold any financial interest, directorship, consultancy, or advisory role with <strong>{proposal.startupName}</strong>. I certify that my scoring will be strictly impartial and merit-based.
            </p>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="coi-check"
                checked={coiDeclared}
                onChange={(e) => setCoiDeclared(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded-sm cursor-pointer"
              />
              <label htmlFor="coi-check" className="text-xs font-bold cursor-pointer">
                I agree to the Conflict of Interest terms and accept legal responsibility.
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Proposal Context & AI Summary + Weighted Rubric Scoring */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 Cols): Proposal Overview, Tech Architecture & AI Summary */}
        <div className="lg:col-span-5 space-y-6">
          {/* Proposal Summary Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <div>
              <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-sm">
                Proposal ID: {proposal.id}
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1.5">{proposal.title}</h3>
              <div className="text-xs text-slate-500 mt-0.5">
                Startup: <strong className="text-slate-800">{proposal.startupName}</strong> (DPIIT # DIPP94812)
              </div>
            </div>

            <div className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
              <span className="font-semibold text-slate-800 block mb-1">Executive Summary:</span>
              {proposal.executiveSummary}
            </div>

            <div className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
              <span className="font-semibold text-slate-800 block mb-1">Technical Architecture:</span>
              <pre className="font-mono text-[11px] bg-slate-50 p-2.5 rounded-lg border border-slate-200 whitespace-pre-wrap">
                {proposal.technicalArchitecture}
              </pre>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 font-mono">
              <span className="text-slate-500">Proposed Grant Budget:</span>
              <span className="font-bold text-slate-900">₹{proposal.costBreakdownLakhs} Lakhs</span>
            </div>
          </div>

          {/* AI Pre-Screening Analysis Card */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white p-5 rounded-2xl border border-blue-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>AI Automated Pre-Screening Summary</span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-500/40">
                {proposal.aiSummary.alignmentScore}% Alignment
              </span>
            </div>

            <div className="text-xs space-y-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Identified Strengths
                </span>
                <ul className="space-y-1 text-slate-300">
                  {proposal.aiSummary.keyStrengths.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-blue-900">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Risk Assessment
                </span>
                <ul className="space-y-1 text-slate-300">
                  {proposal.aiSummary.potentialRisks.map((r, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Weighted Rubric Scoring Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
            {/* Header with Live Calculated Total Score */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Weighted Technical Rubric (7 Dimensions)
                </h3>
                <p className="text-xs text-slate-500">
                  Slide or enter score (1 - 10) for each criterion. Formula weights apply automatically.
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Composite Score
                </span>
                <span className="text-2xl font-black font-mono text-blue-700">
                  {totalWeightedScore}
                  <span className="text-xs font-normal text-slate-400">/100</span>
                </span>
              </div>
            </div>

            {/* Rubric Items */}
            <div className="space-y-4 text-xs">
              {/* 1. Problem Fit */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>1. Problem Fit & Municipal Need Alignment (Weight: 20%)</span>
                  <span className="font-mono text-blue-700">
                    {scores.problemFit}/10 ➔ {weightedProblemFit.toFixed(1)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={scores.problemFit}
                  disabled={!coiDeclared}
                  onChange={(e) => setScores({ ...scores, problemFit: Number(e.target.value) })}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <input
                  type="text"
                  placeholder="Evaluator remarks on problem fit..."
                  value={notes.problemFit}
                  onChange={(e) => setNotes({ ...notes, problemFit: e.target.value })}
                  className="w-full p-2 text-[11px] border border-slate-300 rounded-lg bg-white"
                />
              </div>

              {/* 2. Innovation */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>2. Innovation & Technical Novelty (Weight: 15%)</span>
                  <span className="font-mono text-blue-700">
                    {scores.innovation}/10 ➔ {weightedInnovation.toFixed(1)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={scores.innovation}
                  disabled={!coiDeclared}
                  onChange={(e) => setScores({ ...scores, innovation: Number(e.target.value) })}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <input
                  type="text"
                  placeholder="Evaluator remarks on novelty..."
                  value={notes.innovation}
                  onChange={(e) => setNotes({ ...notes, innovation: e.target.value })}
                  className="w-full p-2 text-[11px] border border-slate-300 rounded-lg bg-white"
                />
              </div>

              {/* 3. Feasibility */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>3. Feasibility & Pilot Readiness / TRL (Weight: 20%)</span>
                  <span className="font-mono text-blue-700">
                    {scores.feasibility}/10 ➔ {weightedFeasibility.toFixed(1)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={scores.feasibility}
                  disabled={!coiDeclared}
                  onChange={(e) => setScores({ ...scores, feasibility: Number(e.target.value) })}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <input
                  type="text"
                  placeholder="Evaluator remarks on deployment feasibility..."
                  value={notes.feasibility}
                  onChange={(e) => setNotes({ ...notes, feasibility: e.target.value })}
                  className="w-full p-2 text-[11px] border border-slate-300 rounded-lg bg-white"
                />
              </div>

              {/* 4. Team Capability */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>4. Team Capability & Domain Track Record (Weight: 10%)</span>
                  <span className="font-mono text-blue-700">
                    {scores.team}/10 ➔ {weightedTeam.toFixed(1)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={scores.team}
                  disabled={!coiDeclared}
                  onChange={(e) => setScores({ ...scores, team: Number(e.target.value) })}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              {/* 5. Cybersecurity & Safeguards */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>5. Cybersecurity & Safe-to-Host Data Safeguards (Weight: 10%)</span>
                  <span className="font-mono text-blue-700">
                    {scores.security}/10 ➔ {weightedSecurity.toFixed(1)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={scores.security}
                  disabled={!coiDeclared}
                  onChange={(e) => setScores({ ...scores, security: Number(e.target.value) })}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              {/* 6. Cost-Effectiveness */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>6. Cost-Effectiveness & Unit Economics (Weight: 10%)</span>
                  <span className="font-mono text-blue-700">
                    {scores.cost}/10 ➔ {weightedCost.toFixed(1)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={scores.cost}
                  disabled={!coiDeclared}
                  onChange={(e) => setScores({ ...scores, cost: Number(e.target.value) })}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              {/* 7. Scale Potential */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>7. Scale Potential across Maharashtra ULBs (Weight: 15%)</span>
                  <span className="font-mono text-blue-700">
                    {scores.scale}/10 ➔ {weightedScale.toFixed(1)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={scores.scale}
                  disabled={!coiDeclared}
                  onChange={(e) => setScores({ ...scores, scale: Number(e.target.value) })}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Overall Feedback & Final Recommendation */}
            <div className="space-y-3 pt-3 border-t border-slate-200 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Key Technical Strengths:
                  </label>
                  <textarea
                    rows={2}
                    value={strengths}
                    onChange={(e) => setStrengths(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Risks or Conditions for Pilot:
                  </label>
                  <textarea
                    rows={2}
                    value={concerns}
                    onChange={(e) => setConcerns(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Final Evaluator Recommendation:
                </label>
                <select
                  value={recommendation}
                  onChange={(e) => setRecommendation(e.target.value as any)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl bg-white font-semibold text-xs"
                >
                  <option value="strongly_recommend">
                    🏆 Strongly Recommend for Field Pilot Award (Score &gt;= 85)
                  </option>
                  <option value="recommend">
                    👍 Recommend for Shortlist (Score 70 - 84)
                  </option>
                  <option value="needs_revision">
                    ⚠️ Needs Technical Clarification / Minor Revision
                  </option>
                  <option value="reject">
                    ❌ Reject Proposal (Does not fulfill outcome baseline)
                  </option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => handleSubmit(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Draft</span>
              </button>
              <button
                type="button"
                onClick={() => handleSubmit(false)}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Final Evaluation Record</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
