import styles from "./StatusBadge.module.css";
import type { Student } from "./types";

interface StatusBadgeProps {
  status: Student["status"];
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const variantClass = {
    Present: styles.present,
    Late:    styles.late,
    Absent:  styles.absent,
  }[status];

  return (
    <span className={`${styles.badge} ${variantClass}`}>
      <span className={styles.dot} />
      {status}
    </span>
  );
}