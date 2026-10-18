import React from 'react';
import { 
  ShieldCheck, 
  Zap, 
  Film, 
  Music, 
  Smartphone, 
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: 'Watermark-Free Video Extraction',
      description:
        'Download TikTok clips and Instagram reels without distracting bouncing logos or creator watermark stamps.',
      icon: Sparkles,
    },
    {
      title: '1080p Full HD & High Frame Rate',
      description:
        'Retain crisp original source bitrate up to 60fps Full HD without lossy re-encoding artifacts.',
      icon: Film,
    },
    {
      title: 'Crystal Clear MP3 Audio Extractor',
      description:
        'Convert video soundtracks, background beats, and podcasts into standalone 320 kbps high-bitrate MP3 files.',
      icon: Music,
    },
    {
      title: 'Zero Storage & 100% Private',
      description:
        'We never store copyrighted media files on our servers. Streams are processed in-memory and saved directly to your device.',
      icon: Lock,
    },
    {
      title: 'Optimized for Mobile & Desktop',
      description:
        'Seamless experience across iOS Safari, Android Chrome, Windows, and macOS browsers with one-click clipboard paste.',
      icon: Smartphone,
    },
    {
      title: 'Free & Unlimited Downloads',
      description:
        'No subscription fees, no daily download limits, and no registration required. Download as many videos as you want.',
      icon: Zap,
    },
  ];

  return (
    <section id="features" className="py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t border-slate-200 dark:border-slate-800">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Engineered for Speed, Clarity & Security
        </h2>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          State-of-the-art media stream extraction built to deliver uncompressed audio and video files.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.title}
              className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                {feat.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {feat.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
