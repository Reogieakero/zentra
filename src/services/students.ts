import type { Student } from "@/types/student";

// Placeholder for future API integration
const MOCK_STUDENTS: Student[] = [
  { id: "1", lrn: "123456789001", name: "Maria Santos", firstName: "Maria", lastName: "Santos", grade: "10", section: "Rizal", gender: "Female", status: "Enrolled", risk: "High", absences: 12, gpa: 74, contact: "09171234501", guardian: "Rosa Santos", address: "123 Mabini St, Davao City", birthday: "2009-03-14", avatar: "MS" },
  { id: "2", lrn: "123456789002", name: "Juan dela Cruz", firstName: "Juan", lastName: "dela Cruz", grade: "9", section: "Bonifacio", gender: "Male", status: "Enrolled", risk: "High", absences: 8, gpa: 71, contact: "09171234502", guardian: "Pedro dela Cruz", address: "45 Rizal Ave, Davao City", birthday: "2010-07-22", avatar: "JD" },
];

export function getStudents(): Student[] {
  return MOCK_STUDENTS;
}

export function getStudentById(id: string): Student | undefined {
  return MOCK_STUDENTS.find((s) => s.id === id);
}
