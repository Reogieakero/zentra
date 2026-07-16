"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchInput, FilterSelect } from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import styles from "./IncidentReports.module.css";

const severityVariant: Record<string, "danger" | "warning" | "info"> = {
  Critical: "danger",
  High: "warning",
  Moderate: "info",
};

const investigationVariant: Record<string, "warning" | "info" | "success"> = {
  pending: "warning",
  ongoing: "info",
  completed: "success",
};

const mockAttachments = [
  { name: "Incident_Report_Photo_1.jpg", size: "2.4 MB" },
  { name: "Witness_Statement_Torres.pdf", size: "1.1 MB" },
];

export function IncidentReports() {
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([
    { id: 1, student: "Juan Dela Cruz", category: "Bullying", location: "School Canteen", dateTime: "2026-07-15 10:30 AM", reportedBy: "Ms. Torres", severity: "High", investigation: "ongoing", actions: "Witness interviews scheduled" },
    { id: 2, student: "Carlos Rivera", category: "Fighting", location: "Quadrangle", dateTime: "2026-07-14 2:00 PM", reportedBy: "Mr. Lopez", severity: "Critical", investigation: "pending", actions: "" },
    { id: 3, student: "Jose Garcia", category: "Vandalism", location: "Room 204", dateTime: "2026-07-13 4:15 PM", reportedBy: "Ms. Reyes", severity: "High", investigation: "completed", actions: "Restitution arranged, parental meeting held" },
    { id: 4, student: "Miguel Santos", category: "Classroom Disruption", location: "Room 105", dateTime: "2026-07-12 9:00 AM", reportedBy: "Mr. Cruz", severity: "Moderate", investigation: "completed", actions: "Student counseled, warning issued" },
    { id: 5, student: "Isabella Cruz", category: "Bullying", location: "Hallway B", dateTime: "2026-07-11 11:45 AM", reportedBy: "Dr. Santos", severity: "High", investigation: "ongoing", actions: "Mediation session scheduled" },
  ]);
  const [selectedRecord, setSelectedRecord] = useState<typeof data[number] | null>(null);
  const perPage = 15;

  const filtered = data.filter((r) => {
    const matchSearch =
      r.student.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase()) ||
      r.location.toLowerCase().includes(search.toLowerCase());
    const matchSeverity = severityFilter === "all" || r.severity === severityFilter;
    return matchSearch && matchSeverity;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const pageData = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  if (selectedRecord) {
    return (
      <div className={styles.container}>
        <Card>
          <CardHeader>
            <div className={styles.detailHeader}>
              <button className={styles.backBtn} onClick={() => setSelectedRecord(null)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5" /><polyline points="12 19 5 12 12 5" />
                </svg>
              </button>
              <CardTitle>Incident Report</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className={styles.detailContent}>
              <div className={styles.detailStudent}>{selectedRecord.student}</div>

              <div className={styles.detailGrid}>
                <Field label="Incident Category" value={selectedRecord.category} />
                <Field label="Location" value={selectedRecord.location} />
                <Field label="Date & Time" value={selectedRecord.dateTime} />
                <Field label="Reported By" value={selectedRecord.reportedBy} />
                <Field label="Severity" value={selectedRecord.severity} />
                <Field label="Investigation Status" value={selectedRecord.investigation} />
              </div>

              <div className={styles.detailField}>
                <span className={styles.detailLabel}>Actions Taken</span>
                <p className={styles.detailValue}>{selectedRecord.actions || "No actions taken yet."}</p>
              </div>

              <div className={styles.detailSection}>
                <h3 className={styles.detailSectionTitle}>Attachments</h3>
                <div className={styles.detailAttachments}>
                  {mockAttachments.map((file) => (
                    <div key={file.name} className={styles.detailAttachment}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
                      </svg>
                      <div className={styles.detailAttachmentInfo}>
                        <span className={styles.detailAttachmentName}>{file.name}</span>
                        <span className={styles.detailAttachmentSize}>{file.size}</span>
                      </div>
                      <button className={styles.detailAttachmentBtn}>View</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.detailActions}>
                <Button variant="outline" size="sm" onClick={() => setSelectedRecord(null)}>Close</Button>
                <Button variant="primary" size="sm">Export Report</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Card>
        <CardHeader>
          <CardTitle>Incident Reports</CardTitle>
        </CardHeader>
        <CardContent>
            <div className={styles.toolbar}>
              <SearchInput
                placeholder="Search by student, category, or location..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className={styles.searchBar}
              />
              <FilterSelect
                options={[
                  { value: "all", label: "All Severities" },
                  { value: "Moderate", label: "Moderate" },
                  { value: "High", label: "High" },
                  { value: "Critical", label: "Critical" },
                ]}
                value={severityFilter}
                onChange={(v) => { setSeverityFilter(v); setCurrentPage(1); }}
              />
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Incident Category</th>
                  <th>Location</th>
                  <th>Date & Time</th>
                  <th>Reported By</th>
                  <th>Severity</th>
                  <th>Investigation</th>
                  <th>Actions Taken</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageData.map((row) => (
                  <tr key={row.id}>
                    <td className={styles.cellPrimary}>{row.student}</td>
                    <td>{row.category}</td>
                    <td>{row.location}</td>
                    <td>{row.dateTime}</td>
                    <td>{row.reportedBy}</td>
                    <td className={styles.badgeCell}>
                      <Badge variant={severityVariant[row.severity]}>{row.severity}</Badge>
                    </td>
                    <td className={styles.badgeCell}>
                      <Badge variant={investigationVariant[row.investigation]}>{row.investigation}</Badge>
                    </td>
                    <td className={styles.actionsCell}>{row.actions || "—"}</td>
                    <td>
<div className={styles.actions}>
  <button className={styles.actionBtn} onClick={() => setSelectedRecord(row)}>View</button>
  <button className={styles.actionBtn} onClick={() => setData((prev) => prev.filter((r) => r.id !== row.id))}>Archive</button>
</div>
                    </td>
                  </tr>
                ))}
                {pageData.length === 0 && (
                  <tr>
                    <td colSpan={9} className={styles.emptyState}>No incident reports found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <Button variant="primary" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}>Previous</Button>
              <span className={styles.pageInfo}>Page {currentPage} of {totalPages}</span>
              <Button variant="primary" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}>Next</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.detailField}>
      <span className={styles.detailLabel}>{label}</span>
      <span className={styles.detailValue}>{value}</span>
    </div>
  );
}
