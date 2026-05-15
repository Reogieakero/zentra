"use client";

import styles from "./TasksCard.module.css";

interface Task { label: string; sub: string; end: string; }

const dataByDate: Record<string, Task[]> = {
  "2025-05-16": [
    { label: "Unexcused absences to review",    sub: "Flagged for parent notification",  end: "2 Days"  },
    { label: "Monthly attendance report due",   sub: "Submit to district office",         end: "5 Days"  },
    { label: "Perfect attendance certificates", sub: "Print and prepare for assembly",    end: "8 Days"  },
    { label: "Grade 10 make-up attendance",     sub: "Coordinate with advisers",          end: "14 Days" },
  ],
  "2025-05-15": [
    { label: "Parent notification letters",     sub: "Send for all unexcused absences",   end: "1 Day"   },
    { label: "Adviser meeting prep",            sub: "Review Grade 9 attendance trends",  end: "3 Days"  },
    { label: "Attendance data backup",          sub: "Export to district server",         end: "7 Days"  },
    { label: "Re-enrollment follow-up",         sub: "Contact long-term absentees",       end: "10 Days" },
  ],
  "2025-05-14": [
    { label: "Weekly summary report",           sub: "Compile and email to principal",    end: "2 Days"  },
    { label: "Grade 8 counselor referrals",     sub: "Flag chronic absentees",            end: "4 Days"  },
    { label: "Attendance board update",         sub: "Post hallway recognition board",    end: "6 Days"  },
    { label: "System audit log review",         sub: "Verify all entries are accurate",   end: "12 Days" },
  ],
};

const fallback: Task[] = [
  { label: "Unexcused absences to review",    sub: "Flagged for parent notification",  end: "2 Days"  },
  { label: "Monthly attendance report due",   sub: "Submit to district office",         end: "5 Days"  },
  { label: "Perfect attendance certificates", sub: "Print and prepare for assembly",    end: "8 Days"  },
  { label: "Grade 10 make-up attendance",     sub: "Coordinate with advisers",          end: "14 Days" },
];

const toDateStr = (date: Date | null) => {
  if (!date) return null;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

interface TasksCardProps {
  selectedDate: Date | null;
}

export function TasksCard({ selectedDate }: TasksCardProps) {
  const key = toDateStr(selectedDate);
  const tasks = (key && dataByDate[key]) ? dataByDate[key] : fallback;

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