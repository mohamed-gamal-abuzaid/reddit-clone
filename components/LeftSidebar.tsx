'use client';

import { Home, TrendingUp, Users, Settings, ShieldCheck, FileText } from 'lucide-react';
import Link from 'next/link';

export default function LeftSidebar() {
  const navItems = [
    { label: 'Home', icon: Home, active: true },
    { label: 'Popular', icon: TrendingUp },
    { label: 'Communities', icon: Users },
    { label: 'Settings', icon: Settings },
  ];

  return (
    // 🎯 تم زيادة العرض لـ w-64 (أو w-[260px]) وتثبيته بـ sticky top-[65px]
    <aside className="hidden lg:flex w-80 flex-shrink-0 flex-col justify-between h-[calc(100vh-65px)] sticky top-[65px] py-4 overflow-y-auto">
      <div className="space-y-4">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition ${
                  item.active
                    ? 'bg-indigo-100/70 text-indigo-600'
                    : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-full text-xs shadow-sm transition">
          Create Post
        </button>
      </div>

      <div className="text-[11px] text-slate-400 space-y-2 pt-4">
        <Link href="#" className="flex items-center gap-2 hover:underline">
          <ShieldCheck size={14} /> Privacy Policy
        </Link>
        <Link href="#" className="flex items-center gap-2 hover:underline">
          <FileText size={14} /> User Agreement
        </Link>
      </div>
    </aside>
  );
}