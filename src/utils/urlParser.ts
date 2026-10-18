import { Platform, MediaOption, VideoMetadata } from '../types';

export function detectPlatform(inputUrl: string): Platform {
  if (!inputUrl) return 'unknown';
  const clean = inputUrl.trim().toLowerCase();

  // YouTube matchers: youtube.com, youtu.be, shorts
  if (
    clean.includes('youtube.com') ||
    clean.includes('youtu.be') ||
    clean.includes('m.youtube.com')
  ) {
    return 'youtube';
  }

  // TikTok matchers: tiktok.com, vm.tiktok.com, vt.tiktok.com
  if (
    clean.includes('tiktok.com') ||
    clean.includes('vt.tiktok.com') ||
    clean.includes('vm.tiktok.com')
  ) {
    return 'tiktok';
  }

  // Instagram matchers: instagram.com, instagr.am
  if (
    clean.includes('instagram.com') ||
    clean.includes('instagr.am')
  ) {
    return 'instagram';
  }

  return 'unknown';
}

export function extractVideoId(url: string, platform: Platform): string | null {
  try {
    const trimmed = url.trim();

    if (platform === 'youtube') {
      // youtu.be/<id>
      const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
      if (shortMatch) return shortMatch[1];

      // youtube.com/shorts/<id>
      const shortsMatch = trimmed.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
      if (shortsMatch) return shortsMatch[1];

      // youtube.com/watch?v=<id>
      const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
      if (watchMatch) return watchMatch[1];

      // youtube.com/embed/<id>
      const embedMatch = trimmed.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
      if (embedMatch) return embedMatch[1];
    }

    if (platform === 'tiktok') {
      // tiktok.com/@user/video/<id>
      const videoMatch = trimmed.match(/video\/([0-9]{15,22})/);
      if (videoMatch) return videoMatch[1];

      // vm.tiktok.com/<shortcode>
      const vmMatch = trimmed.match(/tiktok\.com\/([a-zA-Z0-9_-]+)/);
      if (vmMatch) return vmMatch[1];
    }

    if (platform === 'instagram') {
      // instagram.com/reel/<shortcode> or /p/<shortcode>
      const reelMatch = trimmed.match(/(?:reel|reels|p|tv)\/([a-zA-Z0-9_-]+)/);
      if (reelMatch) return reelMatch[1];
    }

    return null;
  } catch {
    return null;
  }
}

export function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins >= 60) {
    const hrs = Math.floor(mins / 60);
    const remMins = mins % 60;
    return `${hrs}:${String(remMins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

export function generateStandardOptions(platform: Platform, durationSeconds: number): MediaOption[] {
  // Approximate standard file size based on bitrate and duration
  const dur = Math.max(15, durationSeconds || 60);

  // 1080p: ~4.5 Mbps => ~0.56 MB per sec
  const size1080 = +((dur * 0.55).toFixed(1));
  // 720p: ~2.5 Mbps => ~0.31 MB per sec
  const size720 = +((dur * 0.32).toFixed(1));
  // 480p: ~1.2 Mbps => ~0.15 MB per sec
  const size480 = +((dur * 0.16).toFixed(1));
  // 360p: ~0.7 Mbps => ~0.09 MB per sec
  const size360 = +((dur * 0.09).toFixed(1));
  // MP3 320k: 0.04 MB per sec
  const sizeMp3 = +((dur * 0.04).toFixed(1));
  const sizeMp3Low = +((dur * 0.016).toFixed(1));

  const options: MediaOption[] = [
    {
      id: 'mp4-1080',
      type: 'video',
      resolution: '1080p',
      quality: 'Full HD',
      extension: 'mp4',
      fileSizeMB: Math.max(2.4, size1080),
      fps: 60,
      bitrate: '4500 kbps',
      isWatermarkFree: platform !== 'youtube',
      recommended: true,
    },
    {
      id: 'mp4-720',
      type: 'video',
      resolution: '720p',
      quality: 'HD Standard',
      extension: 'mp4',
      fileSizeMB: Math.max(1.8, size720),
      fps: 30,
      bitrate: '2500 kbps',
      isWatermarkFree: platform !== 'youtube',
    },
    {
      id: 'mp4-480',
      type: 'video',
      resolution: '480p',
      quality: 'Medium Quality',
      extension: 'mp4',
      fileSizeMB: Math.max(1.2, size480),
      fps: 30,
      bitrate: '1200 kbps',
      isWatermarkFree: platform !== 'youtube',
    },
    {
      id: 'mp4-360',
      type: 'video',
      resolution: '360p',
      quality: 'Compact Mobile',
      extension: 'mp4',
      fileSizeMB: Math.max(0.8, size360),
      fps: 30,
      bitrate: '700 kbps',
      isWatermarkFree: platform !== 'youtube',
    },
    {
      id: 'mp3-320',
      type: 'audio',
      quality: 'Ultra High 320 kbps',
      extension: 'mp3',
      fileSizeMB: Math.max(1.1, sizeMp3),
      bitrate: '320 kbps',
      recommended: false,
    },
    {
      id: 'mp3-128',
      type: 'audio',
      quality: 'Standard 128 kbps',
      extension: 'mp3',
      fileSizeMB: Math.max(0.6, sizeMp3Low),
      bitrate: '128 kbps',
    },
    {
      id: 'thumb-hd',
      type: 'thumbnail',
      quality: 'Original Artwork HD',
      extension: 'jpg',
      fileSizeMB: 0.4,
    },
  ];

  return options;
}
