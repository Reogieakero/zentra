"use client";

import { useState } from "react";
import styles from "./AttendanceTable.module.css";

interface Student {
  id: string;
  name: string;
  grade: string;
  date: string;
  timeIn: string;
  timeOut: string;
  status: "Present" | "Late" | "Absent";
}

const students: Student[] = [
  { id: "STU-001", name: "Aria Santos",      grade: "Grade 10", date: "16 May 2025", timeIn: "07:42", timeOut: "16:00", status: "Present" },
  { id: "STU-002", name: "Marco Reyes",      grade: "Grade 9",  date: "16 May 2025", timeIn: "08:15", timeOut: "16:00", status: "Late"    },
  { id: "STU-003", name: "Sophia Lim",       grade: "Grade 11", date: "16 May 2025", timeIn: "07:30", timeOut: "16:00", status: "Present" },
  { id: "STU-004", name: "Ethan Cruz",       grade: "Grade 8",  date: "16 May 2025", timeIn: "—",     timeOut: "—",     status: "Absent"  },
  { id: "STU-005", name: "Isabella Tan",     grade: "Grade 12", date: "16 May 2025", timeIn: "07:55", timeOut: "16:00", status: "Present" },
  { id: "STU-006", name: "Lucas Dela Cruz",  grade: "Grade 7",  date: "16 May 2025", timeIn: "09:10", timeOut: "16:00", status: "Late"    },
];

const badgeClass: Record<Student["status"], string> = {
  Present: styles.badgePresent,
  Late:    styles.badgeLate,
  Absent:  styles.badgeAbsent,
};

export function AttendanceTable() {
  const [activeTab, setActiveTab] = useState<string>("Late Arrivals");
  const tabs: string[] = ["Late Arrivals", "Absent Today", "Excused"];

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <div className={styles.cardTitle}>Student Attendance Log</div>
          <div className={styles.cardSub}>Arrival details for today</div>
        </div>
        <div className={styles.tabGroup}>
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              className={`${styles.tab} ${activeTab === t ? styles.tabActive : ""}`}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Full Name</th>
            <th>Grade</th>
            <th>Date</th>
            <th>Time In</th>
            <th>Time Out</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td className={styles.idCell}>{s.id}</td>
              <td className={styles.nameCell}>{s.name}</td>
              <td>{s.grade}</td>
              <td>{s.date}</td>
              <td>{s.timeIn}</td>
              <td>{s.timeOut}</td>
              <td>
                <span className={`${styles.badge} ${badgeClass[s.status]}`}>
                  <span className={styles.badgeDot} />
                  {s.status}
                </span>
              </td>
              <td>
                <button type="button" className={styles.actionBtn} aria-label="Add record">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <path d="M9 12h6M12 9v6" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}