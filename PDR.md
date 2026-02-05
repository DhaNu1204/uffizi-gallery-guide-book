# Uffizi Unveiled - Product Requirements Document (PRD)

**Project Name:** Uffizi Unveiled
**Version:** 4.0 (Multilanguage Release)
**Date:** January 2026
**Live URL:** https://uffizi.nextaudioguides.com

---

## 1. Project Vision & Narrative Style

### 1.1 The Grand Tour Experience
The Uffizi is more than just a gallery; it is the cradle of the Renaissance. Our application adopts a personal, storytelling, and conversational tone, guiding users through the chronological evolution of Western art across two museum floors.

### 1.2 Goals and Objectives

| Goal Area | Metric | Target | Status |
|-----------|--------|--------|--------|
| User Experience | Average Time to Load Content (Offline) | < 1 second | Achieved |
| Availability | Offline Functionality (PWA Cache) | 100% of content | Achieved |
| Content Depth | Artworks Catalogued | 44 works | Achieved |
| Content Depth | Introduction Sections | 7 sections | Achieved |
| Technical Footprint | Initial App Bundle Size | < 5 MB | ~694 KB (code only) |
| Internationalization | Languages Supported | 15 languages | Achieved |
| Accessibility | RTL Language Support | Arabic | Achieved |

---

## 2. Features (V4.0 - Current)

### 2.1 Core Features

| ID | Feature | Description | Status |
|----|---------|-------------|--------|
| F1 | Welcome Page | Entry screen with company logo, language selector | Complete |
| F2 | Main Menu | Navigation to Introduction, Second Floor, First Floor | Complete |
| F3 | Introduction | 7 sections about Uffizi history with images | Complete |
| F4 | Floor Navigation | Browse artworks by floor (Second/First) | Complete |
| F5 | Artwork List | Scrollable list with thumbnails and room codes | Complete |
| F6 | Artwork Detail | Full info with hero image, description, viewing tips | Complete |
| F7 | Offline PWA | Full offline functionality after initial load | Complete |
| F8 | Bottom Navigation | 4-tab navigation (Intro, 2nd Floor, 1st Floor, Menu) | Complete |
| F9 | Deep Linking | Hash-based URLs for sharing specific artworks | Complete |
| F10 | **Multi-Language** | 15 languages with custom i18n system | Complete |
| F11 | **Language Selector** | Searchable modal with popular languages section | Complete |
| F12 | **RTL Support** | Right-to-left layout for Arabic | Complete |
| F13 | **Language Persistence** | Saves user preference to localStorage | Complete |

### 2.2 User Flow
```
Welcome Page (with language selector)
      ↓
Main Menu
      ├── Introduction → Section List → Section Detail
      ├── Second Floor → Artwork List → Artwork Detail
      └── First Floor → Artwork List → Artwork Detail
```

---

## 3. Supported Languages

| Code | Language | Native Name | RTL | Popular |
|------|----------|-------------|-----|---------|
| en | English | English | No | Yes |
| it | Italian | Italiano | No | Yes |
| es | Spanish | Español | No | Yes |
| fr | French | Français | No | Yes |
| de | German | Deutsch | No | Yes |
| zh | Chinese | 中文 | No | Yes |
| ja | Japanese | 日本語 | No | No |
| ko | Korean | 한국어 | No | No |
| pt | Portuguese | Português | No | No |
| ru | Russian | Русский | No | No |
| ar | Arabic | العربية | Yes | No |
| nl | Dutch | Nederlands | No | No |
| pl | Polish | Polski | No | No |
| el | Greek | Ελληνικά | No | No |
| hi | Hindi | हिन्दी | No | No |

---

## 4. Technical Specifications

### 4.1 Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Frontend | React (Functional Components/Hooks) | 18.2.0 |
| Styling | Tailwind CSS | 3.3.6 |
| Build Tool | Vite | 5.0.8 |
| PWA | vite-plugin-pwa | 0.17.4 |
| Icons | Lucide React | 0.294.0 |
| Error Monitoring | Sentry | Latest |
| i18n | Custom Implementation | - |

### 4.2 Build Output

| Content | Size |
|---------|------|
| Data (45 JSON files, 15 languages) | ~825 KB |
| App Code (JS/CSS/HTML) | ~694 KB |
| PWA Assets | ~50 KB |
| Images (hero + thumbnails) | ~2.5 MB |
| Total Precache | ~1.85 MB |

