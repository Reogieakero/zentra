"use client";

import React from "react";
import styles from "./StudentTable.module.css";
import { ChevronIcon } from "./icons/Icons";
import { Student } from "./../types/student";

interface StudentTableProps {
  students: Student[];
  totalCount: number;
  sortKey: keyof Student;
  sortDir: "asc" | "desc";
  sectionFilter: string | null;
  onSort: (key: keyof Student) => void;
  onSelectStudent: (s: Student) => void;
}

export function StudentTable({
  students,
  totalCount,
  sortKey,
  sortDir,
  sectionFilter,
  onSort,
  onSelectStudent,
}: StudentTableProps) {
  const SortBtn = ({ col }: { col: keyof Student }) => (
    <span className={styles.sortBtn} onClick={() => onSort(col)}>
      {sortKey === col ? (
        <ChevronIcon dir={sortDir === "asc" ? "up" : "down"} />
      ) : (
        <span style={{ fontSize: "10px", opacity: 0.4 }}>↕</span>
      )}
    </span>
  );

  return (
    <>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>
                <span className={styles.thInner}>
                  Student <SortBtn col="name" />
                </span>
              </th>
              <th className={styles.th}>
                <span className={styles.thInner}>
                  LRN <SortBtn col="lrn" />
                </span>
              </th>
              <th className={styles.th}>
                <span className={styles.thInner}>
                  Grade <SortBtn col="grade" />
                </span>
              </th>
              {sectionFilter === null && <th className={styles.th}>Section</th>}
              <th className={styles.th}>
                <span className={styles.thInner}>
                  GPA <SortBtn col="gpa" />
                </span>
              </th>
              <th className={styles.th}>
                <span className={styles.thInner}>
                  Absences <SortBtn col="absences" />
                </span>
              </th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Risk</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr
                key={s.id}
                className={styles.row}
                onClick={() => onSelectStudent(s)}
              >
                <td className={styles.td}>
                  <div className={styles.studentCell}>
                    <div
                      className={`${styles.avatar} ${
                        s.risk === "High"
                          ? styles.avatarHigh
                          : s.risk === "Medium"
                          ? styles.avatarMed
                          : styles.avatarDefault
                      }`}
                    >
                      {s.avatar}
                    </div>
                    <div>
                      <p className={styles.studentName}>{s.name}</p>
                      <p className={styles.studentGender}>{s.gender}</p>
                    </div>
                  </div>
                </td>
                <td className={styles.td}>
                  <span className={styles.lrn}>{s.lrn}</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.gradeChip}>G{s.grade}</span>
                </td>
                {sectionFilter === null && (
                  <td className={styles.td}>{s.section}</td>
                )}
                <td className={styles.td}>
                  <span
                    className={`${styles.gpa} ${
                      s.gpa < 75
                        ? styles.gpaDanger
                        : s.gpa < 80
                        ? styles.gpaWarn
                        : styles.gpaGood
                    }`}
                  >
                    {s.gpa}
                  </span>
                </td>
                <td className={styles.td}>
                  <span
                    className={`${styles.absences} ${
                      s.absences >= 10
                        ? styles.absHigh
                        : s.absences >= 5
                        ? styles.absMed
                        : ""
                    }`}
                  >
                    {s.absences}
                  </span>
                </td>
                <td className={styles.td}>
                  <span
                    className={`${styles.statusChip} ${
                      s.status === "Enrolled" ? styles.statusEnrolled : ""
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
                <td className={styles.td}>
                  {s.risk ? (
                    <span
                      className={`${styles.riskChip} ${
                        s.risk === "High" ? styles.riskHigh : styles.riskMed
                      }`}
                    >
                      {s.risk}
                    </span>
                  ) : (
                    <span>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.resultCount}>
        Showing <strong>{students.length}</strong> of{" "}
        <strong>{totalCount}</strong> students
      </div>
    </>
  );
}