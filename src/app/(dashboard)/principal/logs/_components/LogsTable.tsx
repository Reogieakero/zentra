"use client";

import React, { useState } from "react";
import styles from "./LogsTable.module.css";
import { CATEGORY_META, type LogEntry, type LogSeverity } from "./logTypes";
import { InfoIcon, WarningIcon, ErrorIcon, ChevronDownIcon } from "./LogIcons";

const PAGE_SIZE = 8;

interface LogsTableProps {
  logs: LogEntry[];
}

export function LogsTable({ logs }: LogsTableProps) {
  const [page, setPage] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const totalPages = Math.max(1, Math.ceil(logs.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);
  const pageLogs = logs.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  const goToPage = (p: number) => {
    setExpandedId(null);
    setPage(Math.max(0, Math.min(p, totalPages - 1)));
  };

  if (logs.length === 0) {
    return (
      <div className={styles.emptyState}>
        No log entries match your filters. Try adjusting search or category.
      </div>
    );
  }

  return (
    <section className={styles.container}>
      <div className={styles.listHead}>
        <span />
        <span className={styles.headCell}>Time</span>
        <span className={styles.headCell}>Level</span>
        <span className={styles.headCell}>Category</span>
        <span className={styles.headCell}>Event</span>
        <span />
      </div>

      <div className={styles.list}>
        {pageLogs.map((log) => {
          const meta = CATEGORY_META[log.category];
          const isExpanded = expandedId === log.id;
          return (
            <React.Fragment key={log.id}>
              <div
                className={`${styles.logLine} ${isExpanded ? styles.logLineOpen : ""}`}
                onClick={() => setExpandedId(isExpanded ? null : log.id)}
                role="button"
                tabIndex={0}
              >
                <span className={`${styles.rail} ${railClass(log.severity)}`} />
                <span className={styles.colTime}>{log.timestamp}</span>
                <SeverityTag severity={log.severity} />
                <span className={styles.colCategory} style={{ color: meta.color }}>
                  {meta.label}
                </span>
                <span className={styles.colMessage}>
                  <span className={styles.colMessageActor}>{log.actor}</span>
                  <span>{log.action}</span>
                </span>
                <span className={styles.colChevron}>
                  <span className={isExpanded ? styles.chevronOpen : undefined}>
                    <ChevronDownIcon />
                  </span>
                </span>
              </div>

              {isExpanded && (
                <div className={styles.detailPanel}>
                  <p className={styles.detailMessage}>{log.details}</p>
                  <div className={styles.detailMeta}>
                    <MetaItem label="Actor" value={log.actor} />
                    <MetaItem label="Category" value={meta.label} />
                    <MetaItem label="Severity" value={capitalize(log.severity)} />
                    <MetaItem label="IP Address" value={log.ip} />
                    <MetaItem label="Timestamp" value={log.timestamp} />
                    <MetaItem label="Event ID" value={log.id} />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className={styles.pagination}>
        <span className={styles.pageInfo}>
          Showing {safePage * PAGE_SIZE + 1}\u2013{Math.min((safePage + 1) * PAGE_SIZE, logs.length)} of {logs.length}
        </span>
        <div className={styles.pageBtns}>
          <button
            type="button"
            className={styles.pageBtn}
            onClick={() => goToPage(safePage - 1)}
            disabled={safePage === 0}
          >
            Previous
          </button>
          <button
            type="button"
            className={styles.pageBtn}
            onClick={() => goToPage(safePage + 1)}
            disabled={safePage >= totalPages - 1}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

function railClass(severity: LogSeverity) {
  if (severity === "error") return styles.railError;
  if (severity === "warning") return styles.railWarning;
  return styles.railInfo;
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.metaItem}>
      <span className={styles.metaKey}>{label}</span>
      <span className={styles.metaValue}>{value}</span>
    </div>
  );
}

function SeverityTag({ severity }: { severity: LogSeverity }) {
  if (severity === "error") {
    return (
      <span className={`${styles.levelTag} ${styles.levelError}`}>
        <ErrorIcon />
        Error
      </span>
    );
  }
  if (severity === "warning") {
    return (
      <span className={`${styles.levelTag} ${styles.levelWarning}`}>
        <WarningIcon />
        Warning
      </span>
    );
  }
  return (
    <span className={`${styles.levelTag} ${styles.levelInfo}`}>
      <InfoIcon />
      Info
    </span>
  );
}
