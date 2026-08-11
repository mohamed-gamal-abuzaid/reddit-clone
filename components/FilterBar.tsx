'use client';

import { useState } from 'react';
import { Flame, Sparkles, BarChart2, TrendingUp } from 'lucide-react';

export default function FilterBar() {
  const [activeTab, setActiveTab] = useState('Hot');

  const tabs = [
    { id: 'Hot', label: 'Hot', icon: Flame },
    { id: 'New', label: 'New', icon: Sparkles },
    { id: 'Top', label: 'Top', icon: BarChart2 },
    { id: 'Rising', label: 'Rising', icon: TrendingUp },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition ${
              isActive
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-200/70 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Icon size={15} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}