import Navbar from '@/components/Navbar';
import LeftSidebar from '@/components/LeftSidebar';
import RightSidebar from '@/components/RightSidebar';
import FilterBar from '@/components/FilterBar';
import PostCard from '@/components/PostCard';
import MobileBottomNav from '@/components/MobileBottomNav';
import { Plus } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f3f4f8] text-slate-900 flex flex-col font-sans pb-20 md:pb-6">
      <Navbar />

      {/* 🎯 إضافة items-start أساسية لتفعيل الـ Sticky للسايد بارز */}
      <div className="flex-1 w-full px-4 lg:px-8 flex gap-6 justify-between items-start">
        <LeftSidebar />

        <main className="flex-1 min-w-0 space-y-4 py-4">
          <FilterBar />

          <PostCard
            votes="1.2k"
            community="r/webdev"
            time="2h ago"
            title="Just discovered the new CSS View Transitions API and it's mind-blowing"
            content="I've been playing around with the new View Transitions API in Chrome, and the ability to animate between different DOM states without complex JS frameworks..."
            commentsCount={245}
          />

          <PostCard
            votes="4.8k"
            community="r/javascript"
            time="5h ago"
            title="My VSCode setup after 5 years of frontend development"
            imageUrl="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop"
            commentsCount={892}
          />

          <PostCard
            votes="3.1k"
            community="r/reactjs"
            time="1d ago"
            title="React 18 is out! Here's what you need to know about the new features and improvements."
            content="React 18 introduces several new features, including automatic batching, new hooks, and improved server-side rendering. In this post, we'll explore the key changes and how they can benefit your applications."
            commentsCount={512}
          />
          <PostCard
            votes="2.4k"
            community="r/frontend"
            time="3d ago"
            title="The Evolution of Frontend Development: From jQuery to Modern Frameworks"
            content="Frontend development has come a long way since the days of jQuery. In this article, we take a look at the evolution of frontend technologies and how modern frameworks like React, Vue, and Angular have changed the landscape."
            commentsCount={378}
          />
          <PostCard
            votes="5.6k"
            community="r/webdev"
            time="1w ago"
            title="Understanding the New CSS Container Queries: A Game Changer for Responsive Design"
            content="Container Queries are finally here! This article explains how to use CSS Container Queries to create more flexible and responsive designs that adapt to their parent containers."
            commentsCount={1756}
          />

          <PostCard
            votes="1.9k"
            community="r/javascript"
            time="2w ago"
            title="Exploring the New Features in ECMAScript 2023"
            imageUrl="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop"
            content="ECMAScript 2023 brings several exciting new features to JavaScript. In this post, we explore the most notable additions and how they can improve your code."
            commentsCount={642}
          />


        </main>

        <RightSidebar />
      </div>

      <button className="md:hidden fixed bottom-20 right-4 w-12 h-12 bg-indigo-600 text-white rounded-2xl shadow-lg flex items-center justify-center z-40">
        <Plus size={24} />
      </button>

      <MobileBottomNav />
    </div>
  );
}