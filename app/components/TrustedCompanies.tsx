import styles from "./TrustedCompanies.module.css";

const FEATURES = [
  {
    label: "Grading Portal",
    bg: "linear-gradient(135deg, #ede9fe, #ddd6fe)",
    iconBg: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="white" strokeWidth={1.8} xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "Attendance Tracker",
    iconBg: "linear-gradient(135deg, #0ea5e9, #38bdf8)",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="white" strokeWidth={1.8} xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "SF 10 Repository",
    iconBg: "linear-gradient(135deg, #10b981, #34d399)",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="white" strokeWidth={1.8} xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    label: "ADM Monitoring",
    iconBg: "linear-gradient(135deg, #f59e0b, #fbbf24)",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="white" strokeWidth={1.8} xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

export function TrustedCompanies() {
  const repeated = [...FEATURES, ...FEATURES, ...FEATURES, ...FEATURES];

  return (
    <section className={`${styles.section} mx-auto max-w-full pb-12 overflow-hidden`}>
      <p className="text-center text-sm font-medium text-gray-400 mb-8 uppercase tracking-widest">
        Everything your school needs, all in one place
      </p>

      <div className="relative flex whitespace-nowrap overflow-hidden">
        <div className={`${styles.marqueeTrack} flex gap-24 items-center`}>
          {repeated.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-all duration-300"
            >
              <span
                className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0 shadow-sm"
                style={{ background: feature.iconBg }}
              >
                {feature.icon}
              </span>
              <span className="text-xl font-bold tracking-tight text-gray-800 whitespace-nowrap">
                {feature.label}
              </span>
            </div>
          ))}
        </div>
        <div className={styles.fadeLeft} />
        <div className={styles.fadeRight} />
      </div>
    </section>
  );
}