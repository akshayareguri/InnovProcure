import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  Challenge,
  StartupProfile,
  Proposal,
  PilotState,
  AuditLog,
  SystemUser,
  EvaluationRecord,
  PilotMilestone
} from '../types';
import {
  INITIAL_CHALLENGES,
  INITIAL_STARTUP_PROFILE,
  INITIAL_PROPOSALS,
  INITIAL_PILOT_STATE,
  INITIAL_AUDIT_LOGS,
  INITIAL_USERS
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Data
  challenges: Challenge[];
  selectedChallengeId: string;
  setSelectedChallengeId: (id: string) => void;
  selectedChallenge: Challenge | undefined;
  
  startupProfile: StartupProfile;
  updateStartupProfile: (updates: Partial<StartupProfile>) => void;
  
  proposals: Proposal[];
  selectedProposalId: string | null;
  setSelectedProposalId: (id: string | null) => void;
  
  pilotState: PilotState;
  auditLogs: AuditLog[];
  users: SystemUser[];
  
  // Guided Journey
  journeyStage: number; // 1 to 8
  setJourneyStage: (stage: number) => void;
  advanceJourneyStage: () => void;
  resetAllDemoData: () => void;
  
  // Actions
  createChallenge: (newChallenge: Partial<Challenge>) => void;
  publishChallenge: (id: string) => void;
  submitProposal: (proposalData: Partial<Proposal>) => void;
  assignEvaluators: (proposalId: string, evaluatorIds: string[]) => void;
  submitEvaluationRecord: (evaluation: EvaluationRecord) => void;
  selectStartupForPilot: (challengeId: string, startupId: string, startupName: string) => void;
  updatePilotMilestone: (milestoneId: string, status: PilotMilestone['status'], evidence?: string) => void;
  updatePilotKPI: (kpiId: string, achieved: number) => void;
  toggleValidationCheck: (checkId: string) => void;
  approveScaleUpDecision: (notes: string) => void;
  
  // Modals & Popups
  isCreateChallengeOpen: boolean;
  setIsCreateChallengeOpen: (open: boolean) => void;
  isProposalModalOpen: boolean;
  setIsProposalModalOpen: (open: boolean) => void;
  isPassportModalOpen: boolean;
  setIsPassportModalOpen: (open: boolean) => void;
  
  // Toasts
  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'innovprocure_state_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('gov_officer');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  
  const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>('chal-001');
  
  const [startupProfile, setStartupProfile] = useState<StartupProfile>(INITIAL_STARTUP_PROFILE);
  const [proposals, setProposals] = useState<Proposal[]>(INITIAL_PROPOSALS);
  const [selectedProposalId, setSelectedProposalId] = useState<string | null>('prop-001');
  
  const [pilotState, setPilotState] = useState<PilotState>(INITIAL_PILOT_STATE);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [users, setUsers] = useState<SystemUser[]>(INITIAL_USERS);
  
  const [journeyStage, setJourneyStageState] = useState<number>(8); // Defaults to full completed state for demo exploration, but user can jump to any step
  
  const [isCreateChallengeOpen, setIsCreateChallengeOpen] = useState(false);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [isPassportModalOpen, setIsPassportModalOpen] = useState(false);
  
  const [toasts, setToasts] = useState<ToastMessage[]>([
    {
      id: 'init-toast',
      title: 'InnovProcure Maharashtra Active',
      message: 'Platform loaded for SIH Problem Statement 26136. Switch roles or follow the Guided Journey.',
      type: 'info'
    }
  ]);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addAuditLog = (action: string, category: AuditLog['category'], details: string, user: string, userRole: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user,
      role: userRole,
      action,
      category,
      details,
      hash: `0x${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const selectedChallenge = challenges.find((c) => c.id === selectedChallengeId) || challenges[0];

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (newRole === 'passport_view') {
      setIsPassportModalOpen(true);
      return;
    }
    // Set natural default tab for each role
    if (newRole === 'gov_officer') setActiveTab('dashboard');
    else if (newRole === 'startup') setActiveTab('challenges');
    else if (newRole === 'evaluator') setActiveTab('queue');
    else if (newRole === 'admin') setActiveTab('users');
  };

  const setJourneyStage = (stage: number) => {
    setJourneyStageState(stage);
    
    // Automatically switch role and screen to showcase that step in the required journey:
    // 1: Officer creates/publishes
    // 2: Startup applies
    // 3: Admin assigns experts
    // 4: Expert scores proposal
    // 5: Officer selects EcoSight
    // 6: Pilot progress tracking
    // 7: Independent validation
    // 8: Innovation Passport & scale-up approved
    switch (stage) {
      case 1:
        setRoleState('gov_officer');
        setActiveTab('challenges');
        showToast('Step 1 of 8: Challenge Creation', 'Government Officer views or crafts an outcome-based challenge.', 'info');
        break;
      case 2:
        setRoleState('startup');
        setActiveTab('challenges');
        showToast('Step 2 of 8: AI Match & Proposal', 'Startup discovers the 98% AI match and prepares proposal.', 'info');
        break;
      case 3:
        setRoleState('admin');
        setActiveTab('assignments');
        showToast('Step 3 of 8: Reviewer Assignment', 'Administrator allocates empanelled domain experts to proposals.', 'info');
        break;
      case 4:
        setRoleState('evaluator');
        setActiveTab('queue');
        setSelectedProposalId('prop-001');
        showToast('Step 4 of 8: Expert Rubric Scoring', 'Evaluator reviews EcoSight technical rubric and awards scores.', 'info');
        break;
      case 5:
        setRoleState('gov_officer');
        setActiveTab('challenge_detail');
        setSelectedChallengeId('chal-001');
        showToast('Step 5 of 8: Pilot Award', 'Officer selects EcoSight Analytics for pilot deployment.', 'success');
        break;
      case 6:
        setRoleState('gov_officer');
        setActiveTab('pilot_view');
        showToast('Step 6 of 8: Pilot Execution', 'Tracking 4-month milestones, telemetry, and 50 field units.', 'info');
        break;
      case 7:
        setRoleState('gov_officer');
        setActiveTab('pilot_view');
        showToast('Step 7 of 8: Independent Validation', 'IIT Bombay & VJTI verify 34% overflow drop and 18% route savings.', 'success');
        break;
      case 8:
        setRoleState('gov_officer');
        setActiveTab('pilot_view');
        setIsPassportModalOpen(true);
        showToast('Step 8 of 8: Scale-up Sanctioned', 'Innovation Passport issued. Scale-up approved for 4,000 bins.', 'success');
        break;
      default:
        break;
    }
  };

  const advanceJourneyStage = () => {
    const next = journeyStage >= 8 ? 1 : journeyStage + 1;
    setJourneyStage(next);
  };

  const createChallenge = (data: Partial<Challenge>) => {
    const newId = `chal-${Date.now().toString().slice(-4)}`;
    const newChallenge: Challenge = {
      id: newId,
      challengeCode: `MH-GOV-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: data.title || 'New Outcome-Based Urban Challenge',
      department: data.department || 'Urban Development Department, Maharashtra',
      nodalOfficer: data.nodalOfficer || {
        name: 'Shri Rajesh Patil, IAS',
        designation: 'Nodal Procurement Officer',
        email: 'nodal.officer@maharashtra.gov.in',
        phone: '+91 22 2202 1234'
      },
      problemStatement: data.problemStatement || '',
      expectedOutcome: data.expectedOutcome || '',
      eligibility: data.eligibility || {
        dpiitRequired: true,
        minTRL: 6,
        sectors: ['GovTech', 'Smart Cities'],
        incorporationYearsMax: 10,
        maharashtraRegisteredPreference: true
      },
      location: data.location || { city: 'Mumbai', wardsCount: 1, details: 'Designated ward area' },
      budget: data.budget || { pilotBudgetInLakhs: 20, commercialScaleBudgetInCrores: 2.0, currency: 'INR (₹)' },
      timeline: data.timeline || {
        publishDate: new Date().toISOString().substring(0, 10),
        applicationDeadline: '2026-09-30',
        pilotDurationMonths: 4
      },
      evaluationWeights: data.evaluationWeights || [
        { id: 'crit-1', name: 'Problem Fit', weight: 20, description: 'Alignment with municipal need' },
        { id: 'crit-2', name: 'Innovation & Tech', weight: 15, description: 'Novelty of approach' },
        { id: 'crit-3', name: 'Feasibility', weight: 20, description: 'Ease of deployment' },
        { id: 'crit-4', name: 'Team Capability', weight: 10, description: 'Track record' },
        { id: 'crit-5', name: 'Cybersecurity', weight: 10, description: 'Data protection' },
        { id: 'crit-6', name: 'Cost Effectiveness', weight: 10, description: 'Unit economics' },
        { id: 'crit-7', name: 'Scale Potential', weight: 15, description: 'Replicability across ULBs' }
      ],
      pilotKPIs: data.pilotKPIs || [
        {
          id: 'kpi-new-1',
          name: 'Primary Outcome Metric',
          baselineValue: 100,
          targetValue: 30,
          unit: '% reduction',
          direction: 'increase',
          verificationMethod: 'Independent third-party verification'
        }
      ],
      status: 'published',
      proposalsCount: 0
    };

    setChallenges((prev) => [newChallenge, ...prev]);
    setSelectedChallengeId(newId);
    addAuditLog('CHALLENGE_CREATED', 'CHALLENGE', `Created and published challenge "${newChallenge.title}" with code ${newChallenge.challengeCode}`, 'Rajesh Patil, IAS', 'gov_officer');
    showToast('Challenge Published!', `Challenge "${newChallenge.title}" is now active for startup discovery.`, 'success');
  };

  const publishChallenge = (id: string) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'published' } : c))
    );
    addAuditLog('CHALLENGE_PUBLISHED', 'CHALLENGE', `Challenge ID ${id} transitioned from draft to published`, 'Rajesh Patil, IAS', 'gov_officer');
    showToast('Challenge Live', 'Challenge is now open for startup submissions.', 'success');
  };

  const updateStartupProfile = (updates: Partial<StartupProfile>) => {
    setStartupProfile((prev) => ({ ...prev, ...updates }));
    showToast('Profile Updated', 'Startup credentials and certificates synchronized.', 'success');
    addAuditLog('PROFILE_UPDATED', 'PROPOSAL', 'Updated technical stack, certifications and team members', startupProfile.name, 'startup');
  };

  const submitProposal = (proposalData: Partial<Proposal>) => {
    const newPropId = `prop-${Date.now().toString().slice(-4)}`;
    const newProposal: Proposal = {
      id: newPropId,
      challengeId: proposalData.challengeId || 'chal-001',
      startupId: startupProfile.id,
      startupName: startupProfile.name,
      title: proposalData.title || 'Innovative Solution Proposal',
      submissionDate: new Date().toISOString().substring(0, 10),
      executiveSummary: proposalData.executiveSummary || '',
      technicalArchitecture: proposalData.technicalArchitecture || '',
      deploymentPlan: proposalData.deploymentPlan || '',
      costBreakdownLakhs: proposalData.costBreakdownLakhs || 24.5,
      cybersecuritySafeguards: proposalData.cybersecuritySafeguards || 'Compliant with CERT-In guidelines & DPDP Act 2023',
      status: 'submitted',
      assignedEvaluatorIds: ['eval-001', 'eval-002'],
      compositeScore: 89.4,
      aiSummary: {
        keyStrengths: [
          'Direct alignment with municipal outcome KPI specifications',
          'Field-tested sensor durability verified in prior ULB proof-of-concepts',
          'Local Maharashtra engineering presence facilitates 24hr SLA support'
        ],
        potentialRisks: ['Requires continuous driver adoption monitoring'],
        expectedFeasibility: 'High - TRL 7 certified',
        trlAssessment: 'TRL 7 - Proven prototype in relevant municipal environment',
        alignmentScore: 97
      },
      evaluations: []
    };

    setProposals((prev) => [newProposal, ...prev]);
    setChallenges((prev) =>
      prev.map((c) =>
        c.id === newProposal.challengeId ? { ...c, proposalsCount: c.proposalsCount + 1 } : c
      )
    );
    addAuditLog('PROPOSAL_SUBMITTED', 'PROPOSAL', `Submitted proposal "${newProposal.title}" for challenge ${newProposal.challengeId}`, startupProfile.name, 'startup');
    showToast('Proposal Submitted!', 'Your proposal has been logged with cryptographic verification hash.', 'success');
    setIsProposalModalOpen(false);
  };

  const assignEvaluators = (proposalId: string, evaluatorIds: string[]) => {
    setProposals((prev) =>
      prev.map((p) =>
        p.id === proposalId ? { ...p, assignedEvaluatorIds: evaluatorIds, status: 'under_review' } : p
      )
    );
    const names = evaluatorIds.map((id) => users.find((u) => u.id === id)?.name || id).join(', ');
    addAuditLog('REVIEWERS_ASSIGNED', 'ADMIN', `Assigned evaluators [${names}] to proposal ID ${proposalId}`, 'Admin Cell', 'admin');
    showToast('Evaluators Assigned', `Proposal assigned to ${evaluatorIds.length} expert reviewers.`, 'info');
  };

  const submitEvaluationRecord = (evaluation: EvaluationRecord) => {
    setProposals((prev) =>
      prev.map((p) => {
        if (p.id === evaluation.proposalId) {
          const existingEvals = p.evaluations.filter((e) => e.evaluatorId !== evaluation.evaluatorId);
          const allEvals = [...existingEvals, evaluation];
          const avgScore = allEvals.reduce((acc, curr) => acc + curr.totalScore, 0) / allEvals.length;
          return {
            ...p,
            evaluations: allEvals,
            compositeScore: Number(avgScore.toFixed(1)),
            status: avgScore >= 80 ? 'shortlisted' : p.status
          };
        }
        return p;
      })
    );

    addAuditLog(
      'EVALUATION_SUBMITTED',
      'EVALUATION',
      `Evaluator ${evaluation.evaluatorName} scored proposal with ${evaluation.totalScore}/100. Recommendation: ${evaluation.recommendation}`,
      evaluation.evaluatorName,
      'evaluator'
    );
    showToast('Evaluation Submitted!', `Score of ${evaluation.totalScore}/100 recorded with signed conflict-of-interest certificate.`, 'success');
  };

  const selectStartupForPilot = (challengeId: string, startupId: string, startupName: string) => {
    setChallenges((prev) =>
      prev.map((c) =>
        c.id === challengeId
          ? {
              ...c,
              status: 'pilot_active',
              selectedStartupId: startupId,
              selectedStartupName: startupName,
              scaleUpStatus: 'recommended'
            }
          : c
      )
    );
    setProposals((prev) =>
      prev.map((p) =>
        p.challengeId === challengeId
          ? {
              ...p,
              status: p.startupId === startupId ? 'selected_for_pilot' : p.status
            }
          : p
      )
    );
    addAuditLog(
      'STARTUP_SELECTED_FOR_PILOT',
      'DECISION',
      `Government Officer selected ${startupName} for 4-Month outcome-based pilot deployment across 50 locations`,
      'Rajesh Patil, IAS',
      'gov_officer'
    );
    showToast('Startup Awarded Pilot!', `${startupName} has been selected. Pilot dashboard is now active.`, 'success');
  };

  const updatePilotMilestone = (milestoneId: string, status: PilotMilestone['status'], evidence?: string) => {
    setPilotState((prev) => ({
      ...prev,
      milestones: prev.milestones.map((m) =>
        m.id === milestoneId
          ? {
              ...m,
              status,
              evidenceSubmitted: evidence || m.evidenceSubmitted,
              completionDate: status === 'verified' ? new Date().toISOString().substring(0, 10) : m.completionDate
            }
          : m
      )
    }));
    addAuditLog('MILESTONE_UPDATED', 'PILOT', `Milestone ${milestoneId} updated to status: ${status}`, 'EcoSight & Field Officer', 'startup');
    showToast('Milestone Updated', `Milestone status changed to ${status}.`, 'info');
  };

  const updatePilotKPI = (kpiId: string, achieved: number) => {
    setPilotState((prev) => ({
      ...prev,
      kpiResults: prev.kpiResults.map((k) =>
        k.kpiId === kpiId
          ? {
              ...k,
              achieved,
              isMet: k.direction === 'increase' ? achieved >= k.target : achieved <= k.target
            }
          : k
      )
    }));
    addAuditLog('KPI_TELEMETRY_UPDATED', 'PILOT', `KPI ${kpiId} actual field telemetry updated to ${achieved}`, 'IoT Telemetry Gateway', 'startup');
    showToast('KPI Updated', `Achieved metric updated to ${achieved}. Planned vs actual variances recalculated.`, 'success');
  };

  const toggleValidationCheck = (checkId: string) => {
    setPilotState((prev) => ({
      ...prev,
      validationChecklist: prev.validationChecklist.map((c) =>
        c.id === checkId
          ? {
              ...c,
              validated: !c.validated,
              verifiedOn: !c.validated ? new Date().toISOString().substring(0, 10) : undefined
            }
          : c
      )
    }));
    showToast('Validation Toggled', 'Independent audit checklist item updated.', 'info');
  };

  const approveScaleUpDecision = (notes: string) => {
    setPilotState((prev) => ({
      ...prev,
      scaleUpRecommendation: 'Recommended for Scale-up',
      decisionNotes: notes,
      decisionDate: new Date().toISOString().substring(0, 10),
      signedByOfficer: 'Shri Rajesh Patil, IAS (BMC) & Smt. Manisha Mhaiskar, IAS (Principal Secretary)'
    }));
    setChallenges((prev) =>
      prev.map((c) =>
        c.id === 'chal-001' ? { ...c, scaleUpStatus: 'approved', status: 'scale_up_approved' } : c
      )
    );
    addAuditLog(
      'SCALE_UP_SANCTIONED',
      'DECISION',
      'Formal scale-up sanction granted for commercial procurement across 4,000 bins under Rule 149 GFR exemption',
      'Rajesh Patil, IAS',
      'gov_officer'
    );
    showToast('Scale-Up Sanctioned!', 'Government scale-up approval executed. Innovation Passport ready for official distribution.', 'success');
  };

  const resetAllDemoData = () => {
    setChallenges(INITIAL_CHALLENGES);
    setStartupProfile(INITIAL_STARTUP_PROFILE);
    setProposals(INITIAL_PROPOSALS);
    setPilotState(INITIAL_PILOT_STATE);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setUsers(INITIAL_USERS);
    setSelectedChallengeId('chal-001');
    setSelectedProposalId('prop-001');
    setJourneyStageState(1);
    setRoleState('gov_officer');
    setActiveTab('dashboard');
    showToast('Demo Reset', 'All data reset to initial scenario stage.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        activeTab,
        setActiveTab,
        challenges,
        selectedChallengeId,
        setSelectedChallengeId,
        selectedChallenge,
        startupProfile,
        updateStartupProfile,
        proposals,
        selectedProposalId,
        setSelectedProposalId,
        pilotState,
        auditLogs,
        users,
        journeyStage,
        setJourneyStage,
        advanceJourneyStage,
        resetAllDemoData,
        createChallenge,
        publishChallenge,
        submitProposal,
        assignEvaluators,
        submitEvaluationRecord,
        selectStartupForPilot,
        updatePilotMilestone,
        updatePilotKPI,
        toggleValidationCheck,
        approveScaleUpDecision,
        isCreateChallengeOpen,
        setIsCreateChallengeOpen,
        isProposalModalOpen,
        setIsProposalModalOpen,
        isPassportModalOpen,
        setIsPassportModalOpen,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
