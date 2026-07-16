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

const mockData = [
  { id: 1, student: "Ana Lopez", observer: "Mr. Cruz", date: "2026-07-15", category: "Classroom Behavior", remarks: "Shows improvement in participation", recommendation: "Continue positive reinforcement", followUp: "ongoing" },
  { id: 2, student: "Carlos Rivera", observer: "Ms. Mendoza", date: "2026-07-14", category: "Social Interaction", remarks: "Difficulty working in groups", recommendation: "Social skills training", followUp: "scheduled" },
  { id: 3, student: "Sofia Martinez", observer: "Dr. Santos", date: "2026-07-12", category: "Emotional Well-being", remarks: "Shows signs of anxiety during exams", recommendation: "Refer to guidance counselor", followUp: "completed" },
  { id: 4, student: "Luis Tan", observer: "Mr. Reyes", date: "2026-07-10", category: "Academic Performance", remarks: "Declining grades in Math", recommendation: "Tutorial sessions", followUp: "ongoing" },
  { id: 5, student: "Emma Gonzales", observer: "Ms. Lopez", date: "2026-07-08", category: "Classroom Behavior", remarks: "Consistently attentive and participative", recommendation: "No intervention needed", followUp: "completed" },
];

const followUpVariant: Record<string, "info" | "warning" | "success"> = {
  ongoing: "info",
  scheduled: "warning",
  completed: "success",
};

export function StudentObservations() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 15;

  const filtered = mockData.filter((r) => {
    const matchSearch =
      r.student.toLowerCase().includes(search.toLowerCase()) ||
      r.observer.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === "all" || r.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const pageData = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

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
  <button className={styles.actionBtn}>View</button>
  <button className={styles.actionBtn}>Edit</button>
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
