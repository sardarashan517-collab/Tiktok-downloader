# OmniFetch - Universal Video Downloader

A modern, fast, and responsive video downloader web application for **YouTube**, **TikTok**, and **Instagram**.

---

## Features

- **Multi-Platform Support**: Paste any video link from YouTube (Shorts, 4K, 1080p), TikTok (No Watermark), or Instagram (Reels & Videos).
- **Quality & Format Options**:
  - MP4 Video (1080p Full HD, 720p HD, 480p SD, 360p Mobile)
  - MP3 Audio (320 kbps Ultra High Quality, 128 kbps Standard)
  - HD Original Thumbnail artwork
- **No Watermarks**: Automatically strips TikTok and Instagram watermarks.
- **Privacy First**: Files are converted and streamed in-memory without permanent server storage.
- **Dark / Light Theme**: Instant mode switching with system preference detection.
- **Full-Stack Architecture**: Express API backend + React 19 + Vite + Tailwind CSS.

---

## Quick Start (Run Locally)

### 1. Prerequisites
- **Node.js** v18.0.0 or higher
- **npm** or **pnpm** / **yarn**

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## Project Structure

```text
├── index.html            # HTML entry point with metadata & fonts
├── package.json          # Dependencies and scripts
├── server.ts             # Express backend server (Extraction & streaming API)
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript compiler configuration
├── src/
│   ├── main.tsx          # React application entry
│   ├── App.tsx           # Main app layout and state management
│   ├── index.css         # Tailwind CSS styling and theme
│   ├── types/
│   │   └── index.ts      # TypeScript interfaces (Metadata, Formats, Options)
│   ├── utils/
│   │   ├── urlParser.ts       # URL detection & video ID extraction
│   │   └── mediaDownloader.ts # Browser download handler
│   └── components/
│       ├── Header.tsx             # 3-Zone top bar with theme toggle
│       ├── HeroInput.tsx          # Centered URL search & platform detector
│       ├── VideoResultCard.tsx    # Extraction card with formats & progress
│       ├── HowItWorks.tsx         # 3-step user instructions
│       ├── SupportedPlatforms.tsx # YouTube, TikTok, Instagram platform guides
│       ├── FeaturesSection.tsx    # Core feature highlights
│       ├── FAQSection.tsx         # Accordion FAQ answers
│       ├── RecentDownloads.tsx    # Local history drawer
│       └── Footer.tsx             # Legal disclaimer & copyright
└── README.md             # Documentation
```

---

## Deployment

### Deploy to Render / Railway / Heroku / VPS
1. Push this repository to GitHub.
2. Link the repository to your hosting provider.
3. Set the build command: `npm run build`
4. Set the start command: `npm start`
5. Set environment variable: `PORT=3000` (or leave default provider port).

### Deploy to Vercel
1. Run `npm run build`.
2. Deploy the static frontend or serverless functions using Vercel CLI: `vercel`.

---

## License
MIT License. For educational and personal offline backup use.
