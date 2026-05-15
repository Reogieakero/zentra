"use client";

import { RadarCard } from "./RadarCard";
import { BarCard } from "./BarCard";
import { HeatmapCard } from "./HeatmapCard";
import { TasksCard } from "./TasksCard";
import { AttendanceTable } from "./AttendanceTable";
import styles from "./StudentAttendance.module.css";

export function StudentAttendance() {
  return (
    <div className={styles.grid}>
      <div className={styles.spanRadar}><RadarCard /></div>
      <div className={styles.spanBar}><BarCard /></div>
      <div className={styles.spanHeat}><HeatmapCard /></div>
      <div className={styles.spanTasks}><TasksCard /></div>
      <div className={styles.spanTable}><AttendanceTable /></div>
    </div>
  );
}