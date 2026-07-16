"use client";

import React from "react";
import styles from "./ActiveADMList.module.css";
import { ActiveADMStudent } from "../../_data/mockData";

interface ActiveADMListProps {
  students: ActiveADMStudent[];
  onViewDetails: (id: string) => void;
  onViewProgress: (id: string) => void;
}

function StatusBadge({ status }: { status: ActiveADMStudent["currentStatus"] }) {
  const statusClass =
    status === "On Track"
      ? styles.statusOnTrack
      : status === "Needs Attention"
      ? styles.statusNeedsAttention
      : styles.statusAtRisk;
  return <span className={`${styles.statusBadge} ${statusClass}`}>{status}</span>;
}

export default function ActiveADMList({ students, onViewDetails, onViewProgress }: ActiveADMListProps) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>Active ADM Students</h2>
        <span className={styles.cardSubtitle}>Read-only view. Day-to-day case management is handled by the ADM Coordinator.</span>
      </div>
      <div className={styles.tableWrapperResponsive}>
        <table className={styles.plainTable}>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Grade & Section</th>
              <th>Adviser</th>
              <th>Date Approved</th>
              <th>Reason for ADM</th>
              <th>Current Progress</th>
              <th>Current Status</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className={styles.tableRowHover}>
                <td className={styles.tableWeightCell}>{student.studentName}</td>
                <td>{student.gradeSection}</td>
                <td>{student.adviser}</td>
                <td>{student.dateApproved}</td>
                <td>
                  <span className={styles.reasonTextBadge}>{student.reason}</span>
                </td>
                <td>
                  <div className={styles.progressCell}>
                    <div className={styles.progressTrack}>
                      <div className={styles.progressFill} style={{ width: `${student.currentProgress}%` }} />
                    </div>
                    <span className={styles.progressValue}>{student.currentProgress}%</span>
                  </div>
                </td>
                <td>
                  <StatusBadge status={student.currentStatus} />
                </td>
<td style={{ textAlign: "right" }}>
  <div className={styles.actionGroup}>
    <button className={styles.textActionBtn} onClick={() => onViewDetails(student.id)}>
      View Details
    </button>
    <button className={styles.textActionBtn} onClick={() => onViewProgress(student.id)}>
      View Progress
    </button>
  </div>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
