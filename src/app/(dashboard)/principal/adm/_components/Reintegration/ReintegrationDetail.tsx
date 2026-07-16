"use client";

import React, { useState } from "react";
import { ArrowLeft, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import styles from "./ReintegrationDetail.module.css";
import { ReintegrationCase, ReintegrationStatus } from "../../_data/mockData";

interface ReintegrationDetailProps {
  reintegrationCase: ReintegrationCase;
  onBack: () => void;
  onDecide: (id: string, status: ReintegrationStatus, principalRemarks: string) => void;
}

function StatusBadge({ status }: { status: ReintegrationStatus }) {
  const statusClass =
    status === "Returned to Regular Class"
      ? styles.statusApproved
      : status === "Returned to ADM"
      ? styles.statusDeclined
      : styles.statusPending;
  return <span className={`${styles.statusBadge} ${statusClass}`}>{status}</span>;
}

export default function ReintegrationDetail({ reintegrationCase, onBack, onDecide }: ReintegrationDetailProps) {
  const [remarks, setRemarks] = useState(reintegrationCase.principalRemarks);

  const handleApprove = () => onDecide(reintegrationCase.id, "Returned to Regular Class", remarks);
  const handleReturnToADM = () => onDecide(reintegrationCase.id, "Returned to ADM", remarks);
  const handleSaveRemarks = () => onDecide(reintegrationCase.id, reintegrationCase.status, remarks);

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        <Button className={styles.backBtn} onClick={onBack} variant="ghost" size="sm">
          Back to Reintegration
        </Button>
        <StatusBadge status={reintegrationCase.status} />
      </div>

      <div className={styles.headerBlock}>
        <h2 className={styles.studentName}>{reintegrationCase.studentName}</h2>
        <span className={styles.headerSub}>{reintegrationCase.grade}</span>
      </div>

      {reintegrationCase.status === "Returned to Regular Class" && (
        <div className={styles.approvedBanner}>
          Student status has been changed to Returned to Regular Class and removed from Active ADM.
        </div>
      )}

      <div className={styles.sectionGrid}>
        <div className={styles.cardContainer}>
          <h3 className={styles.cardTitle}>Student Information</h3>
          <div className={styles.infoGrid}>
            <div className={styles.infoField}>
              <span className={styles.infoLabel}>Student Name</span>
              <span className={styles.infoValue}>{reintegrationCase.studentName}</span>
            </div>
            <div className={styles.infoField}>
              <span className={styles.infoLabel}>Grade</span>
              <span className={styles.infoValue}>{reintegrationCase.grade}</span>
            </div>
            <div className={styles.infoField}>
              <span className={styles.infoLabel}>Recommended By</span>
              <span className={styles.infoValue}>{reintegrationCase.recommendedBy}</span>
            </div>
            <div className={styles.infoField}>
              <span className={styles.infoLabel}>Duration in ADM</span>
              <span className={styles.infoValue}>{reintegrationCase.durationInADM}</span>
            </div>
          </div>
        </div>

        <div className={styles.cardContainer}>
          <h3 className={styles.cardTitle}>Academic Progress</h3>
          <p className={styles.summaryText}>{reintegrationCase.academicProgress}</p>
        </div>

        <div className={styles.cardContainer}>
          <h3 className={styles.cardTitle}>Recommendations</h3>
          <div className={styles.remarksBlock}>
            <span className={styles.infoLabel}>Guidance Counselor Recommendation</span>
            <p className={styles.summaryText}>{reintegrationCase.guidanceRecommendation}</p>
          </div>
          <div className={styles.remarksBlock}>
            <span className={styles.infoLabel}>ADM Coordinator Recommendation</span>
            <p className={styles.summaryText}>{reintegrationCase.admCoordinatorRecommendation}</p>
          </div>
        </div>

        <div className={styles.cardContainer}>
          <h3 className={styles.cardTitle}>Final Assessment</h3>
          <p className={styles.summaryText}>{reintegrationCase.finalAssessment}</p>
        </div>
      </div>

      <div className={styles.approvalCard}>
        <h3 className={styles.cardTitle}>Principal Actions</h3>
        <textarea
          className={styles.remarksInput}
          placeholder="Add remarks or instructions for this reintegration review"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
        <div className={styles.approvalActions}>
          <Button className={styles.remarksBtn} onClick={handleSaveRemarks} variant="outline" size="sm">
            Add Remarks
          </Button>
          <Button className={styles.declineBtn} onClick={handleReturnToADM} variant="outline" size="sm">
            Return to ADM
          </Button>
          <Button className={styles.approveBtn} onClick={handleApprove} variant="primary" size="sm">
            Approve Reintegration
          </Button>
        </div>
      </div>
    </div>
  );
}
