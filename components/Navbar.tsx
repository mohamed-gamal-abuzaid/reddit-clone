'use client';

import { Search, Plus, MessageSquare, Bell } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200/80 px-4 md:px-8 py-2.5 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="text-xl font-black text-indigo-600 tracking-tight">
        RedditClone
      </Link>

      {/* Desktop Search Bar */}
      <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
        <input
          type="text"
          placeholder="Search RedditClone..."
          className="w-full pl-10 pr-4 py-2 text-xs bg-slate-100/80 hover:bg-slate-100 focus:bg-white rounded-full border border-transparent focus:border-indigo-500 focus:outline-none transition placeholder:text-slate-400 text-slate-800"
        />
      </div>

      {/* Actions (Desktop & Mobile) */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Mobile Search Icon */}
        <button className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-full">
          <Search size={20} />
        </button>

        {/* Desktop Only Actions */}
        <div className="hidden md:flex items-center gap-2">
          <button className="p-1.5 hover:bg-slate-100 rounded-full text-slate-700 transition">
            <Plus size={19} />
          </button>
          <button className="p-1.5 hover:bg-slate-100 rounded-full text-slate-700 transition">
            <MessageSquare size={18} />
          </button>
          <button className="p-1.5 hover:bg-slate-100 rounded-full text-slate-700 transition relative">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-600 rounded-full" />
          </button>
        </div>

        {/* User Avatar */}
        <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 overflow-hidden flex items-center justify-center font-bold text-xs text-slate-600">
          U
        </div>
      </div>
    </header>
  );
}