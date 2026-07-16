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
import styles from "./BehaviorReports.module.css";

const mockData = [
  { id: 1, student: "Miguel Santos", grade: "Grade 10 - Section A", type: "Classroom Disruption", severity: "Moderate", reportedBy: "Ms. Reyes", date: "2026-07-15", status: "pending" },
  { id: 2, student: "Isabella Cruz", grade: "Grade 9 - Section B", type: "Bullying", severity: "High", reportedBy: "Mr. Lopez", date: "2026-07-14", status: "under-review" },
  { id: 3, student: "Juan Dela Cruz", grade: "Grade 11 - Section C", type: "Tardiness", severity: "Low", reportedBy: "Ms. Santos", date: "2026-07-14", status: "resolved" },
  { id: 4, student: "Maria Reyes", grade: "Grade 8 - Section A", type: "Cheating", severity: "High", reportedBy: "Mr. Garcia", date: "2026-07-13", status: "under-review" },
  { id: 5, student: "Jose Garcia", grade: "Grade 12 - Section B", type: "Vandalism", severity: "Critical", reportedBy: "Ms. Torres", date: "2026-07-12", status: "pending" },
  { id: 6, student: "Ana Lopez", grade: "Grade 7 - Section C", type: "Classroom Disruption", severity: "Low", reportedBy: "Mr. Cruz", date: "2026-07-11", status: "resolved" },
  { id: 7, student: "Carlos Rivera", grade: "Grade 10 - Section B", type: "Fighting", severity: "Critical", reportedBy: "Ms. Mendoza", date: "2026-07-10", status: "under-review" },
  { id: 8, student: "Sofia Martinez", grade: "Grade 9 - Section A", type: "Defiance", severity: "Moderate", reportedBy: "Mr. Reyes", date: "2026-07-09", status: "pending" },
  { id: 9, student: "Luis Tan", grade: "Grade 11 - Section A", type: "Bullying", severity: "High", reportedBy: "Ms. Lopez", date: "2026-07-08", status: "resolved" },
  { id: 10, student: "Emma Gonzales", grade: "Grade 8 - Section B", type: "Tardiness", severity: "Low", reportedBy: "Mr. Santos", date: "2026-07-07", status: "resolved" },
];

const severityVariant: Record<string, "danger" | "warning" | "info" | "default"> = {
  Critical: "danger",
  High: "warning",
  Moderate: "info",
  Low: "default",
};

const statusVariant: Record<string, "warning" | "info" | "success"> = {
  pending: "warning",
  "under-review": "info",
  resolved: "success",
};

export function BehaviorReports() {
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 15;

  const filtered = mockData.filter((r) => {
    const matchSearch =
      r.student.toLowerCase().includes(search.toLowerCase()) ||
      r.type.toLowerCase().includes(search.toLowerCase());
    const matchSeverity = severityFilter === "all" || r.severity === severityFilter;
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchSeverity && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const pageData = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className={styles.container}>
      <Card>
        <CardHeader>
          <CardTitle>Behavior Reports</CardTitle>
        </CardHeader>
        <CardContent>
            <div className={styles.toolbar}>
              <SearchInput
                placeholder="Search by student or behavior type..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className={styles.searchBar}
              />
              <FilterSelect
                options={[
                  { value: "all", label: "All Severities" },
                  { value: "Low", label: "Low" },
                  { value: "Moderate", label: "Moderate" },
                  { value: "High", label: "High" },
                  { value: "Critical", label: "Critical" },
                ]}
                value={severityFilter}
                onChange={(v) => { setSeverityFilter(v); setCurrentPage(1); }}
              />
              <FilterSelect
                options={[
                  { value: "all", label: "All Statuses" },
                  { value: "pending", label: "Pending" },
                  { value: "under-review", label: "Under Review" },
                  { value: "resolved", label: "Resolved" },
                ]}
                value={statusFilter}
                onChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}
              />
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Grade & Section</th>
                  <th>Behavior Type</th>
                  <th>Severity</th>
                  <th>Reported By</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageData.map((row) => (
                  <tr key={row.id}>
                    <td className={styles.cellPrimary}>{row.student}</td>
                    <td>{row.grade}</td>
                    <td>{row.type}</td>
                    <td className={styles.badgeCell}>
                      <Badge variant={severityVariant[row.severity]}>{row.severity}</Badge>
                    </td>
                    <td>{row.reportedBy}</td>
                    <td>{row.date}</td>
                    <td className={styles.badgeCell}>
                      <Badge variant={statusVariant[row.status]}>{row.status.replace("-", " ")}</Badge>
                    </td>
                    <td>
<div className={styles.actions}>
  <button className={styles.actionBtn}>View</button>
  <button className={styles.actionBtn}>Edit</button>
  <button className={styles.actionBtn}>Archive</button>
</div>
                    </td>
                  </tr>
                ))}
                {pageData.length === 0 && (
                  <tr>
                    <td colSpan={8} className={styles.emptyState}>No behavior reports found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <Button
                variant="primary"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <span className={styles.pageInfo}>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="primary"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
