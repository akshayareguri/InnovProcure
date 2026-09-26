/**
 * Mock Data for InnovProcure Maharashtra (SIH 26136)
 * Scenario: Brihanmumbai Municipal Corporation & EcoSight Analytics
 */

import { Challenge, StartupProfile, Proposal, PilotState, AuditLog, SystemUser } from '../types';

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'chal-001',
    challengeCode: 'MH-BMC-2026-PS26136',
    title: 'Municipal Waste-Bin Overflow Reduction in 50 High-Density Urban Locations',
    department: 'Urban Development Department & Brihanmumbai Municipal Corporation (BMC)',
    nodalOfficer: {
      name: 'Shri Rajesh Patil, IAS',
      designation: 'Additional Municipal Commissioner (Solid Waste Management)',
      email: 'rajesh.patil@mcgm.gov.in',
      phone: '+91 22 2262 0251'
    },
    problemStatement: 'High-density wards in Mumbai (Wards A, G-North, and K-East) experience recurring solid waste-bin overflows causing secondary littering, public hygiene hazards, and erratic collection cycles during peak market hours. Existing fixed-route trucks cannot predict surge overflow periods.',
    expectedOutcome: 'Achieve a minimum 30% reduction in waste-bin overflow incidents across 50 earmarked high-density bins over a 4-month pilot period, with >=95% telemetry uptime and >=15% route dispatch optimization.',
    eligibility: {
      dpiitRequired: true,
      minTRL: 6,
      sectors: ['GovTech', 'CleanTech', 'Smart Cities', 'IoT & Edge AI'],
      incorporationYearsMax: 10,
      maharashtraRegisteredPreference: true
    },
    location: {
      city: 'Mumbai',
      wardsCount: 3,
      details: '50 identified chronic overflow points across Dadar Flower Market, Dharavi 90-ft Road, Andheri West Market',
      geoCoordinates: '19.0178° N, 72.8478° E'
    },
    budget: {
      pilotBudgetInLakhs: 25.0,
      commercialScaleBudgetInCrores: 2.80,
      currency: 'INR (₹)'
    },
    timeline: {
      publishDate: '2026-06-15',
      applicationDeadline: '2026-07-15',
      pilotDurationMonths: 4,
      pilotStartDate: '2026-08-01',
      pilotEndDate: '2026-11-30'
    },
    evaluationWeights: [
      { id: 'crit-1', name: 'Problem Fit & Alignment', weight: 20, description: 'Directness of technical solution to address urban bin overflow without heavy civic disruption' },
      { id: 'crit-2', name: 'Innovation & Technical Novelty', weight: 15, description: 'Edge AI, robust sensor design resistant to moisture/vandalism, and predictive dispatch' },
      { id: 'crit-3', name: 'Feasibility & Pilot Readiness', weight: 20, description: 'Ability to deploy on 50 field locations within 14 days and integrate with BMC GIS' },
      { id: 'crit-4', name: 'Team Capability & Domain Track Record', weight: 10, description: 'Technical expertise in embedded IoT, municipal workflows, and data pipelines' },
      { id: 'crit-5', name: 'Cybersecurity & Data Safeguards', weight: 10, description: 'Safe-to-host certification, Indian data localization, end-to-end sensor encryption' },
      { id: 'crit-6', name: 'Cost-Effectiveness & Unit Economics', weight: 10, description: 'Per-bin deployment & maintenance cost feasibility for scaling to 4,000+ bins' },
      { id: 'crit-7', name: 'Scale Potential across Maharashtra ULBs', weight: 15, description: 'Replicability in Pune, Nagpur, Nashik, and Tier-2 Urban Local Bodies' }
    ],
    pilotKPIs: [
      {
        id: 'kpi-1',
        name: 'Reduction in Waste-Bin Overflow Incidents',
        baselineValue: 142,
        targetValue: 30, // 30% reduction
        unit: '% reduction',
        direction: 'increase',
        verificationMethod: 'Automated optical validation + independent field audits by VJTI'
      },
      {
        id: 'kpi-2',
        name: 'Collection Route Efficiency Gain',
        baselineValue: 0,
        targetValue: 15, // 15% improvement
        unit: '% efficiency gain',
        direction: 'increase',
        verificationMethod: 'Vehicle Tracking System (VTS) fuel & route telemetry comparison'
      },
      {
        id: 'kpi-3',
        name: 'Sensor Telemetry Network Uptime',
        baselineValue: 0,
        targetValue: 95,
        unit: '% uptime',
        direction: 'increase',
        verificationMethod: 'Continuous ping and heartbeat logs on Maharashtra State Cloud (MahaState Data Centre)'
      }
    ],
    status: 'pilot_active',
    proposalsCount: 3,
    selectedStartupId: 'startup-001',
    selectedStartupName: 'EcoSight Analytics',
    scaleUpStatus: 'recommended'
  },
  {
    id: 'chal-002',
    challengeCode: 'MH-PWD-2026-042',
    title: 'Automated AI Pothole Detection & Rapid Repair Triaging',
    department: 'Public Works Department (PWD), Maharashtra',
    nodalOfficer: {
      name: 'Dr. Vivek Shinde',
      designation: 'Chief Engineer (Roads & Bridges)',
      email: 'ce.roads@mahapwd.gov.in',
      phone: '+91 22 2202 5431'
    },
    problemStatement: 'Monsoon deterioration of state highways leads to dangerous road craters. Manual surveys are slow, inaccurate, and delay immediate contractor liability enforcement.',
    expectedOutcome: 'Camera-mounted bus/vehicle edge vision to detect 90% of potholes with geo-accuracy under 2 meters, generating auto-workorders within 6 hours.',
    eligibility: {
      dpiitRequired: true,
      minTRL: 7,
      sectors: ['DeepTech', 'Transportation', 'Computer Vision'],
      incorporationYearsMax: 8,
      maharashtraRegisteredPreference: true
    },
    location: {
      city: 'Pune - Solapur Corridor',
      wardsCount: 1,
      details: '120 km stretch of State Highway 27'
    },
    budget: {
      pilotBudgetInLakhs: 30.0,
      commercialScaleBudgetInCrores: 4.20,
      currency: 'INR (₹)'
    },
    timeline: {
      publishDate: '2026-07-01',
      applicationDeadline: '2026-08-15',
      pilotDurationMonths: 3
    },
    evaluationWeights: [],
    pilotKPIs: [],
    status: 'published',
    proposalsCount: 5
  },
  {
    id: 'chal-003',
    challengeCode: 'MH-MEDA-2026-018',
    title: 'Solar Feeder Micro-Grid Load Balancing for Rural Agri-Feeders',
    department: 'Maharashtra Energy Development Agency (MEDA) & MSEDCL',
    nodalOfficer: {
      name: 'Smt. Ananya Kulkarni',
      designation: 'Director (Renewable Procurement)',
      email: 'dir.solar@mahaurja.com',
      phone: '+91 20 2970 0200'
    },
    problemStatement: 'Solar agricultural pumps introduce reverse power surges during noon hours, causing feeder trip-offs and transformer burnout in Marathwada farming belts.',
    expectedOutcome: 'Distributed IoT battery storage orchestration to smooth feeder voltage fluctuations by 40% during peak solar generation hours.',
    eligibility: {
      dpiitRequired: true,
      minTRL: 6,
      sectors: ['CleanTech', 'Energy', 'Power Systems'],
      incorporationYearsMax: 7,
      maharashtraRegisteredPreference: false
    },
    location: {
      city: 'Nashik & Aurangabad Rural',
      wardsCount: 2,
      details: '4 dedicated 11kV agricultural feeders'
    },
    budget: {
      pilotBudgetInLakhs: 35.0,
      commercialScaleBudgetInCrores: 5.50,
      currency: 'INR (₹)'
    },
    timeline: {
      publishDate: '2026-07-10',
      applicationDeadline: '2026-08-30',
      pilotDurationMonths: 6
    },
    evaluationWeights: [],
    pilotKPIs: [],
    status: 'published',
    proposalsCount: 2
  }
];

