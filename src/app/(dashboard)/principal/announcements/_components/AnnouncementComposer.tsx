"use client";

import React, { useEffect, useState } from "react";
import styles from "./AnnouncementComposer.module.css";
import { Button } from "@/components/ui/button";
import { FilterSelect } from "@/components/ui/filter-select";
import { AUDIENCE_LIST, getInitials, type Audience, type Announcement } from "./announcementTypes";
import { PinIcon, SendIcon, ClockIcon } from "./AnnouncementIcons";

const AUDIENCE_OPTIONS = AUDIENCE_LIST.map((a) => ({ value: a.id, label: a.label }));
const ADMIN_NAME = "Principal's Office";

export interface ComposerSubmitPayload {
  title: string;
  body: string;
  audience: Audience;
  pinned: boolean;
  scheduleFor?: string;
}

interface AnnouncementComposerProps {
  editingAnnouncement: Announcement | null;
  forceOpen: boolean;
  onSaveDraft: (payload: ComposerSubmitPayload) => void;
  onPublish: (payload: ComposerSubmitPayload) => void;
  onSchedule: (payload: ComposerSubmitPayload) => void;
  onCancel: () => void;
}

export function AnnouncementComposer({
  editingAnnouncement,
  forceOpen,
  onSaveDraft,
  onPublish,
  onSchedule,
  onCancel,
}: AnnouncementComposerProps) {
  const [expanded, setExpanded] = useState(forceOpen);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState<Audience>("everyone");
  const [pinned, setPinned] = useState(false);
  const [scheduleMode, setScheduleMode] = useState(false);
  const [scheduleFor, setScheduleFor] = useState("");

  useEffect(() => {
    setExpanded(forceOpen);
    if (editingAnnouncement) {
      setTitle(editingAnnouncement.title);
      setBody(editingAnnouncement.body);
      setAudience(editingAnnouncement.audience);
      setPinned(editingAnnouncement.pinned);
      setScheduleMode(editingAnnouncement.status === "scheduled");
      setScheduleFor(editingAnnouncement.scheduleFor ?? "");
    }
  }, [editingAnnouncement, forceOpen]);

  const isValid = title.trim().length > 0 && body.trim().length > 0;

  const resetAndClose = () => {
    setTitle("");
    setBody("");
    setAudience("everyone");
    setPinned(false);
    setScheduleMode(false);
    setScheduleFor("");
    setExpanded(false);
    onCancel();
  };

  const buildPayload = (): ComposerSubmitPayload => ({
    title: title.trim(),
    body: body.trim(),
    audience,
    pinned,
    scheduleFor: scheduleMode ? scheduleFor : undefined,
  });

  const handleAction = (fn: (p: ComposerSubmitPayload) => void) => {
    fn(buildPayload());
    setTitle("");
    setBody("");
    setAudience("everyone");
    setPinned(false);
    setScheduleMode(false);
    setScheduleFor("");
    setExpanded(false);
  };

  return (
    <section className={styles.card}>
      <div className={styles.headRow}>
        <div className={styles.avatar}>{getInitials(ADMIN_NAME)}</div>
        {!expanded ? (
          <button type="button" className={styles.trigger} onClick={() => setExpanded(true)}>
            What's the announcement, Principal?
          </button>
        ) : (
          <div className={styles.expandedFields}>
            <input
              className={styles.headlineInput}
              placeholder="Headline"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={120}
              autoFocus
            />
            <textarea
              className={styles.bodyInput}
              placeholder="Write the announcement details..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={3}
            />
          </div>
        )}
      </div>

      {expanded && (
        <>
          <div className={styles.controlsRow}>
            <FilterSelect options={AUDIENCE_OPTIONS} value={audience} onChange={(v) => setAudience(v as Audience)} />

            <button
              type="button"
              className={`${styles.pill} ${pinned ? styles.pillActive : ""}`}
              onClick={() => setPinned((p) => !p)}
              aria-pressed={pinned}
            >
              <PinIcon />
              Pin
            </button>

            <button
              type="button"
              className={`${styles.pill} ${scheduleMode ? styles.pillActive : ""}`}
              onClick={() => setScheduleMode((s) => !s)}
              aria-pressed={scheduleMode}
            >
              <ClockIcon />
              Schedule
            </button>

            {scheduleMode && (
              <input
                type="datetime-local"
                className={styles.dateInput}
                value={scheduleFor}
                onChange={(e) => setScheduleFor(e.target.value)}
              />
            )}
          </div>

          <div className={styles.actions}>
            <Button variant="ghost" size="md" type="button" onClick={resetAndClose}>
              Cancel
            </Button>
            <Button
              variant="outline"
              size="md"
              type="button"
              disabled={!isValid}
              onClick={() => handleAction(onSaveDraft)}
            >
              Save Draft
            </Button>
            {scheduleMode ? (
              <Button
                variant="primary"
                size="md"
                type="button"
                disabled={!isValid || !scheduleFor}
                onClick={() => handleAction(onSchedule)}
              >
                <ClockIcon />
                Schedule
              </Button>
            ) : (
              <Button
                variant="primary"
                size="md"
                type="button"
                disabled={!isValid}
                onClick={() => handleAction(onPublish)}
              >
                <SendIcon />
                Post
              </Button>
            )}
          </div>
        </>
      )}
    </section>
  );
}
