'use client';

import { ArrowUp, ArrowDown, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';

interface PostCardProps {
  votes: string;
  community: string;
  author?: string;
  time: string;
  title: string;
  content?: string;
  imageUrl?: string;
  commentsCount: number;
}

export default function PostCard({
  votes,
  community,
  time,
  title,
  content,
  imageUrl,
  commentsCount,
}: PostCardProps) {
  return (
    <article className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-3 shadow-xs">
      {/* Post Header */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px]">
            {community.charAt(2).toUpperCase()}
          </div>
          <span className="font-bold text-slate-900 hover:underline cursor-pointer">
            {community}
          </span>
          <span>•</span>
          <span>{time}</span>
        </div>
        <button className="text-slate-400 hover:text-slate-600">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Title */}
      <h2 className="text-sm md:text-base font-bold text-slate-900 leading-snug hover:text-indigo-600 cursor-pointer transition">
        {title}
      </h2>

      {/* Content Text if available */}
      {content && (
        <p className="text-xs md:text-sm text-slate-600 leading-relaxed line-clamp-3">
          {content}
        </p>
      )}

      {/* Content Image if available */}
      {imageUrl && (
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Post Actions Footer (Voting Pill + Comments + Share) */}
      <div className="flex items-center justify-between pt-1 text-xs text-slate-600 font-semibold">
        {/* Voting Pill Button */}
        <div className="flex items-center gap-2 bg-slate-100 rounded-full px-3 py-1.5 text-slate-700">
          <button className="hover:text-indigo-600 transition">
            <ArrowUp size={16} />
          </button>
          <span>{votes}</span>
          <button className="hover:text-red-500 transition">
            <ArrowDown size={16} />
          </button>
        </div>

        {/* Comments Button */}
        <button className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/70 px-3 py-1.5 rounded-full transition">
          <MessageCircle size={15} />
          <span>{commentsCount} Comments</span>
        </button>

        {/* Share Button */}
        <button className="p-2 bg-slate-100 hover:bg-slate-200/70 rounded-full transition">
          <Share2 size={15} />
        </button>
      </div>
    </article>
  );
}