"use client";

import React, { useMemo, useState } from "react";
import styles from "./settings.module.css";
import { SettingsSection } from "./_components/SettingsSection";
import { FormField } from "./_components/FormField";
import { ThemeToggle, type ThemeMode } from "./_components/ThemeToggle";
import { ToggleSwitch } from "./_components/ToggleSwitch";
import {
  UserIcon,
  SchoolIcon,
  BellIcon,
  ShieldIcon,
  MonitorIcon,
  CameraIcon,
  CheckIcon,
  LogOutIcon,
} from "./_components/SettingsIcons";

interface ProfileState {
  fullName: string;
  email: string;
  phone: string;
}

interface SchoolState {
  schoolName: string;
  schoolId: string;
  division: string;
  district: string;
  academicYear: string;
}

interface NotificationState {
  systemAlerts: boolean;
  weeklySummary: boolean;
  securityAlerts: boolean;
  enrollmentUpdates: boolean;
}

interface SecurityState {
  twoFactor: boolean;
  sessionTimeout: string;
}

const INITIAL_PROFILE: ProfileState = {
  fullName: "Dr. Elena Marasigan",
  email: "e.marasigan@depednagios.edu.ph",
  phone: "+63 917 555 0142",
};

const INITIAL_SCHOOL: SchoolState = {
  schoolName: "Nagios National High School",
  schoolId: "SCH-100482",
  division: "Zamboanga del Sur",
  district: "Molave District",
  academicYear: "2026–2027",
};

const INITIAL_NOTIFICATIONS: NotificationState = {
  systemAlerts: true,
  weeklySummary: true,
  securityAlerts: true,
  enrollmentUpdates: false,
};

const INITIAL_SECURITY: SecurityState = {
  twoFactor: true,
  sessionTimeout: "30",
};

const SESSIONS = [
  { id: "s1", device: "Chrome on Windows", location: "Molave, Zamboanga del Sur", current: true },
  { id: "s2", device: "Safari on iPhone", location: "Molave, Zamboanga del Sur", current: false },
];

