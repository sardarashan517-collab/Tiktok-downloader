import React, { useState } from 'react';
import { 
  Search, 
  Clipboard, 
  X, 
  ArrowRight, 
  Loader2, 
  Youtube, 
  Instagram, 
  Link as LinkIcon, 
  Sparkles, 
  AlertCircle,
  Play
} from 'lucide-react';
import { Platform } from '../types';
import { detectPlatform } from '../utils/urlParser';

interface HeroInputProps {
  url: string;
  setUrl: (url: string) => void;
  isLoading: boolean;
  onFetch: (targetUrl?: string) => void;
  errorMessage: string | null;
  onClearError: () => void;
}

export const HeroInput: React.FC<HeroInputProps> = ({
  url,
  setUrl,
  isLoading,
  onFetch,
  errorMessage,
  onClearError,
}) => {
  const currentPlatform = detectPlatform(url);

  const handlePaste = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setUrl(text.trim());
          onClearError();
          // Auto fetch if valid
          const p = detectPlatform(text);
          if (p !== 'unknown') {
            onFetch(text.trim());
          }
        }
      }
    } catch (err) {
      console.warn('Clipboard access denied, please paste manually');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    onFetch();
  };

  // Demo Links for fast 1-click testability
  const demoLinks = [
    {
      label: 'YouTube Short',
      platform: 'youtube',
      url: 'https://www.youtube.com/shorts/dQw4w9WgXcQ',
      icon: Youtube,
      color: 'text-rose-600',
    },
    {
      label: 'TikTok Viral (No Watermark)',
      platform: 'tiktok',
      url: 'https://www.tiktok.com/@zachking/video/6768504823336815877',
      icon: Play,
      color: 'text-cyan-600 dark:text-cyan-400',
    },
    {
      label: 'Instagram Reel',
      platform: 'instagram',
      url: 'https://www.instagram.com/reel/C8q87d8P2o_/',
      icon: Instagram,
      color: 'text-pink-600',
    },
  ];

  return (
    <section id="downloader" className="relative pt-12 pb-16 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      {/* Decorative ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-indigo-500/10 via-sky-500/10 to-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Trust & Supported Networks Kicker */}
      <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
        <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
        <span>Supports YouTube · TikTok · Instagram Reels</span>
      </div>

      {/* Main Heading */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] text-balance">
        Download Any Video in{' '}
        <span className="bg-gradient-to-r from-indigo-600 via-sky-500 to-rose-500 bg-clip-text text-transparent">
          Full HD & MP3
        </span>
      </h1>

      <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
        Fast, clean, and watermark-free video downloads. Simply paste the link from YouTube, TikTok, or Instagram to extract 1080p MP4 or high-fidelity audio.
      </p>

      {/* Prominent URL Input Box */}
      <form onSubmit={handleSubmit} className="mt-8 relative max-w-3xl mx-auto">
        <div className="relative flex flex-col sm:flex-row items-center p-2 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 focus-within:border-indigo-600 dark:focus-within:border-indigo-500 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 transition-all gap-2">
          
          {/* Platform Indicator Icon */}
          <div className="flex items-center pl-3 pr-1 shrink-0">
            {currentPlatform === 'youtube' ? (
              <div className="flex items-center gap-1.5 px-2 py-1 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 rounded-lg text-rose-600 text-xs font-bold font-mono">
                <Youtube className="w-4 h-4 fill-rose-600 stroke-none" />
                <span>YouTube</span>
              </div>
            ) : currentPlatform === 'tiktok' ? (
              <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-900 dark:bg-black border border-slate-700 rounded-lg text-cyan-400 text-xs font-bold font-mono">
                <Play className="w-3.5 h-3.5 fill-cyan-400" />
                <span>TikTok</span>
              </div>
            ) : currentPlatform === 'instagram' ? (
              <div className="flex items-center gap-1.5 px-2 py-1 bg-pink-50 dark:bg-pink-950/50 border border-pink-200 dark:border-pink-900 rounded-lg text-pink-600 text-xs font-bold font-mono">
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </div>
            ) : (
              <div className="p-1 text-slate-400">
                <LinkIcon className="w-5 h-5" />
              </div>
            )}
          </div>

          {/* Text Input */}
          <input
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              onClearError();
            }}
            placeholder="Paste YouTube, TikTok, or Instagram link here..."
            className="w-full px-2 py-2.5 text-sm sm:text-base bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none font-medium"
          />

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end shrink-0">
            {url && (
              <button
                type="button"
                onClick={() => {
                  setUrl('');
                  onClearError();
                }}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors"
                title="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {!url && (
              <button
                type="button"
                onClick={handlePaste}
                className="hidden sm:flex items-center gap-1 px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors whitespace-nowrap"
              >
                <Clipboard className="w-3.5 h-3.5" />
                <span>Paste Link</span>
              </button>
            )}

            <button
              type="submit"
              disabled={isLoading || !url.trim()}
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all active:scale-95 whitespace-nowrap"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <span>Download Now</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Error Message Alert */}
      {errorMessage && (
        <div className="mt-4 p-3.5 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 rounded-xl text-xs sm:text-sm text-rose-700 dark:text-rose-300 flex items-center gap-2.5 text-left max-w-2xl mx-auto shadow-xs">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
          <span className="flex-1">{errorMessage}</span>
          <button onClick={onClearError} className="p-1 hover:text-rose-900 dark:hover:text-white">✕</button>
        </div>
      )}

      {/* Quick 1-Click Demo Links */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="text-slate-400 font-medium mr-1">Try sample link:</span>
        {demoLinks.map((demo) => {
          const Icon = demo.icon;
          return (
            <button
              key={demo.label}
              type="button"
              onClick={() => {
                setUrl(demo.url);
                onClearError();
                onFetch(demo.url);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white font-medium shadow-xs transition-all hover:-translate-y-0.5"
            >
              <Icon className={`w-3.5 h-3.5 ${demo.color}`} />
              <span>{demo.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
