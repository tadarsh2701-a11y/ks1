'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HomeHero } from './HomeHero';
import { CuratedIntentionsBento } from './CuratedIntentionsBento';
import { TheJourneySection } from './TheJourneySection';
import { allTopics } from '../data/all-topics';
import { useUserProgress } from '../hooks/useUserProgress';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';

export function HomeClientView() {
  const router = useRouter();
  const { progress } = useUserProgress();

  const readCount = progress.readTopicIds.length;
  const practicedCount = progress.practicedTopicIds.length;

  const featuredTopic = useMemo(() => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
    );
    const index = dayOfYear % allTopics.length;
    return allTopics[index] || allTopics[0];
  }, []);

  const handleBrowse = () => {
    router.push('/topics');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreBeginner = () => {
    router.push('/topics?difficulty=Beginner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPathways = () => {
    router.push('/pathways');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryFromBento = (catId: string) => {
    router.push(`/topics?category=${catId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 animate-fade-in pt-16 sm:pt-20">
      <HomeHero
        onBrowse={handleBrowse}
        onExploreBeginner={handleExploreBeginner}
        onOpenPathways={handleOpenPathways}
        readCount={readCount}
        practicedCount={practicedCount}
      />
      <CuratedIntentionsBento
        onSelectCategory={handleCategoryFromBento}
      />
      <TheJourneySection
        onBrowse={handleBrowse}
        onExploreBeginner={handleExploreBeginner}
      />
      {featuredTopic && (
        <section className="max-w-[1200px] mx-auto px-5 md:px-16 py-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#201f1f] border border-[#ffb4a8]/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-[#600000]/30 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-sans font-semibold tracking-widest uppercase bg-[#600000] text-[#ffb4a8] border border-[#ffb4a8]/30 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" /> Featured Daily Exploration
                </span>
                <span className="font-mono text-xs text-[#e9c176]">
                  Topic #{featuredTopic.id}
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#e5e2e1]">
                {featuredTopic.title}
              </h2>
              <p className="font-sans text-sm text-[#dfbfba] line-clamp-2 leading-relaxed">
                {featuredTopic.subtitle}
              </p>
            </div>
            <Link
              href={`/topic/${featuredTopic.slug}`}
              className="relative z-10 px-8 py-4 rounded-full bg-[#600000] hover:bg-[#670502] text-white font-sans text-xs uppercase tracking-wider font-semibold bloom-burgundy transition-all duration-300 transform hover:scale-[1.03] shrink-0 flex items-center gap-2 cursor-pointer shadow-xl"
            >
              Read Today's Guide <ArrowRight className="w-4 h-4 text-[#ffb4a8]" />
            </Link>
          </div>
        </section>
      )}
      <section className="max-w-[1200px] mx-auto px-5 md:px-16 pb-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#1c1b1b] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#e9c176] flex items-center justify-center md:justify-start gap-1.5">
              <Compass className="w-4 h-4" /> Progressive Masterclasses
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#e5e2e1]">
              Want a guided, step-by-step pathway?
            </h3>
            <p className="font-sans text-sm text-[#dfbfba] leading-relaxed">
              Explore 6 structured learning pathways with curated sequences for couples at every stage of their intimate relationship.
            </p>
          </div>
          <Link
            href="/pathways"
            className="px-8 py-4 rounded-full bg-[#600000] hover:bg-[#670502] text-white font-sans text-xs uppercase tracking-wider font-semibold bloom-burgundy transition-all duration-300 transform hover:scale-[1.03] shrink-0 flex items-center gap-2 cursor-pointer shadow-xl"
          >
            View Curated Pathways <ArrowRight className="w-4 h-4 text-[#ffb4a8]" />
          </Link>
        </div>
      </section>
    </div>
  );
}