"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import styles from "./HeatmapCard.module.css";

type Day = "Mon" | "Tue" | "Wed" | "Thu" | "Fri";
type Grade = "Grade 7" | "Grade 8" | "Grade 9" | "Grade 10" | "Grade 11" | "Grade 12";

interface GradeRow {
  day: Day;
  "Grade 7": number;
  "Grade 8": number;
  "Grade 9": number;
  "Grade 10": number;
  "Grade 11": number;
  "Grade 12": number;
}

const dataByDate: Record<string, GradeRow[]> = {
  "2025-05-16": [
    { day: "Mon", "Grade 7": 112, "Grade 8": 98,  "Grade 9": 105, "Grade 10": 89,  "Grade 11": 76,  "Grade 12": 68  },
    { day: "Tue", "Grade 7": 118, "Grade 8": 104, "Grade 9": 99,  "Grade 10": 95,  "Grade 11": 80,  "Grade 12": 72  },
    { day: "Wed", "Grade 7": 105, "Grade 8": 91,  "Grade 9": 110, "Grade 10": 88,  "Grade 11": 74,  "Grade 12": 65  },
    { day: "Thu", "Grade 7": 120, "Grade 8": 107, "Grade 9": 102, "Grade 10": 93,  "Grade 11": 82,  "Grade 12": 70  },
    { day: "Fri", "Grade 7": 95,  "Grade 8": 85,  "Grade 9": 90,  "Grade 10": 78,  "Grade 11": 65,  "Grade 12": 58  },
  ],
  "2025-05-15": [
    { day: "Mon", "Grade 7": 108, "Grade 8": 95,  "Grade 9": 101, "Grade 10": 86,  "Grade 11": 73,  "Grade 12": 65  },
    { day: "Tue", "Grade 7": 115, "Grade 8": 100, "Grade 9": 97,  "Grade 10": 91,  "Grade 11": 78,  "Grade 12": 69  },
    { day: "Wed", "Grade 7": 100, "Grade 8": 88,  "Grade 9": 106, "Grade 10": 84,  "Grade 11": 71,  "Grade 12": 62  },
    { day: "Thu", "Grade 7": 117, "Grade 8": 103, "Grade 9": 99,  "Grade 10": 90,  "Grade 11": 79,  "Grade 12": 67  },
    { day: "Fri", "Grade 7": 90,  "Grade 8": 81,  "Grade 9": 87,  "Grade 10": 74,  "Grade 11": 62,  "Grade 12": 55  },
  ],
  "2025-05-14": [
    { day: "Mon", "Grade 7": 114, "Grade 8": 100, "Grade 9": 108, "Grade 10": 91,  "Grade 11": 78,  "Grade 12": 70  },
    { day: "Tue", "Grade 7": 120, "Grade 8": 106, "Grade 9": 103, "Grade 10": 97,  "Grade 11": 83,  "Grade 12": 74  },
    { day: "Wed", "Grade 7": 107, "Grade 8": 93,  "Grade 9": 112, "Grade 10": 90,  "Grade 11": 76,  "Grade 12": 67  },
    { day: "Thu", "Grade 7": 122, "Grade 8": 109, "Grade 9": 104, "Grade 10": 95,  "Grade 11": 84,  "Grade 12": 72  },
    { day: "Fri", "Grade 7": 97,  "Grade 8": 87,  "Grade 9": 92,  "Grade 10": 80,  "Grade 11": 67,  "Grade 12": 60  },
  ],
};

const fallback: GradeRow[] = [
  { day: "Mon", "Grade 7": 112, "Grade 8": 98,  "Grade 9": 105, "Grade 10": 89,  "Grade 11": 76,  "Grade 12": 68  },
  { day: "Tue", "Grade 7": 118, "Grade 8": 104, "Grade 9": 99,  "Grade 10": 95,  "Grade 11": 80,  "Grade 12": 72  },
  { day: "Wed", "Grade 7": 105, "Grade 8": 91,  "Grade 9": 110, "Grade 10": 88,  "Grade 11": 74,  "Grade 12": 65  },
  { day: "Thu", "Grade 7": 120, "Grade 8": 107, "Grade 9": 102, "Grade 10": 93,  "Grade 11": 82,  "Grade 12": 70  },
  { day: "Fri", "Grade 7": 95,  "Grade 8": 85,  "Grade 9": 90,  "Grade 10": 78,  "Grade 11": 65,  "Grade 12": 58  },
];

const grades: Grade[] = ["Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];

const GRADE_COLORS: Record<Grade, string> = {
  "Grade 7":  "#7c3aed",
  "Grade 8":  "#06b6d4",
  "Grade 9":  "#f59e0b",
  "Grade 10": "#10b981",
  "Grade 11": "#f43f5e",
  "Grade 12": "#6366f1",
};

const toDateStr = (date: Date | null) => {
  if (!date) return null;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

interface HeatmapCardProps {
  selectedDate: Date | null;
}

export function HeatmapCard({ selectedDate }: HeatmapCardProps) {
  const key = toDateStr(selectedDate);
  const data = (key && dataByDate[key]) ? dataByDate[key] : fallback;

  const [hoveredGrade, setHoveredGrade] = useState<Grade | null>(null);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <div className={styles.cardTitle}>Grade Attendance</div>
          <div className={styles.cardSub}>Students present per grade by day</div>
        </div>
        <button className={styles.moreBtn}>···</button>
      </div>

      <div className={styles.chartWrap}>
        <div className={styles.legend}>
          {grades.map((g) => (
            <button
              key={g}
              className={`${styles.legendItem} ${hoveredGrade && hoveredGrade !== g ? styles.legendDim : ""}`}
              onMouseEnter={() => setHoveredGrade(g)}
              onMouseLeave={() => setHoveredGrade(null)}
            >
              <span className={styles.legendDot} style={{ background: GRADE_COLORS[g] }} />
              {g}
            </button>
          ))}
        </div>

        <div className={styles.svgWrap}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-base, #e4e4e7)" vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 10, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ stroke: "rgba(124,58,237,0.12)", strokeWidth: 1 }}
                contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }}
              />
              {grades.map((g) => (
                <Line
                  key={g}
                  type="monotone"
                  dataKey={g}
                  stroke={GRADE_COLORS[g]}
                  strokeWidth={hoveredGrade === g ? 2.5 : 1.5}
                  dot={{ r: hoveredGrade === g ? 4 : 2.5, fill: GRADE_COLORS[g] }}
                  activeDot={{ r: 5 }}
                  opacity={hoveredGrade ? (hoveredGrade === g ? 1 : 0.15) : 0.85}
                  onMouseEnter={() => setHoveredGrade(g)}
                  onMouseLeave={() => setHoveredGrade(null)}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}