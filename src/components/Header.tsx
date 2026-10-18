import React from 'react';
import { 
  Download, 
  Moon, 
  Sun, 
  Youtube, 
  Instagram, 
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, onToggleDarkMode }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element Brand Zone */}
        <a 
          href="/" 
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-sky-500 to-rose-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Download className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="text-xl font-extrabold tracking-tight">
            Omni<span className="text-indigo-600 dark:text-indigo-400">Fetch</span>
          </span>
        </a>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href="#downloader" className="hover:text-indigo-600 dark:hover:text-white transition-colors whitespace-nowrap shrink-0">
            Downloader
          </a>
          <a href="#how-it-works" className="hover:text-indigo-600 dark:hover:text-white transition-colors whitespace-nowrap shrink-0">
            How It Works
          </a>
          <a href="#platforms" className="hover:text-indigo-600 dark:hover:text-white transition-colors whitespace-nowrap shrink-0">
            Supported Sites
          </a>
          <a href="#features" className="hover:text-indigo-600 dark:hover:text-white transition-colors whitespace-nowrap shrink-0">
            Features
          </a>
          <a href="#faq" className="hover:text-indigo-600 dark:hover:text-white transition-colors whitespace-nowrap shrink-0">
            FAQ
          </a>
        </nav>

        {/* Zone 3: 1 primary action / toggles */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle dark/light theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          <a
            href="/omnifetch-source-code.zip"
            download="omnifetch-source-code.zip"
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-all whitespace-nowrap shrink-0"
            title="Download full project source code as a ZIP file"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download App (.ZIP)</span>
          </a>

          <a
            href="#downloader"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-xl shadow-sm transition-all whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Download Video</span>
          </a>
        </div>
      </div>
    </header>
  );
};
