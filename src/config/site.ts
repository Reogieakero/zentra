export const SITE_CONFIG = {
  name: "Zentra",
  description: "A centralized school records management system designed to improve efficiency and organization.",
  url: "https://zentra.edu",
};

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
