'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import LeftSidebar from '@/components/LeftSidebar';
import MobileBottomNav from '@/components/MobileBottomNav';
import Link from 'next/link';
import {
  Search,
  ArrowUp,
  ArrowDown,
  Minus,
  MessageSquare,
  Share2,
  Cpu,
  Palette,
  Code2,
} from 'lucide-react';

const RECOMMENDED = [
  {
    slug: 'technology',
    name: 'r/technology',
    members: '14.5M members',
    desc: 'News and discussions about tech, hardware, and innovation.',
    icon: Cpu,
  },
  {
    slug: 'softwareengineering',
    name: 'r/softwareengineering',
    members: '245k members',
    desc: 'Professional discussions on software architecture and design.',
    icon: Code2,
  },
  {
    slug: 'UIUX',
    name: 'r/UIUX',
    members: '1.2M members',
    desc: 'User experience design, UI trends, and portfolio critiques.',
    icon: Palette,
  },
];

const TRENDING_POSTS = [
  {
    id: '1',
    slug: 'technology',
    communityName: 'r/technology',
    author: 'u/tech_insider',
    time: '4h ago',
    title: 'New breakthrough in solid-state batteries could double EV range',
    content: 'Researchers at a major university have published a paper detailing a novel approach to battery chemistry...',
    votes: '14.2k',
    comments: '842',
  },
  {
    id: '2',
    slug: 'UIUX',
    communityName: 'r/UIUX',
    author: 'u/design_mind',
    time: '7h ago',
    title: 'The resurgence of Brutalism and Glassmorphism in modern apps',
    content: 'Exploring how contemporary product designers are balancing aesthetics and usability in 2026.',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop',
    votes: '5.8k',
    comments: '215',
  },
];

export default function ExploreCommunitiesPage() {
  const [joined, setJoined] = useState<Record<string, boolean>>({
    technology: true,
  });

  const toggleJoin = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setJoined((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  return (
    <div className="min-h-screen bg-[#f3f4f8] text-slate-900 flex flex-col font-sans pb-20 md:pb-6">
      <Navbar />

      <div className="flex-1 w-full px-4 lg:px-8 flex gap-6 justify-between items-start">
        <LeftSidebar />

        <main className="flex-1 min-w-0 space-y-6 py-4">
          
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Explore Communities
          </h1>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search communities"
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-indigo-600 shadow-2xs transition"
            />
          </div>

          {/* Recommended Communities Cards */}
          <section className="space-y-3">
            <h2 className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">
              Recommended for You
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {RECOMMENDED.map((item) => {
                const Icon = item.icon;
                const isJoined = joined[item.slug];

                return (
                  <Link
                    key={item.slug}
                    href={`/r/${item.slug}`}
                    className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs hover:border-indigo-300 transition flex flex-col justify-between space-y-3 group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                        <Icon size={20} />
                      </div>
                      <button
                        type="button"
                        onClick={(e) => toggleJoin(item.slug, e)}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                          isJoined
                            ? 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-300'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                        }`}
                      >
                        {isJoined ? 'Joined' : 'Join'}
                      </button>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition">
                        {item.name}
                      </h3>
                      <p className="text-[11px] font-semibold text-slate-400">{item.members}</p>
                      <p className="text-xs text-slate-500 line-clamp-2 pt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Feed & Rankings Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* Trending Feed */}
            <div className="xl:col-span-2 space-y-4">
              <h2 className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">
                Posts from Communities You Might Like
              </h2>

              {TRENDING_POSTS.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex gap-3 hover:border-slate-300 transition"
                >
                  <div className="flex flex-col items-center bg-slate-50 rounded-xl p-1.5 h-fit text-slate-500 font-bold text-xs">
                    <button type="button" aria-label="Upvote" className="hover:text-indigo-600 p-1">
                      <ArrowUp size={16} />
                    </button>
                    <span className="py-1 text-slate-800">{post.votes}</span>
                    <button type="button" aria-label="Downvote" className="hover:text-rose-600 p-1">
                      <ArrowDown size={16} />
                    </button>
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Link href={`/r/${post.slug}`} className="font-bold text-slate-800 hover:text-indigo-600 transition">
                        {post.communityName}
                      </Link>
                      <span>•</span>
                      <span>Posted by {post.author}</span>
                      <span>•</span>
                      <span>{post.time}</span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug hover:text-indigo-600 transition cursor-pointer">
                      {post.title}
                    </h3>

                    {post.imageUrl && (
                      <div className="rounded-xl overflow-hidden my-2 max-h-72">
                        <img src={post.imageUrl} alt="Post content" className="w-full h-full object-cover" />
                      </div>
                    )}

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {post.content}
                    </p>

                    <div className="flex items-center gap-4 pt-2 text-xs text-slate-500 font-semibold border-t border-slate-100">
                      <button type="button" className="flex items-center gap-1.5 hover:bg-slate-100 px-2.5 py-1 rounded-lg">
                        <MessageSquare size={15} />
                        <span>{post.comments} Comments</span>
                      </button>
                      <button type="button" className="flex items-center gap-1.5 hover:bg-slate-100 px-2.5 py-1 rounded-lg">
                        <Share2 size={15} />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Top Communities Widget */}
            <div className="hidden xl:block space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs space-y-4">
                <div>
                  <h3 className="text-xs font-bold text-slate-900">Top Communities</h3>
                  <p className="text-[10px] text-slate-400 font-medium">Based on global activity</p>
                </div>

                <div className="space-y-3">
                  {[
                    { rank: 1, slug: 'technology', name: 'r/technology', members: '15.2M members', trend: 'up' },
                    { rank: 2, slug: 'UIUX', name: 'r/UIUX', members: '1.2M members', trend: 'same' },
                    { rank: 3, slug: 'softwareengineering', name: 'r/softwareengineering', members: '245k members', trend: 'down' },
                  ].map((item) => (
                    <div key={item.rank} className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400 w-3">{item.rank}</span>
                        {item.trend === 'up' && <ArrowUp size={12} className="text-emerald-500" />}
                        {item.trend === 'same' && <Minus size={12} className="text-slate-400" />}
                        {item.trend === 'down' && <ArrowDown size={12} className="text-rose-500" />}
                        <div>
                          <Link href={`/r/${item.slug}`} className="text-xs font-bold text-slate-800 hover:text-indigo-600 transition block">
                            {item.name}
                          </Link>
                          <span className="text-[10px] text-slate-400 block">{item.members}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => toggleJoin(item.slug, e)}
                        className="px-3 py-1 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-full text-xs font-semibold transition"
                      >
                        {joined[item.slug] ? 'Joined' : 'Join'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
}