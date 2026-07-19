export type RiskLevel = "high" | "medium";
export type Trend = "up" | "down" | "flat";

export interface InterventionLog {
  id: string;
  date: string;
  author: string;
  note: string;
}

export interface AtRiskStudent {
  id: string;
  name: string;
  grade: string;
  section: string;
  avatar: string;
  risk: RiskLevel;
  flags: string[];
  subjects: string[];
  absences: number;
  gpa: number;
  attendanceRate: number;
  trend: Trend;
  counselor: string;
  guardianName: string;
  guardianContact: string;
  lastIntervention: string | null;
  logs: InterventionLog[];
}

export const AT_RISK_STUDENTS: AtRiskStudent[] = [
  { id: "1", name: "Maria Santos", grade: "10", section: "Rizal", avatar: "MS", risk: "high", flags: ["Absences", "GPA Drop"], subjects: ["Math", "Science"], absences: 12, gpa: 74, attendanceRate: 81, trend: "down", counselor: "Mr. Torres", guardianName: "Elena Santos", guardianContact: "0917 214 5502", lastIntervention: "Jul 10, 2026", logs: [
    { id: "l1", date: "Jul 10, 2026", author: "Mr. Torres", note: "Called guardian, agreed to weekly check-ins." },
  ] },
  { id: "2", name: "Juan dela Cruz", grade: "9", section: "Bonifacio", avatar: "JD", risk: "high", flags: ["Behavior", "Missing Work"], subjects: ["English", "Filipino"], absences: 8, gpa: 71, attendanceRate: 85, trend: "down", counselor: "Ms. Ramos", guardianName: "Rosario dela Cruz", guardianContact: "0918 340 7761", lastIntervention: "Jul 6, 2026", logs: [] },
  { id: "3", name: "Ana Reyes", grade: "11", section: "Aguinaldo", avatar: "AR", risk: "medium", flags: ["GPA Drop"], subjects: ["Chemistry"], absences: 5, gpa: 78, attendanceRate: 91, trend: "flat", counselor: "Mr. Torres", guardianName: "Fernando Reyes", guardianContact: "0919 552 3390", lastIntervention: null, logs: [] },
  { id: "4", name: "Carlos Mendoza", grade: "10", section: "Luna", avatar: "CM", risk: "high", flags: ["Absences", "Behavior"], subjects: ["Math", "PE"], absences: 15, gpa: 68, attendanceRate: 76, trend: "down", counselor: "Ms. Ramos", guardianName: "Teresa Mendoza", guardianContact: "0920 671 4428", lastIntervention: "Jul 14, 2026", logs: [
    { id: "l2", date: "Jul 14, 2026", author: "Ms. Ramos", note: "Referred to guidance office for behavior plan." },
    { id: "l3", date: "Jul 2, 2026", author: "Ms. Ramos", note: "First warning issued after third unexcused absence." },
  ] },
  { id: "5", name: "Liza Gomez", grade: "8", section: "Mabini", avatar: "LG", risk: "medium", flags: ["Missing Work", "GPA Drop"], subjects: ["Science"], absences: 4, gpa: 76, attendanceRate: 92, trend: "flat", counselor: "Mr. Dizon", guardianName: "Ramon Gomez", guardianContact: "0917 802 1156", lastIntervention: null, logs: [] },
  { id: "6", name: "Rico Villanueva", grade: "12", section: "Burgos", avatar: "RV", risk: "high", flags: ["Absences", "GPA Drop"], subjects: ["Math", "Filipino"], absences: 10, gpa: 70, attendanceRate: 83, trend: "down", counselor: "Mr. Dizon", guardianName: "Corazon Villanueva", guardianContact: "0921 447 9930", lastIntervention: "Jul 15, 2026", logs: [
    { id: "l4", date: "Jul 15, 2026", author: "Mr. Dizon", note: "Set up peer tutoring for Math, 2x weekly." },
  ] },
  { id: "7", name: "Tricia Bautista", grade: "9", section: "Silang", avatar: "TB", risk: "medium", flags: ["Behavior"], subjects: ["History"], absences: 3, gpa: 79, attendanceRate: 94, trend: "up", counselor: "Ms. Ramos", guardianName: "Wilfredo Bautista", guardianContact: "0917 663 2284", lastIntervention: "Jun 28, 2026", logs: [
    { id: "l5", date: "Jun 28, 2026", author: "Ms. Ramos", note: "Behavior improving since seating change." },
  ] },
  { id: "8", name: "Mark Aquino", grade: "11", section: "Del Pilar", avatar: "MA", risk: "high", flags: ["Absences", "Missing Work"], subjects: ["Physics", "Math"], absences: 11, gpa: 72, attendanceRate: 80, trend: "down", counselor: "Mr. Torres", guardianName: "Josefina Aquino", guardianContact: "0918 275 6612", lastIntervention: null, logs: [] },
  { id: "9", name: "Bea Fernandez", grade: "8", section: "Mabini", avatar: "BF", risk: "medium", flags: ["GPA Drop"], subjects: ["English"], absences: 2, gpa: 77, attendanceRate: 95, trend: "up", counselor: "Mr. Dizon", guardianName: "Michael Fernandez", guardianContact: "0920 118 3345", lastIntervention: "Jul 3, 2026", logs: [] },
  { id: "10", name: "Noel Ramirez", grade: "10", section: "Rizal", avatar: "NR", risk: "high", flags: ["Behavior", "Absences"], subjects: ["Science", "PE"], absences: 13, gpa: 69, attendanceRate: 79, trend: "down", counselor: "Mr. Torres", guardianName: "Lourdes Ramirez", guardianContact: "0919 904 2287", lastIntervention: "Jul 11, 2026", logs: [
    { id: "l6", date: "Jul 11, 2026", author: "Mr. Torres", note: "Guardian meeting scheduled for next week." },
  ] },
  { id: "11", name: "Kim Oliveros", grade: "12", section: "Burgos", avatar: "KO", risk: "medium", flags: ["Missing Work"], subjects: ["Filipino"], absences: 6, gpa: 75, attendanceRate: 88, trend: "flat", counselor: "Ms. Ramos", guardianName: "Antonio Oliveros", guardianContact: "0917 336 9921", lastIntervention: null, logs: [] },
  { id: "12", name: "Paolo Cruz", grade: "9", section: "Bonifacio", avatar: "PC", risk: "high", flags: ["GPA Drop", "Missing Work"], subjects: ["Math", "Chemistry"], absences: 7, gpa: 67, attendanceRate: 84, trend: "down", counselor: "Mr. Dizon", guardianName: "Susan Cruz", guardianContact: "0921 590 4471", lastIntervention: "Jul 8, 2026", logs: [] },
];
