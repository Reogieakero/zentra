export interface Student {
  id: string;
  lrn: string;
  name: string;
  firstName: string;
  lastName: string;
  grade: string;
  section: string;
  gender: "Male" | "Female";
  status: "Enrolled" | "Pending" | "Dropped" | "Graduated";
  risk: "High" | "Medium" | "Low" | null;
  absences: number;
  gpa: number;
  contact: string;
  guardian: string;
  address: string;
  birthday: string;
  avatar: string;
}

export interface SectionTab {
  id: string;
  label: string;
}