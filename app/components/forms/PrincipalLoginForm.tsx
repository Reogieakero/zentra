"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { usePrincipalLogin } from "@/app/hooks/usePrincipalLogin";
import styles from "@/app/principal-login/principal-login.module.css";

export function PrincipalLoginForm() {
  const { showPassword, setShowPassword, isLoading, error, handleSubmit } = usePrincipalLogin();
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");

  const sessionMessage =
    reason === "session_required"
      ? "Please sign in to access the Principal Portal."
      : null;

  return (
    <div className={styles.loginCard}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Principal Login</h1>
        <p className={styles.headerSubtitle}>Secure access for school administrators.</p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        {sessionMessage && (
          <p className={styles.sessionText}>{sessionMessage}</p>
        )}

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

        {error && (
          <p className={styles.errorText}>{error}</p>
        )}

        <div className={styles.forgotAction}>
          <Link href="#" className={styles.link} style={{ fontSize: "var(--text-xs)" }}>
            Forgot password?
          </Link>
        </div>

        <button type="submit" className={styles.loginBtn} disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in as Principal"}
        </button>
      </form>

      <p className={styles.footerText}>
        Not a principal? <Link href="/login" className={styles.link}>Staff sign in</Link>
      </p>
    </div>
  );
}