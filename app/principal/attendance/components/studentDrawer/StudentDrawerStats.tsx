"use client";

import { useState } from "react";
import { Student } from "./studentDrawer.types";
import styles from "./StudentDrawerStats.module.css";

interface StudentDrawerStatsProps {
  student: Student;
  onClose: () => void;
  totalAbsent: number;
  enrolledAdm: boolean;
  anecdotalCount: number;
}

export function StudentDrawerStats({ 
  student, 
  onClose, 
  totalAbsent, 
  enrolledAdm, 
  anecdotalCount 
}: StudentDrawerStatsProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const initials = student.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <div className={styles.container}>
      {/* Top Controller Management Bar */}
      <div className={styles.actionRow}>
        <button 
          type="button"
          className={styles.toggleButton} 
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
        >
          <svg 
            width="12" 
            height="12" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`${styles.chevron} ${isExpanded ? styles.chevronExpanded : ""}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
          <span>{isExpanded ? "Hide Overview" : "Show Overview"}</span>
        </button>

        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close drawer">
          &times;
        </button>
      </div>

      {/* Accordion Smooth Expand Wrapper */}
      <div className={`${styles.slideWrapper} ${isExpanded ? styles.slideOpen : ""}`}>
        <div className={styles.slideContent}>
          <div className={styles.statsRow}>
            
            {/* Card 1: Emphasized Student Info Card */}
            <div className={styles.statCard}>
              <div className={styles.statCardBody}>
                <span className={styles.studentNameValue}>{student.name}</span>
                <span className={styles.statSub}>
                  {student.grade} &bull; <br />LRN: {student.lrn}
                </span>
              </div>
            </div>

            <div className={styles.statDivider} />

            {/* Card 2: Total Absent Days */}
            <div className={styles.statCard}>
              <div className={styles.statIconWrap} style={{ background: "#fef2f2" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <div className={styles.statCardBody}>
                <span className={styles.statLabel}>Total Absent</span>
                <span className={styles.statValue} style={{ color: "#dc2626" }}>{totalAbsent}</span>
                <span className={styles.statSub}>days this school year</span>
              </div>
            </div>

            <div className={styles.statDivider} />

            {/* Card 3: ADM Program Track Status */}
            <div className={styles.statCard}>
              <div className={styles.statIconWrap} style={{ background: "#f0fdf4" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <div className={styles.statCardBody}>
                <span className={styles.statLabel}>Enrolled in ADM</span>
                {enrolledAdm ? (
                  <div className={styles.admBadgeYes}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    Yes
                  </div>
                ) : (
                  <div className={styles.admBadgeNo}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                    No
                  </div>
                )}
                <span className={styles.statSub}>Alternative Delivery Mode</span>
              </div>
            </div>

            <div className={styles.statDivider} />

            {/* Card 4: Anecdotal Incident Tracking */}
            <div className={styles.statCard}>
              <div className={styles.statIconWrap} style={{ background: "var(--bg-purple-tint)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <div className={styles.statCardBody}>
                <span className={styles.statLabel}>Anecdotal Records</span>
                <span className={styles.statValue} style={{ color: "var(--brand-primary)" }}>{anecdotalCount}</span>
                <span className={styles.statSub}>recorded incidents</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}