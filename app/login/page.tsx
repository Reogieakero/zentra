"use client";

import { useState } from "react";
import Link from "next/link";
import { BrandLogo } from "../components/icons/Brand";
import styles from "./login.module.css";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

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

          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
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
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
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
              "This platform has completely transformed how our team manages complex workflows. The speed and design are unparalleled."
            </p>
            <div className={styles.authorInfo}>
              <div className={styles.avatar} />
              <div className={styles.authorText}>
                <p className={styles.authorName}>Alex Rivera</p>
                <p className={styles.authorRole}>CTO at TechFlow</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}