'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Share2,
  Printer,
  Shield,
  Lightbulb,
  Clock,
  Sparkles,
  Check,
  Save,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  BookOpen,
  History as HistoryIcon,
  Timer
} from 'lucide-react';
import { TopicItem } from '../types/topics';
import { allTopics, getTopicById } from '../data/all-topics';
import { getTopicImage } from '../data/images';
import { getTopicIntroduction, getTopicHistory } from '../data/topic-introductions-history';
import { PracticeTimerModal } from './PracticeTimerModal';
import { useLanguage } from '../context/LanguageContext';

interface TopicDetailProps {
  topic: TopicItem;
  onBack?: () => void;
  onSelectTopic?: (topic: TopicItem) => void;
  onToggleBookmark?: (topicId: number) => void;
  onTogglePracticed?: (topicId: number) => void;
  onMarkRead?: (topicId: number) => void;
  onTriggerDiscretion?: () => void;
  isBookmarked?: boolean;
  isPracticed?: boolean;
  isRead?: boolean;
  userNote?: string;
  onSaveNote?: (topicId: number, note: string) => void;
}

export function TopicDetail({
  topic,
  onBack,
  onSelectTopic,
  onToggleBookmark,
  onTogglePracticed,
  onMarkRead,
  onTriggerDiscretion,
  isBookmarked = false,
  isPracticed = false,
  isRead = false,
  userNote = '',
  onSaveNote
}: TopicDetailProps) {
  const { t, translateTopic, translateCategory, translateDifficulty, currentLanguage } = useLanguage();
  const localizedTopic = translateTopic(topic);

  // Local state
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [noteText, setNoteText] = useState(userNote);
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showTimerModal, setShowTimerModal] = useState(false);

  // Load steps and notes from localStorage
  useEffect(() => {
    try {
      const savedSteps = localStorage.getItem(`topic_${topic.id}_steps`);
      if (savedSteps) {
        setCompletedSteps(JSON.parse(savedSteps));
      }
      const savedNote = localStorage.getItem(`topic_${topic.id}_note`);
      if (savedNote) {
        setNoteText(savedNote);
      }
    } catch {
      // ignore localStorage errors
    }
  }, [topic.id]);

  const handleStepToggle = (index: number) => {
    const updated = completedSteps.includes(index)
      ? completedSteps.filter((i) => i !== index)
      : [...completedSteps, index];
    setCompletedSteps(updated);
    try {
      localStorage.setItem(`topic_${topic.id}_steps`, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleSaveNote = () => {
    try {
      localStorage.setItem(`topic_${topic.id}_note`, noteText);
      onSaveNote?.(topic.id, noteText);
      setNoteSavedFeedback(true);
      setTimeout(() => setNoteSavedFeedback(false), 3000);
    } catch {
      // ignore
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: localizedTopic.title,
          text: localizedTopic.subtitle,
          url: window.location.href
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Find next and previous topics
  const currentIndex = allTopics.findIndex((t) => t.id === topic.id);
  const prevTopic = currentIndex > 0 ? translateTopic(allTopics[currentIndex - 1]) : null;
  const nextTopic = currentIndex < allTopics.length - 1 ? translateTopic(allTopics[currentIndex + 1]) : null;

  // Resolve related topics
  const relatedTopics = (topic.relatedTopicIds || [])
    .map((id) => {
      const found = getTopicById(id);
      return found ? translateTopic(found) : null;
    })
    .filter((t): t is TopicItem => Boolean(t));

  const cat = translateCategory(localizedTopic.categoryId);
  const difficulty = translateDifficulty(localizedTopic.overview?.difficulty || 'Beginner');
  const whyItMatters = localizedTopic.overview?.whyItMatters || localizedTopic.keyTakeaway || localizedTopic.whatItIs;
  const whoItsFor = localizedTopic.overview?.whoItsFor || (currentLanguage === 'hi' ? 'गहरे जुड़ाव और खुले संवाद के इच्छुक जोड़े' : currentLanguage === 'mr' ? 'सखोल जवळीक आणि संवादाची इच्छा असणारे जोडपे' : currentLanguage === 'bn' ? 'গভীর সংযোগ এবং যোগাযোগের প্রত্যাশী দম্পতি' : currentLanguage === 'te' ? 'గాఢమైన సాన్నిహిత్యం మరియు సంభాషణను కోరుకునే భాగస్వాములు' : currentLanguage === 'ta' ? 'ஆழமான நெருக்கத்தையும் உரையாடலையும் விரும்பும் தம்பதிகள்' : 'Couples desiring deeper connection & communication');
  const consentReminder = localizedTopic.overview?.consentReminder || (currentLanguage === 'hi' ? 'हमेशा साथी से बातचीत कर सहमति और आराम का ध्यान रखें।' : currentLanguage === 'mr' ? 'नेहमी जोडीदाराशी संवाद साधून संमती आणि आरामाची खात्री करा.' : currentLanguage === 'bn' ? 'সর্বদা সঙ্গীর সাথে কথা বলে সম্মতি ও আরামের বিষয়টি নিশ্চিত করুন।' : currentLanguage === 'te' ? 'ఎల్లప్పుడూ భాగస్వామితో మాట్లాడి సమ్మతి మరియు సౌకర్యాన్ని నిర్ధారించుకోండి.' : currentLanguage === 'ta' ? 'எப்போதும் துணையுடன் பேசி ஒப்புதலையும் சௌகரியத்தையும் உறுதிப்படுத்திக் கொள்ளுங்கள்.' : 'Always check in with ongoing, enthusiastic verbal cues.');
  const readingTime = localizedTopic.estimatedTime || `6 ${t('minRead')}`;
  const stepsList = localizedTopic.howToDoIt || [];
  const proTips = localizedTopic.tips || [];
  const commonMistakes = localizedTopic.commonMistakes || [];

  const introductionText = localizedTopic.introduction || getTopicIntroduction(topic, currentLanguage);
  const historyText = localizedTopic.history || getTopicHistory(topic, currentLanguage);

  // Get list of topics in same category for left index
  const categoryTopics = allTopics.filter((t) => t.categoryId === topic.categoryId);

  // Smooth scroll helper for section links
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="pt-20 pb-20 max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
      <div className="flex flex-col lg:flex-row gap-6 xl:gap-8 items-start">
        
        {/* Left Web Sidebar: Topic Index & Table of Contents */}
        <aside className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-24 space-y-5">
          {/* Quick Table of Contents */}
          <div className="p-4 rounded-2xl bg-[#1c1b1b]/95 border border-[#ffb4a8]/20 backdrop-blur-md shadow-xl">
            <h3 className="font-serif text-base text-[#ffb4a8] mb-2.5 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#e9c176]" />
              {t('topicSections') || 'Topic Sections'}
            </h3>
            <nav className="space-y-1 text-xs font-sans text-[#cbbab6]">
              <button 
                onClick={() => scrollToSection('sec-intro')} 
                className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#332321] hover:text-[#ffb4a8] transition-colors flex items-center gap-1.5"
              >
                <span className="text-[#e9c176]">01.</span> {t('secIntro') || 'Introduction & Framework'}
              </button>
              <button 
                onClick={() => scrollToSection('sec-history')} 
                className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#332321] hover:text-[#ffb4a8] transition-colors flex items-center gap-1.5"
              >
                <span className="text-[#e9c176]">02.</span> {t('secHistory') || 'Historical Roots & Lineage'}
              </button>
              <button 
                onClick={() => scrollToSection('sec-whatitis')} 
                className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#332321] hover:text-[#ffb4a8] transition-colors flex items-center gap-1.5"
              >
                <span className="text-[#e9c176]">03.</span> {t('secWhatItIs') || 'What It Is & Somatics'}
              </button>
              <button 
                onClick={() => scrollToSection('sec-whyworks')} 
                className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#332321] hover:text-[#ffb4a8] transition-colors flex items-center gap-1.5"
              >
                <span className="text-[#e9c176]">04.</span> {t('secWhyWorks') || 'Why It Works'}
              </button>
              <button 
                onClick={() => scrollToSection('sec-howtodoit')} 
                className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#332321] hover:text-[#ffb4a8] transition-colors flex items-center gap-1.5"
              >
                <span className="text-[#e9c176]">05.</span> {t('secHowToDoIt') || 'Step-by-Step Practice'}
              </button>
              <button 
                onClick={() => scrollToSection('sec-protips')} 
                className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#332321] hover:text-[#ffb4a8] transition-colors flex items-center gap-1.5"
              >
                <span className="text-[#e9c176]">06.</span> {t('secProTips') || 'Pro-Tips & Subtleties'}
              </button>
            </nav>
          </div>

          {/* Category Topics Index */}
          <div className="p-4 rounded-2xl bg-[#1c1b1b]/95 border border-[#482927]/50 backdrop-blur-md shadow-xl max-h-[calc(100vh-22rem)] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/5">
              <h3 className="font-serif text-xs font-semibold uppercase tracking-wider text-[#e9c176]">
                {cat.shortName || cat.title || localizedTopic.categoryName} ({categoryTopics.length})
              </h3>
              <span className="text-[10px] text-[#a08c87] bg-[#2d1c1a] px-2 py-0.5 rounded-full">Guides</span>
            </div>
            <div className="space-y-1">
              {categoryTopics.map((rawT) => {
                const tItem = translateTopic(rawT);
                const isActive = rawT.id === topic.id;
                return (
                  <Link
                    key={rawT.id}
                    href={`/topic/${rawT.slug}`}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-sans transition-all flex items-center justify-between group ${
                      isActive
                        ? 'bg-[#600000]/70 text-[#ffb4a8] font-medium border border-[#ffb4a8]/30 shadow-md'
                        : 'text-[#dfbfba] hover:bg-[#2d1c1a] hover:text-[#fff]'
                    }`}
                  >
                    <span className="truncate pr-2 font-mono text-[11px] opacity-70">#{tItem.id}</span>
                    <span className="truncate flex-1 text-left">{tItem.title}</span>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#ffb4a8] shrink-0" />}
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Center Main Guide Article */}
        <article className="flex-1 min-w-0 max-w-4xl w-full mx-auto">
          {/* Breadcrumb Navigation Bar */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-sans text-[#dfbfba]/70 mb-4 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-[#ffb4a8] transition-colors">{t('navHome')}</Link>
            <span className="opacity-40">/</span>
            <Link href="/topics" className="hover:text-[#ffb4a8] transition-colors">{t('allGuidesCount')}</Link>
            <span className="opacity-40">/</span>
            <span className="text-[#e9c176]">{cat.shortName || cat.title || localizedTopic.categoryName}</span>
            <span className="opacity-40">/</span>
            <span className="text-[#ffb4a8] truncate max-w-[200px] sm:max-w-none">#{localizedTopic.id} {localizedTopic.title}</span>
          </nav>

          {/* Top Breadcrumb & Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/5">
            <Link id="topic-back-btn" href="/topics"
              className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-wider text-[#dfbfba] hover:text-[#ffb4a8] transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
              {t('navBrowse')}
            </Link>

            <div className="flex items-center gap-2">
              {/* Bookmark Button */}
              <button
                onClick={() => { if (onToggleBookmark) onToggleBookmark(topic.id); }}
                className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                  isBookmarked
                    ? 'bg-[#600000] border-[#ffb4a8] text-[#ffb4a8]'
                    : 'bg-[#201f1f] border-white/10 text-[#dfbfba] hover:text-[#ffb4a8]'
                }`}
                title={isBookmarked ? 'Remove Bookmark' : t('saveBookmark')}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>

              {/* Practiced Button */}
              <button
                onClick={() => { if (onTogglePracticed) onTogglePracticed(topic.id); }}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-sans font-medium border transition-all cursor-pointer ${
                  isPracticed
                    ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/40'
                    : 'bg-[#201f1f] text-[#dfbfba] border-white/10 hover:border-[#e9c176]/40 hover:text-[#e9c176]'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {isPracticed ? t('practiced') : t('markPracticed')}
              </button>

              {/* Share */}
              <button
                onClick={handleShare}
                className="p-2.5 rounded-full bg-[#201f1f] border border-white/10 text-[#dfbfba] hover:text-[#ffb4a8] transition-colors cursor-pointer"
                title="Share Guide Link"
              >
                <Share2 className="w-4 h-4" />
              </button>

              {/* Print */}
              <button
                onClick={() => window.print()}
                className="p-2.5 rounded-full bg-[#201f1f] border border-white/10 text-[#dfbfba] hover:text-[#ffb4a8] transition-colors cursor-pointer hidden sm:inline-flex"
                title="Print Guide"
              >
                <Printer className="w-4 h-4" />
              </button>

              {/* Discretion */}
              <button
                onClick={() => { if (onTriggerDiscretion) onTriggerDiscretion(); }}
                className="p-2.5 rounded-full bg-[#201f1f] border border-white/10 text-[#dfbfba] hover:text-[#ffb4a8] transition-colors cursor-pointer"
                title={t('navDiscretion')}
              >
                <Shield className="w-4 h-4 text-[#e9c176]/80" />
              </button>
            </div>
          </div>

          {copiedLink && (
            <div className="mb-6 p-3 rounded-xl bg-[#600000]/60 border border-[#ffb4a8]/40 text-[#ffb4a8] text-xs text-center animate-fade-in">
              {t('shareLinkCopied') || 'Link copied to clipboard!'}
            </div>
          )}

          {/* Header Metadata Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="font-sans text-[11px] uppercase tracking-widest text-[#e9c176] border border-[#e9c176]/30 px-3 py-1 rounded-full bg-[#201f1f]/80">
              {cat.title || localizedTopic.categoryName}
            </span>
            <span className="font-sans text-[11px] uppercase tracking-widest text-[#dfbfba] border border-white/10 px-3 py-1 rounded-full bg-[#201f1f]/80">
              #{localizedTopic.id} / 101
            </span>
            <span className="font-sans text-[11px] uppercase tracking-widest text-[#dfbfba] border border-white/10 px-3 py-1 rounded-full bg-[#201f1f]/80 flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#e9c176]" /> {readingTime}
            </span>
            <span className="font-sans text-[11px] uppercase tracking-widest text-[#ffb3b2] border border-[#ffb3b2]/20 px-3 py-1 rounded-full bg-[#4e1b1d]/40">
              {difficulty}
            </span>
          </div>

          {/* Title & Subtitle */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#ffb4a8] font-normal leading-[1.15] mb-4">
            {localizedTopic.title}
          </h1>
          <p className="font-serif text-lg sm:text-2xl text-[#dfbfba] leading-relaxed mb-8 italic">
            {localizedTopic.subtitle}
          </p>

          {/* Hero Image with Gradient Overlay & Ambient Tint */}
          <div className="relative rounded-2xl overflow-hidden mb-10 h-64 sm:h-96 border border-white/10 bg-[#0e0e0e] shadow-2xl">
            <img
              src={getTopicImage(topic.id, topic.categoryId)}
              alt={localizedTopic.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-70 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/40 to-transparent" />
            <div className="absolute bottom-4 left-6 z-10 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#131313]/80 border border-[#e9c176]/40 text-[#e9c176] text-[10px] font-sans uppercase tracking-widest backdrop-blur-md">
                {cat.title || localizedTopic.categoryName} Masterclass
              </span>
            </div>
          </div>

          {/* Glassmorphic Quick Overview Panel */}
          <div className="glass-panel rounded-2xl p-6 sm:p-10 mb-12 relative overflow-hidden border border-[#e9c176]/20 shadow-2xl">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#600000]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#e9c176]">
                <Sparkles className="w-4 h-4" /> {t('quickOverview') || 'Quick Overview & Key Context'}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-serif text-lg text-[#e5e2e1]">{t('whyItMattersTitle') || 'Why It Matters'}</h3>
                  <p className="font-sans text-sm text-[#dfbfba] leading-relaxed">
                    {whyItMatters}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-serif text-lg text-[#e5e2e1] mb-1">{t('targetAudience') || 'Target Audience & Setting'}</h3>
                    <p className="font-sans text-xs text-[#dfbfba]">{whoItsFor}</p>
                    <p className="font-sans text-xs text-[#e9c176] mt-1">{t('suggestedTime') || 'Suggested Time'}: {localizedTopic.practiceTime || '10-20 min'}</p>
                  </div>

                  {/* Consent Guard */}
                  <div className="p-4 rounded-xl bg-[#201f1f]/80 border border-[#e9c176]/30 flex items-start gap-3">
                    <Shield className="w-5 h-5 text-[#e9c176] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#e9c176]">
                        {t('consentCheckIn') || 'Consent & Emotional Check-In'}
                      </h4>
                      <p className="font-sans text-xs text-[#dfbfba] mt-0.5">
                        {consentReminder}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* "Try This Tonight" Highlight Card with Practice Timer */}
          {localizedTopic.tryThisTonight && (
            <div className="p-6 sm:p-8 rounded-2xl bg-[#2a2a2a]/60 border-l-4 border-l-[#ffb4a8] border border-white/5 bloom-glow mb-12 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-[#ffb4a8]">
                  <Lightbulb className="w-4 h-4 text-[#ffb4a8]" /> {t('tryTonight')}: {localizedTopic.tryThisTonight.title}
                </div>

                <button
                  onClick={() => setShowTimerModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#600000] text-white text-xs font-sans font-semibold bloom-burgundy hover:bg-[#670502] transition-all cursor-pointer"
                >
                  <Timer className="w-3.5 h-3.5 text-[#e9c176]" />
                  {t('practiceTimer')}
                </button>
              </div>

              <p className="font-serif text-lg sm:text-xl text-[#e5e2e1] leading-relaxed">
                "{localizedTopic.tryThisTonight.description}"
              </p>
            </div>
          )}

          {/* Main Narrative Content Sections */}
          <div className="space-y-12 text-[#e5e2e1]">
            {/* Section 1: Introduction & Modern Framework */}
            <section id="sec-intro" className="space-y-4 p-6 sm:p-8 rounded-2xl bg-[#1c1b1b]/90 border border-[#ffb4a8]/20 shadow-xl relative overflow-hidden scroll-mt-28">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#600000]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="p-2.5 rounded-xl bg-[#600000]/40 border border-[#ffb4a8]/30 shrink-0">
                  <BookOpen className="w-5 h-5 text-[#ffb4a8]" />
                </div>
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-widest text-[#e9c176] block">01</span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#ffb4a8]">
                    {t('secIntro') || 'Introduction & Framework'}
                  </h2>
                </div>
              </div>
              <div className="font-sans text-base sm:text-lg text-[#dfbfba] leading-relaxed relative z-10 pt-2">
                <p>{introductionText}</p>
              </div>
            </section>

            {/* Section 2: Historical Roots & Ancient Lineage */}
            <section id="sec-history" className="space-y-4 p-6 sm:p-8 rounded-2xl bg-[#1c1b1b]/90 border border-[#e9c176]/20 shadow-xl relative overflow-hidden scroll-mt-28">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#e9c176]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="p-2.5 rounded-xl bg-[#e9c176]/10 border border-[#e9c176]/30 shrink-0">
                  <HistoryIcon className="w-5 h-5 text-[#e9c176]" />
                </div>
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-widest text-[#ffb4a8] block">02</span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#e9c176]">
                    {t('secHistory') || 'Historical Roots & Lineage'}
                  </h2>
                </div>
              </div>
              <div className="font-sans text-base sm:text-lg text-[#dfbfba] leading-relaxed relative z-10 pt-2">
                <p>{historyText}</p>
              </div>
            </section>

            {/* Section 3: What It Is & Somatics */}
            <section id="sec-whatitis" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#ffb4a8]">
                {t('secWhatItIs') || 'What It Is & Somatics'}
              </h2>
              <div className="font-sans text-base sm:text-lg text-[#dfbfba] leading-relaxed space-y-4">
                <p>{localizedTopic.whatItIs}</p>
                {localizedTopic.keyTakeaway && (
                  <div className="p-5 rounded-xl bg-[#201f1f] border border-white/5 space-y-2">
                    <h3 className="font-serif text-base text-[#e9c176]">{t('somaticPacing') || 'Key Somatic Principle'}</h3>
                    <p className="font-sans text-sm text-[#dfbfba] leading-relaxed">
                      {localizedTopic.keyTakeaway}
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Section 4: Why It Works (The Science) */}
            <section id="sec-whyworks" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#ffb4a8]">
                {t('secWhyWorks') || 'Why It Works'}
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#dfbfba] leading-relaxed">
                {localizedTopic.whyItWorks}
              </p>
            </section>

            {/* Section 5: Step-by-Step Practice Guide with Interactive Checkboxes */}
            {stepsList.length > 0 && (
              <section id="sec-howtodoit" className="space-y-6 scroll-mt-28">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#ffb4a8]">
                    {t('secHowToDoIt') || t('stepByStep')}
                  </h2>
                  <span className="font-sans text-xs text-[#e9c176]">
                    {completedSteps.length} / {stepsList.length}
                  </span>
                </div>

                <div className="space-y-4">
                  {stepsList.map((stepText, idx) => {
                    const isDone = completedSteps.includes(idx);
                    return (
                      <div
                        key={idx}
                        onClick={() => handleStepToggle(idx)}
                        className={`p-5 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                          isDone
                            ? 'bg-[#201f1f]/40 border-emerald-500/40 text-emerald-300'
                            : 'bg-[#201f1f] border-white/5 hover:border-[#ffb4a8]/30'
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isDone ? 'bg-emerald-600 text-white' : 'border border-white/20 text-transparent'
                          }`}
                        >
                          <Check className="w-4 h-4 text-white" />
                        </div>

                        <div className="space-y-1 flex-1">
                          <div className="font-serif text-base text-[#e5e2e1]">
                            #{idx + 1}
                          </div>
                          <p className="font-sans text-sm text-[#dfbfba] leading-relaxed">
                            {stepText}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Section 6: Pro Tips & Micro-Nuances */}
            {proTips.length > 0 && (
              <section id="sec-protips" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl sm:text-3xl text-[#ffb4a8]">
                  {t('secProTips') || 'Pro-Tips & Subtleties'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {proTips.map((tip, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#201f1f] border border-white/5 space-y-1">
                      <div className="flex items-center gap-2 text-xs font-sans font-semibold text-[#e9c176]">
                        <Sparkles className="w-3.5 h-3.5 text-[#e9c176]" /> #{idx + 1}
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-[#dfbfba] leading-relaxed">
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Section 5: Common Mistakes & Pro Fixes */}
            {commonMistakes.length > 0 && (
              <section className="space-y-4">
                <h2 className="font-serif text-2xl sm:text-3xl text-[#ffb4a8]">
                  {t('commonMistakes')}
                </h2>
                <div className="space-y-3">
                  {commonMistakes.map((mistake, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#201f1f] border border-white/5 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-sans font-semibold text-rose-400">
                        <AlertTriangle className="w-3.5 h-3.5" /> {mistake.mistake}
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-[#dfbfba] pl-5 border-l-2 border-emerald-500/50">
                        <strong className="text-emerald-400">Fix:</strong> {mistake.fix}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Section 6: Frequently Asked Questions Accordion */}
            {localizedTopic.faqs && localizedTopic.faqs.length > 0 && (
              <section className="space-y-4">
                <h2 className="font-serif text-2xl sm:text-3xl text-[#ffb4a8]">
                  {t('faq')}
                </h2>
                <div className="space-y-3">
                  {localizedTopic.faqs.map((faq, idx) => {
                    const isOpen = activeFaq === idx;
                    return (
                      <div
                        key={idx}
                        className="rounded-xl bg-[#201f1f] border border-white/5 overflow-hidden transition-colors"
                      >
                        <button
                          onClick={() => setActiveFaq(isOpen ? null : idx)}
                          className="w-full p-4 text-left flex items-center justify-between font-serif text-base text-[#e5e2e1] hover:text-[#ffb4a8] transition-colors cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <HelpCircle className="w-4 h-4 text-[#e9c176] shrink-0" />
                            {faq.question}
                          </span>
                          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                        {isOpen && (
                          <div className="p-4 pt-0 font-sans text-sm text-[#dfbfba] leading-relaxed border-t border-white/5 animate-fade-in">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Section 7: Erotic Wisdom Quote */}
            {localizedTopic.quote && (
              <div className="py-8 px-6 sm:px-10 rounded-2xl bg-[#600000]/20 border border-[#ffb4a8]/20 text-center space-y-2 my-8">
                <p className="font-serif text-lg sm:text-2xl text-[#ffb4a8] italic leading-relaxed">
                  "{localizedTopic.quote.text}"
                </p>
                {localizedTopic.quote.author && (
                  <p className="font-sans text-xs text-[#e9c176] tracking-wider uppercase">
                    — {localizedTopic.quote.author}
                  </p>
                )}
              </div>
            )}

            {/* Section 8: Private Reflection & Partner Notes (Persisted locally) */}
            <section className="p-6 rounded-2xl bg-[#1c1b1b] border border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl text-[#e5e2e1] flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-[#e9c176]" /> {t('personalNotesTitle') || 'Partner Notes & Reflections'}
                </h3>
                <span className="text-[11px] font-sans text-[#dfbfba]/60">Local Storage</span>
              </div>

              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder={t('personalNotesPlaceholder') || 'Record private calibrations, sensations, or touches you both loved...'}
                rows={4}
                className="w-full p-4 rounded-xl bg-[#201f1f] border border-white/10 text-sm font-sans text-[#e5e2e1] placeholder-[#dfbfba]/40 focus:outline-none focus:border-[#ffb4a8] transition-colors"
              />

              <div className="flex items-center justify-between">
                <span className="text-xs font-sans text-emerald-400">
                  {noteSavedFeedback && (t('noteSaved') || '✓ Saved!')}
                </span>
                <button
                  onClick={handleSaveNote}
                  className="px-5 py-2 rounded-full bg-[#600000] text-white text-xs font-sans font-semibold hover:bg-[#670502] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" /> {t('saveNote') || 'Save Note'}
                </button>
              </div>
            </section>

            {/* Related Topics Exploration */}
            {relatedTopics.length > 0 && (
              <section className="space-y-4 pt-8 border-t border-white/5">
                <h3 className="font-serif text-xl sm:text-2xl text-[#e5e2e1]">
                  {t('relatedGuides') || 'Related Guides'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {relatedTopics.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/topic/${rel.slug}`}
                      className="p-4 rounded-xl bg-[#201f1f] border border-white/5 hover:border-[#ffb4a8]/40 hover:-translate-y-1 transition-all cursor-pointer space-y-1 group block"
                    >
                      <span className="font-sans text-[10px] text-[#e9c176] uppercase tracking-wider">
                        #{rel.id}
                      </span>
                      <h4 className="font-serif text-base text-[#e5e2e1] group-hover:text-[#ffb4a8] transition-colors">
                        {rel.title}
                      </h4>
                      <p className="font-sans text-xs text-[#dfbfba] line-clamp-2">
                        {rel.subtitle}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Previous & Next Navigation */}
            <div className="flex items-center justify-between pt-8 border-t border-white/5 gap-4">
              {prevTopic ? (
                <Link href={`/topic/${prevTopic.slug}`}
                  className="p-4 rounded-xl bg-[#201f1f] border border-white/5 hover:border-[#ffb4a8]/30 transition-all text-left group flex items-center gap-3 cursor-pointer max-w-[45%]"
                >
                  <ArrowLeft className="w-5 h-5 text-[#dfbfba] group-hover:-translate-x-1 transition-transform" />
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-sans uppercase text-[#dfbfba]/60 block">{t('prevGuide') || 'Previous'}</span>
                    <span className="font-serif text-sm text-[#e5e2e1] group-hover:text-[#ffb4a8] truncate block">
                      #{prevTopic.id} {prevTopic.title}
                    </span>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextTopic && (
                <Link href={`/topic/${nextTopic.slug}`}
                  className="p-4 rounded-xl bg-[#201f1f] border border-white/5 hover:border-[#ffb4a8]/30 transition-all text-right group flex items-center gap-3 cursor-pointer max-w-[45%] ml-auto"
                >
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-sans uppercase text-[#dfbfba]/60 block">{t('nextGuide') || 'Next'}</span>
                    <span className="font-serif text-sm text-[#e5e2e1] group-hover:text-[#ffb4a8] truncate block">
                      #{nextTopic.id} {nextTopic.title}
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#dfbfba] group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          </div>
        </article>

        {/* Right Web Sidebar: Ad / Sponsor Blank Placeholder Space */}
        <aside className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-24 space-y-5">
          {/* Main Ad Card Placeholder */}
          <div className="p-6 rounded-2xl bg-[#1c1b1b]/95 border border-[#ffb4a8]/20 backdrop-blur-md flex flex-col items-center justify-center text-center min-h-[350px] relative overflow-hidden group shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-b from-[#600000]/15 via-transparent to-[#e9c176]/10 opacity-70 pointer-events-none" />
            
            <span className="text-[10px] font-sans uppercase tracking-widest text-[#a08c87] mb-4 bg-[#2a1a18] px-3 py-1 rounded-full border border-[#482927]/60 relative z-10">
              Advertisement Space
            </span>
            
            <div className="w-16 h-16 rounded-2xl bg-[#2a1715] border border-[#ffb4a8]/30 flex items-center justify-center mb-4 text-[#ffb4a8] relative z-10 shadow-inner group-hover:scale-105 transition-transform">
              <span className="font-serif text-2xl">✨</span>
            </div>
            
            <h4 className="font-serif text-base text-[#e5e2e1] mb-2 relative z-10">
              Partner Banner Space
            </h4>
            
            <p className="text-xs text-[#a08c87] font-sans leading-relaxed mb-6 relative z-10 px-2">
              Blank placement reserved for conscious sexuality workshops, ethical luxury oils &amp; intimacy education.
            </p>

            <div className="w-full border-t border-[#3d2422] pt-4 relative z-10">
              <span className="text-[11px] text-[#e9c176] hover:underline cursor-pointer font-sans block">
                Inquire for Sponsorship &amp; Ads
              </span>
            </div>
          </div>

          {/* Secondary Compact Ad Unit Placeholder */}
          <div className="p-4 rounded-2xl bg-[#181616]/95 border border-[#2d1c1a] text-center min-h-[160px] flex flex-col items-center justify-center space-y-2 shadow-lg">
            <span className="text-[9px] uppercase tracking-wider text-[#7e6b66]">Reserved Ad Unit</span>
            <div className="w-full h-24 rounded-xl bg-[#231514] border border-dashed border-[#482927] flex items-center justify-center text-xs text-[#a08c87]">
              300 × 250 Banner Slot
            </div>
          </div>
        </aside>

      </div>

      {/* Guided Practice Timer Modal */}
      {showTimerModal && (
        <PracticeTimerModal
          topicTitle={localizedTopic.title}
          suggestedDuration={localizedTopic.practiceTime || '10 minutes'}
          onClose={() => setShowTimerModal(false)}
        />
      )}
    </div>
  );
}
