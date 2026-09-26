/**
 * InnovProcure Maharashtra - Core Type Definitions
 * SIH Problem Statement 26136: Outcome-based Innovation Procurement Platform
 */

export type UserRole = 'gov_officer' | 'startup' | 'evaluator' | 'admin' | 'passport_view';

export type ChallengeStatus = 'draft' | 'published' | 'evaluation' | 'pilot_active' | 'scale_up_approved' | 'completed' | 'closed';

export type ProposalStatus = 'submitted' | 'under_review' | 'shortlisted' | 'selected_for_pilot' | 'rejected' | 'completed';

export interface PilotKPI {
  id: string;
  name: string;
  targetValue: number;
  unit: string;
  baselineValue: number;
  actualValue?: number;
  direction: 'increase' | 'decrease'; // whether higher or lower is better
  verificationMethod: string;
}

export interface ChallengeMilestone {
  id: string;
  title: string;
  month: number;
  deliverable: string;
  paymentPercentage: number;
}

export interface EvaluationCriteriaWeight {
  id: string;
  name: string;
  weight: number; // percentage, sum = 100
  description: string;
}

export interface Challenge {
  id: string;
  challengeCode: string; // e.g. MH-GOV-2026-089
  title: string;
  department: string;
  nodalOfficer: {
    name: string;
    designation: string;
    email: string;
    phone: string;
  };
  problemStatement: string;
  expectedOutcome: string;
  eligibility: {
    dpiitRequired: boolean;
    minTRL: number;
    sectors: string[];
    incorporationYearsMax: number;
    maharashtraRegisteredPreference: boolean;
  };
  location: {
    city: string;
    wardsCount: number;
    details: string;
    geoCoordinates?: string;
  };
  budget: {
    pilotBudgetInLakhs: number;
    commercialScaleBudgetInCrores: number;
    currency: string;
  };
  timeline: {
    publishDate: string;
    applicationDeadline: string;
    pilotDurationMonths: number;
    pilotStartDate?: string;
    pilotEndDate?: string;
  };
  evaluationWeights: EvaluationCriteriaWeight[];
  pilotKPIs: PilotKPI[];
  status: ChallengeStatus;
  proposalsCount: number;
  selectedStartupId?: string;
  selectedStartupName?: string;
  scaleUpStatus?: 'pending' | 'recommended' | 'approved' | 'extended' | 'closed';
}

export interface StartupTeamMember {
  name: string;
  role: string;
  experience: string;
  linkedIn?: string;
}

export interface StartupProfile {
  id: string;
  name: string;
  tagline: string;
  logoUrl?: string;
  incorporationDate: string;
  dpiitRecognitionNumber: string;
  maharashtraStartupId: string;
  udyamRegistration: string;
  headquarters: string;
  sectors: string[];
  technologyStack: string[];
  coreSkills: string[];
  trlLevel: number;
  team: StartupTeamMember[];
  pastWorkHistory: {
    client: string;
    project: string;
    year: string;
    outcome: string;
  }[];
  certificates: {
    name: string;
    issuer: string;
    issueDate: string;
    verified: boolean;
  }[];
  documents: {
    name: string;
    type: string;
    size: string;
    uploadDate: string;
  }[];
  readinessScore: number;
}

export interface Proposal {
  id: string;
  challengeId: string;
  startupId: string;
  startupName: string;
  title: string;
  submissionDate: string;
  executiveSummary: string;
  technicalArchitecture: string;
  deploymentPlan: string;
  costBreakdownLakhs: number;
  cybersecuritySafeguards: string;
  status: ProposalStatus;
  assignedEvaluatorIds: string[];
  compositeScore?: number;
  aiSummary: {
    keyStrengths: string[];
    potentialRisks: string[];
    expectedFeasibility: string;
    trlAssessment: string;
    alignmentScore: number;
  };
  evaluations: EvaluationRecord[];
}

export interface EvaluationScoreItem {
  criteriaId: string;
  criteriaName: string;
  score: number; // 1 to 10
  maxScore: number;
  weightedScore: number;
  evaluatorNotes: string;
}

export interface EvaluationRecord {
  id: string;
  proposalId: string;
  evaluatorId: string;
  evaluatorName: string;
  evaluatorAffiliation: string;
  conflictOfInterestDeclared: boolean;
  scores: EvaluationScoreItem[];
  totalScore: number; // out of 100
  strengths: string;
  concerns: string;
  recommendation: 'strongly_recommend' | 'recommend' | 'needs_revision' | 'reject';
  submittedAt: string;
  status: 'draft' | 'submitted';
}

export interface PilotMilestone {
  id: string;
  title: string;
  targetMonth: number;
  deliverables: string;
  tranchePercentage: number;
  paymentStatus: 'pending' | 'in_review' | 'disbursed';
  status: 'not_started' | 'in_progress' | 'completed' | 'verified';
  evidenceSubmitted?: string;
  completionDate?: string;
}

export interface PilotEvidence {
  id: string;
  title: string;
  type: 'telemetry_log' | 'geotagged_photo' | 'ward_certification' | 'third_party_audit' | 'video';
  timestamp: string;
  source: string;
  verifiedByValidator: boolean;
  url: string;
  description: string;
}

export interface PilotValidationItem {
  id: string;
  check: string;
  category: 'technical' | 'field_compliance' | 'citizen_satisfaction' | 'data_security';
  validated: boolean;
  validatorAgency: string;
  verifiedOn?: string;
  remarks?: string;
}

export interface PilotState {
  challengeId: string;
  startupId: string;
  startupName: string;
  startDate: string;
  scheduledEndDate: string;
  progressPercentage: number;
  milestones: PilotMilestone[];
  kpiResults: {
    kpiId: string;
    name: string;
    baseline: number;
    target: number;
    achieved: number;
    unit: string;
    direction: 'increase' | 'decrease';
    isMet: boolean;
  }[];
  weeklyData: {
    week: string;
    plannedReduction: number;
    actualReduction: number;
    uptimePercentage: number;
    routeEfficiency: number;
  }[];
  risks: {
    id: string;
    risk: string;
    severity: 'Low' | 'Medium' | 'High';
    mitigation: string;
    status: 'Monitored' | 'Mitigated' | 'Open';
  }[];
  evidences: PilotEvidence[];
  validationChecklist: PilotValidationItem[];
  independentValidator: {
    institution: string;
    leadValidator: string;
    reportRef: string;
    status: 'in_progress' | 'certified';
    certificationDate?: string;
  };
  scaleReadinessScore: number;
  scaleUpRecommendation: 'Recommended for Scale-up' | 'Pilot Extension Needed' | 'Pilot Concluded' | 'Not Recommended';
  decisionNotes?: string;
  decisionDate?: string;
  signedByOfficer?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  category: 'CHALLENGE' | 'PROPOSAL' | 'EVALUATION' | 'PILOT' | 'DECISION' | 'ADMIN';
  details: string;
  hash: string;
}

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  departmentOrOrganization: string;
  status: 'active' | 'pending_approval' | 'inactive';
  expertiseArea?: string[];
  assignedProposalsCount?: number;
}
