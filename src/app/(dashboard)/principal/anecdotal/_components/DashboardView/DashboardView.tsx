"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import styles from "./DashboardView.module.css";

const stats = [
  { label: "Total Behavior Reports", value: "156", change: "+12%", color: "var(--accent-amber)" },
  { label: "Total Incident Reports", value: "43", change: "-5%", color: "var(--accent-pink)" },
  { label: "Guidance Notes", value: "89", change: "+8%", color: "var(--accent-sky)" },
  { label: "Student Observations", value: "234", change: "+15%", color: "var(--accent-teal)" },
  { label: "Pending Reviews", value: "18", change: "-3%", color: "var(--accent-orange)" },
];

const recentActivities = [
  {
    id: 1,
    action: "Behavior report filed",
    student: "Miguel Santos",
    type: "Classroom Disruption",
    time: "2 hours ago",
    status: "pending",
  },
  {
    id: 2,
    action: "Guidance note updated",
    student: "Isabella Cruz",
    type: "Academic Counseling",
    time: "4 hours ago",
    status: "completed",
  },
  {
    id: 3,
    action: "Incident report submitted",
    student: "Juan Dela Cruz",
    type: "Bullying",
    time: "5 hours ago",
    status: "under-review",
  },
  {
    id: 4,
    action: "Observation recorded",
    student: "Maria Reyes",
    type: "Behavioral Observation",
    time: "1 day ago",
    status: "completed",
  },
  {
    id: 5,
    action: "Behavior report reviewed",
    student: "Jose Garcia",
    type: "Tardiness",
    time: "1 day ago",
    status: "resolved",
  },
];

const statusVariant: Record<string, "warning" | "success" | "info" | "danger" | "default"> = {
  pending: "warning",
  "under-review": "info",
  completed: "success",
  resolved: "default",
};

export function DashboardView() {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.statsGrid}>
        {stats.map((stat, idx) => (
          <Card key={idx} className={styles.statCard}>
            <CardContent className={styles.statContent}>
              <div className={styles.statInfo}>
                <span className={styles.statLabel}>{stat.label}</span>
                <span className={styles.statValue}>{stat.value}</span>
              </div>
              <div className={styles.statTrend} style={{ color: stat.change.startsWith("+") ? "var(--text-green)" : "var(--accent-pink)" }}>
                {stat.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className={styles.sectionGrid}>
        <Card className={styles.recentCard}>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.activityList}>
              {recentActivities.map((activity) => (
                <div key={activity.id} className={styles.activityItem}>
                  <div className={styles.activityDot} />
                  <div className={styles.activityInfo}>
                    <p className={styles.activityAction}>{activity.action}</p>
                    <p className={styles.activityMeta}>
                      {activity.student} &middot; {activity.type}
                    </p>
                    <span className={styles.activityTime}>{activity.time}</span>
                  </div>
                  <Badge variant={statusVariant[activity.status] || "default"}>
                    {activity.status.replace("-", " ")}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className={styles.summaryCard}>
          <CardHeader>
            <CardTitle>Quick Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.summaryList}>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Records This Week</span>
                <span className={styles.summaryValue}>28</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Pending Actions</span>
                <span className={styles.summaryValue}>12</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Overdue Follow-ups</span>
                <span className={styles.summaryValue} style={{ color: "var(--accent-pink)" }}>5</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Resolved This Month</span>
                <span className={styles.summaryValue} style={{ color: "var(--text-green)" }}>47</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
