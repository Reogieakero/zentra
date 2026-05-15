"use client";

import styles from "./TasksCard.module.css";

interface Task {
  label: string;
  sub: string;
  end: string;
}

const tasks: Task[] = [
  { label: "Unexcused absences to review",    sub: "Flagged for parent notification",  end: "2 Days"  },
  { label: "Monthly attendance report due",   sub: "Submit to district office",         end: "5 Days"  },
  { label: "Perfect attendance certificates", sub: "Print and prepare for assembly",    end: "8 Days"  },
  { label: "Grade 10 make-up attendance",     sub: "Coordinate with advisers",          end: "14 Days" },
];

export function TasksCard() {
  return (
    <div className={styles.card}>
      <div className={styles.tasksGrid}>
        {tasks.map((t, i) => (
          <div key={i} className={styles.taskItem}>
            <div className={styles.taskLabel}>{t.label}</div>
            <div className={styles.taskSub}>{t.sub}</div>
            <div className={styles.taskFooter}>
              <span className={styles.taskEnd}>
                End in<br />
                <strong>{t.end}</strong>
              </span>
              <button className={styles.taskBtn} type="button" aria-label="Open task">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}