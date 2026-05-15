import styles from "./page.module.css";
import { StudentAttendance } from "./components/StudentAttendance";

export default function AttendancePage() {
  return (
    <>
      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <h1 className={styles.pageTitle}>Hello, Principal Reyes</h1>
          <p className={styles.pageSubtitle}>It&apos;s Friday, 16 May 2025</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.actionSecondary}>Flag Absence</button>
          <button className={styles.actionSecondary}>New Tracker</button>
          <button className={styles.actionPrimary}>Add Record</button>
        </div>
      </div>
      <StudentAttendance />
    </>
  );
}