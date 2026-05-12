import styles from "./principal.module.css";
import { PrincipalNavbar } from "./components/PrincipalNavbar";

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
      <main className={styles.mainArea}>
        <section className={styles.pageContent}>
          {children}
        </section>
      </main>
    </div>
  );
}