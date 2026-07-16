import styles from "./brand.module.css";

export function BrandLogo() {
  return (
    <div className={styles.wrapper}>
      <span className={styles.z}>Z</span>
      <span className={styles.rest}>entra</span>
    </div>
  );
}