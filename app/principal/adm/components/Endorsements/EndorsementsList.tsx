"use client";

import React from "react";
import styles from "./EndorsementsList.module.css";
import { Endorsement } from "../../data/mockData";

interface EndorsementsListProps {
  endorsements: Endorsement[];
  onView: (id: string) => void;
}

function StatusBadge({ status }: { status: Endorsement["status"] }) {
  const statusClass =
    status === "Approved"
      ? styles.statusApproved
      : status === "Declined"
      ? styles.statusDeclined
      : styles.statusPending;
  return <span className={`${styles.statusBadge} ${statusClass}`}>{status}</span>;
}

export default function EndorsementsList({ endorsements, onView }: EndorsementsListProps) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>ADM Endorsements</h2>
        <span className={styles.cardSubtitle}>Endorsed by the Guidance Counselor and/or ADM Coordinator</span>
      </div>
      <div className={styles.tableWrapperResponsive}>
        <table className={styles.plainTable}>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>LRN</th>
              <th>Grade & Section</th>
              <th>Adviser</th>
              <th>Endorsed By</th>
              <th>Date Endorsed</th>
              <th>Reason for ADM</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {endorsements.map((item) => (
              <tr key={item.id} className={styles.tableRowHover}>
                <td className={styles.tableWeightCell}>{item.studentName}</td>
                <td>{item.lrn}</td>
                <td>{item.gradeSection}</td>
                <td>{item.adviser}</td>
                <td>
                  <div className={styles.endorserCell}>
                    <span>{item.endorsedBy}</span>
                    <span className={styles.endorserRole}>{item.endorserRole}</span>
                  </div>
                </td>
                <td>{item.dateEndorsed}</td>
                <td>
                  <span className={styles.reasonTextBadge}>{item.reason}</span>
                </td>
                <td>
                  <StatusBadge status={item.status} />
                </td>
                <td style={{ textAlign: "right" }}>
                  <button className={styles.textActionBtn} onClick={() => onView(item.id)}>
                    View
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
