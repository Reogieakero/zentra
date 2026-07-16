"use client";

import { useState } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/icons/brand";
import { UserDropdown } from "./user-dropdown";
import { SearchModal } from "./search-modal";
import styles from "./PrincipalNavbar.module.css";

interface PrincipalNavbarProps {
  user: {
    name: string;
    email: string;
  };
}

export function PrincipalNavbar({ user }: PrincipalNavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className={styles.navbar}>
        <div className={styles.navLeft}>
          <Link href="/principal" className={styles.logoLink}>
            <BrandLogo />
          </Link>
        </div>

        <div className={styles.navRight}>
          <button className={styles.feedbackBtn}>Feedback</button>

          <div 
            className={styles.searchContainer} 
            onClick={() => setIsSearchOpen(true)}
            role="button"
            tabIndex={0}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.searchIcon}>
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className={styles.searchPlaceholder}>Search...</span>
            <kbd className={styles.kbd}>⌘K</kbd>
          </div>

          <div className={styles.iconActions}>
            <button className={styles.iconBtn} aria-label="Help">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </button>

            <button className={styles.iconBtn} aria-label="Notifications">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </button>
          </div>

          <div className={styles.navSeparator} />
          <UserDropdown user={user} />
        </div>
      </header>

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
}