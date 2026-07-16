export type EndorsementReason = "Health" | "Pregnancy" | "Psychological" | "Bullying" | "Calamity" | "Other";
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
}

export interface ADMStudent {
  id: string;
  name: string;
  lrn: string;
  gradeSection: string;
  status: string;
  reason: string;
}
