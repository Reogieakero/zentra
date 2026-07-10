"use client";

import React, { useState } from "react";
import { ArrowLeft, Lock } from "lucide-react";
import styles from "./ActiveADMDetail.module.css";
import { ActiveADMStudent } from "../../data/mockData";

type ViewMode = "details" | "progress";

interface ActiveADMDetailProps {
  student: ActiveADMStudent;
  initialMode: ViewMode;
  onBack: () => void;
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

function PortfolioBadge({ status }: { status: ActiveADMStudent["portfolioStatus"] }) {
  const statusClass =
    status === "Complete"
      ? styles.portfolioComplete
      : status === "Under Review"
      ? styles.portfolioReview
      : styles.portfolioIncomplete;
  return <span className={`${styles.portfolioBadge} ${statusClass}`}>{status}</span>;
}

export default function ActiveADMDetail({ student, initialMode, onBack }: ActiveADMDetailProps) {
  const [mode, setMode] = useState<ViewMode>(initialMode);

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>
          <ArrowLeft size={16} />
          Back to Active ADM
        </button>
        <StatusBadge status={student.currentStatus} />
      </div>

      <div className={styles.headerBlock}>
        <h2 className={styles.studentName}>{student.studentName}</h2>
        <span className={styles.headerSub}>{student.gradeSection}</span>
      </div>

      <div className={styles.segmentedControl}>
        <button
          className={`${styles.segmentBtn} ${mode === "details" ? styles.segmentActive : ""}`}
          onClick={() => setMode("details")}
        >
          Details
        </button>
        <button
          className={`${styles.segmentBtn} ${mode === "progress" ? styles.segmentActive : ""}`}
          onClick={() => setMode("progress")}
        >
          Progress
        </button>
      </div>

      {mode === "details" ? (
        <div className={styles.sectionGrid}>
          <div className={styles.cardContainer}>
            <h3 className={styles.cardTitle}>Student Information</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoField}>
                <span className={styles.infoLabel}>Student Name</span>
                <span className={styles.infoValue}>{student.studentName}</span>
              </div>
              <div className={styles.infoField}>
                <span className={styles.infoLabel}>Grade & Section</span>
                <span className={styles.infoValue}>{student.gradeSection}</span>
              </div>
              <div className={styles.infoField}>
                <span className={styles.infoLabel}>Adviser</span>
                <span className={styles.infoValue}>{student.adviser}</span>
              </div>
              <div className={styles.infoField}>
                <span className={styles.infoLabel}>Date Approved</span>
                <span className={styles.infoValue}>{student.dateApproved}</span>
              </div>
              <div className={styles.infoField}>
                <span className={styles.infoLabel}>Reason for ADM</span>
                <span className={styles.reasonTextBadge}>{student.reason}</span>
              </div>
            </div>
          </div>

          <div className={styles.cardContainer}>
            <h3 className={styles.cardTitle}>Portfolio Status</h3>
            <PortfolioBadge status={student.portfolioStatus} />
            <p className={styles.readOnlyNote}>
              <Lock size={12} />
              Portfolio contents are maintained by the ADM Coordinator and shown here for reference only.
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.sectionGrid}>
          <div className={styles.cardContainer}>
            <h3 className={styles.cardTitle}>Learning Progress</h3>
            <div className={styles.moduleList}>
              {student.learningProgress.map((module) => (
                <div key={module.subject} className={styles.moduleRow}>
                  <div className={styles.moduleHeader}>
                    <span className={styles.moduleName}>{module.subject}</span>
                    <span className={styles.moduleCount}>{module.completed} / {module.total} modules</span>
                  </div>
                  <div className={styles.progressTrack}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${(module.completed / module.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.cardContainer}>
            <h3 className={styles.cardTitle}>Overall Progress</h3>
            <div className={styles.overallProgress}>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{ width: `${student.currentProgress}%` }} />
              </div>
              <span className={styles.overallProgressValue}>{student.currentProgress}%</span>
            </div>
            <div className={styles.infoField}>
              <span className={styles.infoLabel}>Current Status</span>
              <StatusBadge status={student.currentStatus} />
            </div>
            <div className={styles.summaryBlock}>
              <span className={styles.infoLabel}>Progress Notes</span>
              <p className={styles.summaryText}>{student.progressNotes}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
