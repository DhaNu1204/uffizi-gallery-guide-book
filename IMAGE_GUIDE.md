# Uffizi Unveiled - Image Guide

This guide provides all the information needed to add images to the Uffizi Unveiled app.

## Folder Structure

```
public/
└── images/
    ├── hero/           # Large detail view images (600x400px recommended)
    │   ├── placeholder.jpg
    │   ├── GIOTTO_MAESTA.jpg
    │   ├── BOTTICELLI_PRIMAVERA.jpg
    │   └── ... (14 images total)
    │
    └── thumbnails/     # Small list view images (100x100px recommended)
        ├── placeholder.jpg
        ├── GIOTTO_MAESTA.jpg
        ├── BOTTICELLI_PRIMAVERA.jpg
        └── ... (14 images total)
```

## Image Specifications

### Hero Images (Detail View)
- **Location:** `public/images/hero/`
- **Size:** 600x400 pixels (3:2 aspect ratio)
- **Format:** JPG (recommended) or PNG
- **Quality:** 80-90% compression
- **Max file size:** ~100KB per image

### Thumbnail Images (List View)
- **Location:** `public/images/thumbnails/`
- **Size:** 100x100 pixels (1:1 square)
- **Format:** JPG (recommended) or PNG
- **Quality:** 80% compression
- **Max file size:** ~15KB per image

## Complete Image List (14 Masterpieces)

Replace the placeholder images with your own. Use **EXACT** filenames below:

| # | Filename | Artist | Artwork Title | Room |
|---|----------|--------|---------------|------|
| 1 | `GIOTTO_MAESTA.jpg` | Giotto di Bondone | Maesta (Ognissanti Madonna) | A4 |
| 2 | `BOTTICELLI_PRIMAVERA.jpg` | Sandro Botticelli | Primavera (Spring) | A9 |
| 3 | `BOTTICELLI_BIRTH_OF_VENUS.jpg` | Sandro Botticelli | Birth of Venus | A9 |
| 4 | `FILIPPO_LIPPI_MADONNA.jpg` | Filippo Lippi | Madonna and Child with Two Angels | A9 |
| 5 | `TRIBUNA_MEDICI_VENUS.jpg` | Unknown (Roman copy) | Medici Venus | A16 |
| 6 | `DURER_ADORATION.jpg` | Albrecht Durer | Adoration of the Magi | A20 |
| 7 | `PIERO_DELLA_FRANCESCA_DIPTYCH.jpg` | Piero della Francesca | Diptych of Duke/Duchess of Urbino | A25 |
| 8 | `LEONARDO_ANNUNCIATION.jpg` | Leonardo da Vinci | Annunciation | A35 |
| 9 | `MICHELANGELO_TONDO_DONI.jpg` | Michelangelo Buonarroti | Tondo Doni (Holy Family) | A38 |
| 10 | `RAPHAEL_MADONNA_GOLDFINCH.jpg` | Raphael | Madonna of the Goldfinch | A38 |
| 11 | `TITIAN_VENUS_URBINO.jpg` | Titian | Venus of Urbino | D23 |
| 12 | `CARAVAGGIO_MEDUSA.jpg` | Caravaggio | Head of Medusa | E4 |
| 13 | `ARTEMISIA_JUDITH.jpg` | Artemisia Gentileschi | Judith and Holofernes | E4 |
| 14 | `CERUTI_MENDICANTE.jpg` | Giacomo Ceruti | The Moorish Beggar | D18 |

## Quick Setup Steps

### Step 1: Prepare Your Images
1. Obtain high-quality images of each masterpiece
2. Resize hero images to 600x400px
3. Resize thumbnails to 100x100px (crop to square)
4. Save as JPG with 80-90% quality

### Step 2: Name Your Files
Use the **exact filenames** from the table above. Example:
- `BOTTICELLI_BIRTH_OF_VENUS.jpg` (correct)
- `botticelli_birth_of_venus.jpg` (WRONG - case sensitive!)
- `Birth of Venus.jpg` (WRONG - wrong name!)

