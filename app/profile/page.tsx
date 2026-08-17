/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import LeftSidebar from '@/components/LeftSidebar';
import MobileBottomNav from '@/components/MobileBottomNav';
import {
  Pencil,
  MoreHorizontal,
  Sparkles,
  Cake,
  Users,
  Award,
  ShieldCheck,
  HeartHandshake,
  MessageSquare,
  Share2,
  Bookmark,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';

const USER_POSTS = [
  {
    id: '1',
    community: 'r/webdev',
    time: '2 days ago',
    votes: '14.2k',
    title: "CSS Subgrid is finally supported across all major browsers! Here's why you should care.",
    content: "It's been a long time coming, but with the latest Safari update, CSS Subgrid is now safe to use in production. This fundamentally changes how we can build complex, aligned layouts without relying on messy workarounds or excessive...",
    tags: ['Discussion', 'CSS'],
    commentsCount: 842,
  },
  {
    id: '2',
    community: 'r/reactjs',
    time: '1 week ago',
    votes: '8.5k',
    title: 'Building a scalable Design System with Tailwind CSS and React Aria',
    content: "Sharing our team's learnings after migrating 50+ components to a unified design system. We achieved better accessibility and reduced bundle size by 30%.",
    tags: ['Showoff', 'React'],
    commentsCount: 312,
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'posts' | 'comments' | 'saved' | 'upvoted'>('posts');

  return (
    <div className="min-h-screen bg-[#f3f4f8] text-slate-900 flex flex-col font-sans pb-20 md:pb-6">
      <Navbar />

      {/* 🎯 نفس الكونتينر الرئيسي الموحد المطابق للـ HomePage تماماً */}
      <div className="flex-1 w-full px-4 lg:px-8 flex gap-6 justify-between items-start">
        <LeftSidebar />

        {/* main يحافظ على العرض والتنسيق المتجاوب */}
        <main className="flex-1 min-w-0 space-y-4 py-4">
          
          {/* Profile Header Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs">
            {/* Banner */}
            <div className="h-32 sm:h-48 w-full bg-gradient-to-r from-indigo-900 via-purple-800 to-slate-900 relative">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"
                alt="Profile Banner"
                className="w-full h-full object-cover opacity-80"
              />
            </div>

            {/* Profile Info */}
            <div className="px-4 sm:px-6 pb-4 relative">
              <div className="flex items-end justify-between -mt-12 sm:-mt-16 mb-4">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"
                    alt="User Avatar"
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white object-cover bg-white shadow-md"
                  />
                </div>

                <div className="flex items-center gap-2 pt-14 sm:pt-0">
                  <button
                    type="button"
                    className="flex items-center gap-1.5 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs sm:text-sm font-semibold rounded-full border border-indigo-200/60 transition"
                  >
                    <Pencil size={15} />
                    <span>Edit Profile</span>
                  </button>
                  <button
                    type="button"
                    aria-label="More Options"
                    className="p-2 hover:bg-slate-100 text-slate-500 rounded-full border border-slate-200 transition hidden sm:flex"
                  >
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </div>

              <div className="space-y-1 mb-4">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Frontend Wizard
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-indigo-600">
                  u/frontend_wizard
                </p>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl pt-1 leading-relaxed">
                  Building the web one component at a time. React, Tailwind, and Design Systems.
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-600 font-medium pt-2 border-t border-slate-100 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <Sparkles size={16} className="text-indigo-600" />
                  <span className="font-bold text-slate-900">25k</span>
                  <span className="text-slate-500">Karma</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Cake size={16} className="text-indigo-600" />
                  <span className="font-bold text-slate-900">3 years ago</span>
                  <span className="text-slate-500">Age</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={16} className="text-indigo-600" />
                  <span className="font-bold text-slate-900">1.2k</span>
                  <span className="text-slate-500">Followers</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-t border-slate-200/80 px-4 sm:px-6 bg-slate-50/50">
              {[
                { id: 'posts', label: 'Posts' },
                { id: 'comments', label: 'Comments' },
                { id: 'saved', label: 'Saved' },
                { id: 'upvoted', label: 'Upvoted' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-3 text-xs sm:text-sm font-semibold transition border-b-2 ${
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

          {/* Grid Content Inside Main (Posts + Widgets) */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* User Feed */}
            <div className="xl:col-span-2 space-y-4">
              {USER_POSTS.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex gap-3 hover:border-slate-300 transition"
                >
                  <div className="flex flex-col items-center bg-slate-50 rounded-xl p-1.5 h-fit text-slate-500 font-bold text-xs">
                    <button type="button" aria-label="Upvote" className="hover:text-indigo-600 transition p-1">
                      <ArrowUp size={16} />
                    </button>
                    <span className="py-1 text-slate-800">{post.votes}</span>
                    <button type="button" aria-label="Downvote" className="hover:text-rose-600 transition p-1">
                      <ArrowDown size={16} />
                    </button>
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-bold text-slate-800">{post.community}</span>
                      <span>•</span>
                      <span>Posted by u/frontend_wizard</span>
                      <span>•</span>
                      <span>{post.time}</span>
                    </div>

                    <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug hover:text-indigo-600 transition cursor-pointer">
                      {post.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {post.content}
                    </p>

                    <div className="flex gap-2 py-1">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-slate-100 text-slate-600 text-[11px] font-semibold px-2.5 py-0.5 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 pt-2 text-xs text-slate-500 font-semibold border-t border-slate-100">
                      <button type="button" className="flex items-center gap-1.5 hover:bg-slate-100 px-2.5 py-1 rounded-lg transition">
                        <MessageSquare size={15} />
                        <span>{post.commentsCount} Comments</span>
                      </button>
                      <button type="button" className="flex items-center gap-1.5 hover:bg-slate-100 px-2.5 py-1 rounded-lg transition">
                        <Share2 size={15} />
                        <span>Share</span>
                      </button>
                      <button type="button" className="flex items-center gap-1.5 hover:bg-slate-100 px-2.5 py-1 rounded-lg transition">
                        <Bookmark size={15} />
                        <span>Save</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Profile Side Widgets */}
            <div className="hidden xl:block space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Trophy Case
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center flex flex-col items-center justify-center">
                    <Award size={22} className="text-indigo-600 mb-1" />
                    <span className="text-[11px] font-bold text-slate-800 leading-tight">3-Year Club</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center flex flex-col items-center justify-center">
                    <ShieldCheck size={22} className="text-indigo-600 mb-1" />
                    <span className="text-[11px] font-bold text-slate-800 leading-tight">Verified</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center flex flex-col items-center justify-center">
                    <HeartHandshake size={22} className="text-indigo-600 mb-1" />
                    <span className="text-[11px] font-bold text-slate-800 leading-tight">Helpful</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Active in these communities
                </h3>
                <div className="space-y-2">
                  {[
                    { name: 'r/webdev', members: '1.8m members' },
                    { name: 'r/reactjs', members: '340k members' },
                  ].map((c) => (
                    <div
                      key={c.name}
                      className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                        r/
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">{c.name}</p>
                        <p className="text-[10px] text-slate-400">{c.members}</p>
                      </div>
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