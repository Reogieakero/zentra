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
import styles from "./Archives.module.css";

const statusVariant: Record<string, "default" | "success"> = {
  archived: "default",
  restored: "success",
};

const mockAttachments = [
  { name: "Archived_Record_Report.pdf", size: "1.5 MB" },
];

export function Archives() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([
    { id: 1, recordType: "Behavior Report", student: "Miguel Santos", archivedDate: "2026-07-10", archivedBy: "Ms. Reyes", status: "archived" },
    { id: 2, recordType: "Incident Report", student: "Jose Garcia", archivedDate: "2026-07-09", archivedBy: "Mr. Lopez", status: "archived" },
    { id: 3, recordType: "Guidance Note", student: "Emma Gonzales", archivedDate: "2026-07-08", archivedBy: "Dr. Santos", status: "archived" },
    { id: 4, recordType: "Student Observation", student: "Carlos Rivera", archivedDate: "2026-07-07", archivedBy: "Ms. Mendoza", status: "archived" },
    { id: 5, recordType: "Behavior Report", student: "Ana Lopez", archivedDate: "2026-07-05", archivedBy: "Mr. Cruz", status: "restored" },
  ]);
  const [selectedRecord, setSelectedRecord] = useState<typeof data[number] | null>(null);
  const perPage = 15;

  const filtered = data.filter((r) => {
    const matchSearch =
      r.student.toLowerCase().includes(search.toLowerCase()) ||
      r.recordType.toLowerCase().includes(search.toLowerCase()) ||
      r.archivedBy.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || r.recordType === typeFilter;
    return matchSearch && matchType;
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
              <CardTitle>Archived Record</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className={styles.detailContent}>
              <div className={styles.detailStudent}>{selectedRecord.student}</div>

              <div className={styles.detailGrid}>
                <Field label="Record Type" value={selectedRecord.recordType} />
                <Field label="Archive Date" value={selectedRecord.archivedDate} />
                <Field label="Archived By" value={selectedRecord.archivedBy} />
                <Field label="Status" value={selectedRecord.status} />
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
          <CardTitle>Archived Records</CardTitle>
        </CardHeader>
        <CardContent>
            <div className={styles.toolbar}>
              <SearchInput
                placeholder="Search archived records..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className={styles.searchBar}
              />
              <FilterSelect
                options={[
                  { value: "all", label: "All Types" },
                  { value: "Behavior Report", label: "Behavior Report" },
                  { value: "Incident Report", label: "Incident Report" },
                  { value: "Guidance Note", label: "Guidance Note" },
                  { value: "Student Observation", label: "Student Observation" },
                ]}
                value={typeFilter}
                onChange={(v) => { setTypeFilter(v); setCurrentPage(1); }}
              />
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Record Type</th>
                  <th>Student Name</th>
                  <th>Archive Date</th>
                  <th>Archived By</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageData.map((row) => (
                  <tr key={row.id}>
                    <td>{row.recordType}</td>
                    <td className={styles.cellPrimary}>{row.student}</td>
                    <td>{row.archivedDate}</td>
                    <td>{row.archivedBy}</td>
                    <td className={styles.badgeCell}>
                      <Badge variant={statusVariant[row.status]}>{row.status}</Badge>
                    </td>
                    <td>
<div className={styles.actions}>
  <button className={styles.actionBtn} onClick={() => setSelectedRecord(row)}>View</button>
</div>
                    </td>
                  </tr>
                ))}
                {pageData.length === 0 && (
                  <tr>
                    <td colSpan={6} className={styles.emptyState}>No archived records found.</td>
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
