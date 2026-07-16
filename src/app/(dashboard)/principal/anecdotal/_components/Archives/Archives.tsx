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

const mockData = [
  { id: 1, recordType: "Behavior Report", student: "Miguel Santos", archivedDate: "2026-07-10", archivedBy: "Ms. Reyes", status: "archived" },
  { id: 2, recordType: "Incident Report", student: "Jose Garcia", archivedDate: "2026-07-09", archivedBy: "Mr. Lopez", status: "archived" },
  { id: 3, recordType: "Guidance Note", student: "Emma Gonzales", archivedDate: "2026-07-08", archivedBy: "Dr. Santos", status: "archived" },
  { id: 4, recordType: "Student Observation", student: "Carlos Rivera", archivedDate: "2026-07-07", archivedBy: "Ms. Mendoza", status: "archived" },
  { id: 5, recordType: "Behavior Report", student: "Ana Lopez", archivedDate: "2026-07-05", archivedBy: "Mr. Cruz", status: "restored" },
];

const statusVariant: Record<string, "default" | "success"> = {
  archived: "default",
  restored: "success",
};

export function Archives() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 15;

  const filtered = mockData.filter((r) => {
    const matchSearch =
      r.student.toLowerCase().includes(search.toLowerCase()) ||
      r.recordType.toLowerCase().includes(search.toLowerCase()) ||
      r.archivedBy.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || r.recordType === typeFilter;
    return matchSearch && matchType;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const pageData = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

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
  <button className={styles.actionBtn}>View</button>
  <button className={styles.actionBtn}>Restore</button>
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
