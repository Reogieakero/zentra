import Image from "next/image";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={`${styles.section} mx-auto flex max-w-4xl flex-col items-center px-6 pb-8 pt-6 text-center`}>
     <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-6xl" style={{ color: "#5b21b6" }}>
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
          <stop offset="0%"   stopColor="#a78bfa" stopOpacity="0" />
          <stop offset="30%"  stopColor="#8b5cf6" stopOpacity="0.9" />
          <stop offset="50%"  stopColor="#ffffff" stopOpacity="1" />
          <stop offset="70%"  stopColor="#8b5cf6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#7c3aed" stopOpacity="0" />
          <stop offset="50%"  stopColor="#7c3aed" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </linearGradient>
        <filter id="glow-blur-lg">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id="glow-blur-sm">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      {/* Wide soft bloom */}
      <path
        d="M4 22 Q110 6 216 22"
        stroke="url(#glowGrad)"
        strokeWidth="14"
        filter="url(#glow-blur-lg)"
        opacity="0.7"
      />
      {/* Medium glow */}
      <path
        d="M8 21 Q110 8 212 21"
        stroke="url(#arcGrad)"
        strokeWidth="5"
        filter="url(#glow-blur-sm)"
        opacity="0.85"
      />
      {/* Crisp line */}
      <path
        d="M12 20 Q110 9 208 20"
        stroke="url(#arcGrad)"
        strokeWidth="1.5"
      />
    </svg>
  </span>
  : Streamlining School <br /> Documentation and Records
</h1>

      <p className="mt-5 max-w-sm text-base leading-7 text-gray-500">
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
            className="w-full object-cover"
            priority
          />
          <div className={styles.dashboardFade} />
        </div>
      </div>
    </section>
  );
}