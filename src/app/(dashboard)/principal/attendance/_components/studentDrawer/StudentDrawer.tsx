"use client";

import { Student, ATTENDANCE_DAYS } from "./studentDrawer.types";
import { StudentDrawerStats } from "./StudentDrawerStats";
import { StudentDrawerTimeline } from "./StudentDrawerTimeline";
import styles from "./StudentDrawer.module.css";

interface StudentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
}

export function StudentDrawer({ isOpen, onClose, student }: StudentDrawerProps) {
  if (!student) return null;

  return (
    <>
      <div
        className={`${styles.backdrop} ${isOpen ? styles.active : ""}`}
        onClick={onClose}
      />

      <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
        <div className={styles.header}>
          <StudentDrawerStats
            student={student}
            onClose={onClose}
            totalAbsent={8}
            enrolledAdm={true}
            anecdotalCount={3}
          />
        </div>

        <StudentDrawerTimeline
          days={ATTENDANCE_DAYS}
          studentName={student.name}
          studentLRN={student.lrn}
          studentGrade={student.grade}
        />
      </div>
    </>
  );
}