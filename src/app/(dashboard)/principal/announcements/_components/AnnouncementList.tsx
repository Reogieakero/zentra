"use client";

import React, { useMemo, useState } from "react";
import styles from "./AnnouncementList.module.css";
import { FilterSelect } from "@/components/ui/filter-select";
import { AnnouncementCard } from "./AnnouncementCard";
import { AUDIENCE_LIST, type Announcement } from "./announcementTypes";
import { SearchIcon } from "./AnnouncementIcons";

const AUDIENCE_FILTER_OPTIONS = [
  { value: "all", label: "All Audiences" },
  ...AUDIENCE_LIST.map((a) => ({ value: a.id, label: a.label })),
];

const STATUS_FILTER_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "published", label: "Published" },
  { value: "scheduled", label: "Scheduled" },
  { value: "draft", label: "Draft" },
];

interface AnnouncementListProps {
  announcements: Announcement[];
  onTogglePin: (id: string) => void;
  onEdit: (announcement: Announcement) => void;
  onDelete: (id: string) => void;
  onPublishNow: (id: string) => void;
}

export function AnnouncementList({
  announcements,
  onTogglePin,
  onEdit,
  onDelete,
  onPublishNow,
}: AnnouncementListProps) {
  const [search, setSearch] = useState("");
  const [audienceFilter, setAudienceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    const matches = announcements.filter((a) => {
      const matchesSearch =
        search.trim().length === 0 ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.body.toLowerCase().includes(search.toLowerCase());
      const matchesAudience = audienceFilter === "all" || a.audience === audienceFilter;
      const matchesStatus = statusFilter === "all" || a.status === statusFilter;
      return matchesSearch && matchesAudience && matchesStatus;
    });
    // Pinned posts float to the top of the feed, like a pinned Facebook post.
    return [...matches].sort((a, b) => Number(b.pinned) - Number(a.pinned));
  }, [announcements, search, audienceFilter, statusFilter]);

  const cardProps = { onTogglePin, onEdit, onDelete, onPublishNow };

  return (
    <div className={styles.container}>
      <div className={styles.filterBar}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>
            <SearchIcon />
          </span>
          <input
            className={styles.searchInput}
            placeholder="Search announcements..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <FilterSelect options={AUDIENCE_FILTER_OPTIONS} value={audienceFilter} onChange={setAudienceFilter} />
        <FilterSelect options={STATUS_FILTER_OPTIONS} value={statusFilter} onChange={setStatusFilter} />
      </div>

      {filtered.length === 0 ? (
        <div className={styles.emptyState}>
          No announcements match your filters. Try adjusting search or create a new one.
        </div>
      ) : (
        <div className={styles.feed}>
          {filtered.map((a) => (
            <AnnouncementCard key={a.id} announcement={a} {...cardProps} />
          ))}
        </div>
      )}
    </div>
  );
}
