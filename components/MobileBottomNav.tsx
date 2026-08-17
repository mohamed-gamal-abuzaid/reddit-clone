'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Plus, MessageSquare, User } from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2 z-40 flex items-center justify-between">
      
      {/* Home Link */}
      <Link
        href="/"
        className={`flex flex-col items-center gap-1 text-[10px] font-medium transition ${
          pathname === '/' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Home size={20} />
        <span>Home</span>
      </Link>

      {/* communities Link */}
      <Link
        href="/communities"
        className={`flex flex-col items-center gap-1 text-[10px] font-medium transition ${
          pathname === '/communities' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Compass size={20} />
        <span>communities</span>
      </Link>

      {/* 🎯 Create Post Button (Center Action) */}
      <Link
        href="/create-post"
        aria-label="Create Post"
        className="w-10 h-10 bg-indigo-600 text-white rounded-xl shadow-md flex items-center justify-center -mt-3 hover:bg-indigo-700 transition"
      >
        <Plus size={22} />
      </Link>

      {/* Chat Link */}
      <Link
        href="/chat"
        className={`flex flex-col items-center gap-1 text-[10px] font-medium transition ${
          pathname === '/chat' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <MessageSquare size={20} />
        <span>Chat</span>
      </Link>

      {/* Profile Link */}
      <Link
        href="/profile"
        className={`flex flex-col items-center gap-1 text-[10px] font-medium transition ${
          pathname === '/profile' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <User size={20} />
        <span>Profile</span>
      </Link>

    </nav>
  );
}