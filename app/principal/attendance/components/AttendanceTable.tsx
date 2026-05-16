"use client";

import { useState } from "react";
import styles from "./AttendanceTable.module.css";
import { StudentDrawer } from "./studentDrawer/StudentDrawer";

interface Student {
  lrn: string;
  name: string;
  grade: string;
  date: string;
  status: "Present" | "Late" | "Absent";
}

const toDateStr = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const offsetDate = (daysAgo: number) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return toDateStr(d);
};

const students: Student[] = [
  { lrn: "STU-001", name: "Aria Santos",      grade: "Grade 10", date: offsetDate(0), status: "Present" },
  { lrn: "STU-002", name: "Marco Reyes",      grade: "Grade 9",  date: offsetDate(0), status: "Late"    },
  { lrn: "STU-003", name: "Sophia Lim",       grade: "Grade 11", date: offsetDate(0), status: "Present" },
  { lrn: "STU-004", name: "Ethan Cruz",       grade: "Grade 8",  date: offsetDate(0), status: "Absent"  },
  { lrn: "STU-005", name: "Isabella Tan",     grade: "Grade 12", date: offsetDate(0), status: "Present" },
  { lrn: "STU-006", name: "Lucas Dela Cruz",  grade: "Grade 7",  date: offsetDate(0), status: "Late"    },
  { lrn: "STU-007", name: "Hannah Garcia",    grade: "Grade 9",  date: offsetDate(1), status: "Absent"  },
  { lrn: "STU-008", name: "James Villanueva", grade: "Grade 10", date: offsetDate(1), status: "Present" },
  { lrn: "STU-009", name: "Mia Fernandez",    grade: "Grade 11", date: offsetDate(1), status: "Absent"  },
  { lrn: "STU-010", name: "Leo Aquino",       grade: "Grade 7",  date: offsetDate(2), status: "Present" },
  { lrn: "STU-011", name: "Camille Bautista", grade: "Grade 8",  date: offsetDate(2), status: "Absent"  },
  { lrn: "STU-012", name: "Ryan Mendoza",     grade: "Grade 12", date: offsetDate(2), status: "Late"    },
];

const badgeClass: Record<Student["status"], string> = {
  Present: styles.badgePresent,
  Late:    styles.badgeLate,
  Absent:  styles.badgeAbsent,
};

const toDateStrFromDate = (date: Date | null) => {
  if (!date) return null;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

interface AttendanceTableProps {
  selectedDate: Date | null;
}

export function AttendanceTable({ selectedDate }: AttendanceTableProps) {
  const [activeTab, setActiveTab] = useState<string>("Absent");
  
  // --- New State for Drawer ---
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleRowClick = (student: Student) => {
    setSelectedStudent(student);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };
  // ----------------------------

  const tabs = ["All", "Present", "Late", "Absent"];
  const dateStr = toDateStrFromDate(selectedDate);

  const filtered = students.filter((s) => {
    const matchDate = dateStr ? s.date === dateStr : true;
    const matchTab = activeTab === "All" ? true : s.status === activeTab;
    return matchDate && matchTab;
  });

  const formatDisplayDate = (date: Date | null) => {
    if (!date) return "all dates";
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <div className={styles.cardTitle}>Student Attendance Log</div>
          <div className={styles.cardSub}>
            {selectedDate ? `Records for ${formatDisplayDate(selectedDate)}` : `Showing ${activeTab.toLowerCase()} records`}
          </div>
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

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span>No records found for this date and filter.</span>
        </div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>LRN</th>
              <th>Full Name</th>
              <th>Grade</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr 
                key={s.lrn} 
                onClick={() => handleRowClick(s)} // Trigger Drawer Open
                className={styles.clickableRow}   // Added class for cursor
              >
                <td className={styles.lrnCell}>{s.lrn}</td>
                <td className={styles.nameCell}>{s.name}</td>
                <td>{s.grade}</td>
                <td>{new Date(s.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                <td>
                  <span className={`${styles.badge} ${badgeClass[s.status]}`}>
                    <span className={styles.badgeDot} />
                    {s.status}
                  </span>
                </td>
                <td>
                  <button 
                    type="button" 
                    className={styles.actionBtn} 
                    aria-label="View record"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row click from firing twice
                      handleRowClick(s);
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Render the Drawer */}
      <StudentDrawer 
        isOpen={isDrawerOpen} 
        onClose={handleCloseDrawer} 
        student={selectedStudent} 
      />
    </div>
  );
}