export const INITIAL_STARTUP_PROFILE: StartupProfile = {
  id: 'startup-001',
  name: 'EcoSight Analytics Pvt Ltd',
  tagline: 'Edge AI & Industrial IoT for Intelligent Urban Sanitation Infrastructure',
  incorporationDate: '2022-04-12',
  dpiitRecognitionNumber: 'DIPP94812',
  maharashtraStartupId: 'MH-STR-2023-01984',
  udyamRegistration: 'UDYAM-MH-19-0048192',
  headquarters: 'Powai, Mumbai, Maharashtra 400076',
  sectors: ['GovTech', 'CleanTech', 'Smart Cities', 'Edge AI', 'IoT'],
  technologyStack: [
    'LoRaWAN / 4G Fallback Telemetry',
    'Ultrasonic Dual-Beam Fill Sensors',
    'Edge Computer Vision (YOLOv8 nano)',
    'FastAPI & TimescaleDB Core',
    'GIS Leaflet / Mapbox Route Optimizer'
  ],
  coreSkills: [
    'Embedded Firmware & Low Power IoT',
    'Ruggedized IP67 Enclosure Engineering',
    'Real-time Routing & Fleet Dispatch',
    'Government API & Smart Cities Mission Integration'
  ],
  trlLevel: 7,
  team: [
    {
      name: 'Aditya Deshmukh',
      role: 'Co-Founder & CEO',
      experience: 'Ex-Siemens Smart Infrastructure, B.Tech IIT Bombay (10 yrs exp in Urban Tech)'
    },
    {
      name: 'Dr. Priya Rao',
      role: 'Co-Founder & Chief AI Scientist',
      experience: 'Ph.D. Computer Vision from VJTI Mumbai, 5 IEEE publications on spatial analysis'
    },
    {
      name: 'Farhan Sayed',
      role: 'VP Hardware & Embedded Systems',
      experience: '8+ years designing low-power LPWAN battery-operated sensors for harsh conditions'
    }
  ],
  pastWorkHistory: [
    {
      client: 'Thane Municipal Corporation',
      project: 'Proof-of-Concept for 15 Commercial Ward Bins',
      year: '2024',
      outcome: 'Validated 98.4% sensor durability over monsoon season and 22% reduction in uncollected bins'
    },
    {
      client: 'Navi Mumbai Smart City Ltd',
      project: 'Depot Waste Weighbridge Automation',
      year: '2023',
      outcome: 'Cut weighbridge turnaround time by 4 minutes per dumper truck'
    }
  ],
  certificates: [
    {
      name: 'DPIIT Startup Recognition Certificate',
      issuer: 'Ministry of Commerce & Industry, Govt of India',
      issueDate: '2022-05-10',
      verified: true
    },
    {
      name: 'ISO 27001:2022 Information Security Management',
      issuer: 'TUV SUD South Asia',
      issueDate: '2023-11-14',
      verified: true
    },
    {
      name: 'Cert-In Empanelled Safe-to-Host Audit Clearance',
      issuer: 'Standardisation Testing and Quality Certification (STQC)',
      issueDate: '2024-02-20',
      verified: true
    }
  ],
  documents: [
    {
      name: 'EcoSight_Technical_Whitepaper_IoT_Sensors.pdf',
      type: 'PDF Document',
      size: '4.8 MB',
      uploadDate: '2026-06-20'
    },
    {
      name: 'Audited_Financials_FY24_25.pdf',
      type: 'Financial Audit',
      size: '2.1 MB',
      uploadDate: '2026-06-18'
    },
    {
      name: 'Indian_Patent_Pending_202321049210_DualSensor.pdf',
      type: 'Patent Filing',
      size: '1.4 MB',
      uploadDate: '2026-06-10'
    }
  ],
  readinessScore: 94
};

