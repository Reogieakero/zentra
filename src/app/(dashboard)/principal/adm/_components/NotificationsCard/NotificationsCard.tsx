"use client";

import React from "react";
import { Bell } from "lucide-react";
import styles from "./NotificationsCard.module.css";
import { notifications } from "../../_data/mockData";

export default function NotificationsCard() {
  return (
    <div className={`${styles.cardContainer} ${styles.fadeInUp}`} style={{ animationDelay: "0.2s" }}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>Notifications</h2>
      </div>
      <div className={styles.notificationStack}>
        {notifications.map((notif, idx) => (
          <div key={idx} className={styles.notificationItemBanner}>
            <Bell size={14} className={styles.notificationIcon} />
            <span className={styles.rowItemSub}>{notif.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
