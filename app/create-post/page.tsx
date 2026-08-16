/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Image as ImageIcon,
  Link2,
  Bold,
  Italic,
  Link as LinkIcon,
  Code,
  Heading1,
  List,
  ListOrdered,
  ChevronDown,
  Search,
  X,
  Plus,
  ShieldAlert,
  Sparkles,
  Upload,
} from 'lucide-react';

// قائمة المجتمعات التجريبية
const COMMUNITIES = [
  { id: 'r/reactjs', name: 'r/reactjs', members: '340k members' },
  { id: 'r/nextjs', name: 'r/nextjs', members: '180k members' },
  { id: 'r/tailwindcss', name: 'r/tailwindcss', members: '95k members' },
  { id: 'r/webdev', name: 'r/webdev', members: '1.2m members' },
];

export default function CreatePostPage() {
  const router = useRouter();

  // الحالة (States)
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [communitySearch, setCommunitySearch] = useState('');

  const [activeTab, setActiveTab] = useState<'post' | 'media' | 'link'>('post');
  const [title, setTitle] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  
  // Tag States
  const [isOC, setIsOC] = useState(false);
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [isNSFW, setIsNSFW] = useState(false);
  const [flair, setFlair] = useState<string | null>(null);

  const [isPreview, setIsPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  const filteredCommunities = COMMUNITIES.filter((c) =>
    c.name.toLowerCase().includes(communitySearch.toLowerCase())
  );

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    // إرسال البيانات للـ API
    console.log({
      community: selectedCommunity,
      type: activeTab,
      title,
      bodyText,
      linkUrl,
      tags: { isOC, isSpoiler, isNSFW, flair },
    });

    setTimeout(() => {
      setLoading(false);
      router.push('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans pb-12">
      
      {/* Mobile Top Navigation Header */}
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <button
          onClick={() => router.back()}
          className="p-1 text-slate-500 hover:text-slate-800 transition"
        >
          <X size={22} />
        </button>
        <h1 className="text-base font-bold text-slate-900">Create Post</h1>
        <button
          onClick={() => handleSubmit()}
          disabled={!title.trim() || loading}
          className="bg-indigo-600 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-semibold px-4 py-1.5 rounded-full transition"
        >
          Post
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-3 sm:px-6 pt-4 sm:pt-8">
        
        {/* Desktop Title & Drafts Bar */}
        <div className="hidden md:flex items-center justify-between pb-4 border-b border-slate-200/80 mb-6">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Create a post
          </h1>
          <button className="text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-full transition flex items-center gap-1.5">
            DRAFTS <span className="bg-indigo-600 text-white text-[10px] px-1.5 py-0.2 rounded-full">3</span>
          </button>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Main Form */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Community Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCommunityOpen(!isCommunityOpen)}
                className="w-full sm:w-72 bg-white border border-slate-200 hover:border-slate-300 rounded-xl px-3.5 py-2.5 flex items-center justify-between text-xs sm:text-sm font-medium text-slate-700 shadow-2xs transition"
              >
                <div className="flex items-center gap-2 truncate">
                  <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                    <Search size={12} />
                  </div>
                  <span className="truncate">
                    {selectedCommunity || 'Choose a community'}
                  </span>
                </div>
                <ChevronDown size={16} className="text-slate-400 shrink-0" />
              </button>

              {/* Dropdown Menu */}
              {isCommunityOpen && (
                <div className="absolute top-full left-0 mt-1 w-full sm:w-72 bg-white border border-slate-200 rounded-2xl shadow-xl z-20 overflow-hidden py-2">
                  <div className="px-3 pb-2 border-b border-slate-100">
                    <div className="relative flex items-center">
                      <Search size={14} className="absolute left-2.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search community..."
                        value={communitySearch}
                        onChange={(e) => setCommunitySearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-indigo-600"
                      />
                    </div>
                  </div>
                  <div className="max-h-48 overflow-y-auto py-1">
                    {filteredCommunities.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          setSelectedCommunity(c.name);
                          setIsCommunityOpen(false);
                        }}
                        className="w-full px-3 py-2 flex items-center justify-between hover:bg-slate-50 text-left transition"
                      >
                        <span className="text-xs font-semibold text-slate-800">{c.name}</span>
                        <span className="text-[10px] text-slate-400">{c.members}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Post Card Box */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
              
              {/* Type Switcher Tabs */}
              <div className="flex border-b border-slate-200/80 bg-slate-50/50">
                <button
                  type="button"
                  onClick={() => setActiveTab('post')}
                  className={`flex-1 sm:flex-initial px-5 py-3.5 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition border-b-2 ${
                    activeTab === 'post'
                      ? 'border-indigo-600 text-indigo-600 bg-white'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <FileText size={16} /> Post
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('media')}
                  className={`flex-1 sm:flex-initial px-5 py-3.5 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition border-b-2 ${
                    activeTab === 'media'
                      ? 'border-indigo-600 text-indigo-600 bg-white'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <ImageIcon size={16} /> Image & Video
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('link')}
                  className={`flex-1 sm:flex-initial px-5 py-3.5 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition border-b-2 ${
                    activeTab === 'link'
                      ? 'border-indigo-600 text-indigo-600 bg-white'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Link2 size={16} /> Link
                </button>
              </div>

              {/* Card Form Body */}
              <div className="p-4 sm:p-5 space-y-4">
                
                {/* Title Input with Counter */}
                <div className="relative">
                  <input
                    type="text"
                    maxLength={300}
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full pr-14 pl-3 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-indigo-600 transition text-slate-900 placeholder:text-slate-400"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-400 font-medium">
                    {title.length}/300
                  </span>
                </div>

                {/* Tab 1: Standard Post Text Editor */}
                {activeTab === 'post' && (
                  <div className="border border-slate-200 rounded-xl overflow-hidden focus-within:border-indigo-600 transition">
                    
                    {/* Rich Text Toolbar */}
                    <div className="bg-slate-50/80 border-b border-slate-200 px-3 py-2 flex items-center gap-1 sm:gap-2 flex-wrap text-slate-600">
                      <button type="button" className="p-1.5 hover:bg-slate-200/70 rounded transition"><Bold size={15} /></button>
                      <button type="button" className="p-1.5 hover:bg-slate-200/70 rounded transition"><Italic size={15} /></button>
                      <button type="button" className="p-1.5 hover:bg-slate-200/70 rounded transition"><LinkIcon size={15} /></button>
                      <span className="w-px h-4 bg-slate-300 my-auto" />
                      <button type="button" className="p-1.5 hover:bg-slate-200/70 rounded transition"><Code size={15} /></button>
                      <button type="button" className="p-1.5 hover:bg-slate-200/70 rounded transition"><Heading1 size={15} /></button>
                      <span className="w-px h-4 bg-slate-300 my-auto" />
                      <button type="button" className="p-1.5 hover:bg-slate-200/70 rounded transition"><List size={15} /></button>
                      <button type="button" className="p-1.5 hover:bg-slate-200/70 rounded transition"><ListOrdered size={15} /></button>
                    </div>

                    {/* Content Textarea OR Preview Mode */}
                    {isPreview ? (
                      <div className="p-4 min-h-[160px] text-xs sm:text-sm text-slate-800 prose max-w-none">
                        <p className="font-bold mb-2">{title || 'Untitled Post'}</p>
                        <p className="whitespace-pre-wrap">{bodyText || 'No description provided.'}</p>
                      </div>
                    ) : (
                      <textarea
                        rows={6}
                        placeholder="Text (optional)"
                        value={bodyText}
                        onChange={(e) => setBodyText(e.target.value)}
                        className="w-full p-3.5 text-xs sm:text-sm outline-none resize-y min-h-[140px] text-slate-800 placeholder:text-slate-400"
                      />
                    )}
                  </div>
                )}

                {/* Tab 2: Image & Video Upload Area */}
                {activeTab === 'media' && (
                  <div className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-xl p-8 text-center flex flex-col items-center justify-center transition cursor-pointer bg-slate-50/50">
                    <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                      <Upload size={20} />
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-700">
                      Drag and drop images or video here
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Supports PNG, JPG, GIF, MP4 up to 100MB
                    </p>
                  </div>
                )}

                {/* Tab 3: Link Input */}
                {activeTab === 'link' && (
                  <div>
                    <textarea
                      rows={3}
                      placeholder="Url (e.g. https://example.com)"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      className="w-full p-3 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-indigo-600 transition text-slate-800 placeholder:text-slate-400"
                    />
                  </div>
                )}

                {/* Tag Action Badges */}
                <div className="flex items-center gap-2 flex-wrap pt-2">
                  <button
                    type="button"
                    onClick={() => setIsOC(!isOC)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition flex items-center gap-1 ${
                      isOC
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Plus size={12} /> OC
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsSpoiler(!isSpoiler)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition flex items-center gap-1 ${
                      isSpoiler
                        ? 'bg-slate-800 border-slate-800 text-white'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Plus size={12} /> Spoiler
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsNSFW(!isNSFW)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition flex items-center gap-1 ${
                      isNSFW
                        ? 'bg-rose-600 border-rose-600 text-white'
                        : 'border-slate-200 bg-slate-50 text-rose-600 hover:bg-rose-50'
                    }`}
                  >
                    <Plus size={12} /> NSFW
                  </button>

                  <button
                    type="button"
                    onClick={() => setFlair(flair ? null : 'Discussion')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition flex items-center gap-1 ${
                      flair
                        ? 'bg-indigo-100 border-indigo-300 text-indigo-700'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    🏷️ {flair || 'Flair'}
                  </button>
                </div>

              </div>

              {/* Desktop Footer Actions */}
              <div className="hidden md:flex items-center justify-between border-t border-slate-200/80 px-5 py-3.5 bg-slate-50/50">
                
                {/* Preview Switch */}
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={isPreview}
                      onChange={(e) => setIsPreview(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600" />
                  </div>
                  <span className="text-xs font-semibold text-slate-600">Preview Mode</span>
                </label>

                {/* Cancel & Post Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-5 py-2 rounded-full border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-600 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSubmit()}
                    disabled={!title.trim() || loading}
                    className="px-6 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold transition shadow-2xs"
                  >
                    {loading ? 'Posting...' : 'Post'}
                  </button>
                </div>

              </div>

            </div>
          </div>

          {/* Right Sidebar - Posting Rules (Desktop Only) */}
          <div className="hidden lg:block space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs">
              
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-3">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                  RC
                </div>
                <h2 className="text-sm font-bold text-slate-800">Posting to RedditClone</h2>
              </div>

              <ol className="space-y-3 text-xs text-slate-600 border-b border-slate-100 pb-4">
                <li className="flex gap-2">
                  <span className="font-semibold text-slate-400">1.</span>
                  <span>Remember the human</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-slate-400">2.</span>
                  <span>Behave like you would in real life</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-slate-400">3.</span>
                  <span>Look for the original source of content</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-slate-400">4.</span>
                  <span>Search for duplicates before posting</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-slate-400">5.</span>
                  <span>Read the community's rules</span>
                </li>
              </ol>

              <p className="text-[11px] text-slate-400 leading-relaxed mt-3">
                Please be mindful of RedditClone's{' '}
                <a href="#" className="text-indigo-600 hover:underline">content policy</a> and practice good reddiquette.
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}