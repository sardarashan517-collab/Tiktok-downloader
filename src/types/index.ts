export type Platform = 'youtube' | 'tiktok' | 'instagram' | 'unknown';

export type MediaFormatType = 'video' | 'audio' | 'thumbnail';

export interface MediaOption {
  id: string;
  type: MediaFormatType;
  resolution?: string; // '1080p', '720p', '480p', '360p'
  quality: string; // 'Full HD', 'HD', 'SD', '320 kbps', '192 kbps'
  extension: 'mp4' | 'mp3' | 'jpg' | 'webm';
  fileSizeMB: number;
  fps?: number;
  bitrate?: string;
  isWatermarkFree?: boolean;
  recommended?: boolean;
  directDownloadUrl?: string;
}

export interface VideoMetadata {
  id: string;
  url: string;
  platform: Platform;
  title: string;
  author: {
    name: string;
    handle?: string;
    url?: string;
    avatar?: string;
    verified?: boolean;
  };
  thumbnail: string;
  durationSeconds: number;
  durationFormatted: string;
  stats?: {
    views?: string;
    likes?: string;
    comments?: string;
    shares?: string;
  };
  uploadDate?: string;
  description?: string;
  options: MediaOption[];
  previewVideoUrl?: string;
}

export interface DownloadHistoryItem {
  id: string;
  title: string;
  platform: Platform;
  thumbnail: string;
  format: string;
  quality: string;
  timestamp: string;
  fileSizeMB: number;
}
