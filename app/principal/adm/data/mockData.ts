export const summaryCards = [
  { label: "Total ADM Students", value: "148" },
  { label: "Active ADM Students", value: "92" },
  { label: "Pending ADM Approvals", value: "14" },
  { label: "Students Returned to Regular Classes", value: "36" },
  { label: "Students Due for Assessment/Reintegration", value: "6" },
];

export const statusChartData = [
  { name: "Pending", count: 14 },
  { name: "Active", count: 92, highlight: true },
  { name: "Returned to Regular", count: 36 },
];

export const reasonChartData = [
  { name: "Health/Medical", count: 42 },
  { name: "Pregnancy", count: 12 },
  { name: "Psychological", count: 28 },
  { name: "Bullying", count: 18 },
  { name: "Calamity", count: 35 },
  { name: "Other Valid Reasons", count: 13 },
];

export const pendingActions = [
  { name: "Liam Nisperos", gradeSection: "Grade 9 - Rizal", adviser: "Mrs. T. Alcantara", reason: "Health/Medical", date: "2026-07-08" },
  { name: "Sophia Vergara", gradeSection: "Grade 10 - Luna", adviser: "Mr. J. Cruz", reason: "Bullying", date: "2026-07-09" },
  { name: "Daryl Dixon", gradeSection: "Grade 7 - Mabini", adviser: "Ms. R. Santos", reason: "Psychological", date: "2026-07-10" },
  { name: "Chloe Almariez", gradeSection: "Grade 11 - Bonifacio", adviser: "Mr. A. Ramos", reason: "Calamity", date: "2026-07-10" },
  { name: "Ethan Hunt", gradeSection: "Grade 8 - Aguinaldo", adviser: "Mrs. L. Pineda", reason: "Other Valid Reasons", date: "2026-07-10" },
  { name: "Isabella Garcia", gradeSection: "Grade 12 - Jacinto", adviser: "Ms. M. Castro", reason: "Pregnancy", date: "2026-07-09" },
];

export const recentActivities = [
  { text: "New ADM referral submitted for Liam Nisperos (Grade 9)", time: "2 hours ago" },
  { text: "Maria Santos approved for ADM placement track", time: "5 hours ago" },
  { text: "Juan dela Cruz returned to standard regular classes", time: "Yesterday" },
  { text: "New case recommendation submitted by Guidance Counselor", time: "2 days ago" },
];

export const quickReports = [
  { name: "Active ADM Cases", count: "92 Files" },
  { name: "Completed ADM Cases", count: "36 Files" },
  { name: "Quarterly ADM Report", count: "Q2 Final" },
  { name: "Annual ADM Report", count: "2026 Draft" },
];

export const notifications = [
  { text: "New ADM recommendations from the Guidance Counselor" },
  { text: "Students recommended to return to regular classes" },
  { text: "Students with overdue assessments or pending approvals" },
];

export type EndorsementReason =
  | "Health"
  | "Pregnancy"
  | "Psychological"
  | "Bullying"
  | "Calamity"
  | "Other";

export type EndorsementStatus = "Pending" | "Approved" | "Declined";

export interface SupportingDocument {
  name: string;
  uploaded: boolean;
}

export interface Endorsement {
  id: string;
  studentName: string;
  lrn: string;
  gradeSection: string;
  adviser: string;
  endorsedBy: string;
  endorserRole: "Guidance Counselor" | "ADM Coordinator";
  dateEndorsed: string;
  reason: EndorsementReason;
  summary: string;
  documents: SupportingDocument[];
  guidanceRemarks: string;
  admCoordinatorRemarks: string;
  status: EndorsementStatus;
  principalRemarks: string;
}

