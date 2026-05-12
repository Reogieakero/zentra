import styles from "./page.module.css";

export default function PrincipalDashboard() {
  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Welcome back, Principal</h1>
        <p className={styles.pageSubtitle}>Here is what is happening at your school today.</p>
      </div>

      <div className={styles.comingSoon}>
        Dashboard Stats coming soon...
      </div>
    </div>
  );
}