export const INITIAL_PROPOSALS: Proposal[] = [
  {
    id: 'prop-001',
    challengeId: 'chal-001',
    startupId: 'startup-001',
    startupName: 'EcoSight Analytics Pvt Ltd',
    title: 'EcoSight SenseNet: Dual-Beam Ultrasonic IoT & Edge Vision for Zero Waste-Bin Overflow',
    submissionDate: '2026-07-08',
    executiveSummary: 'We deploy ruggedized solar/battery dual-beam ultrasonic fill sensors coupled with low-power edge computer vision modules on 50 chronic overflow bins in Mumbai. Our predictive dispatch algorithm dynamically alerts BMC ward supervisors 45 minutes before estimated overflow, integrating seamlessly into existing municipal GPS truck fleets.',
    technicalArchitecture: '1. Sensor Layer: IP67 dual-beam ultrasound + optical camera lens with mechanical wiper blade to survive toxic landfill gases and heavy monsoons.\n2. Connectivity: Dual SIM (Airtel/Jio) NB-IoT with LoRaWAN fallback on MahaNet gateway.\n3. Analytics & GIS: Predictive ARIMA + spatial regression on historical ward waste cycles hosted on MahaState Cloud.\n4. Integration: Webhook & REST API to BMC SAP Waste Management System and WhatsApp alerts for ward mukadams (supervisors).',
    deploymentPlan: 'Week 1-2: Mechanical bracket fabrication & sensor installation on 50 designated bins in Dadar, Dharavi, Andheri.\nWeek 3: Calibration with BMC truck route data & supervisor training.\nWeek 4-16: Active pilot telemetry, automated dispatching, weekly milestone audits.',
    costBreakdownLakhs: 24.50,
    cybersecuritySafeguards: 'Hardware tamper detection triggers instant zeroize; TLS 1.3 AES-256 telemetry encryption; hosted on STQC-certified cloud within Mumbai; strictly no PII captured (faces and vehicle numbers auto-blurred on edge chip before transmission).',
    status: 'selected_for_pilot',
    assignedEvaluatorIds: ['eval-001', 'eval-002'],
    compositeScore: 89.4,
    aiSummary: {
      keyStrengths: [
        'Proprietary dual-beam ultrasonic tech resolves common acoustic false-positives caused by plastic bags',
        'Direct local manufacturing in Pune ensures 48-hour hardware replacement warranty',
        'Proven field trial in Thane municipal corporation with high durability record'
      ],
      potentialRisks: [
        'Camera lens vandalism risk in unsupervised night markets (mitigated via tamper-caged casing)',
        'Battery degradation during prolonged cloudy monsoon days (mitigated with 14-day lithium buffer)'
      ],
      expectedFeasibility: 'High (TRL 7 verified). Solution is field-ready with minimal civic alteration.',
      trlAssessment: 'TRL 7 - System prototype demonstrated in operational municipal environment.',
      alignmentScore: 96
    },
    evaluations: [
      {
        id: 'eval-rec-001',
        proposalId: 'prop-001',
        evaluatorId: 'eval-001',
        evaluatorName: 'Prof. Dr. Aniruddha Kulkarni',
        evaluatorAffiliation: 'Centre for Urban Science & Engineering, IIT Bombay',
        conflictOfInterestDeclared: true,
        scores: [
          { criteriaId: 'crit-1', criteriaName: 'Problem Fit & Alignment', score: 9.5, maxScore: 10, weightedScore: 19.0, evaluatorNotes: 'Direct match to BMC Ward A & G-North chronic overflow problem.' },
          { criteriaId: 'crit-2', criteriaName: 'Innovation & Technical Novelty', score: 9.0, maxScore: 10, weightedScore: 13.5, evaluatorNotes: 'Edge vision combined with dual ultrasonic eliminates false alerts effectively.' },
          { criteriaId: 'crit-3', criteriaName: 'Feasibility & Pilot Readiness', score: 9.0, maxScore: 10, weightedScore: 18.0, evaluatorNotes: 'Brackets require zero drilling into municipal masonry; rapid deployment.' },
          { criteriaId: 'crit-4', criteriaName: 'Team Capability & Track Record', score: 8.5, maxScore: 10, weightedScore: 8.5, evaluatorNotes: 'Strong engineering team with municipal domain understanding.' },
          { criteriaId: 'crit-5', criteriaName: 'Cybersecurity & Data Safeguards', score: 9.0, maxScore: 10, weightedScore: 9.0, evaluatorNotes: 'Edge-blurring for privacy is compliant with DPDP Act 2023.' },
          { criteriaId: 'crit-6', criteriaName: 'Cost-Effectiveness', score: 8.5, maxScore: 10, weightedScore: 8.5, evaluatorNotes: 'Competitive unit economics under ₹1,200/month per bin maintenance.' },
          { criteriaId: 'crit-7', criteriaName: 'Scale Potential across ULBs', score: 9.0, maxScore: 10, weightedScore: 13.5, evaluatorNotes: 'High scale potential for Pune, Pimpri-Chinchwad, and Nagpur.' }
        ],
        totalScore: 90.0,
        strengths: 'Technically solid, robust hardware enclosure suited for humid coastal Mumbai climate, clear API integration design.',
        concerns: 'Ensure local ward supervisors are given Marathi language UI alerts on WhatsApp.',
        recommendation: 'strongly_recommend',
        submittedAt: '2026-07-20 14:30',
        status: 'submitted'
      },
      {
        id: 'eval-rec-002',
        proposalId: 'prop-001',
        evaluatorId: 'eval-002',
        evaluatorName: 'Smt. Sunita Deshmukh',
        evaluatorAffiliation: 'Dept of IoT & Smart Cities, VJTI Mumbai',
        conflictOfInterestDeclared: true,
        scores: [
          { criteriaId: 'crit-1', criteriaName: 'Problem Fit & Alignment', score: 9.0, maxScore: 10, weightedScore: 18.0, evaluatorNotes: 'Solves the 45-minute response window dilemma.' },
          { criteriaId: 'crit-2', criteriaName: 'Innovation & Technical Novelty', score: 8.5, maxScore: 10, weightedScore: 12.75, evaluatorNotes: 'Good use of low-power NB-IoT protocols.' },
          { criteriaId: 'crit-3', criteriaName: 'Feasibility & Pilot Readiness', score: 9.0, maxScore: 10, weightedScore: 18.0, evaluatorNotes: 'Ready to ship from Maharashtra warehouse.' },
          { criteriaId: 'crit-4', criteriaName: 'Team Capability & Track Record', score: 9.0, maxScore: 10, weightedScore: 9.0, evaluatorNotes: 'Prior experience in Thane proves execution capability.' },
          { criteriaId: 'crit-5', criteriaName: 'Cybersecurity & Data Safeguards', score: 8.5, maxScore: 10, weightedScore: 8.5, evaluatorNotes: 'Cert-In audited platform architecture.' },
          { criteriaId: 'crit-6', criteriaName: 'Cost-Effectiveness', score: 9.0, maxScore: 10, weightedScore: 9.0, evaluatorNotes: 'Fits within ₹25L pilot grant cap comfortably.' },
          { criteriaId: 'crit-7', criteriaName: 'Scale Potential across ULBs', score: 9.0, maxScore: 10, weightedScore: 13.5, evaluatorNotes: 'Highly modular cloud architecture.' }
        ],
        totalScore: 88.75,
        strengths: 'Excellent low-power sensor design and field durability test results.',
        concerns: 'Needs close coordination with BMC Solid Waste transport dispatchers.',
        recommendation: 'strongly_recommend',
        submittedAt: '2026-07-21 11:15',
        status: 'submitted'
      }
    ]
  },
  {
    id: 'prop-002',
    challengeId: 'chal-001',
    startupId: 'startup-002',
    startupName: 'UrbanClean Tech Solutions',
    title: 'CleanTrack: Optical Weight & Volumetric Laser Bin Sensor Grid',
    submissionDate: '2026-07-11',
    executiveSummary: 'Uses laser-lidar sensors and load cells attached to bin wheels to measure both weight and volume. Connected via 4G SIM to central monitoring dashboard.',
    technicalArchitecture: 'Load cells installed under bin base + optical LiDAR at rim.',
    deploymentPlan: 'Requires replacing existing 50 bin bases with specialized load-cell plates.',
    costBreakdownLakhs: 24.90,
    cybersecuritySafeguards: 'Standard HTTPS encryption and AWS Mumbai hosting.',
    status: 'under_review',
    assignedEvaluatorIds: ['eval-001'],
    compositeScore: 74.2,
    aiSummary: {
      keyStrengths: ['Dual measurement of both weight and volume prevents light debris miscalculation'],
      potentialRisks: ['Load cells on wheel bases are fragile and vulnerable to rough manual bin emptying by compactors'],
      expectedFeasibility: 'Moderate. High mechanical failure risk during heavy monsoons.',
      trlAssessment: 'TRL 5 - Component validated in laboratory environment.',
      alignmentScore: 78
    },
    evaluations: []
  },
  {
    id: 'prop-003',
    challengeId: 'chal-001',
    startupId: 'startup-003',
    startupName: 'SensorCity India Pvt Ltd',
    title: 'SmartBin IoT Mesh for Urban Density Zones',
    submissionDate: '2026-07-14',
    executiveSummary: 'Zigbee mesh network of infrared proximity sensors reporting to a central ward gateway with automated SMS dispatch.',
    technicalArchitecture: 'Infrared LED reflection sensors mounted on bin lids.',
    deploymentPlan: 'Installation of 50 lid sensors and 5 central gateway poles.',
    costBreakdownLakhs: 21.00,
    cybersecuritySafeguards: 'Cloud hosted in Pune datacenter with basic API keys.',
    status: 'under_review',
    assignedEvaluatorIds: ['eval-002'],
    compositeScore: 78.6,
    aiSummary: {
      keyStrengths: ['Low component cost and rapid production capacity'],
      potentialRisks: ['Infrared lenses smudge rapidly due to organic kitchen garbage steam and oil splatter'],
      expectedFeasibility: 'Moderate-Low. Infrared lenses require frequent daily wiping.',
      trlAssessment: 'TRL 6 - System prototype demonstrated in controlled municipal tests.',
      alignmentScore: 81
    },
    evaluations: []
  }
];

