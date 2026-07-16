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
import styles from "./StudentObservations.module.css";

const followUpVariant: Record<string, "info" | "warning" | "success"> = {
  ongoing: "info",
  scheduled: "warning",
  completed: "success",
};

const mockAttachments = [
  { name: "Observation_Notes_Classroom.pdf", size: "890 KB" },
  { name: "Teacher_Feedback_Form.docx", size: "520 KB" },
];

export function StudentObservations() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([
    { id: 1, student: "Ana Lopez", observer: "Mr. Cruz", date: "2026-07-15", category: "Classroom Behavior", remarks: "Shows improvement in participation", recommendation: "Continue positive reinforcement", followUp: "ongoing" },
    { id: 2, student: "Carlos Rivera", observer: "Ms. Mendoza", date: "2026-07-14", category: "Social Interaction", remarks: "Difficulty working in groups", recommendation: "Social skills training", followUp: "scheduled" },
    { id: 3, student: "Sofia Martinez", observer: "Dr. Santos", date: "2026-07-12", category: "Emotional Well-being", remarks: "Shows signs of anxiety during exams", recommendation: "Refer to guidance counselor", followUp: "completed" },
    { id: 4, student: "Luis Tan", observer: "Mr. Reyes", date: "2026-07-10", category: "Academic Performance", remarks: "Declining grades in Math", recommendation: "Tutorial sessions", followUp: "ongoing" },
    { id: 5, student: "Emma Gonzales", observer: "Ms. Lopez", date: "2026-07-08", category: "Classroom Behavior", remarks: "Consistently attentive and participative", recommendation: "No intervention needed", followUp: "completed" },
  ]);
  const [selectedRecord, setSelectedRecord] = useState<typeof data[number] | null>(null);
  const perPage = 15;

  const filtered = data.filter((r) => {
    const matchSearch =
      r.student.toLowerCase().includes(search.toLowerCase()) ||
      r.observer.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === "all" || r.category === categoryFilter;
    return matchSearch && matchCategory;
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
              <CardTitle>Student Observation</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className={styles.detailContent}>
              <div className={styles.detailStudent}>{selectedRecord.student}</div>

              <div className={styles.detailGrid}>
                <Field label="Observer" value={selectedRecord.observer} />
                <Field label="Date" value={selectedRecord.date} />
                <Field label="Category" value={selectedRecord.category} />
                <Field label="Follow-up Status" value={selectedRecord.followUp} />
              </div>

              <div className={styles.detailField}>
                <span className={styles.detailLabel}>Remarks</span>
                <p className={styles.detailValue}>{selectedRecord.remarks}</p>
              </div>

              <div className={styles.detailField}>
                <span className={styles.detailLabel}>Recommendation</span>
                <p className={styles.detailValue}>{selectedRecord.recommendation}</p>
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
          <CardTitle>Student Observations</CardTitle>
        </CardHeader>
        <CardContent>
            <div className={styles.toolbar}>
              <SearchInput
                placeholder="Search by student, observer, or category..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className={styles.searchBar}
              />
              <FilterSelect
                options={[
                  { value: "all", label: "All Categories" },
                  { value: "Classroom Behavior", label: "Classroom Behavior" },
                  { value: "Social Interaction", label: "Social Interaction" },
                  { value: "Emotional Well-being", label: "Emotional Well-being" },
                  { value: "Academic Performance", label: "Academic Performance" },
                ]}
                value={categoryFilter}
                onChange={(v) => { setCategoryFilter(v); setCurrentPage(1); }}
              />
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Observer</th>
                  <th>Observation Date</th>
                  <th>Category</th>
                  <th>Remarks</th>
                  <th>Recommendation</th>
                  <th>Follow-up Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageData.map((row) => (
                  <tr key={row.id}>
                    <td className={styles.cellPrimary}>{row.student}</td>
                    <td>{row.observer}</td>
                    <td>{row.date}</td>
                    <td>{row.category}</td>
                    <td className={styles.truncate}>{row.remarks}</td>
                    <td className={styles.truncate}>{row.recommendation}</td>
                    <td className={styles.badgeCell}>
                      <Badge variant={followUpVariant[row.followUp]}>{row.followUp}</Badge>
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
                    <td colSpan={8} className={styles.emptyState}>No observations found.</td>
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
