'use client';

import { Home, TrendingUp, Users, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export default function MobileBottomNav() {
  const [activeTab, setActiveTab] = useState('Home');

  const navItems = [
    { id: 'Home', label: 'Home', icon: Home },
    { id: 'Popular', label: 'Popular', icon: TrendingUp },
    { id: 'Communities', label: 'Communities', icon: Users },
    { id: 'Chat', label: 'Chat', icon: MessageSquare, badge: true },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-2 flex justify-between items-center z-50 shadow-lg">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className="flex flex-col items-center gap-1 relative"
          >
            <div
              className={`p-1.5 rounded-full transition ${
                isActive ? 'bg-indigo-100 text-indigo-600' : 'text-slate-500'
              }`}
            >
              <Icon size={20} />
              {item.badge && (
                <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full border border-white" />
              )}
            </div>
            <span
              className={`text-[10px] font-medium ${
                isActive ? 'text-indigo-600 font-bold' : 'text-slate-500'
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}