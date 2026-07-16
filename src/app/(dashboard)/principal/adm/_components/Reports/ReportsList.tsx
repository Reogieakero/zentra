"use client";

import React, { useState } from "react";
import { FileText, FileSpreadsheet, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import styles from "./ReportsList.module.css";
import { reportsCatalog } from "../../_data/mockData";

type ExportType = "PDF" | "Excel" | "Print";

export default function ReportsList() {
  const [exportStatus, setExportStatus] = useState<Record<string, string>>({});

  const handleExport = (reportId: string, reportName: string, type: ExportType) => {
    if (type === "Print") {
      window.print();
      return;
    }

    setExportStatus((prev) => ({ ...prev, [reportId]: `Preparing ${type} export for ${reportName}` }));
    window.setTimeout(() => {
      setExportStatus((prev) => {
        const next = { ...prev };
        delete next[reportId];
        return next;
      });
    }, 2200);
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>ADM Reports</h2>
        <span className={styles.cardSubtitle}>Generate and export reports to monitor ADM implementation</span>
      </div>
      <div className={styles.reportList}>
        {reportsCatalog.map((report) => (
          <div key={report.id} className={styles.reportRow}>
            <div className={styles.reportInfo}>
              <span className={styles.reportName}>{report.name}</span>
              <span className={styles.reportDescription}>{report.description}</span>
              {exportStatus[report.id] && (
                <span className={styles.exportNotice}>{exportStatus[report.id]}</span>
              )}
            </div>
            <div className={styles.exportActions}>
              <Button className={styles.exportBtn} onClick={() => handleExport(report.id, report.name, "PDF")} variant="outline" size="sm">
                PDF
              </Button>
              <Button className={styles.exportBtn} onClick={() => handleExport(report.id, report.name, "Excel")} variant="outline" size="sm">
                Excel
              </Button>
              <Button className={styles.exportBtn} onClick={() => handleExport(report.id, report.name, "Print")} variant="outline" size="sm">
                Print
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
