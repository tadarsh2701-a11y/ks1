'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Heart, Sparkles, Compass, Eye, ArrowRight, BookOpen } from 'lucide-react';
import { appImages } from '../data/images';
import { useLanguage } from '../context/LanguageContext';

interface AboutViewProps {
  onBrowse?: () => void;
  onExploreBeginner?: () => void;
}

export function AboutView({ onBrowse, onExploreBeginner }: AboutViewProps) {
  const { t } = useLanguage();

  return (
    <div className="pt-24 pb-20 max-w-[1200px] mx-auto px-5 md:px-16 relative z-10 space-y-20">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-sans text-[#dfbfba]/70 mb-2">
        <Link href="/" className="hover:text-[#ffb4a8] transition-colors">{t('navHome')}</Link>
        <span className="opacity-40">/</span>
        <span className="text-[#e9c176]">{t('aboutTitle')}</span>
      </nav>

      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-[#1c1b1b] border border-white/5 p-8 sm:p-14 lg:p-20 shadow-2xl">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transform duration-1000"
          style={{
            backgroundImage: `url('${appImages.about}')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e] via-[#1c1b1b]/90 to-transparent" />

        <div className="relative z-10 max-w-2xl space-y-6">
          <span className="font-sans text-xs uppercase tracking-widest text-[#e9c176] block">
            {t('aboutHeroTag')}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#ffb4a8] leading-[1.1]">
            {t('aboutHeroHeadline')}
          </h1>
          <p className="font-sans text-base sm:text-xl text-[#dfbfba] leading-relaxed font-light">
            {t('aboutHeroDesc')}
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              href="/topics"
              onClick={onBrowse}
              className="bg-[#600000] text-white font-sans text-xs uppercase tracking-wider px-8 py-4 rounded-full bloom-burgundy font-semibold hover:bg-[#670502] transition-colors flex items-center gap-2 cursor-pointer"
            >
              {t('heroExploreBtn')} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/topics"
              onClick={onExploreBeginner}
              className="border border-[#e9c176] text-[#e9c176] font-sans text-xs uppercase tracking-wider px-8 py-4 rounded-full hover:bg-[#e9c176]/10 transition-colors font-semibold cursor-pointer"
            >
              {t('heroBeginnerBtn')}
            </Link>
          </div>
        </div>
      </section>

      {/* Pillars of Practice Bento Grid */}
      <section className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#e5e2e1]">{t('pillarsTitle')}</h2>
          <p className="font-sans text-sm sm:text-base text-[#dfbfba]">
            {t('pillarsSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1: Absolute Safety */}
          <div className="p-8 rounded-2xl bg-[#201f1f] border border-white/5 space-y-4 hover:border-[#ffb4a8]/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#600000]/60 border border-[#ffb4a8]/30 flex items-center justify-center text-[#ffb4a8]">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#e5e2e1]">{t('pillarSafety')}</h3>
            <p className="font-sans text-sm text-[#dfbfba] leading-relaxed">
              {t('pillarSafetyDesc')}
            </p>
          </div>

          {/* Pillar 2: Consent as Canvas */}
          <div className="p-8 rounded-2xl bg-[#201f1f] border border-white/5 space-y-4 hover:border-[#ffb4a8]/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#600000]/60 border border-[#ffb4a8]/30 flex items-center justify-center text-[#ffb4a8]">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#e5e2e1]">{t('pillarConsent')}</h3>
            <p className="font-sans text-sm text-[#dfbfba] leading-relaxed">
              {t('pillarConsentDesc')}
            </p>
          </div>

          {/* Pillar 3: Somatic Intelligence */}
          <div className="p-8 rounded-2xl bg-[#201f1f] border border-white/5 space-y-4 hover:border-[#ffb4a8]/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#600000]/60 border border-[#ffb4a8]/30 flex items-center justify-center text-[#ffb4a8]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#e5e2e1]">{t('pillarSomatic')}</h3>
            <p className="font-sans text-sm text-[#dfbfba] leading-relaxed">
              {t('pillarSomaticDesc')}
            </p>
          </div>

          {/* Pillar 4: Elevated Education */}
          <div className="p-8 rounded-2xl bg-[#201f1f] border border-white/5 space-y-4 hover:border-[#ffb4a8]/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#600000]/60 border border-[#ffb4a8]/30 flex items-center justify-center text-[#ffb4a8]">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#e5e2e1]">{t('pillarEducation')}</h3>
            <p className="font-sans text-sm text-[#dfbfba] leading-relaxed">
              {t('pillarEducationDesc')}
            </p>
          </div>

          {/* Pillar 5: Lifelong Curiosity */}
          <div className="p-8 rounded-2xl bg-[#201f1f] border border-white/5 space-y-4 hover:border-[#ffb4a8]/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#600000]/60 border border-[#ffb4a8]/30 flex items-center justify-center text-[#ffb4a8]">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#e5e2e1]">{t('pillarCuriosity')}</h3>
            <p className="font-sans text-sm text-[#dfbfba] leading-relaxed">
              {t('pillarCuriosityDesc')}
            </p>
          </div>

          {/* Pillar 6: Discretion & Sanctuary */}
          <div className="p-8 rounded-2xl bg-[#201f1f] border border-white/5 space-y-4 hover:border-[#ffb4a8]/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#600000]/60 border border-[#ffb4a8]/30 flex items-center justify-center text-[#ffb4a8]">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#e5e2e1]">{t('pillarPrivacy')}</h3>
            <p className="font-sans text-sm text-[#dfbfba] leading-relaxed">
              {t('pillarPrivacyDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="p-8 sm:p-14 rounded-3xl bg-[#600000]/20 border border-[#ffb4a8]/30 space-y-6 text-center max-w-3xl mx-auto">
        <span className="font-sans text-xs uppercase tracking-widest text-[#e9c176]">
          {t('manifestoTitle')}
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl text-[#ffb4a8]">
          {t('manifestoQuote')}
        </h2>
        <p className="font-sans text-sm sm:text-base text-[#dfbfba] leading-relaxed">
          {t('manifestoDesc')}
        </p>
      </section>
    </div>
  );
}
