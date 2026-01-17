import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

const themes = {
    indigo: {
        name: 'Indigo',
        colors: {
            400: '129 140 248',
            500: '99 102 241',
            600: '79 70 229',
        }
    },
    purple: {
        name: 'Purple',
        colors: {
            400: '192 132 252',
            500: '168 85 247',
            600: '147 51 234',
        }
    },
    blue: {
        name: 'Blue',
        colors: {
            400: '96 165 250',
            500: '59 130 246',
            600: '37 99 235',
        }
    },
    emerald: {
        name: 'Emerald',
        colors: {
            400: '52 211 153',
            500: '16 185 129',
            600: '5 150 105',
        }
    },
    orange: {
        name: 'Orange',
        colors: {
            400: '251 146 60',
            500: '249 115 22',
            600: '234 88 12',
        }
    },
    rose: {
        name: 'Rose',
        colors: {
            400: '251 113 133',
            500: '244 63 94',
            600: '225 29 72',
        }
    },
    cyan: {
        name: 'Cyan',
        colors: {
            400: '34 211 238',
            500: '6 182 212',
            600: '8 145 178',
        }
    },
    lime: {
        name: 'Lime',
        colors: {
            400: '163 230 53',
            500: '132 204 22',
            600: '101 163 13',
        }
    },
    fuchsia: {
        name: 'Fuchsia',
        colors: {
            400: '232 121 249',
            500: '217 70 239',
            600: '192 38 211',
        }
    },
    amber: {
        name: 'Amber',
        colors: {
            400: '251 191 36',
            500: '245 158 11',
            600: '217 119 6',
        }
    }
}

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState('indigo')
    const [mode, setMode] = useState(() => {
        // Check localStorage first
        const savedMode = localStorage.getItem('themeMode')
        if (savedMode) return savedMode
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark'
        }
        return 'dark' // Default to dark
    })

    useEffect(() => {
        const theme = themes[currentTheme]
        const root = document.documentElement

        root.style.setProperty('--primary-400', theme.colors[400])
        root.style.setProperty('--primary-500', theme.colors[500])
        root.style.setProperty('--primary-600', theme.colors[600])
    }, [currentTheme])

    useEffect(() => {
        if (mode === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('themeMode', mode);
    }, [mode]);

    const toggleMode = () => setMode(prev => prev === 'dark' ? 'light' : 'dark');

    const [enableCursor, setEnableCursor] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('enableCursor') === 'true';
        }
        return false;
    });

    const [enableSmoothScroll, setEnableSmoothScroll] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('enableSmoothScroll');
            return saved !== null ? saved === 'true' : true; // Default true
        }
        return true;
    });

    const [enableScrollProgress, setEnableScrollProgress] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('enableScrollProgress');
            return saved !== null ? saved === 'true' : true; // Default true
        }
        return true;
    });

    const [enableSounds, setEnableSounds] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('enableSounds');
            return saved !== null ? saved === 'true' : true;
        }
        return true;
    });

    // Font Management
    const fonts = {
        sans: { name: 'Sans', value: "'Inter', sans-serif" },
        serif: { name: 'Serif', value: "'Playfair Display', serif" },
        mono: { name: 'Mono', value: "'Fira Code', monospace" },
        display: { name: 'Display', value: "'Outfit', sans-serif" }
    };

    const [currentFont, setCurrentFont] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('currentFont') || 'sans';
        }
        return 'sans';
    });

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--font-main', fonts[currentFont].value);
        localStorage.setItem('currentFont', currentFont);
    }, [currentFont]);

    const toggleCursor = () => {
        setEnableCursor(prev => {
            const newValue = !prev;
            localStorage.setItem('enableCursor', String(newValue));
            return newValue;
        });
    };

    const toggleSmoothScroll = () => {
        setEnableSmoothScroll(prev => {
            const newValue = !prev;
            localStorage.setItem('enableSmoothScroll', String(newValue));
            return newValue;
        });
    };

    const toggleScrollProgress = () => {
        setEnableScrollProgress(prev => {
            const newValue = !prev;
            localStorage.setItem('enableScrollProgress', String(newValue));
            return newValue;
        });
    };

    const toggleSounds = () => {
        setEnableSounds(prev => {
            const newValue = !prev;
            localStorage.setItem('enableSounds', String(newValue));
            return newValue;
        });
    };

    const value = {
        currentTheme,
        setCurrentTheme,
        themes,
        mode,
        toggleMode,
        enableCursor,
        toggleCursor,
        enableSmoothScroll,
        toggleSmoothScroll,
        enableScrollProgress,
        toggleScrollProgress,
        enableSounds,
        toggleSounds,
        currentFont,
        setCurrentFont,
        fonts
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
