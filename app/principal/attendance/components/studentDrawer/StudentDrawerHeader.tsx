"use client";

import { Student } from "./studentDrawer.types";
import styles from "./StudentDrawerHeader.module.css";

interface StudentDrawerHeaderProps {
  student: Student;
  onClose: () => void;
}

export function StudentDrawerHeader({ student, onClose }: StudentDrawerHeaderProps) {
  const initials = student.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <div className={styles.topRow}>
      <div className={styles.profileLeft}>
        <div className={styles.avatarWrap}>
          <div className={styles.avatar}>{initials}</div>
          <span className={styles.onlineDot} />
        </div>
        <div className={styles.profileMeta}>
          <h2 className={styles.userName}>{student.name}</h2>
          <p className={styles.userSub}>{student.grade}</p>
          <div className={styles.metaRow}>
            <span className={styles.metaItem}>
              <strong>LRN</strong> {student.lrn}
            </span>
            <span className={styles.metaItem}>
              <strong>Status</strong> {student.status}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.headerActions}>
        <button type="button" className={styles.btnOutline}>
          View Details
        </button>
        <button type="button" className={styles.btnPrimary}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add Attendance
        </button>
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
          &times;
        </button>
      </div>
    </div>
  );
}