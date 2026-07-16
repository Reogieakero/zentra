"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/icons/brand";
import { Button } from "@/components/ui/button";
import { ExtensionSelect } from "./_components/extension-select";
import styles from "./register.module.css";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.blurCircle} />
      <div className={styles.gridLines} />

      <div className={styles.logoWrapper}>
        <Link href="/">
          <BrandLogo />
        </Link>
      </div>

      <main className={styles.mainContent}>
        <div className={styles.formContainer}>
          <header className={styles.header}>
            <h1>Create account</h1>
            <p>Join ZENTRA and start managing records faster.</p>
          </header>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.nameGrid}>
              <div className={styles.inputField}>
                <input type="text" id="firstName" className={styles.input} placeholder=" " required />
                <label htmlFor="firstName" className={styles.floatingLabel}>First Name</label>
              </div>
              <div className={styles.inputField}>
                <input type="text" id="lastName" className={styles.input} placeholder=" " required />
                <label htmlFor="lastName" className={styles.floatingLabel}>Last Name</label>
              </div>
            </div>

            <div className={styles.nameGridAlt}>
              <div className={styles.inputField} style={{ flex: 2 }}>
                <input type="text" id="middleName" className={styles.input} placeholder=" " />
                <label htmlFor="middleName" className={styles.floatingLabel}>Middle Name</label>
              </div>
              <ExtensionSelect />
            </div>

            <div className={styles.inputField}>
              <input type="email" id="email" className={styles.input} placeholder=" " required />
              <label htmlFor="email" className={styles.floatingLabel}>Work Email</label>
            </div>

            <div className={styles.inputField}>
              <div className={styles.passwordWrapper}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  className={styles.input} 
                  placeholder=" " 
                  required 
                />
                <label htmlFor="password" className={styles.floatingLabel}>Password</label>
                <Button 
                  type="button"
                  className={styles.eyeToggle}
                  onClick={() => setShowPassword(!showPassword)}
                  variant="ghost"
                  size="sm"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {showPassword ? (
                      <>
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </>
                    ) : (
                      <>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </>
                    )}
                  </svg>
                </Button>
              </div>
            </div>

            <div className={styles.inputField}>
              <div className={styles.passwordWrapper}>
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  id="confirmPassword" 
                  className={styles.input} 
                  placeholder=" " 
                  required 
                />
                <label htmlFor="confirmPassword" className={styles.floatingLabel}>Confirm Password</label>
                <Button 
                  type="button"
                  className={styles.eyeToggle}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  variant="ghost"
                  size="sm"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {showConfirmPassword ? (
                      <>
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </>
                    ) : (
                      <>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </>
                    )}
                  </svg>
                </Button>
              </div>
            </div>

            <Button type="submit" className={styles.loginBtn} variant="primary" size="lg">
              Create account
            </Button>

            <div className={styles.divider}>
              <span>OR</span>
            </div>

            <Button type="button" className={styles.googleBtn} variant="outline" size="lg">
              Sign up with Google
            </Button>
          </form>

          <p className={styles.footerText}>
            Already have an account? <Link href="/login" className={styles.link}>Sign in</Link>
          </p>
        </div>
      </main>
    </div>
  );
}