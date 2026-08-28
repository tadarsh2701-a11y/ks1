'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { BookmarksView } from '../../components/BookmarksView';
import { useUserProgress } from '../../hooks/useUserProgress';

export default function BookmarksPage() {
  const router = useRouter();
  const {
    progress,
    toggleBookmark,
    togglePracticed
  } = useUserProgress();

  return (
    <div className="pt-16 sm:pt-20">
      <BookmarksView
        onBack={() => router.push('/')}
        onSelectTopic={(t) => router.push(`/topic/${t.slug}`)}
        bookmarkedTopicIds={progress.bookmarkedTopicIds}
        practicedTopicIds={progress.practicedTopicIds}
        readTopicIds={progress.readTopicIds}
        notes={progress.notes}
        onToggleBookmark={toggleBookmark}
        onTogglePracticed={togglePracticed}
      />
    </div>
  );
}
