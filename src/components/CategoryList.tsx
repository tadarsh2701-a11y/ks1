'use client';

import React from 'react';
import {
  MessageSquareHeart,
  UserCheck,
  Flame,
  Sparkles,
  Compass,
  ShieldCheck,
  Infinity as InfinityIcon,
  ChevronRight
} from 'lucide-react';
import { categories } from '../data/categories';
import { allTopics } from '../data/all-topics';
import { useLanguage } from '../context/LanguageContext';

interface CategoryListProps {
  onSelectCategory: (categoryId: string) => void;
  readTopicIds: number[];
}

export function CategoryList({ onSelectCategory, readTopicIds }: CategoryListProps) {
  const { t, translateCategory } = useLanguage();

  const getCategoryIcon = (iconName: string) => {
    const props = { className: 'w-6 h-6' };
    switch (iconName) {
      case 'MessageSquareHeart':
        return <MessageSquareHeart {...props} className="w-6 h-6 text-[#ffb4a8]" />;
      case 'UserCheck':
        return <UserCheck {...props} className="w-6 h-6 text-[#e9c176]" />;
      case 'Flame':
        return <Flame {...props} className="w-6 h-6 text-[#ffb3b2]" />;
      case 'Sparkles':
        return <Sparkles {...props} className="w-6 h-6 text-[#e9c176]" />;
      case 'Compass':
        return <Compass {...props} className="w-6 h-6 text-[#ffb4a8]" />;
      case 'ShieldCheck':
        return <ShieldCheck {...props} className="w-6 h-6 text-[#dfbfba]" />;
      case 'Infinity':
        return <InfinityIcon {...props} className="w-6 h-6 text-[#e9c176]" />;
      default:
        return <Sparkles {...props} className="w-6 h-6 text-[#ffb4a8]" />;
    }
  };

  return (
    <div id="category-grid-container" className="space-y-6 mb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#e5e2e1] font-serif">{t('categoriesIndex') || 'Browse Knowledge Categories'}</h2>
          <p className="text-sm text-[#dfbfba]">{t('pathwaysSubtitle') || '8 comprehensive modules spanning communication, anatomy, foreplay, techniques, and aftercare'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => {
          const catTrans = translateCategory(category.id);
          const categoryTopics = allTopics.filter((t) => t.categoryId === category.id);
          const readCount = categoryTopics.filter((t) => readTopicIds.includes(t.id)).length;
          const percent = Math.round((readCount / category.topicCount) * 100);

          return (
            <div
              key={category.id}
              id={`cat-card-${category.id}`}
              onClick={() => onSelectCategory(category.id)}
              className="group relative flex flex-col justify-between p-5 rounded-2xl bg-[#201f1f] border border-white/5 hover:border-[#ffb4a8]/40 shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-[#600000]/60 border border-[#ffb4a8]/30">
                    {getCategoryIcon(category.icon)}
                  </div>
                  <span className="text-xs font-mono font-bold text-[#dfbfba]/60">
                    #{category.id}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#e5e2e1] group-hover:text-[#ffb4a8] transition-colors mb-1.5 leading-snug font-serif">
                  {catTrans.title || category.title}
                </h3>
                <p className="text-xs text-[#dfbfba] line-clamp-2 leading-relaxed mb-4">
                  {catTrans.description || category.description}
                </p>
              </div>

              <div>
                {/* Progress bar */}
                <div className="flex items-center justify-between text-[11px] text-[#dfbfba]/70 mb-1.5 font-sans">
                  <span>{category.topicCount} {t('guidesFound')}</span>
                  <span className="font-semibold">{readCount}/{category.topicCount} {t('practiced')}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#131313] overflow-hidden mb-3">
                  <div
                    className="h-full bg-[#ffb4a8] rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <div className="flex items-center justify-end text-xs font-semibold text-[#ffb4a8] group-hover:translate-x-0.5 transition-transform">
                  {t('navBrowse')} <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
