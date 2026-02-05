# Uffizi Gallery Guide

A Progressive Web App (PWA) guidebook for the Uffizi Gallery in Florence, Italy. Features 40 masterpieces with detailed information, plus a standalone "Know Before You Go" visitor information page.

**Live Site:** https://uffizi.florencewithlocals.com

## Features

### Main Guidebook App (React SPA)
- 40 masterpieces from the Uffizi Gallery
- First floor and second floor artwork guides
- Introduction to the gallery's history
- 11 language support
- PWA with offline capability
- Mobile-first responsive design

### Know Before You Go (Static Pages)
Standalone visitor information pages accessible at `/know-before-you-go/`

- **18 language support:** EN, ES, IT, FR, DE, NL, RU, KO, ZH, PT, EL, JA, TR, FA, AR, HI, PL, HU
- **Auto language detection:** Visitors to `/know-before-you-go/` are automatically redirected to their browser's language
- **Pure HTML/CSS:** No React, no build dependencies - works independently
- **RTL support:** Arabic (AR) and Persian (FA) have proper right-to-left layout

#### Know Before You Go Content
- Entry instructions (Door 01 / Porta 01)
- What to bring & prohibited items
- Ticket information (nominative tickets)
- Museum rules
- Photography guidelines
- Facilities (cloakroom, restrooms, cafeteria)
- Audio guide setup (PopGuide)
- Accessibility information
- FAQ section

## Project Structure

```
uffizi-guide/
├── public/
│   ├── data/                    # JSON data for each language
│   │   ├── en/
│   │   ├── es/
│   │   └── ...
│   ├── images/
│   │   ├── hero/                # Full-size artwork images
│   │   └── thumbnails/          # Thumbnail images
│   ├── know-before-you-go/      # Static visitor info pages
│   │   ├── index.html           # Language auto-detect redirect
│   │   ├── door-01-entrance.jpg # Shared entrance photo
│   │   ├── en/index.html
│   │   ├── es/index.html
│   │   ├── it/index.html
│   │   └── ... (18 languages)
│   └── .htaccess                # Apache routing config
├── src/
│   ├── App.jsx                  # Main React app
│   ├── components/
│   └── index.css
├── dist/                        # Production build output
└── package.json
```

## Development

### Prerequisites
- Node.js 18+
- npm

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

The build output goes to `dist/` folder.

## Deployment

### Hosting
- **Platform:** Hostinger (Apache)
- **Domain:** uffizi.florencewithlocals.com
- **Path:** `/home/u803853690/domains/florencewithlocals.com/public_html/uffizi`

### Deploy via SSH
```bash
scp -P 65002 -r dist/* u803853690@82.25.82.111:/home/u803853690/domains/florencewithlocals.com/public_html/uffizi/
```

### .htaccess Configuration
The `.htaccess` file handles:
1. **Static pages:** `/know-before-you-go/*` served directly (not SPA routed)
2. **SPA routing:** All other routes redirect to `index.html`
3. **GZIP compression**
4. **Browser caching**
5. **Security headers**

## URLs

### Main App
- https://uffizi.florencewithlocals.com/

### Know Before You Go
- https://uffizi.florencewithlocals.com/know-before-you-go/ (auto-redirects)
- https://uffizi.florencewithlocals.com/know-before-you-go/en/
- https://uffizi.florencewithlocals.com/know-before-you-go/es/
- https://uffizi.florencewithlocals.com/know-before-you-go/it/
- ... (all 18 languages)

## Tech Stack

- **Frontend:** React 18, Vite
- **Styling:** Tailwind CSS
- **PWA:** vite-plugin-pwa
- **Static Pages:** Pure HTML/CSS (no framework)
- **Hosting:** Apache on Hostinger

## License

Copyright 2026 Florence with Locals. All rights reserved.
