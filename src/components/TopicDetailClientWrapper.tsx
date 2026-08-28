'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { TopicItem } from '../types/topics';
import { TopicDetail } from './TopicDetail';
import { useUserProgress } from '../hooks/useUserProgress';

export function TopicDetailClientWrapper({ topic }: { topic: TopicItem }) {
  const router = useRouter();
  const {
    progress,
    toggleBookmark,
    togglePracticed,
    markAsRead,
    saveNote,
    isBookmarked,
    isPracticed,
    isRead,
    getNote
  } = useUserProgress();

  return (
    <TopicDetail
      topic={topic}
      onBack={() => {
        router.push('/topics');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      onSelectTopic={(t) => {
        router.push(`/topic/${t.slug}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      isBookmarked={isBookmarked(topic.id)}
      isPracticed={isPracticed(topic.id)}
      isRead={isRead(topic.id)}
      onToggleBookmark={toggleBookmark}
      onTogglePracticed={togglePracticed}
      onMarkRead={markAsRead}
      userNote={getNote(topic.id)}
      onSaveNote={saveNote}
    />
  );
}
