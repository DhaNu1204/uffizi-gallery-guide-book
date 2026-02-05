const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const HERO_DIR = path.join(__dirname, '../public/images/hero');
const THUMB_DIR = path.join(__dirname, '../public/images/thumbnails');
const THUMB_SIZE = 100; // 100x100 pixels

async function generateThumbnails() {
    console.log('Generating thumbnails from hero images...\n');

    // Ensure thumbnails directory exists
    if (!fs.existsSync(THUMB_DIR)) {
        fs.mkdirSync(THUMB_DIR, { recursive: true });
    }

    // Get all jpg files from hero directory
    const files = fs.readdirSync(HERO_DIR).filter(file =>
        file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')
    );

    console.log(`Found ${files.length} hero images\n`);

    let successCount = 0;
    let errorCount = 0;

    for (const file of files) {
        const inputPath = path.join(HERO_DIR, file);
        const outputPath = path.join(THUMB_DIR, file);

        try {
            await sharp(inputPath)
                .resize(THUMB_SIZE, THUMB_SIZE, {
                    fit: 'cover',      // Crop to fill the square
                    position: 'center' // Center the crop
                })
                .jpeg({ quality: 85 }) // Good quality for small images
                .toFile(outputPath);

            console.log(`✓ ${file}`);
            successCount++;
        } catch (error) {
            console.error(`✗ ${file}: ${error.message}`);
            errorCount++;
        }
    }

    console.log(`\n---------------------------------`);
    console.log(`Thumbnails generated: ${successCount}`);
    console.log(`Errors: ${errorCount}`);
    console.log(`Output directory: ${THUMB_DIR}`);
}

generateThumbnails().catch(console.error);