export default function SettingsPage() {
  const [theme, setTheme] = useState<ThemeMode>("system");

  const [profile, setProfile] = useState<ProfileState>(INITIAL_PROFILE);
  const [school, setSchool] = useState<SchoolState>(INITIAL_SCHOOL);
  const [notifications, setNotifications] = useState<NotificationState>(INITIAL_NOTIFICATIONS);
  const [security, setSecurity] = useState<SecurityState>(INITIAL_SECURITY);
  const [sessions, setSessions] = useState(SESSIONS);
  const [isSaving, setIsSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const isDirty = useMemo(() => {
    return (
      JSON.stringify(profile) !== JSON.stringify(INITIAL_PROFILE) ||
      JSON.stringify(school) !== JSON.stringify(INITIAL_SCHOOL) ||
      JSON.stringify(notifications) !== JSON.stringify(INITIAL_NOTIFICATIONS) ||
      JSON.stringify(security) !== JSON.stringify(INITIAL_SECURITY)
    );
  }, [profile, school, notifications, security]);

  const initials = profile.fullName
    .split(" ")
    .filter((part) => part.length > 0 && part[0] === part[0].toUpperCase())
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  const handleSave = () => {
    if (isSaving || !isDirty) return;
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2000);
    }, 600);
  };

  const handleReset = () => {
    setProfile(INITIAL_PROFILE);
    setSchool(INITIAL_SCHOOL);
    setNotifications(INITIAL_NOTIFICATIONS);
    setSecurity(INITIAL_SECURITY);
  };

  const handleSignOutSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.headerArea}>
        <div>
          <h1 className={styles.pageTitle}>Settings</h1>
          <p className={styles.pageSubtitle}>Manage your profile, school details, and preferences</p>
        </div>
        <div className={styles.saveBar}>
          {isDirty && !isSaving && <span className={styles.saveHint}>Unsaved changes</span>}
          <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={handleReset} disabled={!isDirty}>
            Discard
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={handleSave}
            disabled={!isDirty || isSaving}
          >
            {justSaved ? <CheckIcon /> : null}
            {isSaving ? "Saving…" : justSaved ? "Saved" : "Save changes"}
          </button>
        </div>
      </header>

      <div className={styles.layout}>
        <nav className={styles.nav} aria-label="Settings sections">
          <a className={styles.navLink} href="#appearance">Appearance</a>
          <a className={styles.navLink} href="#profile">Profile</a>
          <a className={styles.navLink} href="#school">School</a>
          <a className={styles.navLink} href="#notifications">Notifications</a>
          <a className={styles.navLink} href="#security">Security</a>
        </nav>

        <div className={styles.sections}>
          <SettingsSection
            id="appearance"
            icon={<MonitorIcon />}
            title="Appearance"
            description="Choose how the portal looks on this device"
          >
            <div className={styles.appearanceRow}>
              <div className={styles.appearanceCopy}>
                <span className={styles.appearanceLabel}>Theme</span>
                <span className={styles.appearanceHint}>
                  {theme === "system"
                    ? "Following your device setting automatically."
                    : `Using ${theme} mode on this device.`}
                </span>
              </div>
              <ThemeToggle value={theme} onChange={setTheme} />
            </div>
          </SettingsSection>

          <SettingsSection
            id="profile"
            icon={<UserIcon />}
            title="Profile"
            description="Your personal details as shown across the portal"
          >
            <div className={styles.profileRow}>
              <div className={styles.avatar}>
                {initials || "?"}
                <span className={styles.avatarEditBtn} role="button" tabIndex={0} aria-label="Change photo">
                  <CameraIcon />
                </span>
              </div>
              <div>
                <div>{profile.fullName}</div>
                <span className={styles.roleBadge}>Principal</span>
              </div>
            </div>

            <div className={styles.fieldsGrid}>
              <FormField label="Full name" value={profile.fullName} onChange={(v) => setProfile((p) => ({ ...p, fullName: v }))} />
              <FormField label="Email address" type="email" value={profile.email} onChange={(v) => setProfile((p) => ({ ...p, email: v }))} />
              <FormField label="Phone number" type="tel" value={profile.phone} onChange={(v) => setProfile((p) => ({ ...p, phone: v }))} />
              <FormField label="Position" value="Principal" onChange={() => {}} disabled hint="Assigned by the Division Office" />
            </div>
          </SettingsSection>

          <SettingsSection
            id="school"
            icon={<SchoolIcon />}
            title="School information"
            description="Used on generated reports, SF10 exports, and announcements"
          >
            <div className={styles.fieldsGrid}>
              <FormField label="School name" value={school.schoolName} onChange={(v) => setSchool((s) => ({ ...s, schoolName: v }))} />
              <FormField label="School ID" value={school.schoolId} onChange={() => {}} disabled />
              <FormField label="Division" value={school.division} onChange={(v) => setSchool((s) => ({ ...s, division: v }))} />
              <FormField label="District" value={school.district} onChange={(v) => setSchool((s) => ({ ...s, district: v }))} />
              <FormField
                label="Academic year"
                type="select"
                value={school.academicYear}
                onChange={(v) => setSchool((s) => ({ ...s, academicYear: v }))}
                options={[
                  { value: "2026–2027", label: "2026–2027" },
                  { value: "2025–2026", label: "2025–2026" },
                  { value: "2024–2025", label: "2024–2025" },
                ]}
              />
            </div>
          </SettingsSection>

          <SettingsSection
            id="notifications"
            icon={<BellIcon />}
            title="Notifications"
            description="Choose what you get notified about"
          >
            <ToggleSwitch
              label="System alerts"
              description="Warnings and errors from the system log"
              checked={notifications.systemAlerts}
              onChange={(v) => setNotifications((n) => ({ ...n, systemAlerts: v }))}
            />
            <hr className={styles.divider} />
            <ToggleSwitch
              label="Weekly summary"
              description="A digest of enrollment, attendance, and records activity"
              checked={notifications.weeklySummary}
              onChange={(v) => setNotifications((n) => ({ ...n, weeklySummary: v }))}
            />
            <hr className={styles.divider} />
            <ToggleSwitch
              label="Security alerts"
              description="Failed logins and new-device sign-ins"
              checked={notifications.securityAlerts}
              onChange={(v) => setNotifications((n) => ({ ...n, securityAlerts: v }))}
            />
            <hr className={styles.divider} />
            <ToggleSwitch
              label="Enrollment updates"
              description="New student enrollments as they're recorded"
              checked={notifications.enrollmentUpdates}
              onChange={(v) => setNotifications((n) => ({ ...n, enrollmentUpdates: v }))}
            />
          </SettingsSection>

          <SettingsSection
            id="security"
            icon={<ShieldIcon />}
            title="Security"
            description="Protect access to your account"
          >
            <ToggleSwitch
              label="Two-factor authentication"
              description="Require a one-time code in addition to your password"
              checked={security.twoFactor}
              onChange={(v) => setSecurity((s) => ({ ...s, twoFactor: v }))}
            />

            <hr className={styles.divider} />

            <div className={styles.fieldsGrid}>
              <FormField
                label="Auto sign-out after"
                type="select"
                value={security.sessionTimeout}
                onChange={(v) => setSecurity((s) => ({ ...s, sessionTimeout: v }))}
                options={[
                  { value: "15", label: "15 minutes" },
                  { value: "30", label: "30 minutes" },
                  { value: "60", label: "1 hour" },
                  { value: "240", label: "4 hours" },
                ]}
              />
            </div>

            <hr className={styles.divider} />

            <div>
              <span className={styles.appearanceLabel}>Active sessions</span>
              <div className={styles.sessionList} style={{ marginTop: 10 }}>
                {sessions.map((s) => (
                  <div key={s.id} className={styles.sessionRow}>
                    <div className={styles.sessionInfo}>
                      <span className={styles.sessionDevice}>
                        {s.device} {s.current && <span className={styles.sessionCurrent}>This device</span>}
                      </span>
                      <span className={styles.sessionMeta}>{s.location}</span>
                    </div>
                    {!s.current && (
                      <button type="button" className={styles.sessionSignOut} onClick={() => handleSignOutSession(s.id)}>
                        <LogOutIcon />
                        Sign out
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </SettingsSection>
        </div>
      </div>
    </div>
  );
}