export const endorsements: Endorsement[] = [
  {
    id: "END-1001",
    studentName: "Liam Nisperos",
    lrn: "136482109234",
    gradeSection: "Grade 9 - Rizal",
    adviser: "Mrs. T. Alcantara",
    endorsedBy: "Ms. R. Santos",
    endorserRole: "Guidance Counselor",
    dateEndorsed: "2026-07-08",
    reason: "Health",
    summary: "Student has been diagnosed with a chronic condition requiring frequent medical visits, making regular class attendance difficult to sustain.",
    documents: [
      { name: "Guidance Counselor Recommendation", uploaded: true },
      { name: "Anecdotal Record", uploaded: true },
      { name: "Medical Certificate", uploaded: true },
      { name: "Psychological Assessment", uploaded: false },
    ],
    guidanceRemarks: "Student and parents are supportive of the ADM track and have already coordinated with their attending physician.",
    admCoordinatorRemarks: "Recommended module set: Modular Distance Learning with monthly check-ins.",
    status: "Pending",
    principalRemarks: "",
  },
  {
    id: "END-1002",
    studentName: "Sophia Vergara",
    lrn: "136482109512",
    gradeSection: "Grade 10 - Luna",
    adviser: "Mr. J. Cruz",
    endorsedBy: "Ms. R. Santos",
    endorserRole: "Guidance Counselor",
    dateEndorsed: "2026-07-09",
    reason: "Bullying",
    summary: "Repeated incidents of bullying have affected the student's attendance and emotional well-being. Family requests a temporary shift to ADM.",
    documents: [
      { name: "Guidance Counselor Recommendation", uploaded: true },
      { name: "Anecdotal Record", uploaded: true },
      { name: "Medical Certificate", uploaded: false },
      { name: "Psychological Assessment", uploaded: true },
    ],
    guidanceRemarks: "Case has been documented since May. Recommend immediate transition to reduce further exposure to the incident.",
    admCoordinatorRemarks: "Suggest close monitoring and a reintegration review after one grading period.",
    status: "Pending",
    principalRemarks: "",
  },
  {
    id: "END-1003",
    studentName: "Daryl Dixon",
    lrn: "136482109788",
    gradeSection: "Grade 7 - Mabini",
    adviser: "Ms. R. Santos",
    endorsedBy: "Mr. E. Villaruel",
    endorserRole: "ADM Coordinator",
    dateEndorsed: "2026-07-10",
    reason: "Psychological",
    summary: "Student is undergoing counseling for anxiety that has made classroom participation difficult. ADM recommended while treatment continues.",
    documents: [
      { name: "Guidance Counselor Recommendation", uploaded: true },
      { name: "Anecdotal Record", uploaded: false },
      { name: "Medical Certificate", uploaded: false },
      { name: "Psychological Assessment", uploaded: true },
    ],
    guidanceRemarks: "Endorsed jointly with the school psychologist. Parents are in full agreement.",
    admCoordinatorRemarks: "Will coordinate weekly learning packets directly with the family.",
    status: "Pending",
    principalRemarks: "",
  },
  {
    id: "END-1004",
    studentName: "Chloe Almariez",
    lrn: "136482110023",
    gradeSection: "Grade 11 - Bonifacio",
    adviser: "Mr. A. Ramos",
    endorsedBy: "Mr. E. Villaruel",
    endorserRole: "ADM Coordinator",
    dateEndorsed: "2026-07-10",
    reason: "Calamity",
    summary: "Family home was affected by recent flooding, displacing the household temporarily. Student requests ADM until relocation is settled.",
    documents: [
      { name: "Guidance Counselor Recommendation", uploaded: true },
      { name: "Anecdotal Record", uploaded: true },
      { name: "Medical Certificate", uploaded: false },
      { name: "Psychological Assessment", uploaded: false },
    ],
    guidanceRemarks: "Barangay certification of displacement has been submitted along with the request.",
    admCoordinatorRemarks: "Recommend re-evaluation once the family relocates back to the area.",
    status: "Pending",
    principalRemarks: "",
  },
  {
    id: "END-1005",
    studentName: "Ethan Hunt",
    lrn: "136482110345",
    gradeSection: "Grade 8 - Aguinaldo",
    adviser: "Mrs. L. Pineda",
    endorsedBy: "Ms. R. Santos",
    endorserRole: "Guidance Counselor",
    dateEndorsed: "2026-07-10",
    reason: "Other",
    summary: "Student works part-time to support the family and has had recurring attendance issues that ADM would help accommodate.",
    documents: [
      { name: "Guidance Counselor Recommendation", uploaded: true },
      { name: "Anecdotal Record", uploaded: true },
      { name: "Medical Certificate", uploaded: false },
      { name: "Psychological Assessment", uploaded: false },
    ],
    guidanceRemarks: "Home visit conducted last week confirmed the family's circumstances.",
    admCoordinatorRemarks: "Coordinated schedule proposed around the student's work hours.",
    status: "Pending",
    principalRemarks: "",
  },
  {
    id: "END-1006",
    studentName: "Isabella Garcia",
    lrn: "136482110677",
    gradeSection: "Grade 12 - Jacinto",
    adviser: "Ms. M. Castro",
    endorsedBy: "Mr. E. Villaruel",
    endorserRole: "ADM Coordinator",
    dateEndorsed: "2026-07-09",
    reason: "Pregnancy",
    summary: "Student is currently pregnant and requests ADM to continue schooling while managing prenatal care.",
    documents: [
      { name: "Guidance Counselor Recommendation", uploaded: true },
      { name: "Anecdotal Record", uploaded: false },
      { name: "Medical Certificate", uploaded: true },
      { name: "Psychological Assessment", uploaded: false },
    ],
    guidanceRemarks: "Student remains motivated to complete the school year and has parental support.",
    admCoordinatorRemarks: "Module hand-off schedule already coordinated with the adviser.",
    status: "Pending",
    principalRemarks: "",
  },
];