### 4.3 Project Structure
```
uffizi-guide/
├── public/
│   ├── data/
│   │   ├── introduction.json     # English fallback
│   │   ├── second-floor.json     # English fallback
│   │   ├── first-floor.json      # English fallback
│   │   ├── ar/                   # Arabic (RTL)
│   │   │   ├── introduction.json
│   │   │   ├── second-floor.json
│   │   │   └── first-floor.json
│   │   ├── de/                   # German
│   │   ├── el/                   # Greek
│   │   ├── en/                   # English
│   │   ├── es/                   # Spanish
│   │   ├── fr/                   # French
│   │   ├── hi/                   # Hindi
│   │   ├── it/                   # Italian
│   │   ├── ja/                   # Japanese
│   │   ├── ko/                   # Korean
│   │   ├── nl/                   # Dutch
│   │   ├── pl/                   # Polish
│   │   ├── pt/                   # Portuguese
│   │   ├── ru/                   # Russian
│   │   └── zh/                   # Chinese
│   ├── images/
│   │   ├── hero/                 # Full-size images
│   │   │   └── introduction/     # Introduction images
│   │   ├── thumbnails/           # Thumbnail images
│   │   │   └── introduction/     # Introduction thumbnails
│   │   └── logo/                 # Company logo
│   ├── manifest.json             # PWA Manifest
│   └── .htaccess                 # Apache configuration
├── src/
│   ├── App.jsx                   # Main application (~1030 lines)
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Tailwind styles
└── dist/                         # Production build output
```

---

## 5. Content Structure

### 5.1 Introduction (7 Sections)
1. What the Uffizi Is
2. Why It Was Built
3. How the Museum Began
4. The Tribuna
5. The Vasari Corridor
6. From Dynastic Collection to Public Heritage
7. The Visitor Route Today

### 5.2 Second Floor - 26 Artworks (Rooms A1-A41)

| # | Artist | Title | Room |
|---|--------|-------|------|
| 1 | Giotto di Bondone | Ognissanti Madonna | A4 |
| 2 | Simone Martini & Lippo Memmi | Annunciation | A5 |
| 3 | Ambrogio Lorenzetti | Presentation at the Temple | A5 |
| 4 | Lorenzo Monaco | Coronation of the Virgin | A7 |
| 5 | Gentile da Fabriano | Adoration of the Magi | A7 |
| 6 | Masaccio & Masolino | Madonna and Child with St. Anne | A8 |
| 7 | Paolo Uccello | Battle of San Romano | A8 |
| 8 | Piero della Francesca | Duke and Duchess of Urbino | A9 |
| 9 | Filippo Lippi | Madonna and Child with Two Angels | A9 |
| 10 | Sandro Botticelli | Primavera (Spring) | A11-A12 |
| 11 | Sandro Botticelli | The Birth of Venus | A11-A12 |
| 12 | Sandro Botticelli | Madonna del Magnificat | A11-A12 |
| 13 | Hugo van der Goes | Portinari Triptych | A13 |
| 14 | Albrecht Durer | Adoration of the Magi | A20 |
| 15 | Baccio Bandinelli | Laocoon (sculpture) | A24 |
| 16 | Domenico Veneziano | Altarpiece of Santa Lucia dei Magnoli | A25 |
| 17 | Filippino Lippi | Adoration of the Magi | A28 |
| 18 | Piero di Cosimo | Perseus Freeing Andromeda | A30 |
| 19 | Luca Signorelli | Holy Family | A31 |
| 20 | Leonardo da Vinci | Annunciation | A35 |
| 21 | Leonardo da Vinci | Adoration of the Magi | A35 |
| 22 | Verrocchio & Leonardo | The Baptism of Christ | A35 |
| 23 | Michelangelo | Doni Tondo (Holy Family) | A38 |
| 24 | Raphael | Madonna del Cardellino | A38 |
| 25 | Raphael | Portraits of Agnolo and Maddalena Doni | A38 |
| 26 | Andrea del Sarto | Madonna of the Harpies | A41 |

### 5.3 First Floor - 18 Artworks (Rooms B-E)

