"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { StudentAttendance } from "./components/StudentAttendance";
import { DatePicker } from "../overview/components/DatePicker";

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const formatHeader = (date: Date | null) => {
    if (!date) return "All Dates";
    return date.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <h1 className={styles.pageTitle}>Hello, Principal Reyes</h1>
          <p className={styles.pageSubtitle}>It&apos;s {formatHeader(selectedDate)}</p>
        </div>
        <div className={styles.headerActions}>
          <DatePicker selectedDate={selectedDate} onChange={setSelectedDate} />
          <button className={styles.actionSecondary}>Flag Absence</button>
          <button className={styles.actionSecondary}>New Tracker</button>
          <button className={styles.actionPrimary}>Add Record</button>
        </div>
      </div>
      <StudentAttendance selectedDate={selectedDate} />
    </>
  );
}