export type PortfolioStatus = "Complete" | "Incomplete" | "Under Review";
export type CurrentADMStatus = "On Track" | "Needs Attention" | "At Risk";

export interface ModuleProgress {
  subject: string;
  completed: number;
  total: number;
}

export interface ActiveADMStudent {
  id: string;
  studentName: string;
  gradeSection: string;
  adviser: string;
  dateApproved: string;
  reason: EndorsementReason;
  currentProgress: number;
  portfolioStatus: PortfolioStatus;
  learningProgress: ModuleProgress[];
  currentStatus: CurrentADMStatus;
  progressNotes: string;
}

export const activeADMStudents: ActiveADMStudent[] = [
  {
    id: "ADM-2001",
    studentName: "Maria Santos",
    gradeSection: "Grade 9 - Rizal",
    adviser: "Mrs. T. Alcantara",
    dateApproved: "2026-05-12",
    reason: "Health",
    currentProgress: 68,
    portfolioStatus: "Under Review",
    learningProgress: [
      { subject: "Filipino", completed: 5, total: 8 },
      { subject: "English", completed: 6, total: 8 },
      { subject: "Mathematics", completed: 4, total: 8 },
      { subject: "Science", completed: 5, total: 8 },
    ],
    currentStatus: "On Track",
    progressNotes: "Consistent submission of modules. Medical treatment ongoing but attendance to check-ins remains steady.",
  },
  {
    id: "ADM-2002",
    studentName: "Juan dela Cruz",
    gradeSection: "Grade 8 - Aguinaldo",
    adviser: "Mrs. L. Pineda",
    dateApproved: "2026-04-20",
    reason: "Calamity",
    currentProgress: 92,
    portfolioStatus: "Complete",
    learningProgress: [
      { subject: "Filipino", completed: 8, total: 8 },
      { subject: "English", completed: 8, total: 8 },
      { subject: "Mathematics", completed: 7, total: 8 },
      { subject: "Science", completed: 8, total: 8 },
    ],
    currentStatus: "On Track",
    progressNotes: "Family has since relocated back. Student is nearly ready for reintegration review.",
  },
  {
    id: "ADM-2003",
    studentName: "Bea Alonzo",
    gradeSection: "Grade 10 - Luna",
    adviser: "Mr. J. Cruz",
    dateApproved: "2026-05-02",
    reason: "Bullying",
    currentProgress: 41,
    portfolioStatus: "Incomplete",
    learningProgress: [
      { subject: "Filipino", completed: 3, total: 8 },
      { subject: "English", completed: 4, total: 8 },
      { subject: "Mathematics", completed: 2, total: 8 },
      { subject: "Science", completed: 3, total: 8 },
    ],
    currentStatus: "Needs Attention",
    progressNotes: "Module submissions have slowed over the past three weeks. Guidance follow-up scheduled.",
  },
  {
    id: "ADM-2004",
    studentName: "Coco Martin",
    gradeSection: "Grade 7 - Mabini",
    adviser: "Ms. R. Santos",
    dateApproved: "2026-03-15",
    reason: "Psychological",
    currentProgress: 22,
    portfolioStatus: "Incomplete",
    learningProgress: [
      { subject: "Filipino", completed: 2, total: 8 },
      { subject: "English", completed: 2, total: 8 },
      { subject: "Mathematics", completed: 1, total: 8 },
      { subject: "Science", completed: 2, total: 8 },
    ],
    currentStatus: "At Risk",
    progressNotes: "Minimal engagement with learning packets. Counselor recommends a home visit this month.",
  },
  {
    id: "ADM-2005",
    studentName: "Angel Locsin",
    gradeSection: "Grade 11 - Bonifacio",
    adviser: "Mr. A. Ramos",
    dateApproved: "2026-06-01",
    reason: "Pregnancy",
    currentProgress: 75,
    portfolioStatus: "Under Review",
    learningProgress: [
      { subject: "Filipino", completed: 6, total: 8 },
      { subject: "English", completed: 6, total: 8 },
      { subject: "Mathematics", completed: 5, total: 8 },
      { subject: "Science", completed: 6, total: 8 },
    ],
    currentStatus: "On Track",
    progressNotes: "Prenatal schedule accounted for in module hand-off timing. Progress remains steady.",
  },
  {
    id: "ADM-2006",
    studentName: "Piolo Pascual",
    gradeSection: "Grade 12 - Jacinto",
    adviser: "Ms. M. Castro",
    dateApproved: "2026-02-10",
    reason: "Other",
    currentProgress: 100,
    portfolioStatus: "Complete",
    learningProgress: [
      { subject: "Filipino", completed: 8, total: 8 },
      { subject: "English", completed: 8, total: 8 },
      { subject: "Mathematics", completed: 8, total: 8 },
      { subject: "Science", completed: 8, total: 8 },
    ],
    currentStatus: "On Track",
    progressNotes: "All requirements completed. Ready for reintegration assessment.",
  },
];