### Step 3: Copy to Folders
```bash
# Copy hero images
cp your-images/*.jpg public/images/hero/

# Copy thumbnails
cp your-thumbnails/*.jpg public/images/thumbnails/
```

### Step 4: Test
```bash
npm run dev
```
Open http://localhost:3000 and verify all images load correctly.

## Image Sources (Public Domain)

These Renaissance masterpieces are in the public domain. You can find high-quality images at:

1. **Wikimedia Commons** - https://commons.wikimedia.org
2. **Google Arts & Culture** - https://artsandculture.google.com
3. **Uffizi Gallery Official** - https://www.uffizi.it
4. **Web Gallery of Art** - https://www.wga.hu

## Optimization Tips

### For Best Performance:
1. Use **JPG** format (smaller file size than PNG)
2. Compress images to **80% quality**
3. Use tools like:
   - [TinyJPG](https://tinyjpg.com) - Online compression
   - [ImageOptim](https://imageoptim.com) - Mac app
   - [Squoosh](https://squoosh.app) - Google's online tool

### Total Size Target:
- 14 hero images @ ~100KB = ~1.4MB
- 14 thumbnails @ ~15KB = ~210KB
- **Total: ~1.6MB** (well within 5MB PWA budget)

## Troubleshooting

### Images Not Loading?
1. Check filename matches EXACTLY (case-sensitive)
2. Verify file is in correct folder (`hero/` or `thumbnails/`)
3. Check file extension is `.jpg` (not `.jpeg` or `.JPG`)
4. Clear browser cache and refresh

### Wrong Image Showing?
1. The placeholder image shows when the specific image is missing
2. Check the browser console for 404 errors
3. Verify the image key matches the data key in `App.jsx`

## File Checklist

Use this checklist to track your progress:

### Hero Images (`public/images/hero/`)
- [ ] GIOTTO_MAESTA.jpg
- [ ] BOTTICELLI_PRIMAVERA.jpg
- [ ] BOTTICELLI_BIRTH_OF_VENUS.jpg
- [ ] FILIPPO_LIPPI_MADONNA.jpg
- [ ] TRIBUNA_MEDICI_VENUS.jpg
- [ ] DURER_ADORATION.jpg
- [ ] PIERO_DELLA_FRANCESCA_DIPTYCH.jpg
- [ ] LEONARDO_ANNUNCIATION.jpg
- [ ] MICHELANGELO_TONDO_DONI.jpg
- [ ] RAPHAEL_MADONNA_GOLDFINCH.jpg
- [ ] TITIAN_VENUS_URBINO.jpg
- [ ] CARAVAGGIO_MEDUSA.jpg
- [ ] ARTEMISIA_JUDITH.jpg
- [ ] CERUTI_MENDICANTE.jpg
- [ ] placeholder.jpg (fallback)

### Thumbnail Images (`public/images/thumbnails/`)
- [ ] GIOTTO_MAESTA.jpg
- [ ] BOTTICELLI_PRIMAVERA.jpg
- [ ] BOTTICELLI_BIRTH_OF_VENUS.jpg
- [ ] FILIPPO_LIPPI_MADONNA.jpg
- [ ] TRIBUNA_MEDICI_VENUS.jpg
- [ ] DURER_ADORATION.jpg
- [ ] PIERO_DELLA_FRANCESCA_DIPTYCH.jpg
- [ ] LEONARDO_ANNUNCIATION.jpg
- [ ] MICHELANGELO_TONDO_DONI.jpg
- [ ] RAPHAEL_MADONNA_GOLDFINCH.jpg
- [ ] TITIAN_VENUS_URBINO.jpg
- [ ] CARAVAGGIO_MEDUSA.jpg
- [ ] ARTEMISIA_JUDITH.jpg
- [ ] CERUTI_MENDICANTE.jpg
- [ ] placeholder.jpg (fallback)

---

Once all images are in place, run `npm run build` to create the production bundle with all images included for offline use.