| # | Artist | Title | Room |
|---|--------|-------|------|
| 1 | Titian | Venus of Urbino | B1-B6 |
| 2 | Parmigianino | Madonna with the Long Neck | B1-B6 |
| 3 | Bronzino | Portrait of Eleonora of Toledo | B1-B6 |
| 4 | Pontormo | Supper at Emmaus | B1-B6 |
| 5 | Rosso Fiorentino | Moses Defending the Daughters of Jethro | B1-B6 |
| 6 | Correggio | Adoration of the Christ Child | B1-B6 |
| 7 | Raphael | Portrait of Pope Leo X | D9 |
| 8 | Rubens | Portrait of Isabella Brandt | D15-D16 |
| 9 | Van Dyck | Portrait of Marguerite of Lorraine | D15-D16 |
| 10 | Rembrandt | Self-Portrait as a Young Man | D15-D16 |
| 11 | Velazquez | Self-Portrait | D15-D16 |
| 12 | Goya | Portrait of Maria Teresa de Vallabriga | D15-D16 |
| 13 | Caravaggio | Bacchus | E1-E4 |
| 14 | Caravaggio | Head of Medusa | E1-E4 |
| 15 | Caravaggio | Sacrifice of Isaac | E1-E4 |
| 16 | Artemisia Gentileschi | Judith Slaying Holofernes | E1-E4 |
| 17 | Guido Reni | David with the Head of Goliath | E1-E4 |
| 18 | Annibale Carracci | Bacchus | E1-E4 |

---

## 6. App Pages

| Page | Component | Description |
|------|-----------|-------------|
| Welcome | `WelcomePage` | Logo, language selector, "Enter Gallery Guide" button |
| Main Menu | `MainMenu` | Three navigation cards with artwork counts |
| Introduction | `IntroductionPage` | List of 7 history sections |
| Intro Detail | `IntroDetailPage` | Section content with hero image |
| Floor List | `FloorListPage` | Artwork list with thumbnails |
| Artwork Detail | `ArtworkDetailPage` | Full artwork view with viewing tips |
| Language Modal | `LanguageModal` | Searchable language selector overlay |

---

## 7. Deployment

### 7.1 Production Environment
- **URL:** https://uffizi.nextaudioguides.com
- **Server:** Hostinger
- **Path:** /home/u803853690/domains/nextaudioguides.com/public_html/uffizi

### 7.2 Build Commands
```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

### 7.3 Deployment Steps
1. Run `npm run build`
2. Upload entire `dist/` folder to server
3. Ensure `.htaccess` is included (for SPA routing)
4. Clear browser cache / service worker if updating

---

## 8. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Nov 2025 | Initial MVP with 14 masterpieces, basic language support |
| 2.0 | Dec 2025 | 16 languages, museum info, itineraries, live alerts |
| 3.0 | Jan 2026 | Floor-based navigation, 44 artworks, introduction sections, English only |
| **4.0** | **Jan 2026** | **15 languages, custom i18n system, RTL support, language selector modal** |

---

## 9. Future Roadmap

- [x] ~~Multi-language support (15 languages)~~ **COMPLETE**
- [x] ~~RTL layout for Arabic~~ **COMPLETE**
- [ ] Audio guide integration
- [ ] Interactive floor map
- [ ] Favorites/bookmarks feature
- [ ] Visitor tips and practical info section
- [ ] Additional languages (Thai, Vietnamese, Turkish)

---

## 10. Translation System

### 10.1 Architecture
- Custom i18n implementation (no external libraries)
- JSON-based translation files organized by language code
- UI strings embedded in each JSON file
- localStorage persistence for language preference

### 10.2 Data Structure
Each language folder contains 3 JSON files:
- `introduction.json` - 7 history sections + all UI strings
- `second-floor.json` - 26 artworks
- `first-floor.json` - 18 artworks

### 10.3 Adding New Languages
1. Create folder: `public/data/{lang_code}/`
2. Copy English JSON files as templates
3. Translate content and UI strings
4. Add language to `LANGUAGES` config in `App.jsx`
5. Rebuild and deploy

---

## 11. Technical Stats

| Metric | Value |
|--------|-------|
| Total Languages | 15 |
| Total Translation Files | 45 |
| Total Artworks | 44 |
| Introduction Sections | 7 |
| App.jsx Lines | ~1030 |
| Build Size (JS/CSS) | ~694 KB |
| Precache Size | ~1.85 MB |

---

## 12. Credits

- **Development:** Claude Code (Anthropic)
- **Content:** Curated selection of Uffizi Gallery masterpieces
- **Branding:** Florence With Locals
- **Tours:** https://www.florencewithlocals.com/

---

*Last Updated: 2026-01-21*
