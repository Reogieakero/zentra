"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "../../components/icons/Brand";
import styles from "./PrincipalNavbar.module.css";


export function PrincipalNavbar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/principal-logout", { method: "POST" });
    window.location.href = "/principal-login";
  };


  return (
    <header className={styles.navbar}>
      <div className={styles.navLeft}>
        <Link href="/principal" className={styles.logoLink}>
          <BrandLogo />
        </Link>
      </div>


      <div className={styles.navRight}>
        <span className={styles.feedbackBtn}>Feedback</span>

        <button className={styles.searchBtn} aria-label="Search">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span className={styles.searchPlaceholder}>Search...</span>
        </button>

        <div className={styles.navSeparator} />

        <button className={styles.circleBtn} title="Help" aria-label="Help">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </button>

        <button className={styles.circleBtn} title="Notifications" aria-label="Notifications">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>

        <button
          className={styles.avatarBtn}
          onClick={handleLogout}
          title="Logout"
          aria-label="Principal account"
        >
          P
        </button>
      </div>
    </header>
  );
}