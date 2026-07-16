import Image from "next/image";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.section}>
     <h1 className={styles.heading} style={{ color: "var(--text-green-dark)" }}>
  <span className={styles.zentraWord}>
    Zentra
    <svg
      className={styles.zentraArc}
      viewBox="0 0 220 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#4ade80" stopOpacity="0" />
          <stop offset="30%"  stopColor="#22c55e" stopOpacity="0.9" />
          <line x1="0" y1="0" x2="1" y2="1" />
          <stop offset="70%"  stopColor="#22c55e" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#16a34a" stopOpacity="0" />
          <stop offset="50%"  stopColor="#16a34a" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
        </linearGradient>
        <filter id="glow-blur-lg">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id="glow-blur-sm">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      <path
        d="M4 22 Q110 6 216 22"
        stroke="url(#glowGrad)"
        strokeWidth="14"
        filter="url(#glow-blur-lg)"
        opacity="0.7"
      />
      <path
        d="M8 21 Q110 8 212 21"
        stroke="url(#arcGrad)"
        strokeWidth="5"
        filter="url(#glow-blur-sm)"
        opacity="0.85"
      />
      <path
        d="M12 20 Q110 9 208 20"
        stroke="url(#arcGrad)"
        strokeWidth="1.5"
      />
    </svg>
  </span>
  : Streamlining School <br /> Documentation and Records
</h1>

      <p className={styles.subtitle}>
        Platform that provides a centralized school records management system designed to improve
        efficiency and organization.
      </p>

      <div className={styles.dashboardWrapper}>
        <div className={styles.dashboardInner}>
          <Image
            src="/landing-dashboard.png"
            alt="Zentra Dashboard"
            width={1100}
            height={680}
            className={styles.dashboardImage}
            priority
          />
          <div className={styles.dashboardFade} />
        </div>
      </div>
    </section>
  );
}