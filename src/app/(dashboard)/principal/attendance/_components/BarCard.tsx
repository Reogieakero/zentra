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
    { grade: "G7", section: "Section A", present: 98, absent: 5 },
    { grade: "G7", section: "Section B", present: 112, absent: 13 },
    { grade: "G7", section: "Section C", present: 85, absent: 8 },
    { grade: "G8", section: "Section A", present: 102, absent: 12 },
    { grade: "G8", section: "Section B", present: 93, absent: 15 },
    { grade: "G8", section: "Section C", present: 110, absent: 6 },
    { grade: "G9", section: "Section A", present: 115, absent: 4 },
    { grade: "G9", section: "Section B", present: 113, absent: 8 },
    { grade: "G9", section: "Section C", present: 95, absent: 14 },
    { grade: "G10", section: "Section A", present: 88, absent: 22 },
    { grade: "G10", section: "Section B", present: 90, absent: 26 },
    { grade: "G10", section: "Section C", present: 104, absent: 10 },
  ],
  "2025-05-15": [
    { grade: "G7", section: "Section A", present: 95, absent: 8 },
    { grade: "G7", section: "Section B", present: 110, absent: 15 },
    { grade: "G7", section: "Section C", present: 80, absent: 13 },
    { grade: "G8", section: "Section A", present: 98, absent: 16 },
    { grade: "G8", section: "Section B", present: 90, absent: 18 },
    { grade: "G8", section: "Section C", present: 105, absent: 11 },
    { grade: "G9", section: "Section A", present: 110, absent: 9 },
    { grade: "G9", section: "Section B", present: 110, absent: 11 },
    { grade: "G9", section: "Section C", present: 92, absent: 17 },
    { grade: "G10", section: "Section A", present: 82, absent: 28 },
    { grade: "G10", section: "Section B", present: 88, absent: 28 },
    { grade: "G10", section: "Section C", present: 100, absent: 14 },
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
    grade: "G7",
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

    basePool = basePool.filter(row => row.grade === activeFilters.grade);

    const consolidationMap: Record<string, { section: string; present: number; absent: number }> = {};
    
    basePool.forEach(row => {
      if (!consolidationMap[row.section]) {
        consolidationMap[row.section] = { section: row.section, present: 0, absent: 0 };
      }
      consolidationMap[row.section].present += row.present;
      consolidationMap[row.section].absent += row.absent;
    });

    return Object.values(consolidationMap).sort((a, b) => 
      a.section.localeCompare(b.section)
    );
  }, [selectedDate, activeFilters]);

  const totalStudents = computedChartData.reduce((s, r) => s + r.present + r.absent, 0);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <div className={styles.cardTitle}>Section Attendance Breakdowns</div>
          <div className={styles.cardSub}>Showing distribution mapped by section</div>
        </div>
        <FilterSelector onFilterChange={setActiveFilters} />
      </div>

      <div className={styles.totalRow}>
        <span className={styles.totalCount}>{totalStudents.toLocaleString()}</span>
        <span className={styles.totalLabel}>Total student records parsed</span>
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
            <XAxis dataKey="section" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
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