'use client';

import Link from 'next/link';
import { Search, Bell, MessageSquare, Plus, User } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200/80 px-4 lg:px-8 py-2.5 flex items-center justify-between gap-4">
      
      {/* Brand / Logo */}
      <Link href="/" className="flex items-center gap-2 font-black text-indigo-600 text-lg tracking-tight shrink-0">
        <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xs font-black shadow-xs">
          RC
        </div>
        <span className="hidden sm:inline">RedditClone</span>
      </Link>

      {/* Search Bar */}
      <div className="flex-1 max-w-xl mx-2 sm:mx-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search RedditClone..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100/80 border border-transparent rounded-full text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-indigo-600 transition text-slate-900 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition"
        >
          <Bell size={20} />
        </button>

        {/* Chat / Messages */}
        <button
          type="button"
          aria-label="Chat"
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition hidden sm:flex"
        >
          <MessageSquare size={20} />
        </button>

        {/* 🎯 Create Post Link (Desktop & Tablet) */}
        <Link
          href="/create-post"
          className="flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-3.5 py-1.5 rounded-full text-xs font-semibold transition"
        >
          <Plus size={18} />
          <span className="hidden md:inline">Create</span>
        </Link>

        {/* Profile Avatar */}
        <Link href="/profile">
          <button
            type="button"
            aria-label="User Profile"
            className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-600 overflow-hidden ml-1"
          >
            <User size={18} />
          </button>
        </Link>
      </div>

    </header>
  );
}