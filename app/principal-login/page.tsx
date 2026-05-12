"use client";

import Link from "next/link";
import { BrandLogo } from "../components/icons/Brand";
import { PrincipalLoginForm } from "../components/forms/PrincipalLoginForm";
import styles from "./principal-login.module.css";

export default function PrincipalLoginPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.logoWrapper}>
        <Link href="/">
          <BrandLogo />
        </Link>
      </div>

      <section className={styles.leftPanel}>
        <PrincipalLoginForm />
      </section>

      <section className={styles.rightPanel}>
        <div className={styles.blurCircle} />
        <div className={styles.blurCircleSecondary} />
        <div className={styles.gridLines} />
        <div className={styles.visualContent}>
          <div className={styles.statsCard}>
            <div className={styles.macDots}>
              <div className={`${styles.dot} ${styles.dotRed}`} />
              <div className={`${styles.dot} ${styles.dotYellow}`} />
              <div className={`${styles.dot} ${styles.dotGreen}`} />
            </div>
            <p className={styles.statsLabel}>School Overview</p>
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>1,248</span>
                <span className={styles.statDesc}>Students Enrolled</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>96%</span>
                <span className={styles.statDesc}>Records Complete</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>84</span>
                <span className={styles.statDesc}>Faculty Members</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>12</span>
                <span className={styles.statDesc}>Departments</span>
              </div>
            </div>
            <div className={styles.progressSection}>
              <div className={styles.progressHeader}>
                <span>Document Processing</span>
                <span className={styles.progressValue}>78%</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: "78%" }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}