export type ReintegrationStatus = "Pending" | "Returned to Regular Class" | "Returned to ADM";

export interface ReintegrationCase {
  id: string;
  studentName: string;
  grade: string;
  recommendedBy: string;
  assessmentTag: string;
  status: ReintegrationStatus;
  durationInADM: string;
  academicProgress: string;
  guidanceRecommendation: string;
  admCoordinatorRecommendation: string;
  finalAssessment: string;
  principalRemarks: string;
}

export const reintegrationCases: ReintegrationCase[] = [
  {
    id: "RI-3001",
    studentName: "Piolo Pascual",
    grade: "Grade 12 - Jacinto",
    recommendedBy: "Ms. M. Castro (ADM Coordinator)",
    assessmentTag: "Ready for Reintegration",
    status: "Pending",
    durationInADM: "5 months",
    academicProgress: "Completed all learning modules with an average rating of Very Satisfactory across all subjects.",
    guidanceRecommendation: "Student has shown consistent emotional readiness and expressed strong motivation to rejoin regular classes.",
    admCoordinatorRecommendation: "Portfolio complete and all requirements satisfied. Recommend immediate reintegration.",
    finalAssessment: "Student meets all academic and behavioral requirements for reintegration into regular classes for the next grading period.",
    principalRemarks: "",
  },
  {
    id: "RI-3002",
    studentName: "Juan dela Cruz",
    grade: "Grade 8 - Aguinaldo",
    recommendedBy: "Mrs. L. Pineda (Adviser)",
    assessmentTag: "Nearly Ready",
    status: "Pending",
    durationInADM: "3 months",
    academicProgress: "Modules are 92% complete, with the remaining Mathematics module due within the week.",
    guidanceRecommendation: "Family situation has stabilized following relocation. Student is emotionally prepared to return.",
    admCoordinatorRecommendation: "Recommend reintegration once the final module is submitted and validated.",
    finalAssessment: "Student is on track to complete requirements shortly. Conditional reintegration may be considered.",
    principalRemarks: "",
  },
  {
    id: "RI-3003",
    studentName: "Liza Soberano",
    grade: "Grade 10 - Luna",
    recommendedBy: "Ms. R. Santos (Guidance Counselor)",
    assessmentTag: "Needs Further Review",
    status: "Pending",
    durationInADM: "6 months",
    academicProgress: "Academic modules complete, but attendance to guidance check-ins has been inconsistent recently.",
    guidanceRecommendation: "Recommend one more grading period under ADM to solidify emotional readiness before transition.",
    admCoordinatorRecommendation: "Academic requirements met. Coordinator defers to guidance assessment on timing.",
    finalAssessment: "Academically qualified, though guidance recommends a short extension to confirm readiness.",
    principalRemarks: "",
  },
  {
    id: "RI-3004",
    studentName: "Enrique Gil",
    grade: "Grade 9 - Rizal",
    recommendedBy: "Mr. E. Villaruel (ADM Coordinator)",
    assessmentTag: "Ready for Reintegration",
    status: "Pending",
    durationInADM: "4 months",
    academicProgress: "All subject modules completed with satisfactory ratings throughout the enrollment period.",
    guidanceRecommendation: "No outstanding concerns. Student has maintained regular communication with the guidance office.",
    admCoordinatorRecommendation: "Fully compliant with ADM requirements. Recommend approval for reintegration.",
    finalAssessment: "Student has fulfilled both academic and behavioral requirements for a return to regular classes.",
    principalRemarks: "",
  },
];

export interface ReportStat {
  label: string;
  value: string;
}

export const reportsStats: ReportStat[] = [
  { label: "Total ADM Students", value: "148" },
  { label: "Active ADM Students", value: "92" },
  { label: "Completed ADM Cases", value: "36" },
  { label: "Returned to Regular Classes", value: "36" },
  { label: "Pending Endorsements", value: "6" },
];

export interface ReportCatalogItem {
  id: string;
  name: string;
  description: string;
}

export const reportsCatalog: ReportCatalogItem[] = [
  { id: "grade-level", name: "ADM Students by Grade Level", description: "Breakdown of ADM enrollees across grade levels and sections." },
  { id: "reason", name: "ADM Students by Reason", description: "Distribution of ADM cases grouped by reason for referral." },
  { id: "quarterly", name: "Quarterly Report", description: "Consolidated ADM report covering the current quarter." },
  { id: "annual", name: "Annual Report", description: "Full-year summary of ADM enrollment and outcomes." },
  { id: "completion-rate", name: "ADM Completion Rate", description: "Percentage of ADM students who completed their track successfully." },
  { id: "reintegration", name: "Reintegration Report", description: "Students reviewed and approved for return to regular classes." },
];
