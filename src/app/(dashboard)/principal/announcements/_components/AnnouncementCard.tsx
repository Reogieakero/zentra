"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./AnnouncementCard.module.css";
import { AUDIENCE_META, getInitials, type Announcement } from "./announcementTypes";
import {
  PinIcon,
  EditIcon,
  TrashIcon,
  ClockIcon,
  SendIcon,
  MoreHorizontalIcon,
  EyeIcon,
} from "./AnnouncementIcons";

interface AnnouncementCardProps {
  announcement: Announcement;
  onTogglePin: (id: string) => void;
  onEdit: (announcement: Announcement) => void;
  onDelete: (id: string) => void;
  onPublishNow: (id: string) => void;
}

export function AnnouncementCard({
  announcement,
  onTogglePin,
  onEdit,
  onDelete,
  onPublishNow,
}: AnnouncementCardProps) {
  const audienceMeta = AUDIENCE_META[announcement.audience];
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar} style={{ background: audienceMeta.color }}>
          {getInitials(announcement.author)}
        </div>

        <div className={styles.identity}>
          <span className={styles.author}>{announcement.author}</span>
          <div className={styles.metaLine}>
            {announcement.pinned && (
              <span className={styles.pinnedTag}>
                <PinIcon />
                Pinned
              </span>
            )}
            <span
              className={styles.audienceTag}
              style={{ color: audienceMeta.color, borderColor: audienceMeta.color }}
            >
              {audienceMeta.label}
            </span>
            <span className={styles.dot}>·</span>
            <StatusText status={announcement.status} date={announcement.date} />
          </div>
        </div>

        <div className={styles.menuWrap} ref={menuRef}>
          <button
            type="button"
            className={styles.menuBtn}
            onClick={() => setMenuOpen((o) => !o)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            aria-label="Post options"
          >
            <MoreHorizontalIcon />
          </button>
          {menuOpen && (
            <ul className={styles.menu} role="menu">
              <li>
                <button
                  type="button"
                  className={styles.menuItem}
                  onClick={() => { onTogglePin(announcement.id); setMenuOpen(false); }}
                >
                  <PinIcon />
                  {announcement.pinned ? "Unpin post" : "Pin to top"}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={styles.menuItem}
                  onClick={() => { onEdit(announcement); setMenuOpen(false); }}
                >
                  <EditIcon />
                  Edit post
                </button>
              </li>
              {announcement.status !== "published" && (
                <li>
                  <button
                    type="button"
                    className={styles.menuItem}
                    onClick={() => { onPublishNow(announcement.id); setMenuOpen(false); }}
                  >
                    <SendIcon />
                    Publish now
                  </button>
                </li>
              )}
              <li>
                <button
                  type="button"
                  className={`${styles.menuItem} ${styles.menuItemDanger}`}
                  onClick={() => { onDelete(announcement.id); setMenuOpen(false); }}
                >
                  <TrashIcon />
                  Delete post
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{announcement.title}</h3>
        <p className={styles.text}>{announcement.body}</p>
      </div>

      <div className={styles.engagementRow}>
        <span className={styles.viewCount}>
          <EyeIcon />
          Seen by {announcement.views.toLocaleString()}
        </span>
      </div>

      <div className={styles.actionsBar}>
        <button type="button" className={styles.actionBtn} onClick={() => onTogglePin(announcement.id)}>
          <PinIcon />
          {announcement.pinned ? "Unpin" : "Pin"}
        </button>
        <button type="button" className={styles.actionBtn} onClick={() => onEdit(announcement)}>
          <EditIcon />
          Edit
        </button>
        {announcement.status !== "published" ? (
          <button type="button" className={styles.actionBtn} onClick={() => onPublishNow(announcement.id)}>
            <SendIcon />
            Publish Now
          </button>
        ) : (
          <button
            type="button"
            className={`${styles.actionBtn} ${styles.actionDanger}`}
            onClick={() => onDelete(announcement.id)}
          >
            <TrashIcon />
            Delete
          </button>
        )}
      </div>
    </article>
  );
}

function StatusText({ status, date }: { status: Announcement["status"]; date: string }) {
  if (status === "scheduled") {
    return (
      <span className={styles.statusScheduled}>
        <ClockIcon />
        Scheduled for {date}
      </span>
    );
  }
  if (status === "draft") {
    return <span className={styles.statusDraft}>Draft · not visible yet</span>;
  }
  return <span className={styles.statusPublished}>{date}</span>;
}
