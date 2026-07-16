import { Suspense } from "react";
import styles from "./principal.module.css";
import { PrincipalNavbar } from "./_components/principal-navbar";
import { PrincipalSidebar } from "./_components/principal-sidebar";

export default function PrincipalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const principalEmail = process.env.PRINCIPAL_EMAIL || "admin@zentra.edu";
  const principalName = "";

  return (
    <div className={styles.dashboardWrapper}>
      <PrincipalNavbar user={{ name: principalName, email: principalEmail }} />
      <div className={styles.bodyArea}>
        <Suspense fallback={null}>
          <PrincipalSidebar />
        </Suspense>
        <main className={styles.mainArea}>
          <section className={styles.pageContent}>
            {children}
          </section>
        </main>
      </div>
    </div>
  );
}