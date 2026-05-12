"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { BrandLogo } from "../components/icons/Brand";
import styles from "./principal-login.module.css";

export default function PrincipalLoginPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailInput = (document.getElementById("principal-email") as HTMLInputElement).value;
    const passwordInput = (document.getElementById("principal-password") as HTMLInputElement).value;

    try {
      const response = await fetch("/api/principal-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput, password: passwordInput }),
      });

      const data = await response.json();

      if (data.success) {
        window.location.href = data.redirectTo;
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Principal login error:", err);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.logoWrapper}>
        <Link href="/">
          <BrandLogo />
        </Link>
      </div>

      <section className={styles.leftPanel}>
        <div className={styles.loginCard}>
          <div className={styles.roleBadge}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Principal Access
          </div>

          <header className={styles.header}>
            <h1 className={styles.headerTitle}>Principal Portal</h1>
            <p className={styles.headerSubtitle}>Secure access for school administrators.</p>
          </header>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputField}>
              <input
                type="email"
                id="principal-email"
                className={styles.input}
                placeholder=" "
                required
              />
              <label htmlFor="principal-email" className={styles.floatingLabel}>
                Official Email
              </label>
            </div>

            <div className={styles.inputField}>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="principal-password"
                  className={styles.input}
                  placeholder=" "
                  required
                />
                <label htmlFor="principal-password" className={styles.floatingLabel}>
                  Password
                </label>
                <button
                  type="button"
                  className={styles.eyeToggle}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className={styles.forgotAction}>
              <Link href="#" className={styles.link} style={{ fontSize: "var(--text-xs)" }}>
                Forgot password?
              </Link>
            </div>

            <button type="submit" className={styles.loginBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Sign in as Principal
            </button>
          </form>

          <p className={styles.footerText}>
            Not a principal? <Link href="/login" className={styles.link}>Staff sign in</Link>
          </p>
        </div>
      </section>

      <section className={styles.rightPanel}>
        <div className={styles.blurCircle} />
        <div className={styles.blurCircleSecondary} />
        <div className={styles.gridLines} />
        <div className={styles.visualContent}>
          <div className={styles.statsCard}>
            <div className={styles.macDots}>
              <div className={`${styles.dot} ${styles.dotRed}`} />
              <div className={`${styles.dot} ${styles.dotYellow}`} />
              <div className={`${styles.dot} ${styles.dotGreen}`} />
            </div>
            <p className={styles.statsLabel}>School Overview</p>
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>1,248</span>
                <span className={styles.statDesc}>Students Enrolled</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>96%</span>
                <span className={styles.statDesc}>Records Complete</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>84</span>
                <span className={styles.statDesc}>Faculty Members</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>12</span>
                <span className={styles.statDesc}>Departments</span>
              </div>
            </div>
            <div className={styles.progressSection}>
              <div className={styles.progressHeader}>
                <span>Document Processing</span>
                <span className={styles.progressValue}>78%</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: "78%" }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}