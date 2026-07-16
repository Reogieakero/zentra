import type { Endorsement, ADMStudent } from "@/types/adm";

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

export const endorsements: Endorsement[] = [];
export const admStudents: ADMStudent[] = [];
