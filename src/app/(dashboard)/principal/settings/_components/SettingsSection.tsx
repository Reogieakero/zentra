import React from "react";
import styles from "./SettingsSection.module.css";

interface SettingsSectionProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  id?: string;
}

export function SettingsSection({ icon, title, description, children, actions, id }: SettingsSectionProps) {
  return (
    <section id={id} className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.headerLeft}>
          <span className={styles.iconBadge}>{icon}</span>
          <div>
            <h2 className={styles.cardTitle}>{title}</h2>
            {description && <p className={styles.cardDescription}>{description}</p>}
          </div>
        </div>
        {actions && <div className={styles.headerActions}>{actions}</div>}
      </div>
      <div className={styles.cardBody}>{children}</div>
    </section>
  );
}
