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
import styles from "./GuidanceNotes.module.css";

const statusVariant: Record<string, "info" | "warning" | "success"> = {
  ongoing: "info",
  scheduled: "warning",
  completed: "success",
};

const mockAttachments = [
  { name: "Counseling_Notes_Session_3.pdf", size: "1.2 MB" },
  { name: "Intervention_Plan_v2.docx", size: "680 KB" },
];

export function GuidanceNotes() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([
    { id: 1, student: "Isabella Cruz", grade: "Grade 9 - Section B", counselor: "Dr. Santos", type: "Academic Counseling", followUp: "2026-08-01", status: "ongoing" },
    { id: 2, student: "Miguel Santos", grade: "Grade 10 - Section A", counselor: "Ms. Reyes", type: "Behavioral Intervention", followUp: "2026-07-28", status: "scheduled" },
    { id: 3, student: "Sofia Martinez", grade: "Grade 9 - Section A", counselor: "Dr. Santos", type: "Personal Counseling", followUp: "2026-07-20", status: "completed" },
    { id: 4, student: "Luis Tan", grade: "Grade 11 - Section A", counselor: "Mr. Cruz", type: "Career Guidance", followUp: "2026-08-15", status: "ongoing" },
    { id: 5, student: "Ana Lopez", grade: "Grade 7 - Section C", counselor: "Ms. Reyes", type: "Behavioral Intervention", followUp: "2026-07-25", status: "scheduled" },
    { id: 6, student: "Emma Gonzales", grade: "Grade 8 - Section B", counselor: "Dr. Santos", type: "Academic Counseling", followUp: "2026-07-18", status: "completed" },
  ]);
  const [selectedRecord, setSelectedRecord] = useState<typeof data[number] | null>(null);
  const perPage = 15;

  const filtered = data.filter((r) => {
    const matchSearch =
      r.student.toLowerCase().includes(search.toLowerCase()) ||
      r.counselor.toLowerCase().includes(search.toLowerCase()) ||
      r.type.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchStatus;
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
              <CardTitle>Guidance Note</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className={styles.detailContent}>
              <div className={styles.detailStudent}>{selectedRecord.student}</div>

              <div className={styles.detailGrid}>
                <Field label="Grade & Section" value={selectedRecord.grade} />
                <Field label="Counselor" value={selectedRecord.counselor} />
                <Field label="Intervention Type" value={selectedRecord.type} />
                <Field label="Follow-up Schedule" value={selectedRecord.followUp} />
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
          <CardTitle>Guidance Notes</CardTitle>
        </CardHeader>
        <CardContent>
            <div className={styles.toolbar}>
              <SearchInput
                placeholder="Search by student, counselor, or intervention type..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className={styles.searchBar}
              />
              <FilterSelect
                options={[
                  { value: "all", label: "All Statuses" },
                  { value: "ongoing", label: "Ongoing" },
                  { value: "scheduled", label: "Scheduled" },
                  { value: "completed", label: "Completed" },
                ]}
                value={statusFilter}
                onChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}
              />
            <Button variant="primary" size="sm">Add Note</Button>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Grade & Section</th>
                  <th>Counselor</th>
                  <th>Intervention Type</th>
                  <th>Follow-up Schedule</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageData.map((row) => (
                  <tr key={row.id}>
                    <td className={styles.cellPrimary}>{row.student}</td>
                    <td>{row.grade}</td>
                    <td>{row.counselor}</td>
                    <td>{row.type}</td>
                    <td>{row.followUp}</td>
                    <td className={styles.badgeCell}>
                      <Badge variant={statusVariant[row.status]}>{row.status}</Badge>
                    </td>
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
                    <td colSpan={7} className={styles.emptyState}>No guidance notes found.</td>
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

      <Card className={styles.notesHistory}>
        <CardHeader>
          <CardTitle>Notes History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={styles.historyList}>
            <div className={styles.historyItem}>
              <div className={styles.historyDot} />
              <div className={styles.historyInfo}>
                <p className={styles.historyText}>Dr. Santos added a new guidance note for Isabella Cruz</p>
                <span className={styles.historyTime}>2 hours ago</span>
              </div>
            </div>
            <div className={styles.historyItem}>
              <div className={styles.historyDot} />
              <div className={styles.historyInfo}>
                <p className={styles.historyText}>Ms. Reyes updated the intervention plan for Miguel Santos</p>
                <span className={styles.historyTime}>1 day ago</span>
              </div>
            </div>
            <div className={styles.historyItem}>
              <div className={styles.historyDot} />
              <div className={styles.historyInfo}>
                <p className={styles.historyText}>Follow-up session completed for Sofia Martinez</p>
                <span className={styles.historyTime}>3 days ago</span>
              </div>
            </div>
          </div>
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
