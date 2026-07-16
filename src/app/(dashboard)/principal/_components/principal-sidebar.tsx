"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "./PrincipalSidebar.module.css";
import { NAV_LINKS } from "@/config/navigation";

export function PrincipalSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const initialOpenMenus: Record<string, boolean> = {};
    NAV_LINKS.forEach((group) => {
      group.items.forEach((item) => {
        if (item.subItems && (pathname === item.href || pathname.startsWith(item.href))) {
          initialOpenMenus[item.href] = true;
        }
      });
    });
    setOpenMenus(initialOpenMenus);
  }, [pathname]);

  const toggleMenu = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenMenus((prev) => ({
      ...prev,
      [href]: !prev[href],
    }));
  };

  const isActive = (href: string) => {
    if (href === "/principal") return pathname === "/principal";
    return pathname.startsWith(href);
  };

  const currentTab = searchParams.get("tab") || "dashboard";
  const currentHref = pathname + `?tab=${currentTab}`;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarInner}>
        <nav className={styles.nav}>
          {NAV_LINKS.map((group, index) => (
            <React.Fragment key={index}>
              <ul className={styles.linkList}>
                {group.items.map((item) => {
                  const isItemActive = isActive(item.href);
                  const isExpanded = !!openMenus[item.href];

                  return (
                    <li key={item.href} className={styles.navItem}>
                      <Link
                        href={item.href}
                        className={`${styles.link} ${isItemActive ? styles.linkActive : ""}`}
                      >
                        <span className={styles.linkIcon}>{item.icon}</span>
                        <span className={styles.linkLabel}>{item.label}</span>

                        {item.subItems && (
                          <span
                            className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ""}`}
                            onClick={(e) => toggleMenu(e, item.href)}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </span>
                        )}

                        {isItemActive && (
                          <span className={styles.activeIndicator} aria-hidden="true" />
                        )}
                      </Link>

                      {item.subItems && (
                        <ul className={`${styles.subLinkList} ${isExpanded ? styles.show : ""}`}>
                          {item.subItems.map((subItem) => (
                            <li key={subItem.href}>
                              <Link
                                href={subItem.href}
                                className={`${styles.subLink} ${currentHref === subItem.href ? styles.subLinkActive : ""}`}
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
              {index < NAV_LINKS.length - 1 && <div className={styles.divider} />}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </aside>
  );
}