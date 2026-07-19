"use client";

import React, { useState } from "react";
import styles from "./StudentDetailPanel.module.css";
import { AtRiskStudent, InterventionLog } from "./data";
import { XIcon } from "./Icons";

interface Props {
  student: AtRiskStudent;
  onClose: () => void;
}

export function StudentDetailPanel({ student, onClose }: Props) {
  const [logs, setLogs] = useState<InterventionLog[]>(student.logs);
  const [note, setNote] = useState("");
  const isHigh = student.risk === "high";

  const handleLogIntervention = () => {
    if (!note.trim()) return;
    const entry: InterventionLog = {
      id: `local-${Date.now()}`,
      date: "Today",
      author: "You",
      note: note.trim(),
    };
    setLogs((prev) => [entry, ...prev]);
    setNote("");
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <aside className={styles.panel} role="dialog" aria-label={`${student.name} details`}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <div className={`${styles.headerAvatar} ${isHigh ? styles.headerAvatarHigh : styles.headerAvatarMed}`}>
              {student.avatar}
            </div>
            <div>
              <div className={styles.headerName}>{student.name}</div>
              <div className={styles.headerMeta}>
                Grade {student.grade} — {student.section} · Assigned to {student.counselor}
              </div>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <XIcon />
          </button>
        </div>

        <div className={styles.body}>
          {/* Left: identity, key numbers, flags, guardian contact */}
          <div className={styles.sidebar}>
            <div>
              <div className={styles.sectionLabel}>Key Numbers</div>
              <div className={styles.statsGrid}>
                <div className={styles.statBox}>
                  <div className={styles.statValue}>{student.absences}</div>
                  <div className={styles.statLabel}>Absences</div>
                </div>
                <div className={styles.statBox}>
                  <div className={styles.statValue}>{student.gpa}</div>
                  <div className={styles.statLabel}>GPA</div>
                </div>
                <div className={styles.statBox}>
                  <div className={styles.statValue}>{student.attendanceRate}%</div>
                  <div className={styles.statLabel}>Attendance</div>
                </div>
                <div className={styles.statBox}>
                  <div className={styles.statValue}>
                    {student.trend === "down" ? "↓" : student.trend === "up" ? "↑" : "→"}
                  </div>
                  <div className={styles.statLabel}>Trend</div>
                </div>
              </div>
            </div>

            <div>
              <div className={styles.sectionLabel}>Flags</div>
              <div className={styles.flags}>
                {student.flags.map((f) => (
                  <span key={f} className={styles.flag}>
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className={styles.sectionLabel}>Subjects Affected</div>
              <div className={styles.flags}>
                {student.subjects.map((s) => (
                  <span key={s} className={styles.subjectFlag}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className={styles.sectionLabel}>Guardian Contact</div>
              <div className={styles.contactCard}>
                <div className={styles.contactRow}>
                  <span className={styles.contactLabel}>Name</span>
                  <span className={styles.contactValue}>{student.guardianName}</span>
                </div>
                <div className={styles.contactRow}>
                  <span className={styles.contactLabel}>Phone</span>
                  <span className={styles.contactValue}>{student.guardianContact}</span>
                </div>
                <div className={styles.contactRow}>
                  <span className={styles.contactLabel}>Assigned Counselor</span>
                  <span className={styles.contactValue}>{student.counselor}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: history + new intervention, side by side */}
          <div className={styles.main}>
            <div className={styles.twoColSection}>
              <div>
                <div className={styles.sectionLabel}>Intervention History</div>
                {logs.length === 0 ? (
                  <p className={styles.emptyLogs}>No interventions logged yet for this student.</p>
                ) : (
                  <div className={styles.logList}>
                    {logs.map((log) => (
                      <div key={log.id} className={styles.logEntry}>
                        <div className={styles.logMeta}>
                          {log.date} · {log.author}
                        </div>
                        <div className={styles.logNote}>{log.note}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <div className={styles.sectionLabel}>Log a New Intervention</div>
                <textarea
                  className={styles.textarea}
                  placeholder="e.g. Met with student and guardian to set a weekly attendance goal..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <div className={styles.logButtonWrap}>
                  <button className={styles.logButton} onClick={handleLogIntervention} disabled={!note.trim()}>
                    Log Intervention
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
