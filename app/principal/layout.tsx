"use client";

import styles from "./principal.module.css";
import { PrincipalNavbar } from "./components/PrincipalNavbar";

export default function PrincipalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.dashboardWrapper}>
      <PrincipalNavbar />
      <main className={styles.mainArea}>
        <section className={styles.pageContent}>
          {children}
        </section>
      </main>
    </div>
  );
}