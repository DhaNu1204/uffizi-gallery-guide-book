const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const LOGO_PATH = path.join(PUBLIC_DIR, 'images/logo/florence-with-locals-logo-white.webp');

// PWA icon sizes to generate
const ICON_SIZES = [
    { size: 192, name: 'pwa-192x192.png' },
    { size: 512, name: 'pwa-512x512.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 16, name: 'favicon-16x16.png' },
];

async function generatePwaIcons() {
    console.log('Generating PWA icons from logo...\n');

    // Check if logo exists
    if (!fs.existsSync(LOGO_PATH)) {
        console.error('Logo file not found:', LOGO_PATH);
        process.exit(1);
    }

    let successCount = 0;

    for (const icon of ICON_SIZES) {
        const outputPath = path.join(PUBLIC_DIR, icon.name);

        try {
            // Create a square icon with amber background and centered logo
            const background = Buffer.from(
                `<svg width="${icon.size}" height="${icon.size}">
                    <rect width="${icon.size}" height="${icon.size}" fill="#92400e"/>
                </svg>`
            );

            // Get logo dimensions
            const logoMeta = await sharp(LOGO_PATH).metadata();
            const logoSize = Math.floor(icon.size * 0.6); // Logo takes 60% of icon

            // Resize logo
            const resizedLogo = await sharp(LOGO_PATH)
                .resize(logoSize, logoSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
                .toBuffer();

            // Composite logo on background
            await sharp(background)
                .composite([{
                    input: resizedLogo,
                    gravity: 'center'
                }])
                .png()
                .toFile(outputPath);

            console.log(`✓ ${icon.name} (${icon.size}x${icon.size})`);
            successCount++;
        } catch (error) {
            console.error(`✗ ${icon.name}: ${error.message}`);
        }
    }

    // Generate favicon.ico (use 32x32 png)
    try {
        const favicon32 = path.join(PUBLIC_DIR, 'favicon-32x32.png');
        if (fs.existsSync(favicon32)) {
            fs.copyFileSync(favicon32, path.join(PUBLIC_DIR, 'favicon.ico'));
            console.log('✓ favicon.ico (copied from favicon-32x32.png)');
        }
    } catch (error) {
        console.error('✗ favicon.ico:', error.message);
    }

    // Generate mask-icon.svg (simple SVG version)
    try {
        const maskIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <rect width="100" height="100" rx="20" fill="#92400e"/>
            <text x="50" y="65" text-anchor="middle" font-size="40" font-family="serif" fill="white">U</text>
        </svg>`;
        fs.writeFileSync(path.join(PUBLIC_DIR, 'mask-icon.svg'), maskIcon);
        console.log('✓ mask-icon.svg');
    } catch (error) {
        console.error('✗ mask-icon.svg:', error.message);
    }

    console.log(`\n---------------------------------`);
    console.log(`Icons generated: ${successCount}/${ICON_SIZES.length}`);
    console.log(`Output directory: ${PUBLIC_DIR}`);
}

generatePwaIcons().catch(console.error);
