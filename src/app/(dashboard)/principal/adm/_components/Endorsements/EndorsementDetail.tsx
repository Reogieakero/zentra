"use client";

import React, { useState } from "react";
import { ArrowLeft, CheckCircle2, XCircle, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import styles from "./EndorsementDetail.module.css";
import { Endorsement, EndorsementStatus } from "../../_data/mockData";

interface EndorsementDetailProps {
  endorsement: Endorsement;
  onBack: () => void;
  onDecide: (id: string, status: EndorsementStatus, principalRemarks: string) => void;
}

function StatusBadge({ status }: { status: EndorsementStatus }) {
  const statusClass =
    status === "Approved"
      ? styles.statusApproved
      : status === "Declined"
      ? styles.statusDeclined
      : styles.statusPending;
  return <span className={`${styles.statusBadge} ${statusClass}`}>{status}</span>;
}

export default function EndorsementDetail({ endorsement, onBack, onDecide }: EndorsementDetailProps) {
  const [remarks, setRemarks] = useState(endorsement.principalRemarks);

  const handleApprove = () => onDecide(endorsement.id, "Approved", remarks);
  const handleDecline = () => onDecide(endorsement.id, "Declined", remarks);

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        <Button className={styles.backBtn} onClick={onBack} variant="ghost" size="sm">
          Back to Endorsements
        </Button>
        <StatusBadge status={endorsement.status} />
      </div>

      <div className={styles.headerBlock}>
        <h2 className={styles.studentName}>{endorsement.studentName}</h2>
        <span className={styles.headerSub}>{endorsement.gradeSection}</span>
      </div>

      <div className={styles.sectionGrid}>
        <div className={styles.cardContainer}>
          <h3 className={styles.cardTitle}>Student Information</h3>
          <div className={styles.infoGrid}>
            <div className={styles.infoField}>
              <span className={styles.infoLabel}>Student Name</span>
              <span className={styles.infoValue}>{endorsement.studentName}</span>
            </div>
            <div className={styles.infoField}>
              <span className={styles.infoLabel}>Learner Reference Number (LRN)</span>
              <span className={styles.infoValue}>{endorsement.lrn}</span>
            </div>
            <div className={styles.infoField}>
              <span className={styles.infoLabel}>Grade & Section</span>
              <span className={styles.infoValue}>{endorsement.gradeSection}</span>
            </div>
            <div className={styles.infoField}>
              <span className={styles.infoLabel}>Adviser</span>
              <span className={styles.infoValue}>{endorsement.adviser}</span>
            </div>
          </div>
        </div>

        <div className={styles.cardContainer}>
          <h3 className={styles.cardTitle}>Endorsement Details</h3>
          <div className={styles.infoGrid}>
            <div className={styles.infoField}>
              <span className={styles.infoLabel}>Endorsed By</span>
              <span className={styles.infoValue}>{endorsement.endorsedBy} ({endorsement.endorserRole})</span>
            </div>
            <div className={styles.infoField}>
              <span className={styles.infoLabel}>Date Endorsed</span>
              <span className={styles.infoValue}>{endorsement.dateEndorsed}</span>
            </div>
            <div className={styles.infoField}>
              <span className={styles.infoLabel}>Reason for ADM</span>
              <span className={styles.reasonTextBadge}>{endorsement.reason}</span>
            </div>
          </div>
          <div className={styles.summaryBlock}>
            <span className={styles.infoLabel}>Summary of the Case</span>
            <p className={styles.summaryText}>{endorsement.summary}</p>
          </div>
        </div>

        <div className={styles.cardContainer}>
          <h3 className={styles.cardTitle}>Supporting Documents</h3>
          <div className={styles.documentList}>
            {endorsement.documents.map((doc) => (
              <div key={doc.name} className={styles.documentRow}>
                {doc.uploaded ? (
                  <CheckCircle2 size={16} className={styles.docUploadedIcon} />
                ) : (
                  <XCircle size={16} className={styles.docMissingIcon} />
                )}
                <span className={doc.uploaded ? styles.documentName : styles.documentNameMissing}>
                  {doc.name}
                </span>
                <span className={doc.uploaded ? styles.docUploadedTag : styles.docMissingTag}>
                  {doc.uploaded ? "Uploaded" : "Not Applicable"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.cardContainer}>
          <h3 className={styles.cardTitle}>Recommendations</h3>
          <div className={styles.remarksBlock}>
            <span className={styles.infoLabel}>Guidance Counselor Remarks</span>
            <p className={styles.summaryText}>{endorsement.guidanceRemarks}</p>
          </div>
          <div className={styles.remarksBlock}>
            <span className={styles.infoLabel}>ADM Coordinator Remarks</span>
            <p className={styles.summaryText}>{endorsement.admCoordinatorRemarks}</p>
          </div>
        </div>
      </div>

      <div className={styles.approvalCard}>
        <h3 className={styles.cardTitle}>Approval Section</h3>
        <textarea
          className={styles.remarksInput}
          placeholder="Add remarks or instructions for this endorsement"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
        <div className={styles.approvalActions}>
          <Button className={styles.declineBtn} onClick={handleDecline} variant="outline" size="sm">
            Decline ADM Endorsement
          </Button>
          <Button className={styles.approveBtn} onClick={handleApprove} variant="primary" size="sm">
            Approve ADM Endorsement
          </Button>
        </div>
        {endorsement.status !== "Pending" && (
          <p className={styles.decisionNote}>
            This endorsement has already been marked as {endorsement.status.toLowerCase()}. Submitting again will update the decision.
          </p>
        )}
      </div>
    </div>
  );
}
