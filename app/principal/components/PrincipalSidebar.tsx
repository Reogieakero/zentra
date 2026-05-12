"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./PrincipalSidebar.module.css";
import { NAV_LINKS } from "../constants/navigation";

export function PrincipalSidebar() {
  const pathname = usePathname();
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  const isActive = (href: string) => {
    if (href === "/principal") return pathname === "/principal";
    return pathname.startsWith(href);
  };

  const shouldShowSubItems = (href: string) =>
    hoveredHref === href || isActive(href);

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {NAV_LINKS.map((group, index) => (
          <React.Fragment key={index}>
            <ul className={styles.linkList}>
              {group.items.map((item) => (
                <li
                  key={item.href}
                  className={styles.navItem}
                  onMouseEnter={() => item.subItems ? setHoveredHref(item.href) : undefined}
                  onMouseLeave={() => setHoveredHref(null)}
                >
                  <Link
                    href={item.href}
                    className={`${styles.link} ${isActive(item.href) ? styles.linkActive : ""}`}
                  >
                    <span className={styles.linkIcon}>{item.icon}</span>
                    <span className={styles.linkLabel}>{item.label}</span>

                    {item.subItems && (
                      <span
                        className={`${styles.chevron} ${shouldShowSubItems(item.href) ? styles.chevronOpen : ""}`}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    )}

                    {isActive(item.href) && (
                      <span className={styles.activeIndicator} aria-hidden="true" />
                    )}
                  </Link>

                  {item.subItems && shouldShowSubItems(item.href) && (
                    <ul className={styles.subLinkList}>
                      {item.subItems.map((subItem) => (
                        <li key={subItem.href}>
                          <Link
                            href={subItem.href}
                            className={`${styles.subLink} ${pathname === subItem.href ? styles.subLinkActive : ""}`}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
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