export const INITIAL_PILOT_STATE: PilotState = {
  challengeId: 'chal-001',
  startupId: 'startup-001',
  startupName: 'EcoSight Analytics Pvt Ltd',
  startDate: '2026-08-01',
  scheduledEndDate: '2026-11-30',
  progressPercentage: 100, // Completed 4-month pilot
  milestones: [
    {
      id: 'm-1',
      title: 'Phase 1: Sensor Deployment & Baseline Calibration',
      targetMonth: 1,
      deliverables: '50 units of dual-beam IoT sensors deployed on high-density bins across Dadar, Dharavi, and Andheri. Network telemetry verified on MahaState Cloud.',
      tranchePercentage: 30,
      paymentStatus: 'disbursed',
      status: 'verified',
      evidenceSubmitted: 'Geo-tagged photographic registry of all 50 bins + BMC Ward Junior Engineer physical sign-off',
      completionDate: '2026-08-28'
    },
    {
      id: 'm-2',
      title: 'Phase 2: Predictive Dispatch Integration & Live Operations',
      targetMonth: 2,
      deliverables: 'Integration with BMC vehicle tracking system (VTS). Real-time WhatsApp/Dashboard dispatch alerts triggered for 50 ward drivers.',
      tranchePercentage: 40,
      paymentStatus: 'disbursed',
      status: 'verified',
      evidenceSubmitted: 'API latency logs (avg 180ms), 1,240 automated dispatch triggers recorded with 96.2% driver response rate',
      completionDate: '2026-09-30'
    },
    {
      id: 'm-3',
      title: 'Phase 3: 60-Day Telemetry Rigor & Outcome Achievement',
      targetMonth: 3,
      deliverables: 'Full continuous operational testing. Demonstrate target reduction in waste-bin overflow incidents from 142/week baseline.',
      tranchePercentage: 20,
      paymentStatus: 'disbursed',
      status: 'verified',
      evidenceSubmitted: 'Weekly automated overflow incident reports validated against citizen complaint registers on BMC 1916 helpline',
      completionDate: '2026-10-31'
    },
    {
      id: 'm-4',
      title: 'Phase 4: Independent Academic Audit & Final Scale-up Evaluation',
      targetMonth: 4,
      deliverables: 'Comprehensive independent verification report by IIT Bombay Centre for Urban Science, safety audit, and Scale-Readiness Dossier.',
      tranchePercentage: 10,
      paymentStatus: 'disbursed',
      status: 'verified',
      evidenceSubmitted: 'Final IIT Bombay validation dossier Ref: IITB-CUSE-2026-VAL-094 confirming 34% overflow reduction and 18% route optimization',
      completionDate: '2026-11-28'
    }
  ],
  kpiResults: [
    {
      kpiId: 'kpi-1',
      name: 'Waste-Bin Overflow Incident Reduction',
      baseline: 142.0, // incidents per week across 50 bins
      target: 30.0, // 30% reduction => target <= 99.4 incidents
      achieved: 34.0, // 34% reduction => achieved 93.7 incidents!
      unit: '% reduction',
      direction: 'increase',
      isMet: true
    },
    {
      kpiId: 'kpi-2',
      name: 'Collection Route Dispatch Efficiency',
      baseline: 0.0,
      target: 15.0, // 15% efficiency gain
      achieved: 18.2, // 18.2% achieved!
      unit: '% efficiency gain',
      direction: 'increase',
      isMet: true
    },
    {
      kpiId: 'kpi-3',
      name: 'System Network Telemetry Uptime',
      baseline: 0.0,
      target: 95.0, // 95%
      achieved: 96.4, // 96.4% achieved!
      unit: '% uptime',
      direction: 'increase',
      isMet: true
    }
  ],
  weeklyData: [
    { week: 'W1 (Aug)', plannedReduction: 5, actualReduction: 6, uptimePercentage: 97.2, routeEfficiency: 4.5 },
    { week: 'W3 (Aug)', plannedReduction: 10, actualReduction: 12, uptimePercentage: 96.8, routeEfficiency: 7.8 },
    { week: 'W5 (Sep)', plannedReduction: 16, actualReduction: 19, uptimePercentage: 96.0, routeEfficiency: 11.2 },
    { week: 'W7 (Sep)', plannedReduction: 22, actualReduction: 24, uptimePercentage: 95.5, routeEfficiency: 13.6 },
    { week: 'W9 (Oct)', plannedReduction: 26, actualReduction: 28, uptimePercentage: 96.4, routeEfficiency: 15.4 },
    { week: 'W11 (Oct)', plannedReduction: 28, actualReduction: 31, uptimePercentage: 96.2, routeEfficiency: 16.9 },
    { week: 'W13 (Nov)', plannedReduction: 30, actualReduction: 33, uptimePercentage: 96.5, routeEfficiency: 17.5 },
    { week: 'W15 (Nov)', plannedReduction: 30, actualReduction: 34, uptimePercentage: 96.4, routeEfficiency: 18.2 }
  ],
  risks: [
    {
      id: 'risk-1',
      risk: 'Heavy coastal monsoons & waterlogging around low-lying bins in Dadar Market',
      severity: 'Medium',
      mitigation: 'IP67 submersible sonic transducers and silicone potting kept all 50 units functioning with zero water ingress.',
      status: 'Mitigated'
    },
    {
      id: 'risk-2',
      risk: 'Driver compliance with dynamic app-suggested rerouting',
      severity: 'High',
      mitigation: 'Incentive bonus system created for ward drivers maintaining <20 min turnaround to warning alerts.',
      status: 'Mitigated'
    },
    {
      id: 'risk-3',
      risk: 'Night-time optical camera occlusion from condensation',
      severity: 'Low',
      mitigation: 'Dual ultrasonic ultrasonic beam acts as primary trigger; camera only turns on for snapshot confirmation.',
      status: 'Mitigated'
    }
  ],
  evidences: [
    {
      id: 'ev-1',
      title: 'Geotagged & Timestamped Installation Photos (All 50 Bins)',
      type: 'geotagged_photo',
      timestamp: '2026-08-14 16:22',
      source: 'BMC Solid Waste Management Field App',
      verifiedByValidator: true,
      url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80',
      description: 'Physical inspection completed by Ward G-North Junior Engineer. Tamper seal serial numbers mapped to GIS database.'
    },
    {
      id: 'ev-2',
      title: 'BMC VTS Fleet Route Telemetry Audit Log',
      type: 'telemetry_log',
      timestamp: '2026-10-18 09:45',
      source: 'MahaState Data Centre API Endpoint /bmc/vts/logs',
      verifiedByValidator: true,
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
      description: 'Verifies 18.2% reduction in dead-heading miles and fuel consumption across 12 compactor trucks servicing the 50 pilot locations.'
    },
    {
      id: 'ev-3',
      title: 'IIT Bombay Independent Technical Validation Report',
      type: 'third_party_audit',
      timestamp: '2026-11-25 11:30',
      source: 'IIT Bombay Centre for Urban Science & Engineering (CUSE)',
      verifiedByValidator: true,
      url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80',
      description: 'Reference: IITB-CUSE-2026-VAL-094. Confirms that overflow incidents dropped from 142 to 93.7 (-34.0%), exceeding the 30% threshold.'
    },
    {
      id: 'ev-4',
      title: 'Ward Citizen Grievance Reduction Certificate',
      type: 'ward_certification',
      timestamp: '2026-11-27 15:10',
      source: 'BMC Ward A & K-East Sanitation Committee',
      verifiedByValidator: true,
      url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80',
      description: 'Citizen garbage overflow complaints logged on BMC 1916 app decreased by 41% across test wards compared to previous year same quarter.'
    }
  ],
  validationChecklist: [
    {
      id: 'val-1',
      check: '100% of 50 IoT Sensor Units physically surveyed and operational in designated wards',
      category: 'field_compliance',
      validated: true,
      validatorAgency: 'VJTI Civil & Environmental Engineering Team',
      verifiedOn: '2026-08-20',
      remarks: 'All 50 units matched geo-coordinates and functional testing.'
    },
    {
      id: 'val-2',
      check: 'Mathematical calculation of 34% overflow reduction audited against raw timestamped telemetry',
      category: 'technical',
      validated: true,
      validatorAgency: 'IIT Bombay Centre for Urban Science & Engineering',
      verifiedOn: '2026-11-22',
      remarks: 'Statistical significance p < 0.01; target 30% definitively achieved.'
    },
    {
      id: 'val-3',
      check: 'End-to-End data security, zero PII transmission, and Indian data residency compliance',
      category: 'data_security',
      validated: true,
      validatorAgency: 'Maharashtra Cyber Security Directorate (CERT-Maha)',
      verifiedOn: '2026-10-14',
      remarks: 'Complies with Digital Personal Data Protection Act 2023.'
    },
    {
      id: 'val-4',
      check: 'Sanitation worker and truck driver usability survey indicates >=85% positive adoption',
      category: 'citizen_satisfaction',
      validated: true,
      validatorAgency: 'BMC Social Welfare & Sanitation Directorate',
      verifiedOn: '2026-11-15',
      remarks: '91% of municipal drivers reported WhatsApp alerts saved futile trips.'
    }
  ],
  independentValidator: {
    institution: 'IIT Bombay & VJTI Joint Validation Consortium',
    leadValidator: 'Prof. Dr. Aniruddha Kulkarni, Ph.D. (IIT Bombay)',
    reportRef: 'IITB-CUSE-2026-VAL-094',
    status: 'certified',
    certificationDate: '2026-11-26'
  },
  scaleReadinessScore: 94,
  scaleUpRecommendation: 'Recommended for Scale-up',
  decisionNotes: 'Pilot demonstrated extraordinary field resilience through high monsoon conditions. Key target of 30% reduction exceeded at 34%. Fuel savings accrued to BMC total ₹8.4 Lakhs in 4 months across just 50 locations. Approved for direct commercial scaling to 4,000 bins across all 24 administrative wards under Maharashtra Innovation Procurement Policy 2024 (Rule 149 GFR exemption).',
  decisionDate: '2026-12-04',
  signedByOfficer: 'Shri Rajesh Patil, IAS (Additional Municipal Commissioner, BMC) & Smt. Manisha Mhaiskar, IAS (Principal Secretary, Urban Development Dept)'
};

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-001',
    timestamp: '2026-06-15 10:00:12',
    user: 'Rajesh Patil, IAS (Govt Officer)',
    role: 'gov_officer',
    action: 'CHALLENGE_PUBLISHED',
    category: 'CHALLENGE',
    details: 'Published outcome-based challenge MH-BMC-2026-PS26136 for 50 high-density bins with ₹25L pilot grant.',
    hash: '0x4f82...b91a'
  },
  {
    id: 'log-002',
    timestamp: '2026-07-08 17:42:05',
    user: 'Aditya Deshmukh (EcoSight Analytics)',
    role: 'startup',
    action: 'PROPOSAL_SUBMITTED',
    category: 'PROPOSAL',
    details: 'Submitted technical proposal EcoSight SenseNet (TRL 7, dual-beam ultrasound). Budget: ₹24.50 Lakhs.',
    hash: '0x9a31...7e4c'
  },
  {
    id: 'log-003',
    timestamp: '2026-07-16 11:20:00',
    user: 'Admin Cell (InnovProcure Maharashtra)',
    role: 'admin',
    action: 'EXPERT_REVIEWERS_ASSIGNED',
    category: 'ADMIN',
    details: 'Assigned Dr. A. Kulkarni (IIT Bombay) and Prof. S. Deshmukh (VJTI) as technical evaluators.',
    hash: '0xc10e...34df'
  },
  {
    id: 'log-004',
    timestamp: '2026-07-20 14:35:18',
    user: 'Dr. Aniruddha Kulkarni (Expert)',
    role: 'evaluator',
    action: 'EVALUATION_SUBMITTED',
    category: 'EVALUATION',
    details: 'Completed weighted scoring for EcoSight Analytics: 90.0/100. Conflict of Interest Declared: None.',
    hash: '0x88fe...1102'
  },
  {
    id: 'log-005',
    timestamp: '2026-07-21 11:20:44',
    user: 'Prof. Sunita Deshmukh (Expert)',
    role: 'evaluator',
    action: 'EVALUATION_SUBMITTED',
    category: 'EVALUATION',
    details: 'Completed weighted scoring for EcoSight Analytics: 88.75/100. Recommendation: Strongly Recommend.',
    hash: '0x22ab...d890'
  },
  {
    id: 'log-006',
    timestamp: '2026-07-25 16:00:00',
    user: 'Rajesh Patil, IAS (Govt Officer)',
    role: 'gov_officer',
    action: 'STARTUP_SELECTED_FOR_PILOT',
    category: 'DECISION',
    details: 'EcoSight Analytics ranked #1 (Composite 89.4/100). Awarded 4-Month Pilot Contract for 50 locations.',
    hash: '0x71cb...993f'
  },
  {
    id: 'log-007',
    timestamp: '2026-11-26 14:00:00',
    user: 'IIT Bombay Validation Consortium',
    role: 'evaluator',
    action: 'PILOT_VALIDATION_CERTIFIED',
    category: 'PILOT',
    details: 'Audit report IITB-CUSE-2026-VAL-094 finalized. 34% reduction in bin overflows verified. Readiness Score: 94/100.',
    hash: '0x55aa...3341'
  },
  {
    id: 'log-008',
    timestamp: '2026-12-04 11:30:00',
    user: 'Rajesh Patil, IAS (Govt Officer)',
    role: 'gov_officer',
    action: 'SCALE_UP_APPROVED',
    category: 'DECISION',
    details: 'Formal scale-up sanction granted for commercial procurement across 4,000 bins in BMC wards (Est. ₹2.80 Cr).',
    hash: '0x992b...eef0'
  }
];

