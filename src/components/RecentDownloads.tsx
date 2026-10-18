import React from 'react';
import { History, Trash2, Youtube, Instagram, Play, Film, CheckCircle2 } from 'lucide-react';
import { DownloadHistoryItem } from '../types';

interface RecentDownloadsProps {
  history: DownloadHistoryItem[];
  onClearHistory: () => void;
}

export const RecentDownloads: React.FC<RecentDownloadsProps> = ({ history, onClearHistory }) => {
  if (history.length === 0) return null;

  return (
    <section className="py-8 px-4 sm:px-6 max-w-4xl mx-auto border-t border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Recent Downloads ({history.length})
          </h3>
        </div>

        <button
          onClick={onClearHistory}
          className="text-xs text-slate-400 hover:text-rose-500 flex items-center gap-1 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear History</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {history.map((item) => (
          <div
            key={item.id}
            className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center gap-3 shadow-xs"
          >
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-950 shrink-0 relative">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-1 left-1 p-0.5 rounded bg-black/70">
                {item.platform === 'youtube' ? (
                  <Youtube className="w-2.5 h-2.5 text-rose-500 fill-rose-500" />
                ) : item.platform === 'instagram' ? (
                  <Instagram className="w-2.5 h-2.5 text-pink-500" />
                ) : (
                  <Play className="w-2.5 h-2.5 text-cyan-400 fill-cyan-400" />
                )}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {item.title}
              </h4>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5 flex items-center gap-1.5">
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">{item.format}</span>
                <span>·</span>
                <span>{item.quality}</span>
                <span>·</span>
                <span>{item.fileSizeMB} MB</span>
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5 font-medium">
                <CheckCircle2 className="w-3 h-3" />
                <span>Saved</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
