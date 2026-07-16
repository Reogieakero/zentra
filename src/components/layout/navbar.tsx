import Link from "next/link";
import { BrandLogo } from "@/components/icons/brand";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/config/navbar-navigation";
import styles from "./Navbar.module.css";

export function Navbar() {
  return (
    <nav className={styles.navContainer}>
      <Link href="/" className={styles.brandLink}>
        <BrandLogo />
      </Link>

      <ul className={styles.navList}>
        {NAV_LINKS.map((link) => (
          <li key={link.label} className={link.dropdown ? styles.dropdownWrapper : ""}>
            <Link 
              href={link.href} 
              className={styles.navLink}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {link.label}
              {link.dropdown && (
                <svg className={styles.chevron} width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </Link>

            {link.dropdown && (
              <div className={styles.dropdownMenu}>
                {link.dropdown.map((child) => (
                  <Link key={child.label} href={child.href} className={styles.dropdownItem}>
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className={styles.rightActions}>
        <Link href="/feedback">
          <Button variant="ghost" size="sm">Feedback</Button>
        </Link>
        <Link href="/login" className={styles.navLink}>
          Login
        </Link>
        <Link href="/register" className={styles.signUpBtn}>
          Sign up
        </Link>
      </div>
    </nav>
  );
}