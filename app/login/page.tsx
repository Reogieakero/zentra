"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { BrandLogo } from "../components/icons/Brand";
import styles from "./login.module.css";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  const emailInput = (document.getElementById("email") as HTMLInputElement).value;
  const passwordInput = (document.getElementById("password") as HTMLInputElement).value;

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailInput, password: passwordInput }),
    });

    const data = await response.json();

    if (data.success) {
      // Direct the Principal to their dashboard
      window.location.href = data.redirectTo;
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error("Login error:", err);
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
          <header className={styles.header}>
            <h1>Welcome back</h1>
            <p>Ready to jump back into your projects?</p>
          </header>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputField}>
              <input 
                type="email" 
                id="email" 
                className={styles.input} 
                placeholder="Work Email" 
                required 
              />
              <label htmlFor="email" className={styles.floatingLabel}>Work Email</label>
            </div>

            <div className={styles.inputField}>
              <div className={styles.passwordWrapper}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  className={styles.input} 
                  placeholder="Password" 
                  required 
                />
                <label htmlFor="password" className={styles.floatingLabel}>Password</label>
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
              <Link href="#" className={styles.link} style={{ fontSize: 'var(--text-xs)' }}>
                Forgot password?
              </Link>
            </div>

            <button type="submit" className={styles.loginBtn}>
              Sign in
            </button>

            <div className={styles.divider}>
              <span>OR</span>
            </div>

            <button 
              type="button" 
              className={styles.googleBtn} 
              onClick={() => {}}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>
          </form>

          <p className={styles.footerText}>
            New here? <Link href="/register" className={styles.link}>Create account</Link>
          </p>
        </div>
      </section>

      <section className={styles.rightPanel}>
        <div className={styles.blurCircle} />
        <div className={styles.gridLines} />
        <div className={styles.visualContent}>
          <div className={styles.testimonialCard}>
            <div className={styles.macDots}>
              <div className={`${styles.dot} ${styles.dotGreen}`} />
              <div className={`${styles.dot} ${styles.dotYellow}`} />
              <div className={`${styles.dot} ${styles.dotRed}`} />
            </div>
            <p className={styles.quote}>
              “ZENTRA has completely transformed how schools manage academic records and student documents. The speed, accessibility, and modern design make record management more efficient than ever.”
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}