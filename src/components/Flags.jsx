import React from 'react';

// Colorful SVG Flag Components - Works Offline
export const FlagGB = ({ className = "w-5 h-4" }) => (
    <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="40" fill="#012169" />
        <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8" />
        <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="12" />
        <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
);

export const FlagIT = ({ className = "w-5 h-4" }) => (
    <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
        <rect width="20" height="40" fill="#009246" />
        <rect x="20" width="20" height="40" fill="#fff" />
        <rect x="40" width="20" height="40" fill="#CE2B37" />
    </svg>
);

export const FlagES = ({ className = "w-5 h-4" }) => (
    <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="40" fill="#AA151B" />
        <rect y="10" width="60" height="20" fill="#F1BF00" />
    </svg>
);

export const FlagDE = ({ className = "w-5 h-4" }) => (
    <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="13.33" fill="#000" />
        <rect y="13.33" width="60" height="13.33" fill="#DD0000" />
        <rect y="26.66" width="60" height="13.34" fill="#FFCC00" />
    </svg>
);

export const FlagFR = ({ className = "w-5 h-4" }) => (
    <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
        <rect width="20" height="40" fill="#002395" />
        <rect x="20" width="20" height="40" fill="#fff" />
        <rect x="40" width="20" height="40" fill="#ED2939" />
    </svg>
);

// Greek Flag
export const FlagGR = ({ className = "w-5 h-4" }) => (
    <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="40" fill="#0D5EAF" />
        <rect y="4.44" width="60" height="4.44" fill="#fff" />
        <rect y="13.33" width="60" height="4.44" fill="#fff" />
        <rect y="22.22" width="60" height="4.44" fill="#fff" />
        <rect y="31.11" width="60" height="4.44" fill="#fff" />
        <rect width="22.22" height="22.22" fill="#0D5EAF" />
        <rect x="8.89" width="4.44" height="22.22" fill="#fff" />
        <rect y="8.89" width="22.22" height="4.44" fill="#fff" />
    </svg>
);

// Chinese Flag
export const FlagCN = ({ className = "w-5 h-4" }) => (
    <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="40" fill="#DE2910" />
        <g fill="#FFDE00">
            <polygon points="12,8 13.5,12.5 18,12.5 14.5,15.5 16,20 12,17 8,20 9.5,15.5 6,12.5 10.5,12.5" />
            <polygon points="24,4 24.6,6 26.5,6 25,7.2 25.6,9 24,8 22.4,9 23,7.2 21.5,6 23.4,6" />
            <polygon points="28,9 28.6,11 30.5,11 29,12.2 29.6,14 28,13 26.4,14 27,12.2 25.5,11 27.4,11" />
            <polygon points="28,16 28.6,18 30.5,18 29,19.2 29.6,21 28,20 26.4,21 27,19.2 25.5,18 27.4,18" />
            <polygon points="24,21 24.6,23 26.5,23 25,24.2 25.6,26 24,25 22.4,26 23,24.2 21.5,23 23.4,23" />
        </g>
    </svg>
);

// Japanese Flag
export const FlagJP = ({ className = "w-5 h-4" }) => (
    <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="40" fill="#fff" />
        <circle cx="30" cy="20" r="12" fill="#BC002D" />
    </svg>
);

// Portuguese Flag
export const FlagPT = ({ className = "w-5 h-4" }) => (
    <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="40" fill="#006600" />
        <rect x="24" width="36" height="40" fill="#FF0000" />
        <circle cx="24" cy="20" r="8" fill="#FFCC00" />
        <circle cx="24" cy="20" r="6" fill="#FF0000" />
        <circle cx="24" cy="20" r="4" fill="#fff" />
    </svg>
);

// Hungarian Flag
export const FlagHU = ({ className = "w-5 h-4" }) => (
    <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="13.33" fill="#CE2939" />
        <rect y="13.33" width="60" height="13.33" fill="#fff" />
        <rect y="26.66" width="60" height="13.34" fill="#477050" />
    </svg>
);

// Polish Flag
export const FlagPL = ({ className = "w-5 h-4" }) => (
    <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="20" fill="#fff" />
        <rect y="20" width="60" height="20" fill="#DC143C" />
    </svg>
);

// Russian Flag
export const FlagRU = ({ className = "w-5 h-4" }) => (
    <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="13.33" fill="#fff" />
        <rect y="13.33" width="60" height="13.33" fill="#0039A6" />
        <rect y="26.66" width="60" height="13.34" fill="#D52B1E" />
    </svg>
);

// South Korean Flag
export const FlagKR = ({ className = "w-5 h-4" }) => (
    <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="40" fill="#fff" />
        <circle cx="30" cy="20" r="10" fill="#C60C30" />
        <path d="M30,10 A10,10 0 0,1 30,30 A5,5 0 0,1 30,20 A5,5 0 0,0 30,10" fill="#003478" />
        <g stroke="#000" strokeWidth="2">
            <line x1="8" y1="8" x2="16" y2="14" />
            <line x1="10" y1="5" x2="18" y2="11" />
            <line x1="44" y1="26" x2="52" y2="32" />
            <line x1="42" y1="29" x2="50" y2="35" />
            <line x1="44" y1="8" x2="52" y2="14" />
            <line x1="42" y1="5" x2="50" y2="11" />
            <line x1="8" y1="26" x2="16" y2="32" />
            <line x1="10" y1="29" x2="18" y2="35" />
        </g>
    </svg>
);

// Dutch Flag
export const FlagNL = ({ className = "w-5 h-4" }) => (
    <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="13.33" fill="#AE1C28" />
        <rect y="13.33" width="60" height="13.33" fill="#fff" />
        <rect y="26.66" width="60" height="13.34" fill="#21468B" />
    </svg>
);

// Arabic (Saudi Arabia) Flag
export const FlagAR = ({ className = "w-5 h-4" }) => (
    <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="40" fill="#006C35" />
        <text x="30" y="22" textAnchor="middle" fill="#fff" fontSize="8" fontFamily="Arial">العربية</text>
        <rect x="10" y="28" width="12" height="6" fill="#fff" />
    </svg>
);

// Turkish Flag
export const FlagTR = ({ className = "w-5 h-4" }) => (
    <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="40" fill="#E30A17" />
        <circle cx="23" cy="20" r="10" fill="#fff" />
        <circle cx="26" cy="20" r="8" fill="#E30A17" />
        <polygon points="38,20 34,22 35.5,18.5 32,16 36,16" fill="#fff" />
    </svg>
);

// Flag component that renders the appropriate flag based on language code
export const Flag = ({ code, className = "w-5 h-4" }) => {
    const flags = {
        en: FlagGB,
        it: FlagIT,
        es: FlagES,
        de: FlagDE,
        fr: FlagFR,
        el: FlagGR,
        zh: FlagCN,
        ja: FlagJP,
        pt: FlagPT,
        hu: FlagHU,
        pl: FlagPL,
        ru: FlagRU,
        ko: FlagKR,
        nl: FlagNL,
        ar: FlagAR,
        tr: FlagTR,
    };

    const FlagComponent = flags[code];
    return FlagComponent ? <FlagComponent className={className} /> : null;
};

export default Flag;
