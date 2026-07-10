"use client";

import React from "react";
import styles from "./ReintegrationList.module.css";
import { ReintegrationCase } from "../../data/mockData";

interface ReintegrationListProps {
  cases: ReintegrationCase[];
  onView: (id: string) => void;
}

function StatusBadge({ status }: { status: ReintegrationCase["status"] }) {
  const statusClass =
    status === "Returned to Regular Class"
      ? styles.statusApproved
      : status === "Returned to ADM"
      ? styles.statusDeclined
      : styles.statusPending;
  return <span className={`${styles.statusBadge} ${statusClass}`}>{status}</span>;
}

export default function ReintegrationList({ cases, onView }: ReintegrationListProps) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>Reintegration Reviews</h2>
        <span className={styles.cardSubtitle}>Students recommended to return to regular classes</span>
      </div>
      <div className={styles.tableWrapperResponsive}>
        <table className={styles.plainTable}>
          <thead>
            <tr>
              <th>Student</th>
              <th>Grade</th>
              <th>Recommended By</th>
              <th>Assessment</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((item) => (
              <tr key={item.id} className={styles.tableRowHover}>
                <td className={styles.tableWeightCell}>{item.studentName}</td>
                <td>{item.grade}</td>
                <td>{item.recommendedBy}</td>
                <td>
                  <span className={styles.assessmentTextBadge}>{item.assessmentTag}</span>
                </td>
                <td>
                  <StatusBadge status={item.status} />
                </td>
                <td style={{ textAlign: "right" }}>
                  <button className={styles.textActionBtn} onClick={() => onView(item.id)}>
                    View Details
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
