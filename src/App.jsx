import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { BookOpen, X, ChevronLeft, ChevronRight, Loader2, ArrowRight, Building2, Home, Palette, MapPin, Globe, Search } from 'lucide-react';
import * as Flags from 'country-flag-icons/react/3x2';

// Flag component wrapper for country-flag-icons
const Flag = ({ code, size = 'm' }) => {
    const FlagComponent = Flags[code];
    if (!FlagComponent) return <span className="text-gray-400">?</span>;

    const sizeClasses = {
        s: 'w-5 h-3.5',
        m: 'w-6 h-4',
        l: 'w-8 h-5'
    };

    return <FlagComponent className={`${sizeClasses[size]} rounded-sm inline-block`} />;
};

// --- Static Image Paths ---
const getHeroImage = (imagePath) => imagePath || '/images/hero/placeholder.webp';
const getThumbnailImage = (imagePath) => imagePath || '/images/thumbnails/placeholder.webp';

// Fallback placeholder if image not found
const PLACEHOLDER_HERO = '/images/hero/placeholder.webp';
const PLACEHOLDER_THUMB = '/images/thumbnails/placeholder.webp';

// --- Supported Languages (15 languages) ---
// countryCode is ISO 3166-1 alpha-2 for react-flagpack
const LANGUAGES = {
    en: { code: 'en', name: 'English', nativeName: 'English', countryCode: 'GB', rtl: false, popular: true },
    it: { code: 'it', name: 'Italian', nativeName: 'Italiano', countryCode: 'IT', rtl: false, popular: true },
    es: { code: 'es', name: 'Spanish', nativeName: 'Español', countryCode: 'ES', rtl: false, popular: true },
    fr: { code: 'fr', name: 'French', nativeName: 'Français', countryCode: 'FR', rtl: false, popular: true },
    de: { code: 'de', name: 'German', nativeName: 'Deutsch', countryCode: 'DE', rtl: false, popular: false },
    pt: { code: 'pt', name: 'Portuguese', nativeName: 'Português', countryCode: 'PT', rtl: false, popular: false },
    nl: { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', countryCode: 'NL', rtl: false, popular: false },
    pl: { code: 'pl', name: 'Polish', nativeName: 'Polski', countryCode: 'PL', rtl: false, popular: false },
    ru: { code: 'ru', name: 'Russian', nativeName: 'Русский', countryCode: 'RU', rtl: false, popular: false },
    zh: { code: 'zh', name: 'Chinese', nativeName: '中文', countryCode: 'CN', rtl: false, popular: false },
    ja: { code: 'ja', name: 'Japanese', nativeName: '日本語', countryCode: 'JP', rtl: false, popular: false },
    ko: { code: 'ko', name: 'Korean', nativeName: '한국어', countryCode: 'KR', rtl: false, popular: false },
    ar: { code: 'ar', name: 'Arabic', nativeName: 'العربية', countryCode: 'SA', rtl: true, popular: false },
    hi: { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', countryCode: 'IN', rtl: false, popular: false },
    el: { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', countryCode: 'GR', rtl: false, popular: false }
};

const DEFAULT_LANGUAGE = 'en';

// --- Browser Language Detection ---
const detectBrowserLanguage = () => {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0].toLowerCase();
    return LANGUAGES[langCode] ? langCode : DEFAULT_LANGUAGE;
};

// --- RTL Helper ---
const isRTL = (langCode) => LANGUAGES[langCode]?.rtl || false;

// --- Data File Paths (language-aware) ---
const getDataPaths = (lang) => ({
    introduction: `/data/${lang}/introduction.json`,
    secondFloor: `/data/${lang}/second-floor.json`,
    firstFloor: `/data/${lang}/first-floor.json`
});

// App pages
const PAGES = {
    WELCOME: 'welcome',
    MAIN_MENU: 'main_menu',
    INTRODUCTION: 'introduction',
    INTRO_DETAIL: 'intro_detail',
    FLOOR_LIST: 'floor_list',
    ARTWORK_DETAIL: 'artwork_detail'
};

const App = () => {
    // --- Navigation State ---
    const [currentPage, setCurrentPage] = useState(PAGES.WELCOME);

    // --- Language State (with browser detection) ---
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        const saved = localStorage.getItem('uffizi-language');
        if (saved && LANGUAGES[saved]) return saved;
        // First visit: detect browser language
        return detectBrowserLanguage();
    });
    const [showLanguageSelector, setShowLanguageSelector] = useState(false);
    const [languageSearch, setLanguageSearch] = useState('');

    // --- RTL Direction Effect ---
    useEffect(() => {
        document.documentElement.dir = isRTL(currentLanguage) ? 'rtl' : 'ltr';
        document.documentElement.lang = currentLanguage;
    }, [currentLanguage]);

    // --- Data State ---
    const [introductionData, setIntroductionData] = useState(null);
    const [secondFloorData, setSecondFloorData] = useState(null);
    const [firstFloorData, setFirstFloorData] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);

    // --- UI Strings State (for translations) ---
    const [uiStrings, setUiStrings] = useState(null);

    // --- Content Selection State ---
    const [activeFloor, setActiveFloor] = useState(null); // 'second' | 'first'
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [selectedIntroSection, setSelectedIntroSection] = useState(null);

    // --- UI State ---
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // --- Load UI Strings (early fetch for welcome page) ---
    const loadUiStrings = useCallback(async (lang = currentLanguage) => {
        const paths = getDataPaths(lang);
        try {
            const res = await fetch(paths.introduction);
            if (res.ok) {
                const data = await res.json();
                setUiStrings(data.ui || null);
            }
        } catch (err) {
            console.error('Error loading UI strings:', err);
        }
    }, [currentLanguage]);

    // Pre-fetch UI strings when language changes (for welcome page)
    useEffect(() => {
        loadUiStrings();
    }, [currentLanguage, loadUiStrings]);

    // --- Load All Data ---
    const loadAllData = useCallback(async (lang = currentLanguage) => {
        setLoading(true);
        setError(null);

        const paths = getDataPaths(lang);

        try {
            const [introRes, secondRes, firstRes] = await Promise.all([
                fetch(paths.introduction),
                fetch(paths.secondFloor),
                fetch(paths.firstFloor)
            ]);

            if (!introRes.ok || !secondRes.ok || !firstRes.ok) {
                throw new Error('Failed to load data files');
            }

            const [introData, secondData, firstData] = await Promise.all([
                introRes.json(),
                secondRes.json(),
                firstRes.json()
            ]);

            setIntroductionData(introData);
            setSecondFloorData(secondData);
            setFirstFloorData(firstData);
            setUiStrings(introData.ui || null); // Also update UI strings
            setDataLoaded(true);
        } catch (err) {
            console.error('Error loading data:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [currentLanguage]);

    // --- Language Change Handler ---
    const handleLanguageChange = (langCode) => {
        if (langCode !== currentLanguage && LANGUAGES[langCode]) {
            setCurrentLanguage(langCode);
            localStorage.setItem('uffizi-language', langCode);
            setDataLoaded(false); // Force reload with new language
            setShowLanguageSelector(false);
        }
    };

    // Load data when entering main menu or language changes
    useEffect(() => {
        if (currentPage === PAGES.MAIN_MENU && !dataLoaded) {
            loadAllData();
        }
    }, [currentPage, dataLoaded, loadAllData]);

    // Handle hash changes for deep linking
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.substring(1);
            if (hash && dataLoaded) {
                // Check second floor
                const secondFloorItem = secondFloorData?.items?.find(item => item.id === hash);
                if (secondFloorItem && secondFloorItem.type === 'artwork') {
                    setActiveFloor('second');
                    setSelectedItemId(hash);
                    setCurrentPage(PAGES.ARTWORK_DETAIL);
                    return;
                }
                // Check first floor
                const firstFloorItem = firstFloorData?.items?.find(item => item.id === hash);
                if (firstFloorItem && firstFloorItem.type === 'artwork') {
                    setActiveFloor('first');
                    setSelectedItemId(hash);
                    setCurrentPage(PAGES.ARTWORK_DETAIL);
                    return;
                }
            }
        };

        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [dataLoaded, secondFloorData, firstFloorData]);

    // --- Navigation Handlers ---
    const handleEnterApp = () => {
        setCurrentPage(PAGES.MAIN_MENU);
    };

    const handleGoToIntroduction = () => {
        setCurrentPage(PAGES.INTRODUCTION);
        setActiveFloor(null);
    };

    const handleGoToFloor = (floor) => {
        setActiveFloor(floor);
        setCurrentPage(PAGES.FLOOR_LIST);
    };

    const handleSelectIntroSection = (index) => {
        setSelectedIntroSection(index);
        setCurrentPage(PAGES.INTRO_DETAIL);
    };

    const handleSelectArtwork = (itemId) => {
        window.location.hash = itemId;
        setSelectedItemId(itemId);
        setCurrentPage(PAGES.ARTWORK_DETAIL);
    };

    const handleBackToFloorList = () => {
        window.location.hash = '';
        setSelectedItemId(null);
        setCurrentPage(PAGES.FLOOR_LIST);
    };

    const handleBackToIntroList = () => {
        setSelectedIntroSection(null);
        setCurrentPage(PAGES.INTRODUCTION);
    };

    const handleBackToMainMenu = () => {
        setCurrentPage(PAGES.MAIN_MENU);
        setActiveFloor(null);
        setSelectedItemId(null);
        setSelectedIntroSection(null);
        window.location.hash = '';
    };

    // --- Helper Functions ---
    const getActiveFloorData = () => {
        return activeFloor === 'second' ? secondFloorData : firstFloorData;
    };

    const getArtworkById = (id) => {
        const floorData = getActiveFloorData();
        return floorData?.items?.find(item => item.id === id);
    };

    const getArtworksInOrder = (floorData) => {
        return floorData?.items?.filter(item => item.type === 'artwork' || item.type === 'sculpture') || [];
    };

    // ==================== LANGUAGE SELECTOR (Compact Button) ====================
    const LanguageSelector = ({ compact = false }) => {
        const currentLang = LANGUAGES[currentLanguage];

        if (compact) {
            return (
                <button
                    onClick={() => setShowLanguageSelector(true)}
                    className="flex items-center space-x-2 px-3 py-2 bg-white/90 rounded-lg shadow-sm hover:bg-white transition min-w-[80px]"
                    aria-label="Change language"
                >
                    <Flag code={currentLang.countryCode} size="m" />
                    <span className="text-sm font-medium text-amber-800">{currentLang.code.toUpperCase()}</span>
                    <ChevronRight className="w-3 h-3 text-amber-600 rotate-90" />
                </button>
            );
        }

        // Welcome page: show button to open modal + language count
        return (
            <div className="text-center space-y-3">
                <button
                    onClick={() => setShowLanguageSelector(true)}
                    className="inline-flex items-center space-x-3 px-6 py-3 bg-white rounded-xl shadow-md hover:shadow-lg transition border-2 border-amber-200 hover:border-amber-400"
                >
                    <Globe className="w-5 h-5 text-amber-600" />
                    <Flag code={currentLang.countryCode} size="m" />
                    <span className="font-medium text-amber-900">{currentLang.nativeName}</span>
                    <ChevronRight className="w-4 h-4 text-amber-500" />
                </button>
                <p className="text-sm text-amber-600">{uiStrings?.welcome?.languagesAvailable || '15 languages available'}</p>
            </div>
        );
    };

    // ==================== LANGUAGE MODAL (Full-Screen, Searchable) ====================
    const LanguageModal = () => {
        if (!showLanguageSelector) return null;

        // Filter languages based on search
        const filteredLanguages = useMemo(() => {
            if (!languageSearch.trim()) return Object.values(LANGUAGES);
            const search = languageSearch.toLowerCase();
            return Object.values(LANGUAGES).filter(lang =>
                lang.name.toLowerCase().includes(search) ||
                lang.nativeName.toLowerCase().includes(search) ||
                lang.code.toLowerCase().includes(search)
            );
        }, [languageSearch]);

        const popularLanguages = filteredLanguages.filter(l => l.popular);
        const otherLanguages = filteredLanguages.filter(l => !l.popular);

        const handleSelectLanguage = (langCode) => {
            handleLanguageChange(langCode);
            setLanguageSearch('');
        };

        const closeModal = () => {
            setShowLanguageSelector(false);
            setLanguageSearch('');
        };

        return (
            <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center">
                <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md max-h-[85vh] flex flex-col animate-slide-up">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-100">
                        <div>
                            <h3 className="text-xl font-serif font-bold text-amber-900">{uiStrings?.languageModal?.title || 'Select Language'}</h3>
                            <p className="text-sm text-gray-500">{uiStrings?.languageModal?.subtitle || 'Choose your preferred language'}</p>
                        </div>
                        <button
                            onClick={closeModal}
                            className="p-2 hover:bg-gray-100 rounded-full transition"
                            aria-label="Close"
                        >
                            <X className="w-6 h-6 text-gray-400" />
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="p-4 border-b border-gray-100">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={languageSearch}
                                onChange={(e) => setLanguageSearch(e.target.value)}
                                placeholder={uiStrings?.languageModal?.searchPlaceholder || 'Search languages...'}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-800"
                            />
                        </div>
                    </div>

                    {/* Language List (Scrollable) */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {/* Popular Languages */}
                        {popularLanguages.length > 0 && !languageSearch && (
                            <div>
                                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">{uiStrings?.languageModal?.popular || 'Popular'}</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    {popularLanguages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => handleSelectLanguage(lang.code)}
                                            className={`flex items-center space-x-2 p-3 rounded-xl transition ${
                                                currentLanguage === lang.code
                                                    ? 'bg-amber-100 border-2 border-amber-500 shadow-sm'
                                                    : 'bg-gray-50 hover:bg-amber-50 border-2 border-transparent'
                                            }`}
                                        >
                                            <Flag code={lang.countryCode} size="m" />
                                            <div className="flex-1 text-left min-w-0">
                                                <span className="block text-sm font-medium text-gray-800 truncate">{lang.nativeName}</span>
                                            </div>
                                            {currentLanguage === lang.code && (
                                                <span className="text-amber-600 font-bold text-sm">✓</span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* All/Other Languages */}
                        {(otherLanguages.length > 0 || languageSearch) && (
                            <div>
                                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">
                                    {languageSearch ? `${uiStrings?.languageModal?.results || 'Results'} (${filteredLanguages.length})` : (uiStrings?.languageModal?.allLanguages || 'All Languages')}
                                </h4>
                                <div className="grid grid-cols-2 gap-2">
                                    {(languageSearch ? filteredLanguages : otherLanguages).map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => handleSelectLanguage(lang.code)}
                                            className={`flex items-center space-x-2 p-3 rounded-xl transition ${
                                                currentLanguage === lang.code
                                                    ? 'bg-amber-100 border-2 border-amber-500 shadow-sm'
                                                    : 'bg-gray-50 hover:bg-amber-50 border-2 border-transparent'
                                            }`}
                                        >
                                            <Flag code={lang.countryCode} size="m" />
                                            <div className="flex-1 text-left min-w-0">
                                                <span className="block text-sm font-medium text-gray-800 truncate">{lang.nativeName}</span>
                                            </div>
                                            {currentLanguage === lang.code && (
                                                <span className="text-amber-600 font-bold text-sm">✓</span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* No Results */}
                        {filteredLanguages.length === 0 && (
                            <div className="text-center py-8">
                                <Globe className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500">{uiStrings?.languageModal?.noResults || 'No languages found'}</p>
                                <p className="text-sm text-gray-400">{uiStrings?.languageModal?.noResultsHint || 'Try a different search term'}</p>
                            </div>
                        )}
                    </div>

                    {/* Footer with RTL indicator */}
                    {LANGUAGES[currentLanguage]?.rtl && (
                        <div className="p-3 bg-amber-50 border-t border-amber-100 text-center">
                            <p className="text-xs text-amber-700">{uiStrings?.languageModal?.rtlEnabled || 'RTL layout enabled for'} {LANGUAGES[currentLanguage].nativeName}</p>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // ==================== WELCOME PAGE ====================
    const WelcomePage = () => (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex flex-col items-center justify-center p-6 relative">
            {/* Language Button - Top Right */}
            <div className="absolute top-4 right-4">
                <LanguageSelector compact />
            </div>

            <div className="max-w-md w-full text-center space-y-8">
                {/* Logo */}
                <div className="space-y-4">
                    <img
                        src="/images/logo/florence-with-locals-logo-white.webp"
                        alt="Florence With Locals"
                        className="w-48 mx-auto"
                    />
                    <h1 className="text-4xl font-serif font-bold text-amber-900">
                        {uiStrings?.welcome?.appTitle || 'Uffizi Unveiled'}
                    </h1>
                    <p className="text-lg text-amber-700">
                        {uiStrings?.welcome?.appSubtitle || 'Your Personal Art Guide'}
                    </p>
                </div>

                {/* Language Selector */}
                <div className="py-4">
                    <LanguageSelector />
                </div>

                {/* Enter Button */}
                <button
                    onClick={handleEnterApp}
                    className="w-full flex items-center justify-center p-5 bg-amber-600 text-white rounded-xl shadow-lg hover:bg-amber-700 transition duration-200 font-semibold text-xl"
                >
                    {uiStrings?.welcome?.enterButton || 'Enter Gallery Guide'}
                    <ArrowRight className="w-6 h-6 ml-3" />
                </button>

                {/* Footer note */}
                <p className="text-xs text-amber-600 mt-8">
                    {uiStrings?.welcome?.offlineNote || 'Works offline after first load'}
                </p>
            </div>

            {/* Language Modal */}
            <LanguageModal />
        </div>
    );

    // ==================== MAIN MENU ====================
    const MainMenu = () => {
        if (loading) {
            return (
                <div className="min-h-screen bg-amber-50 flex items-center justify-center">
                    <div className="text-center">
                        <Loader2 className="w-12 h-12 text-amber-600 animate-spin mx-auto mb-4" />
                        <p className="text-amber-800 font-medium">{uiStrings?.mainMenu?.loading || 'Loading gallery data...'}</p>
                    </div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="min-h-screen bg-amber-50 flex items-center justify-center p-6">
                    <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
                        <p className="text-red-600 font-medium mb-4">{uiStrings?.mainMenu?.errorTitle || 'Error loading data'}</p>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <button
                            onClick={() => { setDataLoaded(false); loadAllData(); }}
                            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
                        >
                            {uiStrings?.mainMenu?.tryAgain || 'Try Again'}
                        </button>
                    </div>
                </div>
            );
        }

        const secondFloorArtworks = secondFloorData?.items?.filter(i => i.type === 'artwork' || i.type === 'sculpture').length || 0;
        const firstFloorArtworks = firstFloorData?.items?.filter(i => i.type === 'artwork' || i.type === 'sculpture').length || 0;

        return (
            <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex flex-col">
                {/* Header */}
                <header className="p-4 text-center border-b border-amber-200 bg-white shadow-sm">
                    <h1 className="text-2xl font-serif font-bold text-amber-900 flex items-center justify-center">
                        <BookOpen className="w-6 h-6 mr-2 text-amber-600" />
                        {uiStrings?.mainMenu?.header || 'Uffizi Unveiled'}
                    </h1>
                </header>

                {/* Content */}
                <div className="flex-grow flex flex-col items-center justify-center p-6">
                    <div className="max-w-lg w-full space-y-4">
                        {/* Introduction */}
                        <button
                            onClick={handleGoToIntroduction}
                            className="w-full flex items-center p-5 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-200 border-l-4 border-amber-600"
                        >
                            <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                                <BookOpen className="w-7 h-7 text-amber-700" />
                            </div>
                            <div className="text-left flex-grow">
                                <h2 className="text-xl font-serif font-bold text-gray-800">{uiStrings?.mainMenu?.introduction || 'Introduction'}</h2>
                                <p className="text-sm text-gray-500">{uiStrings?.mainMenu?.introSubtitle || 'History of the Uffizi Gallery'}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-amber-600" />
                        </button>

                        {/* Second Floor */}
                        <button
                            onClick={() => handleGoToFloor('second')}
                            className="w-full flex items-center p-5 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-200 border-l-4 border-blue-600"
                        >
                            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                <Building2 className="w-7 h-7 text-blue-700" />
                            </div>
                            <div className="text-left flex-grow">
                                <h2 className="text-xl font-serif font-bold text-gray-800">{uiStrings?.mainMenu?.secondFloor || 'Second Floor'}</h2>
                                <p className="text-sm text-gray-500">Rooms A1-A41 · {secondFloorArtworks} {uiStrings?.mainMenu?.artworks || 'artworks'}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-blue-600" />
                        </button>

                        {/* First Floor */}
                        <button
                            onClick={() => handleGoToFloor('first')}
                            className="w-full flex items-center p-5 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-200 border-l-4 border-purple-600"
                        >
                            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                                <Building2 className="w-7 h-7 text-purple-700" />
                            </div>
                            <div className="text-left flex-grow">
                                <h2 className="text-xl font-serif font-bold text-gray-800">{uiStrings?.mainMenu?.firstFloor || 'First Floor'}</h2>
                                <p className="text-sm text-gray-500">Rooms B-E · {firstFloorArtworks} {uiStrings?.mainMenu?.artworks || 'artworks'}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-purple-600" />
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <footer className="p-4 text-center text-xs text-amber-600 border-t border-amber-200 bg-white">
                    <p>{uiStrings?.mainMenu?.footer || 'Florence With Locals · Available Offline'}</p>
                </footer>
            </div>
        );
    };

    // ==================== HEADER ====================
    const Header = ({ title, subtitle, onBack, backLabel }) => (
        <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-20">
            <div className="max-w-xl mx-auto p-4 flex items-center">
                <button
                    onClick={onBack}
                    className="flex items-center text-amber-700 hover:text-amber-900 transition mr-4"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="text-sm font-medium">{backLabel || uiStrings?.back || 'Back'}</span>
                </button>
                <div className="flex-grow">
                    <h1 className="text-lg font-serif font-bold text-gray-800">{title}</h1>
                    {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
                </div>
                {/* Language Button */}
                <button
                    onClick={() => setShowLanguageSelector(true)}
                    className="flex items-center space-x-1 px-2 py-1 bg-amber-50 rounded-lg hover:bg-amber-100 transition"
                >
                    <Flag code={LANGUAGES[currentLanguage].countryCode} size="s" />
                </button>
            </div>
        </header>
    );

    // ==================== BOTTOM NAV ====================
    const BottomNav = () => (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-amber-200 z-20 shadow-lg">
            <div className="max-w-xl mx-auto flex justify-around">
                <button
                    onClick={handleGoToIntroduction}
                    className={`flex-1 py-3 flex flex-col items-center ${currentPage === PAGES.INTRODUCTION || currentPage === PAGES.INTRO_DETAIL ? 'text-amber-600 bg-amber-50' : 'text-gray-500'}`}
                >
                    <BookOpen className="w-5 h-5" />
                    <span className="text-xs mt-1">{uiStrings?.navigation?.introduction || 'Introduction'}</span>
                </button>
                <button
                    onClick={() => handleGoToFloor('second')}
                    className={`flex-1 py-3 flex flex-col items-center ${activeFloor === 'second' ? 'text-blue-600 bg-blue-50' : 'text-gray-500'}`}
                >
                    <Building2 className="w-5 h-5" />
                    <span className="text-xs mt-1">{uiStrings?.navigation?.secondFloor || '2nd Floor'}</span>
                </button>
                <button
                    onClick={() => handleGoToFloor('first')}
                    className={`flex-1 py-3 flex flex-col items-center ${activeFloor === 'first' ? 'text-purple-600 bg-purple-50' : 'text-gray-500'}`}
                >
                    <Building2 className="w-5 h-5" />
                    <span className="text-xs mt-1">{uiStrings?.navigation?.firstFloor || '1st Floor'}</span>
                </button>
                <button
                    onClick={handleBackToMainMenu}
                    className={`flex-1 py-3 flex flex-col items-center ${currentPage === PAGES.MAIN_MENU ? 'text-amber-600 bg-amber-50' : 'text-gray-500'}`}
                >
                    <Home className="w-5 h-5" />
                    <span className="text-xs mt-1">{uiStrings?.navigation?.menu || 'Menu'}</span>
                </button>
            </div>
        </nav>
    );

    // ==================== INTRODUCTION PAGE ====================
    const IntroductionPage = () => {
        const sections = introductionData?.sections || [];

        return (
            <div className="px-3 py-4 space-y-4">
                {/* Header Card */}
                <div className="bg-white p-5 rounded-xl shadow-lg border-t-4 border-amber-700">
                    <h1 className="text-2xl font-serif font-extrabold text-amber-900 mb-2">
                        {introductionData?.title || 'Uffizi Gallery History'}
                    </h1>
                    <p className="text-gray-600">
                        Discover the fascinating history of one of the world's greatest art museums.
                    </p>
                </div>

                {/* Section List */}
                <ul className="space-y-3">
                    {sections.map((section, index) => (
                        <li
                            key={section.id}
                            onClick={() => handleSelectIntroSection(index)}
                            className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition duration-200 cursor-pointer border-l-4 border-amber-500 flex items-center space-x-3"
                        >
                            {/* Thumbnail */}
                            <div className="flex-shrink-0 relative">
                                <span className="absolute -top-1 -left-1 w-5 h-5 bg-amber-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow">
                                    {index + 1}
                                </span>
                                <img
                                    src={section.image?.thumbnail || PLACEHOLDER_THUMB}
                                    alt={section.image?.alt || section.title}
                                    className="w-14 h-14 rounded-lg object-cover shadow-sm"
                                    onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER_THUMB }}
                                />
                            </div>
                            <div className="flex-grow min-w-0">
                                <h2 className="text-base font-semibold text-gray-800 font-serif">{section.title}</h2>
                            </div>
                            <ChevronRight className="w-5 h-5 text-amber-600 flex-shrink-0" />
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    // ==================== INTRO DETAIL PAGE ====================
    const IntroDetailPage = () => {
        const sections = introductionData?.sections || [];
        const section = sections[selectedIntroSection];

        if (!section) {
            return <div className="p-8 text-center text-gray-500">Section not found.</div>;
        }

        const totalSections = sections.length;
        const prevIndex = (selectedIntroSection - 1 + totalSections) % totalSections;
        const nextIndex = (selectedIntroSection + 1) % totalSections;

        return (
            <div className="px-3 py-4">
                <div className="bg-white p-4 rounded-xl shadow-xl space-y-5">
                    {/* Back button and position */}
                    <div className="flex justify-between items-center">
                        <button
                            onClick={handleBackToIntroList}
                            className="flex items-center text-sm text-gray-600 hover:text-amber-700 transition p-2 -ml-2 rounded-lg bg-gray-50 hover:bg-amber-100"
                        >
                            <X className="w-4 h-4 mr-1" />
                            {uiStrings?.back || 'Back'}
                        </button>
                        <span className="text-sm text-amber-600 font-medium">
                            {selectedIntroSection + 1} / {totalSections}
                        </span>
                    </div>

                    {/* Hero Image */}
                    <div className="w-full h-auto min-h-40 bg-gray-200 flex items-center justify-center rounded-lg shadow-inner overflow-hidden">
                        <img
                            src={section.image?.hero || PLACEHOLDER_HERO}
                            alt={section.image?.alt || section.title}
                            className="w-full h-auto object-cover rounded-lg shadow-md"
                            onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER_HERO }}
                        />
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-serif font-extrabold text-amber-800 border-b pb-4 border-amber-100">
                        {section.title}
                    </h2>

                    {/* Content */}
                    <div className="text-lg leading-relaxed text-gray-700">
                        <p className="whitespace-pre-wrap">{section.content}</p>
                    </div>

                    {/* Tags */}
                    {section.tags && section.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-4">
                            {section.tags.map((tag, i) => (
                                <span key={i} className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between items-center pt-4 border-t border-amber-100">
                        <button
                            onClick={() => setSelectedIntroSection(prevIndex)}
                            className="flex items-center text-sm font-semibold text-gray-700 bg-gray-100 p-3 rounded-xl hover:bg-amber-100 transition shadow-md"
                        >
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            {uiStrings?.previous || 'Previous'}
                        </button>
                        <button
                            onClick={() => setSelectedIntroSection(nextIndex)}
                            className="flex items-center text-sm font-semibold text-gray-700 bg-gray-100 p-3 rounded-xl hover:bg-amber-100 transition shadow-md"
                        >
                            {uiStrings?.next || 'Next'}
                            <ChevronRight className="w-4 h-4 ml-2" />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // ==================== FLOOR LIST PAGE ====================
    const FloorListPage = () => {
        const floorData = getActiveFloorData();
        const items = floorData?.items || [];
        const floorColor = activeFloor === 'second' ? 'blue' : 'purple';

        // Group items by type for display
        const artworks = items.filter(i => i.type === 'artwork' || i.type === 'sculpture');

        return (
            <div className="px-3 py-4 space-y-4">
                {/* Floor Header */}
                <div className={`bg-white p-5 rounded-xl shadow-lg border-t-4 border-${floorColor}-600`}>
                    <h1 className="text-2xl font-serif font-extrabold text-gray-800 mb-2">
                        {floorData?.floor || (activeFloor === 'second' ? 'Second Floor' : 'First Floor')}
                    </h1>
                    <p className="text-gray-600">
                        {floorData?.description || `Explore the masterpieces of the ${activeFloor} floor.`}
                    </p>
                    <div className="mt-3 flex items-center text-sm text-gray-500">
                        <Palette className="w-4 h-4 mr-2" />
                        {artworks.length} {uiStrings?.floorPage?.artworksToDiscover || 'artworks to discover'}
                    </div>
                </div>

                {/* Artworks List */}
                <div className="space-y-3">
                    <h2 className="text-lg font-semibold text-gray-700 px-1">{uiStrings?.floorPage?.masterpieces || 'Masterpieces'}</h2>
                    {artworks.map((item, index) => (
                        <div
                            key={item.id}
                            onClick={() => handleSelectArtwork(item.id)}
                            className={`bg-white p-3 border-l-4 border-${floorColor}-500 rounded-lg shadow-md hover:shadow-lg transition duration-200 cursor-pointer flex items-center space-x-3`}
                        >
                            {/* Thumbnail */}
                            <div className="flex-shrink-0 relative">
                                <span className="absolute -top-1 -left-1 w-5 h-5 bg-amber-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow">
                                    {index + 1}
                                </span>
                                <img
                                    src={item.image?.thumbnail || PLACEHOLDER_THUMB}
                                    alt={item.title}
                                    className="w-14 h-14 rounded-lg object-cover shadow-sm"
                                    onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER_THUMB }}
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-grow min-w-0">
                                <h3 className="text-base font-semibold text-gray-800 font-serif truncate">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-600 truncate">
                                    {item.artist}{item.year ? `, ${item.year}` : ''}
                                </p>
                            </div>

                            {/* Room Badge */}
                            {item.roomCode && (
                                <div className="text-right flex-shrink-0">
                                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full shadow-inner bg-${floorColor}-100 text-${floorColor}-700`}>
                                        {item.roomCode}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Artwork Count Info */}
                <div className="bg-amber-50 p-4 rounded-xl">
                    <p className="text-sm text-amber-800 italic">
                        {uiStrings?.floorPage?.exploreText || `Explore ${items.filter(i => i.type === 'artwork' || i.type === 'sculpture').length} masterpieces on this floor.`}
                    </p>
                </div>
            </div>
        );
    };

    // ==================== ARTWORK DETAIL PAGE ====================
    const ArtworkDetailPage = () => {
        const floorData = getActiveFloorData();
        const artwork = getArtworkById(selectedItemId);
        const artworks = getArtworksInOrder(floorData);

        if (!artwork) {
            return <div className="p-8 text-center text-gray-500">Artwork not found.</div>;
        }

        const currentIndex = artworks.findIndex(a => a.id === selectedItemId);
        const totalArtworks = artworks.length;
        const prevArtwork = artworks[(currentIndex - 1 + totalArtworks) % totalArtworks];
        const nextArtwork = artworks[(currentIndex + 1) % totalArtworks];

        const floorColor = activeFloor === 'second' ? 'blue' : 'purple';

        return (
            <div className="px-3 py-4">
                <div className="bg-white p-4 rounded-xl shadow-xl space-y-5">
                    {/* Back and position */}
                    <div className="flex justify-between items-center">
                        <button
                            onClick={handleBackToFloorList}
                            className="flex items-center text-sm text-gray-600 hover:text-amber-700 transition p-2 -ml-2 rounded-lg bg-gray-50 hover:bg-amber-100"
                        >
                            <X className="w-4 h-4 mr-1" />
                            {uiStrings?.navigation?.backToList || 'Back to List'}
                        </button>
                        <span className={`text-sm text-${floorColor}-600 font-medium`}>
                            {currentIndex + 1} / {totalArtworks}
                        </span>
                    </div>

                    {/* Hero Image */}
                    <div className="w-full h-auto min-h-40 bg-gray-200 flex items-center justify-center rounded-lg shadow-inner overflow-hidden">
                        <img
                            src={artwork.image?.hero || PLACEHOLDER_HERO}
                            alt={artwork.title}
                            className="w-full h-auto object-cover rounded-lg shadow-md"
                            onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER_HERO }}
                        />
                    </div>

                    {/* Title and Meta */}
                    <div className="space-y-2 border-b pb-4 border-amber-100">
                        <h2 className="text-2xl font-serif font-extrabold text-amber-800">
                            {artwork.title}
                        </h2>
                        <p className="text-base text-gray-600">
                            <span className="font-semibold text-gray-800">{artwork.artist}</span>
                            {artwork.year && `, ${artwork.year}`}
                        </p>
                        <div className="flex items-center space-x-2">
                            {artwork.roomCode && (
                                <span className={`text-sm font-medium text-${floorColor}-700 bg-${floorColor}-100 px-3 py-1 rounded-full shadow-inner flex items-center`}>
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {artwork.roomCode}
                                </span>
                            )}
                            <span className="text-sm text-gray-500 capitalize">
                                {artwork.type}
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="text-lg leading-relaxed text-gray-700">
                        <p className="whitespace-pre-wrap">{artwork.description}</p>
                    </div>

                    {/* Viewing Tips */}
                    {artwork.viewing_tips && artwork.viewing_tips.length > 0 && (
                        <div className="bg-amber-50 p-4 rounded-lg">
                            <p className="font-semibold text-amber-800 mb-2">👁️ {uiStrings?.artworkDetail?.viewingTips || 'Viewing Tips:'}</p>
                            <ul className="space-y-1 text-sm text-gray-700">
                                {artwork.viewing_tips.map((tip, i) => (
                                    <li key={i}>• {tip}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Offline note */}
                    <p className="text-xs text-gray-400 pt-4 border-t border-gray-100">
                        {uiStrings?.artworkDetail?.offlineNote || '*This content is stored locally and accessible without internet.'}
                    </p>

                    {/* Navigation */}
                    <div className="flex justify-between items-center pt-4 border-t border-amber-100">
                        <button
                            onClick={() => handleSelectArtwork(prevArtwork.id)}
                            className="flex items-center text-sm font-semibold text-gray-700 bg-gray-100 p-3 rounded-xl hover:bg-amber-100 transition shadow-md"
                        >
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            {uiStrings?.previous || 'Previous'}
                        </button>
                        <button
                            onClick={() => handleSelectArtwork(nextArtwork.id)}
                            className="flex items-center text-sm font-semibold text-gray-700 bg-gray-100 p-3 rounded-xl hover:bg-amber-100 transition shadow-md"
                        >
                            {uiStrings?.next || 'Next'}
                            <ChevronRight className="w-4 h-4 ml-2" />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // ==================== MAIN RENDER ====================

    // Welcome page
    if (currentPage === PAGES.WELCOME) {
        return <WelcomePage />;
    }

    // Main menu
    if (currentPage === PAGES.MAIN_MENU) {
        return <MainMenu />;
    }

    // Determine header props based on current page
    let headerProps = {};
    if (currentPage === PAGES.INTRODUCTION) {
        headerProps = { title: uiStrings?.navigation?.introduction || 'Introduction', subtitle: uiStrings?.subtitle || 'Uffizi History', onBack: handleBackToMainMenu, backLabel: uiStrings?.navigation?.menu || 'Menu' };
    } else if (currentPage === PAGES.INTRO_DETAIL) {
        headerProps = { title: introductionData?.sections?.[selectedIntroSection]?.title || 'Section', onBack: handleBackToIntroList, backLabel: uiStrings?.back || 'Back' };
    } else if (currentPage === PAGES.FLOOR_LIST) {
        const floorData = getActiveFloorData();
        headerProps = { title: floorData?.floor || 'Floor', subtitle: floorData?.ui?.subtitle, onBack: handleBackToMainMenu, backLabel: uiStrings?.navigation?.menu || 'Menu' };
    } else if (currentPage === PAGES.ARTWORK_DETAIL) {
        const artwork = getArtworkById(selectedItemId);
        headerProps = { title: artwork?.title || 'Artwork', subtitle: artwork?.artist, onBack: handleBackToFloorList, backLabel: uiStrings?.navigation?.list || 'List' };
    }

    // Pages with header and bottom nav
    return (
        <div className="min-h-screen bg-amber-50 pb-20">
            <Header {...headerProps} />

            <main className="max-w-xl mx-auto pt-20">
                <div className="min-h-[70vh]">
                    {currentPage === PAGES.INTRODUCTION && <IntroductionPage />}
                    {currentPage === PAGES.INTRO_DETAIL && <IntroDetailPage />}
                    {currentPage === PAGES.FLOOR_LIST && <FloorListPage />}
                    {currentPage === PAGES.ARTWORK_DETAIL && <ArtworkDetailPage />}
                </div>
            </main>

            <BottomNav />

            {/* Language Modal (available on all pages) */}
            <LanguageModal />
        </div>
    );
};

export default App;
