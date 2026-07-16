"use client";

import styles from "./AttendanceCard.module.css";
import { StatusBadge } from "./StatusBadge";
import { StudentDrawer } from "../studentDrawer/StudentDrawer";
import {
  type Student,
  formatDisplayDate,
  formatShortDate,
} from "./types";

interface AttendanceCardProps {
  selectedDate: Date | null;
  filtered: Student[];
  onOpenFullscreen: () => void;
  onRowClick: (student: Student) => void;
  isDrawerOpen: boolean;
  selectedStudent: Student | null;
  onCloseDrawer: () => void;
}

export function AttendanceCard({
  selectedDate,
  filtered,
  onOpenFullscreen,
  onRowClick,
  isDrawerOpen,
  selectedStudent,
  onCloseDrawer,
}: AttendanceCardProps) {
  return (
    <div className={styles.card}>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className={styles.cardHeader}>
        <div>
          <div className={styles.cardTitle}>Absent Students Log</div>
          <div className={styles.cardSub}>
            {selectedDate
              ? `Absent records for ${formatDisplayDate(selectedDate)}`
              : `Showing absent records for today`}
          </div>
        </div>

        <div className={styles.headerRight}>
          <button
            type="button"
            className={styles.fullscreenBtn}
            onClick={onOpenFullscreen}
            aria-label="View fullscreen"
            title="Fullscreen view"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 3H5a2 2 0 0 0-2 2v3" />
              <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
              <path d="M3 16v3a2 2 0 0 0 2 2h3" />
              <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Table / Empty state ──────────────────────────────────────────── */}
      {filtered.length === 0 ? (
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
          <span>No absent records found for today.</span>
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>LRN</th>
                <th>Full Name</th>
                <th>Grade</th>
                <th>Section</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr
                  key={s.lrn}
                  onClick={() => onRowClick(s)}
                  className={styles.clickableRow}
                >
                  <td className={styles.lrnCell}>{s.lrn}</td>
                  <td className={styles.nameCell}>{s.name}</td>
                  <td>{s.grade}</td>
                  <td>{s.section}</td>
                  <td>{formatShortDate(s.date)}</td>
                  <td>
                    <StatusBadge status={s.status} />
                  </td>
                  <td>
                    <button
                      type="button"
                      className={styles.actionBtn}
                      aria-label="View record"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRowClick(s);
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <StudentDrawer
        isOpen={isDrawerOpen}
        onClose={onCloseDrawer}
        student={selectedStudent}
      />
    </div>
  );
}