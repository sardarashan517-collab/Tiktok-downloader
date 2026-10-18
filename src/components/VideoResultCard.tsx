import React, { useState } from 'react';
import { 
  Download, 
  Play, 
  Film, 
  Music, 
  Image as ImageIcon, 
  Check, 
  Clock, 
  Eye, 
  Heart, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  Youtube, 
  Instagram,
  Loader2
} from 'lucide-react';
import { VideoMetadata, MediaOption, MediaFormatType } from '../types';
import { downloadMediaFile } from '../utils/mediaDownloader';

interface VideoResultCardProps {
  metadata: VideoMetadata;
  onDownloadCompleted: (item: {
    title: string;
    platform: any;
    thumbnail: string;
    format: string;
    quality: string;
    fileSizeMB: number;
  }) => void;
}

export const VideoResultCard: React.FC<VideoResultCardProps> = ({
  metadata,
  onDownloadCompleted,
}) => {
  const [activeTab, setActiveTab] = useState<MediaFormatType>('video');
  const [activeDownloadId, setActiveDownloadId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [downloadStatus, setDownloadStatus] = useState<string>('');
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const filteredOptions = metadata.options.filter((opt) => opt.type === activeTab);

  const handleDownload = async (option: MediaOption) => {
    if (activeDownloadId) return;

    setActiveDownloadId(option.id);
    setDownloadProgress(10);
    setDownloadStatus('Starting conversion engine...');

    try {
      await downloadMediaFile(metadata, option, (prog, text) => {
        setDownloadProgress(prog);
        setDownloadStatus(text);
      });

      onDownloadCompleted({
        title: metadata.title,
        platform: metadata.platform,
        thumbnail: metadata.thumbnail,
        format: option.extension.toUpperCase(),
        quality: option.resolution || option.quality,
        fileSizeMB: option.fileSizeMB,
      });

      setTimeout(() => {
        setActiveDownloadId(null);
        setDownloadProgress(0);
        setDownloadStatus('');
      }, 2500);
    } catch (err) {
      console.error(err);
      setActiveDownloadId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16 animate-in fade-in-50 slide-in-from-bottom-4 duration-300">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden">
        
        {/* Top status bar */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">Video Information Extracted Successfully</span>
          </div>

          <div className="flex items-center gap-2 text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">No Watermark · Safe Stream</span>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="p-6 lg:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Visual Thumbnail & Creator Badge */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-4">
            <div className="relative group rounded-2xl overflow-hidden aspect-video bg-slate-950 shadow-md">
              <img
                src={metadata.thumbnail}
                alt={metadata.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
              />

              {/* Play Button Overlay */}
              <button
                onClick={() => setShowPreviewModal(true)}
                className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-black/60 backdrop-blur-xs text-white flex items-center justify-center hover:bg-indigo-600 hover:scale-110 transition-all shadow-lg"
                title="Preview Video"
              >
                <Play className="w-5 h-5 fill-white ml-0.5" />
              </button>

              {/* Duration Badge */}
              <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-black/80 backdrop-blur-xs text-white text-[11px] font-mono font-semibold rounded-md flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>{metadata.durationFormatted}</span>
              </div>

              {/* Platform Badge */}
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-black/80 backdrop-blur-xs text-white text-[11px] font-semibold rounded-md flex items-center gap-1.5 uppercase tracking-wider">
                {metadata.platform === 'youtube' ? (
                  <Youtube className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                ) : metadata.platform === 'instagram' ? (
                  <Instagram className="w-3.5 h-3.5 text-pink-500" />
                ) : (
                  <Play className="w-3 h-3 text-cyan-400 fill-cyan-400" />
                )}
                <span>{metadata.platform}</span>
              </div>
            </div>

            {/* Creator Profile & Stats */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Uploader</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">
                    {metadata.author.name}
                  </span>
                </div>
                {metadata.author.url && (
                  <a
                    href={metadata.author.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 rounded-lg transition-colors"
                    title="Open Creator Profile"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              {metadata.stats && (
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 flex items-center gap-4 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                  {metadata.stats.views && (
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-slate-400" />
                      <span>{metadata.stats.views} views</span>
                    </span>
                  )}
                  {metadata.stats.likes && (
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3 text-rose-500" />
                      <span>{metadata.stats.likes} likes</span>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Titles, Tabs, and Download Resoltuions */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-5">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                {metadata.title}
              </h2>

              {/* Format Switcher Tabs */}
              <div className="mt-5 flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveTab('video')}
                  className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
                    activeTab === 'video'
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Film className="w-4 h-4" />
                  <span>Video (MP4)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('audio')}
                  className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
                    activeTab === 'audio'
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Music className="w-4 h-4" />
                  <span>Audio (MP3)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('thumbnail')}
                  className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
                    activeTab === 'thumbnail'
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Thumbnail HD</span>
                </button>
              </div>

              {/* Active Download Progress Notice */}
              {activeDownloadId && (
                <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-indigo-900 dark:text-indigo-200">
                    <span className="flex items-center gap-1.5">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600 dark:text-indigo-400" />
                      <span>{downloadStatus}</span>
                    </span>
                    <span className="font-mono">{downloadProgress}%</span>
                  </div>

                  <div className="w-full bg-indigo-200 dark:bg-indigo-900 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-indigo-600 dark:bg-indigo-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${downloadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Resolution Options List */}
              <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                {filteredOptions.map((opt) => {
                  const isDownloadingThis = activeDownloadId === opt.id;

                  return (
                    <div
                      key={opt.id}
                      className="p-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-xs font-mono shrink-0">
                          {opt.extension.toUpperCase()}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                              {opt.resolution || opt.quality}
                            </span>

                            {opt.recommended && (
                              <span className="px-1.5 py-0.2 text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded">
                                Recommended
                              </span>
                            )}

                            {opt.isWatermarkFree && (
                              <span className="hidden sm:inline-block px-1.5 py-0.2 text-[10px] font-semibold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded">
                                No Watermark
                              </span>
                            )}
                          </div>

                          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5 font-mono">
                            <span>{opt.quality}</span>
                            <span>·</span>
                            <span>~{opt.fileSizeMB} MB</span>
                            {opt.fps && (
                              <>
                                <span>·</span>
                                <span>{opt.fps} fps</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        disabled={!!activeDownloadId}
                        onClick={() => handleDownload(opt)}
                        className={`px-4 py-2 text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-all active:scale-95 whitespace-nowrap shrink-0 ${
                          opt.recommended
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'
                            : 'bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900'
                        } disabled:opacity-50`}
                      >
                        {isDownloadingThis ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5" />
                            <span>Download</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Tip */}
            <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center">
              Files are streamed directly to your browser for privacy. No videos are stored permanently.
            </p>
          </div>
        </div>
      </div>

      {/* Video Player Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
            <div className="flex items-center justify-between p-3.5 bg-slate-900 text-white text-xs">
              <span className="font-bold truncate pr-4">{metadata.title}</span>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-1 hover:text-slate-400"
              >
                ✕
              </button>
            </div>

            <div className="aspect-video relative bg-black flex items-center justify-center">
              <img
                src={metadata.thumbnail}
                alt={metadata.title}
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <Play className="w-8 h-8 fill-white ml-1" />
                  </div>
                  <p className="text-white text-sm font-bold">Stream Ready</p>
                  <p className="text-slate-300 text-xs mt-1 max-w-xs">
                    Choose 1080p or 720p resolution in the downloader panel to save this file locally.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-900 flex justify-end">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
