import styles from "./skeleton.module.css";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`${styles.base}${className ? ` ${className}` : ""}`} {...props} />;
}
