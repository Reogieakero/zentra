"use client";

import React, { useRef, useState } from "react";
import styles from "./announcements.module.css";
import { AnnouncementComposer, type ComposerSubmitPayload } from "./_components/AnnouncementComposer";
import { AnnouncementList } from "./_components/AnnouncementList";
import type { Announcement } from "./_components/announcementTypes";

const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "a1",
    title: "Brigada Eskwela — Saturday Cleanup Drive",
    body: "All teachers and student volunteers are invited to join this Saturday's Brigada Eskwela cleanup drive starting at 7:00 AM. Please bring your own cleaning materials if possible.",
    audience: "everyone",
    status: "published",
    pinned: true,
    author: "Principal's Office",
    date: "Jul 17, 2026",
    views: 842,
  },
  {
    id: "a2",
    title: "SF10 Submission Deadline Extended",
    body: "The deadline for submitting SF10 records for transferring students has been extended to July 25. Registrars, please coordinate with section advisers.",
    audience: "teachers",
    status: "published",
    pinned: true,
    author: "Registrar's Office",
    date: "Jul 16, 2026",
    views: 96,
  },
  {
    id: "a3",
    title: "Parent-Teacher Conference — Grade 7 to 10",
    body: "Parent-Teacher conferences for Grades 7 to 10 are scheduled for next month. A detailed schedule per section will be sent through the class group chats.",
    audience: "parents",
    status: "scheduled",
    pinned: false,
    author: "Principal's Office",
    date: "Aug 3, 2026, 8:00 AM",
    scheduleFor: "2026-08-03T08:00",
    views: 0,
  },
  {
    id: "a4",
    title: "Intramurals Practice Schedule",
    body: "Practice schedules for this year's intramurals are now posted on the bulletin board. Section captains should confirm attendance with their PE teachers.",
    audience: "students",
    status: "published",
    pinned: false,
    author: "Sports Coordinator",
    date: "Jul 14, 2026",
    views: 611,
  },
  {
    id: "a5",
    title: "Draft: Enrollment Guidelines for SY 2026-2027",
    body: "Draft guidelines for next school year's enrollment process, pending review from the admin council before this goes out to parents.",
    audience: "everyone",
    status: "draft",
    pinned: false,
    author: "Principal's Office",
    date: "Jul 12, 2026",
    views: 0,
  },
];

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [forceOpen, setForceOpen] = useState(false);
  const composerRef = useRef<HTMLDivElement>(null);

  const openComposerForEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setForceOpen(true);
    composerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const closeComposer = () => {
    setEditingAnnouncement(null);
    setForceOpen(false);
  };

  const upsert = (payload: ComposerSubmitPayload, status: Announcement["status"]) => {
    const displayDate =
      status === "scheduled" && payload.scheduleFor
        ? new Date(payload.scheduleFor).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })
        : new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

    if (editingAnnouncement) {
      setAnnouncements((prev) =>
        prev.map((a) =>
          a.id === editingAnnouncement.id ? { ...a, ...payload, status, date: displayDate } : a
        )
      );
    } else {
      const newAnnouncement: Announcement = {
        id: `a${Date.now()}`,
        title: payload.title,
        body: payload.body,
        audience: payload.audience,
        pinned: payload.pinned,
        scheduleFor: payload.scheduleFor,
        status,
        author: "Principal's Office",
        date: displayDate,
        views: 0,
      };
      setAnnouncements((prev) => [newAnnouncement, ...prev]);
    }
    closeComposer();
  };

  const handleTogglePin = (id: string) => {
    setAnnouncements((prev) => prev.map((a) => (a.id === id ? { ...a, pinned: !a.pinned } : a)));
  };

  const handleDelete = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  const handlePublishNow = (id: string) => {
    setAnnouncements((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status: "published",
              date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            }
          : a
      )
    );
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.headerArea}>
        <div>
          <h1 className={styles.pageTitle}>Announcements</h1>
          <p className={styles.pageSubtitle}>Post, schedule, and manage school-wide announcements</p>
        </div>
      </header>

      <div className={styles.feedLayout}>
        <div className={styles.feedColumn}>
          <div ref={composerRef}>
            <AnnouncementComposer
              editingAnnouncement={editingAnnouncement}
              forceOpen={forceOpen}
              onCancel={closeComposer}
              onSaveDraft={(payload) => upsert(payload, "draft")}
              onPublish={(payload) => upsert(payload, "published")}
              onSchedule={(payload) => upsert(payload, "scheduled")}
            />
          </div>

          <AnnouncementList
            announcements={announcements}
            onTogglePin={handleTogglePin}
            onEdit={openComposerForEdit}
            onDelete={handleDelete}
            onPublishNow={handlePublishNow}
          />
        </div>
      </div>
    </div>
  );
}
