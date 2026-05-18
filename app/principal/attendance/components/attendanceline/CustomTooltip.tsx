import type { Day, Grade } from "./types";
import styles from "./CustomTooltip.module.css";

interface TooltipPayloadItem {
  dataKey: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
  activeGrade: Grade | null;
  dayDateMap: Record<Day, string>;
}

export function CustomTooltip({
  active,
  payload,
  label,
  activeGrade,
  dayDateMap,
}: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const items = activeGrade
    ? payload.filter((p) => p.dataKey === activeGrade)
    : payload;

  const dateLabel = label ? dayDateMap[label as Day] : null;

  return (
    <div className={styles.tooltip}>
      <p className={styles.label}>
        {label}
        {dateLabel && (
          <span className={styles.labelDate}>· {dateLabel}</span>
        )}
      </p>
      {items.map((p) => (
        <div key={p.dataKey} className={styles.row}>
          <span className={styles.dot} style={{ background: p.color }} />
          <span className={styles.key}>{p.dataKey}</span>
          <span className={styles.value}>{p.value}</span>
        </div>
      ))}
    </div>
  );
}