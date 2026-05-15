"use client";

import { RadarCard } from "./RadarCard";
import { BarCard } from "./BarCard";
import { HeatmapCard } from "./HeatmapCard";
import { TasksCard } from "./TasksCard";
import { AttendanceTable } from "./AttendanceTable";
import styles from "./StudentAttendance.module.css";

interface StudentAttendanceProps {
  selectedDate: Date | null;
}

export function StudentAttendance({ selectedDate }: StudentAttendanceProps) {
  return (
    <div className={styles.grid}>
      <div className={styles.spanRadar}><RadarCard selectedDate={selectedDate} /></div>
      <div className={styles.spanBar}><BarCard selectedDate={selectedDate} /></div>
      <div className={styles.spanHeat}><HeatmapCard selectedDate={selectedDate} /></div>
      <div className={styles.spanTasks}><TasksCard selectedDate={selectedDate} /></div>
      <div className={styles.spanTable}><AttendanceTable selectedDate={selectedDate} /></div>
    </div>
  );
}