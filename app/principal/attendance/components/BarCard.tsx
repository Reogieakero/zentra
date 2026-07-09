"use client";

import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FilterSelector } from "./FilterSelector";
import styles from "./BarCard.module.css";

interface BarRow { 
  grade: string; 
  section: string; 
  present: number; 
  absent: number; 
}

const comprehensiveData: Record<string, BarRow[]> = {
  "2025-05-16": [
    { grade: "G7", section: "Section A", present: 105, absent: 8 },
    { grade: "G7", section: "Section B", present: 105, absent: 10 },
    { grade: "G8", section: "Section A", present: 100, absent: 12 },
    { grade: "G8", section: "Section B", present: 95, absent: 15 },
    { grade: "G9", section: "Section A", present: 114, absent: 5 },
    { grade: "G9", section: "Section B", present: 114, absent: 7 },
    { grade: "G10", section: "Section A", present: 89, absent: 24 },
    { grade: "G10", section: "Section B", present: 89, absent: 24 },
    { grade: "G11", section: "Section A", present: 101, absent: 15 },
    { grade: "G11", section: "Section B", present: 101, absent: 15 },
    { grade: "G12", section: "Section A", present: 107, absent: 10 },
    { grade: "G12", section: "Section B", present: 108, absent: 11 },
  ],
  "2025-05-15": [
    { grade: "G7", section: "Section A", present: 100, absent: 11 },
    { grade: "G7", section: "Section B", present: 105, absent: 12 },
    { grade: "G8", section: "Section A", present: 94, absent: 17 },
    { grade: "G8", section: "Section B", present: 94, absent: 17 },
    { grade: "G9", section: "Section A", present: 110, absent: 10 },
    { grade: "G9", section: "Section B", present: 110, absent: 10 },
    { grade: "G10", section: "Section A", present: 85, absent: 28 },
    { grade: "G10", section: "Section B", present: 85, absent: 28 },
    { grade: "G11", section: "Section A", present: 99, absent: 17 },
    { grade: "G11", section: "Section B", present: 99, absent: 17 },
    { grade: "G12", section: "Section A", present: 105, absent: 13 },
    { grade: "G12", section: "Section B", present: 105, absent: 13 },
  ]
};

const toDateStr = (date: Date | null) => {
  if (!date) return null;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

interface BarCardProps {
  selectedDate: Date | null;
}

export function BarCard({ selectedDate }: BarCardProps) {
  const [activeFilters, setActiveFilters] = useState({
    grade: "All Grades",
    section: "All Sections",
    timeframe: "today"
  });

  const computedChartData = useMemo(() => {
    const targetKey = toDateStr(selectedDate) || "2025-05-16";
    let basePool: BarRow[] = [];

    if (activeFilters.timeframe === "today") {
      basePool = comprehensiveData[targetKey] || comprehensiveData["2025-05-16"] || [];
    } else {
      basePool = Object.values(comprehensiveData).flat();
    }

    if (activeFilters.section !== "All Sections") {
      basePool = basePool.filter(row => row.section === activeFilters.section);
    }

    if (activeFilters.grade !== "All Grades") {
      basePool = basePool.filter(row => row.grade === activeFilters.grade);
    }

    const consolidationMap: Record<string, { grade: string; present: number; absent: number }> = {};
    
    basePool.forEach(row => {
      if (!consolidationMap[row.grade]) {
        consolidationMap[row.grade] = { grade: row.grade, present: 0, absent: 0 };
      }
      consolidationMap[row.grade].present += row.present;
      consolidationMap[row.grade].absent += row.absent;
    });

    return Object.values(consolidationMap).sort((a, b) => 
      a.grade.localeCompare(b.grade, undefined, { numeric: true })
    );
  }, [selectedDate, activeFilters]);

  const totalStudents = computedChartData.reduce((s, r) => s + r.present + r.absent, 0);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <div className={styles.cardTitle}>Grade Attendance Distribution</div>
          <div className={styles.cardSub}>Present vs absent per grade</div>
        </div>
        <FilterSelector onFilterChange={setActiveFilters} />
      </div>

      <div className={styles.totalRow}>
        <span className={styles.totalCount}>{totalStudents.toLocaleString()}</span>
        <span className={styles.totalLabel}>Total enrolled students</span>
      </div>

      <div className={styles.legend}>
        <span className={styles.legendDot} style={{ background: "#7c3aed" }} />
        Present
        <span className={styles.legendDot} style={{ background: "#c4b5fd", marginLeft: "1rem" }} />
        Absent
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={computedChartData} barGap={2}>
            <XAxis dataKey="grade" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: "rgba(124,58,237,0.06)" }}
              contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }}
            />
            <Bar dataKey="present" radius={[4, 4, 0, 0]} fill="#7c3aed" />
            <Bar dataKey="absent" radius={[4, 4, 0, 0]} fill="#c4b5fd" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}