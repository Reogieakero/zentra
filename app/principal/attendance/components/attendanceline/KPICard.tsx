import React from "react";
import styles from "./KPICard.module.css";

interface KPICardProps {
  title: string;
  value: string | number;
  note: React.ReactNode;
  url: string;
  themeColor: string;
  useColorForValue?: boolean;
}

export function KPICard({ 
  title, 
  value, 
  note, 
  url, 
  themeColor, 
  useColorForValue = false 
}: KPICardProps) {
  return (
    <div
      className={styles.kpi}
      style={{
        borderColor: `${themeColor}22`,
        boxShadow: `0 8px 32px ${themeColor}0a, 0 2px 8px rgba(0, 0, 0, 0.02)`,
      }}
    >
      <div
        className={styles.chromeHeader}
        style={{
          background: `${themeColor}06`,
          borderBottomColor: `${themeColor}15`,
        }}
      >
        <span className={`${styles.chromeDot} ${styles.chromeDotRed}`} />
        <span className={`${styles.chromeDot} ${styles.chromeDotYellow}`} />
        <span className={`${styles.chromeDot} ${styles.chromeDotGreen}`} />
        <div className={styles.chromeAddressBar} style={{ background: `${themeColor}0f` }}>
          <span className={styles.chromeAddressText} style={{ color: `${themeColor}aa` }}>
            {url}
          </span>
        </div>
      </div>
      <div
        className={styles.kpiBody}
        style={{ background: `linear-gradient(to bottom, ${themeColor}03, transparent)` }}
      >
        <div className={styles.kpiLabel} style={{ color: `${themeColor}99` }}>
          {title}
        </div>
        <div 
          className={styles.kpiValue} 
          style={{ color: useColorForValue ? themeColor : undefined }}
        >
          {value}
        </div>
        <div className={styles.kpiNote}>{note}</div>
      </div>
    </div>
  );
}