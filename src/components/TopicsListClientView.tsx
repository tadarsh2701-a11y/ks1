'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { allTopics, searchTopics } from '../data/all-topics';
import { categories } from '../data/categories';
import { TopicCard } from './TopicCard';
import { SearchAndFilterBar } from './SearchAndFilterBar';
import { useUserProgress } from '../hooks/useUserProgress';
import { useLanguage } from '../context/LanguageContext';
import { Filter } from 'lucide-react';

function TopicsListContent() {
  const { t, translateCategory } = useLanguage();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialDifficulty = searchParams.get('difficulty') || 'all';
  const initialQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedDifficulty, setSelectedDifficulty] = useState(initialDifficulty);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const diff = searchParams.get('difficulty');
    if (diff) setSelectedDifficulty(diff);
    const q = searchParams.get('q');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  const {
    progress,
    toggleBookmark,
    togglePracticed,
    isBookmarked,
    isPracticed,
    isRead
  } = useUserProgress();

  const filteredTopics = useMemo(() => {
    return searchTopics(searchQuery, selectedCategory, selectedDifficulty);
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    if (typeof window !== 'undefined') {
      try {
        const url = new URL(window.location.href);
        if (catId === 'all') {
          url.searchParams.delete('category');
        } else {
          url.searchParams.set('category', catId);
        }
        window.history.replaceState(null, '', url.pathname + url.search + url.hash);
      } catch {
        // ignore
      }
    }
  };

  const handleDifficultySelect = (diff: string) => {
    setSelectedDifficulty(diff);
    if (typeof window !== 'undefined') {
      try {
        const url = new URL(window.location.href);
        if (diff === 'all') {
          url.searchParams.delete('difficulty');
        } else {
          url.searchParams.set('difficulty', diff);
        }
        window.history.replaceState(null, '', url.pathname + url.search + url.hash);
      } catch {
        // ignore
      }
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 space-y-10 animate-fade-in">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-sans text-[#dfbfba]/70 mb-2">
        <Link href="/" className="hover:text-[#ffb4a8] transition-colors">{t('navHome')}</Link>
        <span className="opacity-40">/</span>
        <span className="text-[#e9c176]">{t('allGuidesCount')}</span>
      </nav>

      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="font-sans text-xs uppercase tracking-widest text-[#e9c176]">
          {t('heroTagline')}
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#ffb4a8] leading-tight">
          {t('heroHeadline')}
        </h1>
        <p className="font-sans text-base sm:text-lg text-[#dfbfba]">
          {t('heroDescription')}
        </p>
      </div>

      {/* 3-Column Layout: Left Category Index, Center Topics Grid, Right Ad Slot */}
      <div className="flex flex-col lg:flex-row gap-6 xl:gap-8 items-start">
        
        {/* Left Web Sidebar: Categories Navigation Index */}
        <aside className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-24 space-y-4">
          <div className="p-5 rounded-2xl bg-[#1c1b1b]/95 border border-[#ffb4a8]/20 backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/5">
              <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#e9c176]">
                {t('categoriesIndex') || 'Categories Index'}
              </h3>
              <span className="text-[10px] text-[#a08c87] bg-[#2d1c1a] px-2 py-0.5 rounded-full">
                {t('allModulesCount') || '8 Modules'}
              </span>
            </div>
            <div className="space-y-1">
              <Link
                href="/topics"
                onClick={(e) => {
                  e.preventDefault();
                  handleCategorySelect('all');
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-sans transition-all flex items-center justify-between ${
                  selectedCategory === 'all'
                    ? 'bg-[#600000]/70 text-[#ffb4a8] font-medium border border-[#ffb4a8]/30 shadow-md'
                    : 'text-[#dfbfba] hover:bg-[#2d1c1a] hover:text-[#fff]'
                }`}
              >
                <span>{t('allTopics')}</span>
                <span className="text-[10px] opacity-70">(101)</span>
              </Link>
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const catTrans = translateCategory(cat.id);
                return (
                  <Link
                    key={cat.id}
                    href={`/topics?category=${cat.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategorySelect(cat.id);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-sans transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'bg-[#600000]/70 text-[#ffb4a8] font-medium border border-[#ffb4a8]/30 shadow-md'
                        : 'text-[#dfbfba] hover:bg-[#2d1c1a] hover:text-[#fff]'
                    }`}
                  >
                    <span className="truncate pr-2">{catTrans.shortName || catTrans.title || cat.title}</span>
                    <span className="text-[10px] opacity-70">({cat.topicCount})</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Center Main Content: Filter Bar & Cards Grid */}
        <div className="flex-1 min-w-0 w-full space-y-8">
          <SearchAndFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
            selectedDifficulty={selectedDifficulty}
            onSelectDifficulty={handleDifficultySelect}
            totalResults={filteredTopics.length}
          />
          <div id="topics-grid-section">
            {filteredTopics.length === 0 ? (
              <div className="text-center py-20 px-4 bg-[#1c1b1b] rounded-3xl border border-dashed border-white/10 space-y-4">
                <Filter className="w-12 h-12 text-[#dfbfba]/30 mx-auto" />
                <h3 className="font-serif text-xl text-[#e5e2e1]">{t('noGuidesFound') || 'No Guides Found'}</h3>
                <p className="font-sans text-xs text-[#dfbfba] max-w-sm mx-auto">
                  {t('noGuidesFoundSubtitle') || 'Try adjusting your search terms or clearing category/difficulty filters.'}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedDifficulty('all');
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#600000] text-white text-xs font-sans font-semibold hover:bg-[#670502] transition-colors"
                >
                  {t('resetAllFilters') || 'Reset All Filters'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTopics.map((topic) => (
                  <TopicCard
                    key={topic.id}
                    topic={topic}
                    isBookmarked={isBookmarked(topic.id)}
                    isPracticed={isPracticed(topic.id)}
                    isRead={isRead(topic.id)}
                    onToggleBookmark={toggleBookmark}
                    onTogglePracticed={togglePracticed}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Web Sidebar: Ad / Sponsor Blank Placeholder Space */}
        <aside className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-24 space-y-5">
          <div className="p-6 rounded-2xl bg-[#1c1b1b]/95 border border-[#ffb4a8]/20 backdrop-blur-md flex flex-col items-center justify-center text-center min-h-[350px] relative overflow-hidden group shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-b from-[#600000]/15 via-transparent to-[#e9c176]/10 opacity-70 pointer-events-none" />
            
            <span className="text-[10px] font-sans uppercase tracking-widest text-[#a08c87] mb-4 bg-[#2a1a18] px-3 py-1 rounded-full border border-[#482927]/60 relative z-10">
              Advertisement Space
            </span>
            
            <div className="w-14 h-14 rounded-2xl bg-[#2a1715] border border-[#ffb4a8]/30 flex items-center justify-center mb-4 text-[#ffb4a8] relative z-10 shadow-inner group-hover:scale-105 transition-transform">
              <span className="font-serif text-2xl">✨</span>
            </div>
            
            <h4 className="font-serif text-base text-[#e5e2e1] mb-2 relative z-10">
              Partner Banner Space
            </h4>
            
            <p className="text-xs text-[#a08c87] font-sans leading-relaxed mb-6 relative z-10 px-2">
              Blank ad placement slot for intimacy educators, wellness brands &amp; workshops.
            </p>

            <div className="w-full border-t border-[#3d2422] pt-4 relative z-10">
              <span className="text-[11px] text-[#e9c176] hover:underline cursor-pointer font-sans block">
                Inquire for Ads Placement
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#181616]/95 border border-[#2d1c1a] text-center min-h-[140px] flex flex-col items-center justify-center space-y-2 shadow-lg">
            <span className="text-[9px] uppercase tracking-wider text-[#7e6b66]">Reserved Ad Unit</span>
            <div className="w-full h-20 rounded-xl bg-[#231514] border border-dashed border-[#482927] flex items-center justify-center text-xs text-[#a08c87]">
              300 × 150 Ad Banner
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}

export function TopicsListClientView() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24 text-center">Loading guides...</div>}>
      <TopicsListContent />
    </Suspense>
  );
}