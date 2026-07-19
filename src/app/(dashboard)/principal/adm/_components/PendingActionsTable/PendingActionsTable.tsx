"use client";

import React from "react";
import styles from "./PendingActionsTable.module.css";
import { pendingActions } from "../../_data/mockData";

export default function PendingActionsTable() {
  return (
    <div className={`${styles.cardContainer} ${styles.fadeInUp} ${styles.stretchFlexCard}`} style={{ animationDelay: "0.3s" }}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>Pending Actions</h2>
      </div>
      <div className={styles.tableWrapperResponsive}>
        <table className={styles.plainTable}>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Grade & Section</th>
              <th>Adviser</th>
              <th>Reason for ADM</th>
              <th>Date Referred</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingActions.map((act, i) => (
              <tr key={i} className={styles.tableRowHover}>
                <td className={styles.tableWeightCell}>{act.name}</td>
                <td>{act.gradeSection}</td>
                <td>{act.adviser}</td>
                <td>
                  <span className={styles.reasonTextBadge}>{act.reason}</span>
                </td>
                <td>{act.date}</td>
                <td>
                  <div className={styles.tableActionGroup}>
                    <button className={styles.textActionBtn}>View Details</button>
                    <button className={`${styles.textActionBtn} ${styles.actionApprove}`}>Approve</button>
                    <button className={`${styles.textActionBtn} ${styles.actionDecline}`}>Decline</button>
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