import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from '@sentry/react';
import App from './App.jsx';
import './index.css';

// Initialize Sentry (production only)
if (import.meta.env.PROD) {
  Sentry.init({
    dsn: 'https://0977d0cca077c38ba40911aacf5c1b0a@o4510711031201792.ingest.de.sentry.io/4510742325362768',
    environment: import.meta.env.MODE,

    // Performance Monitoring
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],

    // Performance monitoring sample rate (10% of transactions)
    tracesSampleRate: 0.1,

    // Session Replay sample rate
    replaysSessionSampleRate: 0.1, // 10% of sessions
    replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors

    // Only send errors from production domain
    beforeSend(event) {
      // Filter out development errors
      if (window.location.hostname === 'localhost') {
        return null;
      }
      return event;
    },
  });
}

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={<ErrorFallback />}>
      <App />
    </Sentry.ErrorBoundary>
  </React.StrictMode>
);

// Error Fallback Component
function ErrorFallback() {
  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-6">
      <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
        <div className="text-6xl mb-4">😔</div>
        <h1 className="text-2xl font-serif font-bold text-amber-900 mb-2">
          Something went wrong
        </h1>
        <p className="text-gray-600 mb-6">
          We're sorry, but something unexpected happened. Please try refreshing the page.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition font-medium"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}
