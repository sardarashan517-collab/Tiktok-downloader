import React from 'react';
import { Copy, SlidersHorizontal, DownloadCloud, Sparkles } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Copy the Video Link',
      description:
        'Open YouTube, TikTok, or Instagram. Tap Share and copy the direct video or reel URL to your clipboard.',
      icon: Copy,
    },
    {
      number: '02',
      title: 'Paste & Select Format',
      description:
        'Paste the URL into OmniFetch. Our engine will auto-detect the platform and retrieve HD 1080p, 720p, or MP3 options.',
      icon: SlidersHorizontal,
    },
    {
      number: '03',
      title: 'Download & Enjoy',
      description:
        'Click the Download button for your preferred resolution. Your file will save immediately without watermark or quality loss.',
      icon: DownloadCloud,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t border-slate-200 dark:border-slate-800">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          How to Download Videos in 3 Simple Steps
        </h2>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          No software installation, no browser extensions, and no account registration needed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs relative flex flex-col justify-between group hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500">
                    Step {step.number}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
