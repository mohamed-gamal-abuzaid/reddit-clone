'use client';

import Link from 'next/link';

export default function RightSidebar() {
  const communities = [
    { name: 'r/java', members: '250k members', joined: false },
    { name: 'r/springboot', members: '120k members', joined: false },
    { name: 'r/webdev', members: '1.5m members', joined: true },
    { name: 'r/javascript', members: '2.3m members', joined: false },
    { name: 'r/reactjs', members: '1.8m members', joined: true },
    { name: 'r/typescript', members: '900k members', joined: false },
    { name: 'r/node', members: '600k members', joined: false },
  ];

  const topics = ['#TechLayoffs', '#AI', '#React19', '#SystemDesign', '#NextJS', '#TypeScript', '#JavaScript', '#WebDev', '#Frontend', '#Backend'];

  return (
    // 🎯 تم زيادة العرض لـ w-80 (320px) وتثبيته بـ sticky top-[65px]
    <aside className="hidden xl:flex w-90 flex-shrink-0 flex-col space-y-4 h-[calc(100vh-65px)] sticky top-[65px] py-4 overflow-y-auto">
      {/* Popular Communities */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 space-y-3 shadow-xs">
        <h3 className="font-bold text-slate-900 text-xs">Popular Communities</h3>
        <div className="space-y-3">
          {communities.map((comm) => (
            <div key={comm.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs">
                  {comm.name.charAt(2).toUpperCase()}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 hover:underline cursor-pointer">
                    {comm.name}
                  </div>
                  <div className="text-[10px] text-slate-400">{comm.members}</div>
                </div>
              </div>
              <button
                className={`text-xs px-3.5 py-1 rounded-full font-semibold transition ${
                  comm.joined
                    ? 'bg-slate-200/80 text-slate-700 hover:bg-slate-300'
                    : 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                {comm.joined ? 'Joined' : 'Join'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Topics */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 space-y-3 shadow-xs">
        <h3 className="font-bold text-slate-900 text-xs">Trending Topics</h3>
        <div className="flex flex-wrap gap-1.5">
          {topics.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-slate-100 hover:bg-slate-200/80 text-slate-700 px-2.5 py-1 rounded-lg cursor-pointer transition font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Legal */}
      <div className="text-[11px] text-slate-400 space-y-2 px-1 pt-1">
        <div className="flex flex-wrap gap-x-2.5 gap-y-1">
          <Link href="#" className="hover:underline">User Agreement</Link>
          <Link href="#" className="hover:underline">Privacy Policy</Link>
          <Link href="#" className="hover:underline">Content Policy</Link>
        </div>
        <div className="text-[10px]">RedditClone Inc © 2026. All rights reserved.</div>
      </div>
    </aside>
  );
}