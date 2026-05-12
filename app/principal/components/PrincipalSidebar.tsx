"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./PrincipalSidebar.module.css";
import { NAV_LINKS } from "../constants/navigation";

export function PrincipalSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/principal") return pathname === "/principal";
    return pathname.startsWith(href);
  };

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {NAV_LINKS.map((group, index) => (
          <React.Fragment key={index}>
            <ul className={styles.linkList}>
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${styles.link} ${isActive(item.href) ? styles.linkActive : ""}`}
                  >
                    <span className={styles.linkIcon}>{item.icon}</span>
                    <span className={styles.linkLabel}>{item.label}</span>
                    {isActive(item.href) && (
                      <span className={styles.activeIndicator} aria-hidden="true" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            {index < NAV_LINKS.length - 1 && <div className={styles.divider} />}
          </React.Fragment>
        ))}
      </nav>
    </aside>
  );
}