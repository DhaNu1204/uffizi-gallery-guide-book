import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import fs from 'fs';
import path from 'path';

// Plugin to serve static HTML files from know-before-you-go
function serveStaticPages() {
  return {
    name: 'serve-static-pages',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith('/know-before-you-go/')) {
          // Normalize URL path for Windows compatibility
          const urlPath = req.url.split('?')[0]; // Remove query string
          const relativePath = urlPath.replace(/^\//, ''); // Remove leading slash
          let filePath = path.join(process.cwd(), 'public', relativePath);

          // If URL ends with / or no extension, try index.html
          if (urlPath.endsWith('/') || !path.extname(urlPath)) {
            filePath = path.join(filePath, 'index.html');
          }

          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath);
            const ext = path.extname(filePath).toLowerCase();
            const mimeTypes = {
              '.html': 'text/html; charset=utf-8',
              '.jpg': 'image/jpeg',
              '.jpeg': 'image/jpeg',
              '.png': 'image/png',
              '.css': 'text/css',
              '.js': 'application/javascript'
            };
            res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
            res.end(content);
            return;
          }
        }
        next();
      });
    }
  };
}

// https://vitejs.dev/config/
// Deployed to: uffizi.nextaudioguides.com
export default defineConfig({
  base: '/',
  plugins: [
    serveStaticPages(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Uffizi Unveiled',
        short_name: 'Uffizi Guide',
        description: 'A Progressive Web App guidebook for 40 masterpieces at the Uffizi Gallery in Florence. Works offline with 11 language support.',
        theme_color: '#92400e',
        background_color: '#fffbeb',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/placehold\.co\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'placeholder-images',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  preview: {
    port: 4173
  }
});
