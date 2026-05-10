import Link from "next/link";
import { BrandLogo } from "./icons/Brand";
import { NAV_LINKS, GITHUB_STARS, GITHUB_URL } from "../constants/navigation";
import styles from "./Navbar.module.css";

export function Navbar() {
  return (
    <nav className={styles.navContainer}>
      <Link href="/">
        <BrandLogo />
      </Link>

      {/* Center Navigation Links */}
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

      {/* Right Side: GitHub & Auth */}
      <div className={styles.rightActions}>
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={styles.githubBadge}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
          <span>{GITHUB_STARS}</span>
        </a>

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