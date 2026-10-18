import React from 'react';
import { Youtube, Instagram, Play, CheckCircle2, Shield, Zap, Sparkles } from 'lucide-react';

export const SupportedPlatforms: React.FC<{ onSelectSample: (url: string) => void }> = ({ onSelectSample }) => {
  const platforms = [
    {
      id: 'youtube',
      name: 'YouTube Downloader',
      badge: 'Up to 1080p 60fps & MP3',
      icon: Youtube,
      iconColor: 'text-rose-600',
      description:
        'Download YouTube Shorts, standard long-form videos, podcasts, and convert audio into 320 kbps MP3 files.',
      features: [
        'YouTube Shorts & 1080p Full HD',
        'Direct MP3 Audio conversion (320 kbps)',
        'Original thumbnail artwork extraction',
        'No duration or file size restrictions',
      ],
      sampleUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
      buttonText: 'Try YouTube Sample',
    },
    {
      id: 'tiktok',
      name: 'TikTok Video Downloader',
      badge: '100% Watermark Free',
      icon: Play,
      iconColor: 'text-cyan-500',
      description:
        'Save TikTok videos without the bouncing username watermark. Extract original background audio and trending songs in crisp MP3.',
      features: [
        'Strip watermark & logo cleanly',
        'Original crystal-clear audio extraction',
        'Supports TikTok desktop & mobile links',
        'Lightning fast 1-second extraction',
      ],
      sampleUrl: 'https://www.tiktok.com/@zachking/video/6768504823336815877',
      buttonText: 'Try TikTok Sample',
    },
    {
      id: 'instagram',
      name: 'Instagram Reel & Video',
      badge: 'Reels, Posts & IGTV',
      icon: Instagram,
      iconColor: 'text-pink-600',
      description:
        'Download Instagram Reels, carousel video posts, and stories in high definition MP4 format directly to your phone or computer.',
      features: [
        'Instagram Reels in original HD resolution',
        'Full compatibility with mobile & PC',
        'Safe & anonymous downloading',
        'Save audio tracks as standalone MP3',
      ],
      sampleUrl: 'https://www.instagram.com/reel/C8q87d8P2o_/',
      buttonText: 'Try Instagram Sample',
    },
  ];

  return (
    <section id="platforms" className="py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t border-slate-200 dark:border-slate-800">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Supported Social Video Networks
        </h2>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          Tailored algorithms for each platform ensure maximum fidelity and watermark removal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {platforms.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.id}
              className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs flex flex-col justify-between hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <Icon className={`w-5 h-5 ${p.iconColor}`} />
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {p.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {p.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  {p.description}
                </p>

                <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4 mb-6">
                  {p.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectSample(p.sampleUrl)}
                className="w-full py-2.5 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-600 dark:hover:text-indigo-300 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl transition-colors text-center"
              >
                {p.buttonText}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
