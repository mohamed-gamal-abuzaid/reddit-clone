/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import LeftSidebar from '@/components/LeftSidebar';
import MobileBottomNav from '@/components/MobileBottomNav';
import Link from 'next/link';
import {
  Info,
  Calendar,
  Plus,
  ArrowUp,
  ArrowDown,
  MessageSquare,
  Share2,
  Cpu,
} from 'lucide-react';

const DUMMY_POSTS = [
  {
    id: '1',
    author: 'u/tech_enthusiast',
    time: '4 hours ago',
    votes: '14.2k',
    title: 'New Breakthrough in Solid-State Battery Technology Promises 1000-Mile EV Range',
    content: 'Researchers at a leading institute have published findings on a new solid electrolyte material that significantly reduces dendrite formation...',
    tags: ['Energy', 'Innovation'],
    commentsCount: '1.2k',
  },
  {
    id: '2',
    author: 'u/silicon_insider',
    time: '7 hours ago',
    votes: '8.5k',
    title: 'Major Tech Firm Announces Pivot to Open-Source AI Frameworks',
    content: 'In a surprising move today, one of the leading tech giants announced that it will be open-sourcing its internal AI development frameworks...',
    tags: ['AI', 'Open Source'],
    commentsCount: '843',
  },
];

export default function SingleCommunityPage() {
  const params = useParams();
  const communitySlug = (params?.slug as string) || 'technology';
  const [isJoined, setIsJoined] = useState(false);
  const [activeTab, setActiveTab] = useState<'posts' | 'wiki' | 'faq'>('posts');

  return (
    <div className="min-h-screen bg-[#f3f4f8] text-slate-900 flex flex-col font-sans pb-20 md:pb-6">
      <Navbar />

      <div className="flex-1 w-full px-4 lg:px-8 flex gap-6 justify-between items-start">
        <LeftSidebar />

        <main className="flex-1 min-w-0 space-y-4 py-4">
          
          {/* Header Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs">
            <div className="h-32 sm:h-44 w-full bg-slate-800 relative">
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
                alt="Banner"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="px-4 sm:px-6 pb-4 relative">
              <div className="flex items-end justify-between -mt-10 sm:-mt-12 mb-3">
                <div className="flex items-end gap-3 sm:gap-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-md overflow-hidden shrink-0">
                    <Cpu size={40} />
                  </div>
                  <div className="pb-1">
                    <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                      r/{communitySlug}
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">
                      Welcome to r/{communitySlug} community!
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsJoined(!isJoined)}
                  className={`px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition ${
                    isJoined
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                  }`}
                >
                  {isJoined ? 'Joined' : 'Join'}
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-t border-slate-200/80 px-4 sm:px-6 bg-slate-50/50">
              {[
                { id: 'posts', label: 'Posts' },
                { id: 'wiki', label: 'Wiki' },
                { id: 'faq', label: 'FAQ' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-5 py-3 text-xs sm:text-sm font-semibold transition border-b-2 ${
                    activeTab === tab.id
                      ? 'border-indigo-600 text-indigo-600 bg-white'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Feed & Sidebar */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-4">
              {DUMMY_POSTS.map((post) => (
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
                      <span>Posted by <strong className="text-slate-700">{post.author}</strong></span>
                      <span>•</span>
                      <span>{post.time}</span>
                    </div>

                    <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug hover:text-indigo-600 cursor-pointer">
                      {post.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {post.content}
                    </p>

                    <div className="flex items-center gap-4 pt-2 text-xs text-slate-500 font-semibold border-t border-slate-100">
                      <button type="button" className="flex items-center gap-1.5 hover:bg-slate-100 px-2.5 py-1 rounded-lg">
                        <MessageSquare size={15} />
                        <span>{post.commentsCount} Comments</span>
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

            <div className="hidden xl:block space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Info size={16} className="text-indigo-600" />
                  <span>About Community</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Official community hub for r/{communitySlug}. Discussions, updates, and news.
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <Calendar size={14} />
                  <span>Created Jan 25, 2021</span>
                </div>
                <Link
                  href="/create-post"
                  className="w-full flex items-center justify-center gap-2 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold py-2 rounded-full text-xs transition"
                >
                  <Plus size={15} />
                  <span>Create Post</span>
                </Link>
              </div>
            </div>
          </div>

        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
}