import React from 'react';
import { Download, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 px-4 sm:px-6 transition-colors">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-rose-500 flex items-center justify-center text-white shadow-xs">
              <Download className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="text-lg font-extrabold text-slate-900 dark:text-white">
              Omni<span className="text-indigo-600 dark:text-indigo-400">Fetch</span>
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs font-medium text-slate-500 dark:text-slate-400">
            <a href="#downloader" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Downloader</a>
            <a href="#how-it-works" className="hover:text-indigo-600 dark:hover:text-white transition-colors">How It Works</a>
            <a href="#platforms" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Supported Sites</a>
            <a href="#faq" className="hover:text-indigo-600 dark:hover:text-white transition-colors">FAQ</a>
            <a 
              href="/omnifetch-source-code.zip" 
              download="omnifetch-source-code.zip"
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              Download Source (.ZIP)
            </a>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed text-center sm:text-left">
          <p>
            <strong>Disclaimer:</strong> OmniFetch is a utility tool designed to help users download publicly accessible online video and audio streams for personal offline use. OmniFetch does not host, archive, or permanently store copyrighted content on its servers. Users are solely responsible for ensuring they have permission from the content owner before downloading. All platform logos and trademarks (YouTube, TikTok, Instagram) belong to their respective copyright holders.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400 dark:text-slate-500 pt-4 border-t border-slate-100 dark:border-slate-800/60">
          <p>© {new Date().getFullYear()} OmniFetch. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with speed, privacy & precision
          </p>
        </div>
      </div>
    </footer>
  );
};
