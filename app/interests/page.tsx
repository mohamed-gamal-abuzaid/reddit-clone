'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Terminal,
  TrendingUp,
  Palette,
  Gamepad2,
  FlaskConical,
  Briefcase,
  Coins,
  Brain,
  Newspaper,
  Film,
  Music,
  Trophy,
  Plane,
  Utensils,
  Search,
  Check,
  ArrowRight,
} from 'lucide-react';

interface InterestTopic {
  id: string;
  label: string;
  icon: React.ElementType;
}

const TOPICS: InterestTopic[] = [
  { id: 'tech', label: 'Technology', icon: Terminal },
  { id: 'finance', label: 'Finance', icon: TrendingUp },
  { id: 'design', label: 'Design', icon: Palette },
  { id: 'gaming', label: 'Gaming', icon: Gamepad2 },
  { id: 'science', label: 'Science', icon: FlaskConical },
  { id: 'startups', label: 'Startups', icon: Briefcase },
  { id: 'crypto', label: 'Crypto', icon: Coins },
  { id: 'ai', label: 'AI & ML', icon: Brain },
  { id: 'news', label: 'News', icon: Newspaper },
  { id: 'movies', label: 'Movies & TV', icon: Film },
  { id: 'music', label: 'Music', icon: Music },
  { id: 'sports', label: 'Sports', icon: Trophy },
  { id: 'travel', label: 'Travel', icon: Plane },
  { id: 'food', label: 'Food & Dining', icon: Utensils },
];

export default function InterestsPage() {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>(['tech', 'design']);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleInterest = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredTopics = TOPICS.filter((topic) =>
    topic.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContinue = () => {
    // يمكن هنا حفظ الاهتمامات عبر API ثم التوجيه للصفحة الرئيسية
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between font-sans pb-24 md:pb-0">
      {/* Top Navigation Header */}
      <header className="w-full border-b border-slate-100 px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-black text-indigo-600 text-lg tracking-tight">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs">
            RC
          </div>
          Reddit Clone
        </div>

        {/* Step Indicator (Desktop) */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 font-medium">Step 2 of 3</span>
          <div className="flex items-center gap-1">
            <div className="w-5 h-1 rounded-full bg-indigo-600" />
            <div className="w-5 h-1 rounded-full bg-indigo-600" />
            <div className="w-5 h-1 rounded-full bg-slate-200" />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl w-full mx-auto px-4 py-8 flex-1 flex flex-col justify-center">
        {/* Title & Subtitle */}
        <div className="text-center space-y-2 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Tailor your experience
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Select topics of interest to customize your feed and community discovery. You can always change these later.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md w-full mx-auto mb-8">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search communities or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-indigo-600 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
          />
        </div>

        {/* Interests Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {filteredTopics.map((topic) => {
            const Icon = topic.icon;
            const isSelected = selectedIds.includes(topic.id);

            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => toggleInterest(topic.id)}
                className={`relative flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-200 text-center group cursor-pointer ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/20 shadow-sm'
                    : 'border-slate-100 bg-slate-50/60 hover:bg-slate-100/80 hover:border-slate-200'
                }`}
              >
                {/* Selected Check Badge */}
                {isSelected && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                    <Check size={12} strokeWidth={3} />
                  </div>
                )}

                {/* Topic Icon Container */}
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center mb-3 transition-colors ${
                    isSelected ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600 group-hover:bg-white'
                  }`}
                >
                  <Icon size={20} />
                </div>

                {/* Topic Label */}
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  {topic.label}
                </span>
              </button>
            );
          })}
        </div>
      </main>

      {/* Footer Navigation Bar (Desktop & Floating Mobile) */}
      <footer className="fixed bottom-0 left-0 right-0 md:relative bg-white border-t border-slate-200/80 px-4 sm:px-8 py-4 z-20">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={handleContinue}
            className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800 transition"
          >
            Skip for now
          </button>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-xs text-slate-500 font-medium">
              {selectedIds.length} selected
            </span>
            <button
              type="button"
              onClick={handleContinue}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-xl shadow-sm transition flex items-center gap-2"
            >
              Continue <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}