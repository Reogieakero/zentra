"use client";

import React, { useEffect } from "react";
import styles from "./StudentDrawer.module.css";
// Update this import to match your actual file structure
import { Student } from "../types/student"; 

interface Props {
  student: Student;
  onClose: () => void;
}

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const InfoRow = ({ label, value }: { label: string; value: string | number }) => (
  <div className={styles.infoRow}>
    <span className={styles.infoLabel}>{label}</span>
    <span className={styles.infoValue}>{value}</span>
  </div>
);

export function StudentDrawer({ student, onClose }: Props) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <aside className={styles.drawer}>
        <div className={styles.drawerHeader}>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close drawer">
            <XIcon />
          </button>
          <div className={styles.profileHeader}>
            <div className={styles.avatarLarge}>{student.avatar}</div>
            <div className={styles.profileMeta}>
              <h2 className={styles.studentName}>{student.name}</h2>
              <span className={`${styles.statusChip} ${styles[`status${student.status}`]}`}>
                {student.status}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.drawerContent}>
          <div className={styles.statsRow}>
            <div className={styles.statBox}>
              <span className={styles.statVal}>{student.gpa}%</span>
              <span className={styles.statLbl}>Average</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statVal}>{student.absences}</span>
              <span className={styles.statLbl}>Absences</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statVal}>{student.grade}</span>
              <span className={styles.statLbl}>Grade</span>
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Student Information</h3>
            <div className={styles.infoGrid}>
              <InfoRow label="LRN" value={student.lrn} />
              <InfoRow label="Gender" value={student.gender} />
              <InfoRow label="Section" value={student.section} />
              <InfoRow label="Birthday" value={student.birthday} />
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Contact & Guardian</h3>
            <div className={styles.infoGrid}>
              <InfoRow label="Guardian" value={student.guardian} />
              <InfoRow label="Contact" value={student.contact} />
              <InfoRow label="Address" value={student.address} />
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.actionBtn}>View SF10</button>
            <button className={styles.actionBtnDanger}>Flag Incident</button>
          </div>
        </div>
      </aside>
    </>
  );
}