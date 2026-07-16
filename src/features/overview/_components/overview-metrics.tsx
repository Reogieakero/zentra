"use client";

import { Users, CheckCircle, AlertCircle, ClipboardList, FileText, Briefcase, Shield, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";

const metrics = [
  { label: "Total Students", value: "1,240", color: "var(--color-brand-600)", icon: Users },
  { label: "Present Today", value: "92%", color: "var(--color-success)", icon: CheckCircle },
  { label: "Absent Today", value: "8%", color: "var(--color-warning)", icon: AlertCircle },
  { label: "Pending ADM", value: "14", color: "var(--color-info)", icon: ClipboardList },
  { label: "SF10 Records", value: "892", color: "#6366f1", icon: FileText },
  { label: "Applications", value: "45", color: "#14b8a6", icon: Briefcase },
  { label: "Anecdotal", value: "12", color: "#ec4899", icon: Shield },
  { label: "Announcements", value: "3", color: "#f97316", icon: Bell },
];

export function OverviewMetrics() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m) => {
        const Icon = m.icon;
        return (
          <Card key={m.label} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">{m.label}</span>
              <Icon className="h-4 w-4" style={{ color: m.color }} />
            </div>
            <p className="text-2xl font-bold" style={{ color: m.color }}>{m.value}</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">+2.4% this month</p>
          </Card>
        );
      })}
    </div>
  );
}
