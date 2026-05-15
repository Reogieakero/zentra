"use client";

import { useState } from "react";
import styles from "./StudentDrawer.module.css";

interface StudentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  student: {
    lrn: string;
    name: string;
    grade: string;
    status: "Present" | "Late" | "Absent";
  } | null;
}

const ATTENDANCE_DAYS = [
  {
    label: "Today",
    clockIn: "07:30 AM",
    clockOut: "04:30 PM",
    duration: "8h 00m",
    approved: false,
    overtime: false,
    bars: [
      { type: "present",  width: "48%", label: "Class Time (AM)" },
      { type: "break",    width: "11%", label: "Break" },
      { type: "present",  width: "37%", label: "Class Time (PM)" },
    ],
  },
  {
    label: "Thursday, 18",
    clockIn: "07:30 AM",
    clockOut: "12:00 PM",
    duration: "4h 30m",
    approved: false,
    bars: [
      { type: "present",  width: "48%", label: "Class Time (AM)" },
      { type: "break",    width: "11%", label: "Break" },
      { type: "absent",   width: "37%", label: "Absent (PM)" },
    ],
  },
  {
    label: "Wednesday, 17",
    clockIn: "-",
    clockOut: "-",
    duration: "-",
    approved: true,
    bars: [
      { type: "absent",  width: "48%", label: "Absent (AM)" },
      { type: "break",   width: "11%", label: "Break" },
      { type: "absent",  width: "37%", label: "Absent (PM)" },
    ],
  },
  {
    label: "Tuesday, 16",
    clockIn: "08:15 AM",
    clockOut: "04:30 PM",
    duration: "8h 00m",
    approved: false,
    late: true,
    bars: [
      { type: "late",    width: "48%", label: "Class Time (AM)" },
      { type: "break",   width: "11%", label: "Break" },
      { type: "present", width: "37%", label: "Class Time (PM)" },
    ],
  },
  {
    label: "Monday, 15",
    clockIn: "07:30 AM",
    clockOut: "04:30 PM",
    duration: "8h 00m",
    approved: false,
    bars: [
      { type: "present", width: "48%", label: "Class Time (AM)" },
      { type: "break",   width: "11%", label: "Break" },
      { type: "present", width: "37%", label: "Class Time (PM)" },
    ],
  },
];

const TIME_TICKS = ["7:30", "8:30", "9:30", "10:30", "11:30", "12:30", "1:30", "2:30", "3:30", "4:30"];

export function StudentDrawer({ isOpen, onClose, student }: StudentDrawerProps) {
  const [hoveredBar, setHoveredBar] = useState<{ dayIdx: number; barIdx: number } | null>(null);

  if (!student) return null;

  const initials = student.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  const barClass = (type: string) => {
    if (type === "present") return styles.barPresent;
    if (type === "late")    return styles.barLate;
    if (type === "absent")  return styles.barAbsent;
    if (type === "break")   return styles.barBreak;
    return styles.barPresent;
  };

  return (
    <>
      <div
        className={`${styles.backdrop} ${isOpen ? styles.active : ""}`}
        onClick={onClose}
      />

      <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
        <div className={styles.header}>
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

          <div className={styles.statsRow}>
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
                <span className={styles.statValue} style={{ color: "#dc2626" }}>8</span>
                <span className={styles.statSub}>days this school year</span>
              </div>
            </div>

            <div className={styles.statDivider} />

            <div className={styles.statCard}>
              <div className={styles.statIconWrap} style={{ background: "#f0fdf4" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <div className={styles.statCardBody}>
                <span className={styles.statLabel}>Enrolled in ADM Program</span>
                <div className={styles.admBadgeYes}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  Yes
                </div>
                <span className={styles.statSub}>Alternative Delivery Mode</span>
              </div>
            </div>

            <div className={styles.statDivider} />

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
                <span className={styles.statValue} style={{ color: "var(--brand-primary)" }}>3</span>
                <span className={styles.statSub}>recorded incidents</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.searchFilterRow}>
            <div className={styles.monthNav}>
              <button type="button" className={styles.navBtn} aria-label="Previous month">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <span>May 2025</span>
              <button type="button" className={styles.navBtn} aria-label="Next month">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            <div className={styles.searchBox}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              Search
            </div>

            <div className={styles.statusFilter}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18M7 12h10M11 18h2" />
              </svg>
              All Status
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>

          <div className={styles.timelineList}>
            {ATTENDANCE_DAYS.map((day, dayIdx) => (
              <div key={dayIdx} className={styles.daySection}>
                <div className={styles.dayHeader}>
                  <span className={styles.dayLabel}>{day.label}</span>
                  {day.approved && (
                    <span className={styles.approvedBadge}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      Approved
                    </span>
                  )}
                </div>

                <div className={styles.clockRow}>
                  <span className={styles.clockLabel}>Clock-in</span>
                  <div className={styles.timeScale}>
                    {TIME_TICKS.map((t) => (
                      <span key={t} className={styles.timeTick}>{t}</span>
                    ))}
                  </div>
                  <span className={styles.clockLabel}>Clock-out</span>
                  <span className={styles.clockLabel}>Duration</span>
                </div>

                <div className={styles.barRow}>
                  <span className={styles.clockValue}>
                    {day.late && <span className={styles.lateTag}>Late</span>}
                    {day.clockIn}
                  </span>
                  <div className={`${styles.visualBar} ${styles.barWrap}`}>
                    {day.bars.map((bar, barIdx) => (
                      <div
                        key={barIdx}
                        className={barClass(bar.type)}
                        style={{ width: bar.width, position: "relative" }}
                        onMouseEnter={() => setHoveredBar({ dayIdx, barIdx })}
                        onMouseLeave={() => setHoveredBar(null)}
                      >
                        <span className={styles.barLabel}>{bar.label}</span>
                        {hoveredBar?.dayIdx === dayIdx && hoveredBar?.barIdx === barIdx && (
                          <div className={styles.tooltip}>{bar.label}</div>
                        )}
                      </div>
                    ))}
                  </div>
                  <span className={styles.clockValue}>{day.clockOut}</span>
                  <span className={styles.durationValue}>{day.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}