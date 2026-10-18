import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is it free to download videos from YouTube, TikTok, and Instagram?',
      a: 'Yes! OmniFetch is 100% free with unlimited downloads. There are no subscriptions, paywalls, or hidden costs, and you never need to create an account.',
    },
    {
      q: 'How do I download TikTok videos without the watermark?',
      a: 'Simply copy the TikTok video link (via the Share button -> Copy Link) and paste it into OmniFetch. Our engine automatically requests the clean source stream without the TikTok watermark and delivers a pure MP4 file.',
    },
    {
      q: 'Where are downloaded videos saved on my device?',
      a: 'On PC or Mac, files are automatically saved to your default "Downloads" folder. On iPhone (iOS), videos save to Safari Downloads or the Files app; from there, tap Share -> Save Video to move them to your Camera Roll. On Android, files appear in your My Files or Gallery app.',
    },
    {
      q: 'Can I extract and convert audio to MP3 format?',
      a: 'Yes. OmniFetch features a dedicated Audio (MP3) tab for every video. You can select either Ultra High 320 kbps for audiophile quality or Standard 128 kbps for lightweight storage.',
    },
    {
      q: 'Do you store downloaded videos on your servers?',
      a: 'No. OmniFetch operates as a direct stream proxy. We do not store, archive, or host any copyrighted videos or media files permanently on our servers. All processing happens in-memory and streams directly to your browser.',
    },
    {
      q: 'What should I do if a link fails to download?',
      a: 'Ensure that the video is public and that the link is copied correctly. Private videos, geo-restricted content, or deleted posts cannot be accessed by external extractors. If a link fails, try refreshing or use one of our sample links.',
    },
  ];

  return (
    <section id="faq" className="py-16 px-4 sm:px-6 max-w-4xl mx-auto border-t border-slate-200 dark:border-slate-800">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          Everything you need to know about downloading videos safely and securely.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-indigo-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
