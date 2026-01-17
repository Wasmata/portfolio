import { motion, AnimatePresence } from 'framer-motion';
import { Code, Send, Palette as PaletteIcon, Moon, Sun, CreditCard, Menu, X, Terminal as TerminalIcon, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import Terminal from './Showcase/Terminal';
import useSound from '../hooks/useSound';

const Navbar = ({ onOpenCard }) => {
    const { t, language, toggleLanguage } = useLanguage();
    const {
        currentTheme, setCurrentTheme, themes, mode, toggleMode,
        enableCursor, toggleCursor,
        enableSmoothScroll, toggleSmoothScroll,
        enableScrollProgress, toggleScrollProgress,
        enableSounds, toggleSounds,
        currentFont, setCurrentFont, fonts
    } = useTheme();
    const [showThemes, setShowThemes] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showTerminal, setShowTerminal] = useState(false);
    const { playClick, playHover } = useSound();

    // Close mobile menu on resize if screen becomes larger
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navLinkVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: { delay: i * 0.1 }
        }),
        exit: { opacity: 0, x: -20 }
    };

    return (
        <>
            <Terminal isOpen={showTerminal} onClose={() => setShowTerminal(false)} />

            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 left-0 w-full z-50 flex justify-center pt-4 md:pt-6 px-4"
            >
                <div className="w-full max-w-[1400px] flex justify-between md:justify-center items-center gap-4 relative">

                    {/* --- DESTKOP & MOBILE: Logo & Main Navigation Container --- */}
                    <div className="glass px-6 py-3 md:px-8 md:py-4 rounded-full flex items-center justify-between md:justify-start gap-8 flex-1 md:flex-none">
                        <a href="#hero" onMouseEnter={playHover} onClick={playClick} className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-white transition-colors">
                            <Code className="text-primary-500" />
                            <span>Wassidev<span className="text-primary-500">.</span>fr</span>
                        </a>

                        {/* Desktop Links */}
                        <div className="hidden md:flex gap-6 text-sm text-slate-600 dark:text-gray-300 font-medium">
                            <a href="#about" onMouseEnter={playHover} onClick={playClick} className="hover:text-primary-500 dark:hover:text-white transition-colors">{t.nav.about}</a>
                            <a href="#projects" onMouseEnter={playHover} onClick={playClick} className="hover:text-primary-500 dark:hover:text-white transition-colors">{t.nav.projects}</a>
                            <a href="#services" onMouseEnter={playHover} onClick={playClick} className="hover:text-primary-500 dark:hover:text-white transition-colors">{t.nav.services}</a>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden text-slate-600 dark:text-gray-300 hover:text-primary-500 transition-colors"
                            onClick={() => { playClick(); setIsMobileMenuOpen(!isMobileMenuOpen); }}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>

                        <a href="#contact" onMouseEnter={playHover} onClick={playClick} className="hidden md:flex bg-primary-600 hover:bg-primary-500 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors items-center gap-2 shadow-lg shadow-primary-600/20">
                            {t.nav.cta} <Send size={16} />
                        </a>
                    </div>

                    {/* --- DESKTOP: Mini Tools (Hidden on Mobile, moved to Menu) --- */}
                    <div className="hidden md:flex glass px-4 py-4 rounded-full items-center gap-3">
                        <button
                            onClick={() => { playClick(); setShowTerminal(true); }}
                            onMouseEnter={playHover}
                            className="flex items-center justify-center w-8 h-8 rounded-full text-slate-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                            title="Developer Terminal"
                        >
                            <TerminalIcon size={18} />
                        </button>

                        <button
                            onClick={() => { playClick(); toggleMode(); }}
                            onMouseEnter={playHover}
                            className="flex items-center justify-center w-8 h-8 rounded-full text-slate-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                            title={mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
                        >
                            {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => { playClick(); setShowThemes(!showThemes); }}
                                onMouseEnter={playHover}
                                className="flex items-center justify-center w-8 h-8 rounded-full text-slate-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                            >
                                <PaletteIcon size={18} />
                            </button>
                            <AnimatePresence>
                                {showThemes && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full right-0 mt-6 p-4 glass rounded-xl flex flex-col gap-4 min-w-[240px] shadow-2xl z-50"
                                    >
                                        <div>
                                            <p className="text-xs font-bold text-slate-500 dark:text-gray-400 mb-2 uppercase">Theme Color</p>
                                            <div className="grid grid-cols-5 gap-2">
                                                {Object.entries(themes).map(([key, theme]) => (
                                                    <button
                                                        key={key}
                                                        onClick={() => { playClick(); setCurrentTheme(key); }}
                                                        onMouseEnter={playHover}
                                                        className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${currentTheme === key ? 'border-white ring-2 ring-primary-500' : 'border-transparent'}`}
                                                        style={{ backgroundColor: `rgb(${theme.colors[500]})` }}
                                                        title={theme.name}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <div className="border-t border-slate-200 dark:border-white/10 pt-4">
                                            <p className="text-xs font-bold text-slate-500 dark:text-gray-400 mb-2 uppercase">Typography</p>
                                            <div className="grid grid-cols-2 gap-2">
                                                {Object.entries(fonts).map(([key, font]) => (
                                                    <button
                                                        key={key}
                                                        onClick={() => { playClick(); setCurrentFont(key); }}
                                                        onMouseEnter={playHover}
                                                        className={`px-2 py-1.5 rounded-md text-xs font-medium transition-colors text-center border ${currentFont === key ? 'bg-primary-500 text-white border-primary-500' : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-400 border-transparent hover:bg-slate-200 dark:hover:bg-white/10'}`}
                                                        style={{ fontFamily: font.value }}
                                                    >
                                                        {font.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="border-t border-slate-200 dark:border-white/10 pt-4 space-y-2">
                                            <p className="text-xs font-bold text-slate-500 dark:text-gray-400 mb-2 uppercase">Interface</p>

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    playClick();
                                                    toggleCursor();
                                                }}
                                                onMouseEnter={playHover}
                                                className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${enableCursor ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-400'}`}
                                            >
                                                <span>Custom Cursor</span>
                                                <span className={`w-2 h-2 rounded-full ${enableCursor ? 'bg-white' : 'bg-slate-400'}`} />
                                            </button>

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    playClick();
                                                    toggleSmoothScroll();
                                                }}
                                                onMouseEnter={playHover}
                                                className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${enableSmoothScroll ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-400'}`}
                                            >
                                                <span>Smooth Scroll</span>
                                                <span className={`w-2 h-2 rounded-full ${enableSmoothScroll ? 'bg-white' : 'bg-slate-400'}`} />
                                            </button>

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    playClick();
                                                    toggleScrollProgress();
                                                }}
                                                onMouseEnter={playHover}
                                                className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${enableScrollProgress ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-400'}`}
                                            >
                                                <span>Scroll Progress</span>
                                                <span className={`w-2 h-2 rounded-full ${enableScrollProgress ? 'bg-white' : 'bg-slate-400'}`} />
                                            </button>

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    playClick();
                                                    toggleSounds();
                                                }}
                                                onMouseEnter={playHover}
                                                className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${enableSounds ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-400'}`}
                                            >
                                                <span className="flex items-center gap-2">UI Sounds {enableSounds ? <Volume2 size={14} /> : <VolumeX size={14} />}</span>
                                                <span className={`w-2 h-2 rounded-full ${enableSounds ? 'bg-white' : 'bg-slate-400'}`} />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <button
                            onClick={toggleLanguage}
                            className="flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold text-slate-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all border border-slate-200 dark:border-white/10 ml-1"
                        >
                            {language === 'fr' ? 'EN' : 'FR'}
                        </button>
                    </div>

                </div>
            </motion.nav>

            {/* --- MOBILE MENU OVERLAY --- */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-x-4 top-24 z-40 md:hidden"
                    >
                        <div className="glass rounded-3xl p-6 flex flex-col gap-6 shadow-2xl border border-white/20 dark:border-white/10 bg-white/80 dark:bg-black/80 backdrop-blur-xl max-h-[85vh] overflow-y-auto">
                            <nav className="flex flex-col gap-2">
                                {['about', 'projects', 'services'].map((item, i) => (
                                    <motion.a
                                        key={item}
                                        custom={i}
                                        variants={navLinkVariants}
                                        initial="hidden"
                                        animate="visible"
                                        href={`#${item}`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-lg font-bold text-slate-800 dark:text-white hover:text-primary-500 dark:hover:text-primary-400 py-3 border-b border-slate-100 dark:border-white/5"
                                    >
                                        {t.nav[item]}
                                    </motion.a>
                                ))}
                                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="mt-2 w-full bg-primary-600 text-white py-3 rounded-xl font-bold text-center shadow-lg shadow-primary-500/20">
                                    {t.nav.cta}
                                </a>
                            </nav>

                            <div className="space-y-6">
                                {/* Typography */}
                                <div>
                                    <p className="text-xs font-bold text-slate-500 dark:text-gray-400 mb-3 uppercase tracking-wider">Typography</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {Object.entries(fonts).map(([key, font]) => (
                                            <button
                                                key={key}
                                                onClick={() => setCurrentFont(key)}
                                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${currentFont === key ? 'bg-primary-500 text-white border-primary-500' : 'bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-gray-400 border-transparent'}`}
                                                style={{ fontFamily: font.value }}
                                            >
                                                {font.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Themes */}
                                <div>
                                    <p className="text-xs font-bold text-slate-500 dark:text-gray-400 mb-3 uppercase tracking-wider">Themes</p>
                                    <div className="grid grid-cols-5 gap-3">
                                        {Object.entries(themes).map(([key, theme]) => (
                                            <button
                                                key={key}
                                                onClick={() => setCurrentTheme(key)}
                                                className={`aspect-square rounded-full border-2 transition-transform ${currentTheme === key ? 'border-white ring-2 ring-primary-500 scale-110' : 'border-transparent'}`}
                                                style={{ backgroundColor: `rgb(${theme.colors[500]})` }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Settings */}
                                <div>
                                    <p className="text-xs font-bold text-slate-500 dark:text-gray-400 mb-3 uppercase tracking-wider">Settings</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button onClick={toggleMode} className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-gray-300">
                                            <span className="text-sm font-medium">{mode === 'dark' ? 'Dark' : 'Light'}</span>
                                            {mode === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
                                        </button>
                                        <button onClick={toggleLanguage} className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-gray-300">
                                            <span className="text-sm font-medium">{language === 'fr' ? 'English' : 'Français'}</span>
                                            <span className="text-xs font-bold border border-current px-1 rounded">{language === 'fr' ? 'EN' : 'FR'}</span>
                                        </button>
                                        <button onClick={toggleSounds} className={`flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${enableSounds ? 'bg-primary-500 text-white' : 'bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-gray-300'}`}>
                                            <span className="text-sm font-medium">Sounds</span>
                                            {enableSounds ? <Volume2 size={18} /> : <VolumeX size={18} />}
                                        </button>
                                        <button onClick={toggleCursor} className={`flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${enableCursor ? 'bg-primary-500 text-white' : 'bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-gray-300'}`}>
                                            <span className="text-sm font-medium">Cursor</span>
                                            <span className={`w-2 h-2 rounded-full ${enableCursor ? 'bg-white' : 'bg-slate-400'}`} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
