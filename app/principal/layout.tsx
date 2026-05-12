import styles from "./principal.module.css";
import Link from "next/link";
import { BrandLogo } from "../components/icons/Brand";

export default function PrincipalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.dashboardWrapper}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <BrandLogo />
        </div>
        <nav className={styles.nav}>
          <Link href="/principal" className={styles.navLinkActive}>Dashboard</Link>
          <Link href="/principal/students" className={styles.navLink}>Students</Link>
          <Link href="/principal/faculty" className={styles.navLink}>Faculty</Link>
          <Link href="/principal/records" className={styles.navLink}>Academic Records</Link>
        </nav>
        <div className={styles.sidebarFooter}>
          <Link href="/principal-login" className={styles.logoutBtn}>Logout</Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainArea}>
        <header className={styles.topBar}>
          <div className={styles.userProfile}>
            <span>Principal Account</span>
            <div className={styles.avatar}>P</div>
          </div>
        </header>
        <section className={styles.pageContent}>
          {children}
        </section>
      </main>
    </div>
  );
}