export const INITIAL_USERS: SystemUser[] = [
  {
    id: 'usr-001',
    name: 'Shri Rajesh Patil, IAS',
    email: 'rajesh.patil@mcgm.gov.in',
    role: 'gov_officer',
    departmentOrOrganization: 'Brihanmumbai Municipal Corporation (BMC)',
    status: 'active'
  },
  {
    id: 'usr-002',
    name: 'Aditya Deshmukh (Founder)',
    email: 'aditya@ecosight.in',
    role: 'startup',
    departmentOrOrganization: 'EcoSight Analytics Pvt Ltd (DPIIT Recog: DIPP94812)',
    status: 'active'
  },
  {
    id: 'usr-003',
    name: 'Prof. Dr. Aniruddha Kulkarni',
    email: 'kulkarni.urban@iitb.ac.in',
    role: 'evaluator',
    departmentOrOrganization: 'Centre for Urban Science & Engineering, IIT Bombay',
    status: 'active',
    expertiseArea: ['Urban IoT', 'Solid Waste Systems', 'Edge Computing', 'Sensor Networks'],
    assignedProposalsCount: 2
  },
  {
    id: 'usr-004',
    name: 'Prof. Sunita Deshmukh',
    email: 'sdeshmukh@vjti.ac.in',
    role: 'evaluator',
    departmentOrOrganization: 'Dept of Smart Cities & IoT, VJTI Mumbai',
    status: 'active',
    expertiseArea: ['Smart Infrastructure', 'LPWAN', 'GIS Fleet Logistics'],
    assignedProposalsCount: 2
  },
  {
    id: 'usr-005',
    name: 'InnovProcure Admin Cell',
    email: 'admin.innovprocure@maharashtra.gov.in',
    role: 'admin',
    departmentOrOrganization: 'Maharashtra State Innovation Society (MSInS), Dept of Skill, Employment & Innovation',
    status: 'active'
  }
];
