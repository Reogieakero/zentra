"use client";

import { RadarCard } from "./RadarCard";
import { BarCard } from "./BarCard";
import { HeatmapCard } from "./AttendanceLine";
import { TasksCard } from "./TasksCard";
import { AttendanceTable } from "./AttendanceTable";
import styles from "./StudentAttendance.module.css";
import { STUDENTS } from "./attendancetable/types";

interface StudentAttendanceProps {
  selectedDate: Date | null;
  activeTab: "dashboard" | "report";
  onTabChange: (tab: "dashboard" | "report") => void;
  // Lifted overlay/drawer callbacks
  onOpenFullscreen: () => void;
  onRowClick: (student: (typeof STUDENTS)[number]) => void;
  isDrawerOpen: boolean;
  selectedStudent: (typeof STUDENTS)[number] | null;
  onCloseDrawer: () => void;
}

export function StudentAttendance({
  selectedDate,
  activeTab,
  onTabChange,
  onOpenFullscreen,
  onRowClick,
  isDrawerOpen,
  selectedStudent,
  onCloseDrawer,
}: StudentAttendanceProps) {
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
      <div className={styles.spanTable}>
        <AttendanceTable
          selectedDate={selectedDate}
          onOpenFullscreen={onOpenFullscreen}
          onRowClick={onRowClick}
          isDrawerOpen={isDrawerOpen}
          selectedStudent={selectedStudent}
          onCloseDrawer={onCloseDrawer}
        />
      </div>
      <div className={styles.spanRadar}><RadarCard selectedDate={selectedDate} /></div>
      <div className={styles.spanBar}><BarCard selectedDate={selectedDate} /></div>
      <div className={styles.spanTasks}><TasksCard selectedDate={selectedDate} /></div>
    </div>
  );
}