"use client";

import { RadarCard } from "./RadarCard";
import { BarCard } from "./BarCard";
import { HeatmapCard } from "./AttendanceLine";
import { TasksCard } from "./TasksCard";
import { AttendanceTable } from "./AttendanceTable";
import styles from "./StudentAttendance.module.css";

interface StudentAttendanceProps {
  selectedDate: Date | null;
  activeTab: "dashboard" | "report";
  onTabChange: (tab: "dashboard" | "report") => void;
}

export function StudentAttendance({ selectedDate, activeTab, onTabChange }: StudentAttendanceProps) {
  if (activeTab === "report") {
    return (
      <div className={styles.reportTabContainer}>
        <div className={styles.reportNavigationBar}>
          <button className={styles.reportBackTabBtn} onClick={() => onTabChange("dashboard")}>
            ← Back to Dashboard Overview
          </button>
        </div>
        <HeatmapCard selectedDate={selectedDate} isReportActive={true} />
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      <div className={styles.spanHeat}>
        <HeatmapCard 
          selectedDate={selectedDate} 
          onOpenReport={() => onTabChange("report")} 
          isReportActive={false} 
        />
      </div>
      <div className={styles.spanTable}><AttendanceTable selectedDate={selectedDate} /></div>
      <div className={styles.spanRadar}><RadarCard selectedDate={selectedDate} /></div>
      <div className={styles.spanBar}><BarCard selectedDate={selectedDate} /></div>
      <div className={styles.spanTasks}><TasksCard selectedDate={selectedDate} /></div>
    </div>
  );
}