'use client';

import { Home, TrendingUp, Users, User, ShieldCheck, FileText, Plus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LeftSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', icon: Home, href: '/' },
    { label: 'Popular', icon: TrendingUp, href: '/popular' },
    { label: 'Communities', icon: Users, href: '/communities' },
    { label: 'Profile', icon: User, href: '/profile' },
  ];

  return (
    <aside className="hidden lg:flex w-80 flex-shrink-0 flex-col justify-between h-[calc(100vh-65px)] sticky top-[65px] py-4 overflow-y-auto">
      <div className="space-y-4">
        {/* Navigation Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-indigo-100/70 text-indigo-600'
                    : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* 🎯 Create Post Link */}
        <Link
          href="/create-post"
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-full text-xs shadow-sm transition"
        >
          <Plus size={16} />
          <span>Create Post</span>
        </Link>
      </div>

      {/* Footer Links */}
      <div className="text-[11px] text-slate-400 space-y-2 pt-4">
        <Link href="/privacy" className="flex items-center gap-2 hover:underline">
          <ShieldCheck size={14} /> Privacy Policy
        </Link>
        <Link href="/terms" className="flex items-center gap-2 hover:underline">
          <FileText size={14} /> User Agreement
        </Link>
      </div>
    </aside>
  );
}