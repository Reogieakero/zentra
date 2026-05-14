"use client";

import React, { useEffect } from "react";
import styles from "./StudentDrawer.module.css";
import { Student } from "../types/student"; 

interface StudentDrawerProps {
  student: Student;
  onClose: () => void;
  showLrn?: boolean; // Optional: Synchronizes masking from the parent view
}

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const InfoRow = ({ label, value }: { label: string; value: string | number }) => (
  <div className={styles.infoRow}>
    <span className={styles.infoLabel}>{label}</span>
    <span className={styles.infoValue}>{value}</span>
  </div>
);

export function StudentDrawer({ student, onClose, showLrn = true }: StudentDrawerProps) {
  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { 
      if (e.key === "Escape") onClose(); 
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Determine dynamic styling background for the header card based on risk
  const headerRiskClass = 
    student.risk === "High" 
      ? styles.headerHigh 
      : student.risk === "Medium" 
      ? styles.headerMed 
      : styles.headerDefault;

  const avatarRiskClass = 
    student.risk === "High" 
      ? styles.avatarHigh 
      : student.risk === "Medium" 
      ? styles.avatarMed 
      : styles.avatarDefault;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      
      <aside className={styles.drawer} role="dialog" aria-modal="true">
        {/* Header Block */}
        <div className={`${styles.drawerHeader} ${headerRiskClass}`}>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close drawer">
            <XIcon />
          </button>
          
          <div className={`${styles.drawerAvatar} ${avatarRiskClass}`}>
            {student.avatar}
          </div>
          
          <h2 className={styles.drawerName}>{student.name}</h2>
          
          <div className={styles.drawerBadges}>
            <span className={`${styles.statusChip} ${styles[`status${student.status}`]}`}>
              {student.status}
            </span>
            {student.risk && (
              <span className={`${styles.riskChip} ${styles[`risk${student.risk}`]}`}>
                {student.risk} Risk
              </span>
            )}
          </div>
        </div>

        {/* Content Body Block */}
        <div className={styles.drawerBody}>
          {/* Main Key Stats Grid */}
          <div className={styles.statsRow}>
            <div className={styles.statBox}>
              <span className={styles.statVal}>{student.gpa}%</span>
              <span className={styles.statLbl}>GPA Summary</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statBox}>
              <span className={styles.statVal}>{student.absences}</span>
              <span className={styles.statLbl}>Absences</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statBox}>
              <span className={styles.statVal}>G{student.grade}</span>
              <span className={styles.statLbl}>Grade Level</span>
            </div>
          </div>

          {/* Academic Profile Details Section */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Student Profile</h3>
            <div className={styles.infoGrid}>
              <InfoRow label="LRN" value={showLrn ? student.lrn : "••••••••••••"} />
              <InfoRow label="Gender" value={student.gender} />
              <InfoRow label="Section" value={student.section} />
              <InfoRow label="Birthday" value={student.birthday || "—"} />
            </div>
          </section>

          {/* Contact Details Section */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Guardian Contact</h3>
            <div className={styles.infoGrid}>
              <InfoRow label="Primary Guardian" value={student.guardian || "—"} />
              <InfoRow label="Contact No." value={student.contact || "—"} />
              <InfoRow label="Home Address" value={student.address || "—"} />
            </div>
          </section>

          {/* Contextual Drawer Action Trigger Buttons */}
          <div className={styles.actions}>
            <button type="button" className={styles.actionBtn}>View Official SF10</button>
            <button type="button" className={styles.actionBtnDanger}>Flag Profile Incident</button>
          </div>
        </div>
      </aside>
    </>
  );
}