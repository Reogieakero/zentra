"use client";

import styles from "./AttendanceOverlay.module.css";
import { StatusBadge } from "./StatusBadge";
import {
  type Student,
  GRADE_ORDER,
  STATUS_TABS,
  formatShortDate,
} from "./types";

interface OverlayStats {
  total: number;
  present: number;
  late: number;
  absent: number;
}

interface GradeGroup {
  grade: string;
  rows: Student[];
}

interface AttendanceOverlayProps {
  fsTab: string;
  fsGrade: string;
  fsSection: string;
  availableSections: string[];
  onFsTabChange: (tab: string) => void;
  onFsGradeChange: (grade: string) => void;
  onFsSectionChange: (section: string) => void;
  fsGrouped: GradeGroup[];
  fsStats: OverlayStats;
  onClose: () => void;
  onRowClick: (student: Student) => void;
}

export function AttendanceOverlay({
  fsTab,
  fsGrade,
  fsSection,
  availableSections,
  onFsTabChange,
  onFsGradeChange,
  onFsSectionChange,
  fsGrouped,
  fsStats,
  onClose,
  onRowClick,
}: AttendanceOverlayProps) {
  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.panel}>

        <div className={styles.header}>
          <div>
            <div className={styles.title}>Attendance Overview</div>
            <div className={styles.sub}>All students grouped by grade level</div>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close fullscreen"
          >
            &times;
          </button>
        </div>

        <div className={styles.filterRow}>
          <span className={styles.filterLabel}>Grade</span>
          <div className={styles.tabGroup}>
            {(["All", ...GRADE_ORDER] as string[]).map((g) => (
              <button
                key={g}
                type="button"
                className={`${styles.tab} ${fsGrade === g ? styles.tabActive : ""}`}
                onClick={() => onFsGradeChange(g)}
              >
                {g === "All" ? "All Grades" : g}
              </button>
            ))}
          </div>

          <div className={`${styles.tabGroup} ${styles.tabGroupRight}`}>
            {STATUS_TABS.map((t) => (
              <button
                key={t}
                type="button"
                className={`${styles.tab} ${fsTab === t ? styles.tabActive : ""}`}
                onClick={() => onFsTabChange(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {fsGrade !== "All" && availableSections.length > 0 && (
          <div className={styles.sectionRow}>
            <span className={styles.sectionLabel}>Section</span>
            <div className={styles.tabGroup}>
              {(["All", ...availableSections] as string[]).map((sec) => (
                <button
                  key={sec}
                  type="button"
                  className={`${styles.tab} ${styles.tabSection} ${fsSection === sec ? styles.tabSectionActive : ""}`}
                  onClick={() => onFsSectionChange(sec)}
                >
                  {sec === "All" ? "All Sections" : sec}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className={styles.body}>

          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Total Students</span>
              <span className={`${styles.statValue} ${styles.statIndigo}`}>{fsStats.total}</span>
              <span className={styles.statSub}>in current filter</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Present</span>
              <span className={`${styles.statValue} ${styles.statGreen}`}>{fsStats.present}</span>
              <span className={styles.statSub}>students today</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Late</span>
              <span className={`${styles.statValue} ${styles.statAmber}`}>{fsStats.late}</span>
              <span className={styles.statSub}>late arrivals</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Absent</span>
              <span className={`${styles.statValue} ${styles.statRed}`}>{fsStats.absent}</span>
              <span className={styles.statSub}>days missed</span>
            </div>
          </div>

          {fsGrouped.length === 0 ? (
            <div className={styles.empty}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>No records match the current filter.</span>
            </div>
          ) : (
            fsGrouped.map(({ grade, rows }) => (
              <div key={grade}>
                <div className={styles.gradeLabel}>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  {grade}
                  <span className={styles.gradeCount}>
                    — {rows.length} student{rows.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <table className={styles.table}>
                  <colgroup>
                    <col style={{ width: "12%" }} />
                    <col style={{ width: "26%" }} />
                    <col style={{ width: "16%" }} />
                    <col style={{ width: "18%" }} />
                    <col style={{ width: "14%" }} />
                    <col style={{ width: "14%" }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>LRN</th>
                      <th>Full Name</th>
                      <th>Section</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((s) => (
                      <tr
                        key={s.lrn}
                        onClick={() => onRowClick(s)}
                        className={styles.clickableRow}
                      >
                        <td className={styles.lrnCell}>{s.lrn}</td>
                        <td className={styles.nameCell}>{s.name}</td>
                        <td>{s.section}</td>
                        <td>{formatShortDate(s.date)}</td>
                        <td>
                          <StatusBadge status={s.status} />
                        </td>
                        <td>
                          <button
                            type="button"
                            className={styles.seeMoreBtn}
                            aria-label="See more"
                            onClick={(e) => {
                              e.stopPropagation();
                              onRowClick(s);
                            }}
                          >
                            See More
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}