export interface Student {
  lrn: string;
  name: string;
  grade: string;
  section: string;
  date: string;
  status: "Present" | "Late" | "Absent";
}

export const GRADE_ORDER = [
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
] as const;

export const GRADE_SECTIONS: Record<string, string[]> = {
  "Grade 7":  ["Aguinaldo", "Bonifacio", "Rizal"],
  "Grade 8":  ["Mabini", "Luna", "Del Pilar"],
  "Grade 9":  ["Bonifacio", "Aguinaldo", "Mabini"],
  "Grade 10": ["Rizal", "Luna", "Del Pilar"],
  "Grade 11": ["Luna", "Rizal", "Bonifacio"],
  "Grade 12": ["Del Pilar", "Mabini", "Aguinaldo"],
};

export const STATUS_TABS = ["All", "Present", "Late", "Absent"] as const;

const toDateStr = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const offsetDate = (daysAgo: number): string => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return toDateStr(d);
};

export const toDateStrFromDate = (date: Date | null): string | null => {
  if (!date) return null;
  return toDateStr(date);
};

export const formatDisplayDate = (date: Date | null): string => {
  if (!date) return "all dates";
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const formatShortDate = (dateStr: string): string =>
  new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const STUDENTS: Student[] = [
  { lrn: "STU-001", name: "Leo Aquino",          grade: "Grade 7",  section: "Aguinaldo", date: offsetDate(0), status: "Present" },
  { lrn: "STU-002", name: "Lucas Dela Cruz",      grade: "Grade 7",  section: "Aguinaldo", date: offsetDate(0), status: "Late"    },
  { lrn: "STU-003", name: "Nina Pascual",         grade: "Grade 7",  section: "Bonifacio", date: offsetDate(0), status: "Present" },
  { lrn: "STU-004", name: "Karl Santos",          grade: "Grade 7",  section: "Bonifacio", date: offsetDate(0), status: "Absent"  },
  { lrn: "STU-005", name: "Tricia Dizon",         grade: "Grade 7",  section: "Rizal",     date: offsetDate(0), status: "Present" },
  { lrn: "STU-006", name: "Enzo Villanueva",      grade: "Grade 7",  section: "Rizal",     date: offsetDate(1), status: "Late"    },
  { lrn: "STU-007", name: "Ethan Cruz",           grade: "Grade 8",  section: "Mabini",    date: offsetDate(0), status: "Absent"  },
  { lrn: "STU-008", name: "Camille Bautista",     grade: "Grade 8",  section: "Mabini",    date: offsetDate(0), status: "Present" },
  { lrn: "STU-009", name: "Bea Navarro",          grade: "Grade 8",  section: "Luna",      date: offsetDate(0), status: "Late"    },
  { lrn: "STU-010", name: "Kurt Reyes",           grade: "Grade 8",  section: "Luna",      date: offsetDate(1), status: "Present" },
  { lrn: "STU-011", name: "Pia Salazar",          grade: "Grade 8",  section: "Del Pilar", date: offsetDate(1), status: "Absent"  },
  { lrn: "STU-012", name: "Sam Torres",           grade: "Grade 8",  section: "Del Pilar", date: offsetDate(1), status: "Present" },
  { lrn: "STU-013", name: "Marco Reyes",          grade: "Grade 9",  section: "Bonifacio", date: offsetDate(0), status: "Late"    },
  { lrn: "STU-014", name: "Hannah Garcia",        grade: "Grade 9",  section: "Bonifacio", date: offsetDate(0), status: "Absent"  },
  { lrn: "STU-015", name: "Dani Cruz",            grade: "Grade 9",  section: "Aguinaldo", date: offsetDate(0), status: "Present" },
  { lrn: "STU-016", name: "Rey Flores",           grade: "Grade 9",  section: "Aguinaldo", date: offsetDate(1), status: "Present" },
  { lrn: "STU-017", name: "Lara Mendez",          grade: "Grade 9",  section: "Mabini",    date: offsetDate(1), status: "Late"    },
  { lrn: "STU-018", name: "Gab Ramos",            grade: "Grade 9",  section: "Mabini",    date: offsetDate(2), status: "Absent"  },
  { lrn: "STU-019", name: "Aria Santos",          grade: "Grade 10", section: "Rizal",     date: offsetDate(0), status: "Present" },
  { lrn: "STU-020", name: "James Villanueva",     grade: "Grade 10", section: "Rizal",     date: offsetDate(0), status: "Present" },
  { lrn: "STU-021", name: "Chloe Tan",            grade: "Grade 10", section: "Luna",      date: offsetDate(0), status: "Absent"  },
  { lrn: "STU-022", name: "Miguel Ocampo",        grade: "Grade 10", section: "Luna",      date: offsetDate(1), status: "Late"    },
  { lrn: "STU-023", name: "Issa Dela Rosa",       grade: "Grade 10", section: "Del Pilar", date: offsetDate(1), status: "Present" },
  { lrn: "STU-024", name: "Rico Aguilar",         grade: "Grade 10", section: "Del Pilar", date: offsetDate(2), status: "Absent"  },
  { lrn: "STU-025", name: "Sophia Lim",           grade: "Grade 11", section: "Luna",      date: offsetDate(0), status: "Present" },
  { lrn: "STU-026", name: "Mia Fernandez",        grade: "Grade 11", section: "Luna",      date: offsetDate(0), status: "Absent"  },
  { lrn: "STU-027", name: "Patrick Go",           grade: "Grade 11", section: "Rizal",     date: offsetDate(0), status: "Late"    },
  { lrn: "STU-028", name: "Kat Soriano",          grade: "Grade 11", section: "Rizal",     date: offsetDate(1), status: "Present" },
  { lrn: "STU-029", name: "Anton Quirino",        grade: "Grade 11", section: "Bonifacio", date: offsetDate(1), status: "Present" },
  { lrn: "STU-030", name: "Lea Magno",            grade: "Grade 11", section: "Bonifacio", date: offsetDate(2), status: "Absent"  },
  { lrn: "STU-031", name: "Isabella Tan",         grade: "Grade 12", section: "Del Pilar", date: offsetDate(0), status: "Present" },
  { lrn: "STU-032", name: "Ryan Mendoza",         grade: "Grade 12", section: "Del Pilar", date: offsetDate(0), status: "Late"    },
  { lrn: "STU-033", name: "Carla Buenaventura",   grade: "Grade 12", section: "Mabini",    date: offsetDate(0), status: "Present" },
  { lrn: "STU-034", name: "Drew Agoncillo",       grade: "Grade 12", section: "Mabini",    date: offsetDate(1), status: "Absent"  },
  { lrn: "STU-035", name: "Tina Estrada",         grade: "Grade 12", section: "Aguinaldo", date: offsetDate(1), status: "Present" },
  { lrn: "STU-036", name: "Jomar Reyes",          grade: "Grade 12", section: "Aguinaldo", date: offsetDate(2), status: "Late"    },
];