"use client";

import { useState } from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import styles from "./StudentAttendance.module.css";

type Day = "Mon" | "Tue" | "Wed" | "Thu" | "Fri";

interface RadarRow {
  subject: string;
  value: number;
}

interface BarRow {
  grade: string;
  present: number;
  absent: number;
}

interface HeatRow {
  time: string;
  Mon: number;
  Tue: number;
  Wed: number;
  Thu: number;
  Fri: number;
}

interface Student {
  id: string;
  name: string;
  grade: string;
  date: string;
  timeIn: string;
  timeOut: string;
  status: "Present" | "Late" | "Absent";
}

interface Task {
  label: string;
  sub: string;
  end: string;
}

const radarData: RadarRow[] = [
  { subject: "Grade 7", value: 92 },
  { subject: "Grade 8", value: 87 },
  { subject: "Grade 9", value: 95 },
  { subject: "Grade 10", value: 78 },
  { subject: "Grade 11", value: 88 },
  { subject: "Grade 12", value: 91 },
];

const barData: BarRow[] = [
  { grade: "G7", present: 210, absent: 18 },
  { grade: "G8", present: 195, absent: 27 },
  { grade: "G9", present: 228, absent: 12 },
  { grade: "G10", present: 178, absent: 48 },
  { grade: "G11", present: 202, absent: 30 },
  { grade: "G12", present: 215, absent: 21 },
];

const heatmapData: HeatRow[] = [
  { time: "07:00", Mon: 3, Tue: 2, Wed: 1, Thu: 2, Fri: 1 },
  { time: "07:30", Mon: 7, Tue: 6, Wed: 8, Thu: 5, Fri: 4 },
  { time: "08:00", Mon: 9, Tue: 9, Wed: 9, Thu: 8, Fri: 7 },
  { time: "08:30", Mon: 5, Tue: 6, Wed: 4, Thu: 7, Fri: 6 },
  { time: "09:00", Mon: 2, Tue: 3, Wed: 2, Thu: 3, Fri: 5 },
];

const days: Day[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const students: Student[] = [
  { id: "STU-001", name: "Aria Santos",      grade: "Grade 10", date: "16 May 2025", timeIn: "07:42", timeOut: "16:00", status: "Present" },
  { id: "STU-002", name: "Marco Reyes",      grade: "Grade 9",  date: "16 May 2025", timeIn: "08:15", timeOut: "16:00", status: "Late"    },
  { id: "STU-003", name: "Sophia Lim",       grade: "Grade 11", date: "16 May 2025", timeIn: "07:30", timeOut: "16:00", status: "Present" },
  { id: "STU-004", name: "Ethan Cruz",       grade: "Grade 8",  date: "16 May 2025", timeIn: "—",     timeOut: "—",     status: "Absent"  },
  { id: "STU-005", name: "Isabella Tan",     grade: "Grade 12", date: "16 May 2025", timeIn: "07:55", timeOut: "16:00", status: "Present" },
  { id: "STU-006", name: "Lucas Dela Cruz",  grade: "Grade 7",  date: "16 May 2025", timeIn: "09:10", timeOut: "16:00", status: "Late"    },
];

const tasks: Task[] = [
  { label: "Unexcused absences to review",    sub: "Flagged for parent notification",  end: "2 Days"  },
  { label: "Monthly attendance report due",   sub: "Submit to district office",         end: "5 Days"  },
  { label: "Perfect attendance certificates", sub: "Print and prepare for assembly",    end: "8 Days"  },
  { label: "Grade 10 make-up attendance",     sub: "Coordinate with advisers",          end: "14 Days" },
];

function intensityColor(v: number): string {
  if (v >= 8) return "#7c3aed";
  if (v >= 6) return "#a78bfa";
  if (v >= 4) return "#c4b5fd";
  if (v >= 2) return "#ede9fe";
  return "#f5f3ff";
}

const badgeClass: Record<Student["status"], string> = {
  Present: styles.badgePresent,
  Late:    styles.badgeLate,
  Absent:  styles.badgeAbsent,
};

export function StudentAttendance() {
  const [activeTab, setActiveTab] = useState<string>("Late Arrivals");
  const tabs: string[] = ["Late Arrivals", "Absent Today", "Excused"];

  return (
    <div className={styles.grid}>

      {/* School Attendance Overview – Radar */}
      <div className={`${styles.card} ${styles.spanRadar}`}>
        <div className={styles.cardHeader}>
          <div>
            <div className={styles.cardTitle}>School Attendance Overview</div>
            <div className={styles.cardSub}>Monthly rate by grade level</div>
          </div>
          <button className={styles.moreBtn}>···</button>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <RadarChart data={radarData} outerRadius={80}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#9ca3af" }} />
            <Radar
              dataKey="value"
              stroke="#7c3aed"
              fill="#7c3aed"
              fillOpacity={0.18}
              strokeWidth={2}
              dot={{ r: 4, fill: "#7c3aed" }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Grade Attendance Distribution – Bar */}
      <div className={`${styles.card} ${styles.spanBar}`}>
        <div className={styles.cardHeader}>
          <div>
            <div className={styles.cardTitle}>Grade Attendance Distribution</div>
            <div className={styles.cardSub}>Present vs absent per grade</div>
          </div>
          <button className={styles.moreBtn}>···</button>
        </div>
        <div className={styles.totalRow}>
          <span className={styles.totalCount}>1,228</span>
          <span className={styles.totalLabel}>Total enrolled students</span>
        </div>
        <div className={styles.legend}>
          <span className={styles.legendDot} style={{ background: "#7c3aed" }} />
          Present
          <span className={styles.legendDot} style={{ background: "#c4b5fd", marginLeft: "1rem" }} />
          Absent
        </div>
        <ResponsiveContainer width="100%" height={110}>
          <BarChart data={barData} barGap={2}>
            <XAxis dataKey="grade" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: "rgba(124,58,237,0.06)" }}
              contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }}
            />
            <Bar dataKey="present" radius={[4, 4, 0, 0]} fill="#7c3aed" />
            <Bar dataKey="absent"  radius={[4, 4, 0, 0]} fill="#c4b5fd" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Arrival Heatmap */}
      <div className={`${styles.card} ${styles.spanHeat}`}>
        <div className={styles.cardHeader}>
          <div>
            <div className={styles.cardTitle}>Arrival Heatmap</div>
            <div className={styles.cardSub}>Real-time student arrival density</div>
          </div>
          <button className={styles.moreBtn}>···</button>
        </div>
        <div className={styles.heatmap}>
          <div className={styles.heatDays}>
            <span />
            {days.map((d) => (
              <span key={d} className={styles.heatDayLabel}>{d}</span>
            ))}
          </div>
          {heatmapData.map((row) => (
            <div key={row.time} className={styles.heatRow}>
              <span className={styles.heatTimeLabel}>{row.time}</span>
              {days.map((d) => {
                const val = row[d];
                return (
                  <div
                    key={d}
                    className={styles.heatCell}
                    style={{ background: intensityColor(val) }}
                    title={`${row.time} ${d}: ${val} arrivals`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Tasks / Action Items */}
      <div className={`${styles.card} ${styles.spanTasks}`}>
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

      {/* Student Attendance Log Table */}
      <div className={`${styles.card} ${styles.spanTable}`}>
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

    </div>
  );
}