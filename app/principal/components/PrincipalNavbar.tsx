"use client";

import { useState } from "react";
import Link from "next/link";
import { BrandLogo } from "../../components/icons/Brand";
import { UserDropdown } from "./UserDropdown";
import { SearchModal } from "./SearchModal";
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
          <span className={styles.feedbackBtn}>Feedback</span>

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