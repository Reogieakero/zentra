import { COMPANIES } from "./icons/CompanyIcons";
import styles from "./TrustedCompanies.module.css";

export function TrustedCompanies() {
  const repeated = [...COMPANIES, ...COMPANIES, ...COMPANIES, ...COMPANIES];

  return (
    <section className={`${styles.section} mx-auto max-w-full pb-12 overflow-hidden`}>
      <p className="text-center text-sm font-medium text-gray-400 mb-8 uppercase tracking-widest">
        Trusted by top fintech companies around the world
      </p>

      <div className="relative flex whitespace-nowrap overflow-hidden">
        <div className={`${styles.marqueeTrack} flex gap-24 items-center`}>
          {repeated.map((company, index) => (
            <div
              key={index}
              className="flex items-center gap-3 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              {company.icon}
              <span className="text-xl font-bold tracking-tight text-gray-800">{company.name}</span>
            </div>
          ))}
        </div>
        <div className={styles.fadeLeft} />
        <div className={styles.fadeRight} />
      </div>
    </section>
  );
}