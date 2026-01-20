import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Code, Send, Palette as PaletteIcon, Moon, Sun, Menu, X, Terminal as TerminalIcon, Volume2, VolumeX, Settings, Type } from 'lucide-react';
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

    const [showThemes, setShowThemes] = useState(false); // Desktop Dropdown
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showMobileSettings, setShowMobileSettings] = useState(false); // Mobile Sub-menu
    const [showTerminal, setShowTerminal] = useState(false);

    const { playClick, playHover } = useSound();
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavClick = (e, hash) => {
        e.preventDefault();
        if (location.pathname === '/') {
            const elem = document.querySelector(hash);
            if (elem) {
                const headerOffset = 80;
                const elementPosition = elem.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        } else {
            navigate(`/${hash}`);
        }
        setIsMobileMenuOpen(false);
        setShowMobileSettings(false);
    };

    // Close mobile menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
                setShowMobileSettings(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setShowMobileSettings(false);
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMobileMenuOpen]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        },
        exit: { opacity: 0 }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
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

                    {/* --- DESKTOP & MOBILE: Logo & Bar --- */}
                    <div className="glass px-6 py-3 md:px-8 md:py-4 rounded-full flex items-center justify-between md:justify-start gap-8 flex-1 md:flex-none relative z-50">
                        <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} onMouseEnter={playHover} className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-white transition-colors">
                            <Code className="text-primary-500" />
                            <span>Wassidev<span className="text-primary-500">.</span>fr</span>
                        </a>

                        {/* Desktop Links */}
                        <div className="hidden md:flex gap-6 text-sm text-slate-600 dark:text-gray-300 font-medium">
                            <a href="#about" onClick={(e) => handleNavClick(e, '#about')} onMouseEnter={playHover} className="hover:text-primary-500 dark:hover:text-white transition-colors">{t.nav.about}</a>
                            <a href="#projects" onClick={(e) => handleNavClick(e, '#projects')} onMouseEnter={playHover} className="hover:text-primary-500 dark:hover:text-white transition-colors">{t.nav.projects}</a>
                            <a href="#services" onClick={(e) => handleNavClick(e, '#services')} onMouseEnter={playHover} className="hover:text-primary-500 dark:hover:text-white transition-colors">{t.nav.services}</a>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden text-slate-600 dark:text-white hover:text-primary-500 transition-colors relative z-[60]"
                            onClick={() => { playClick(); setIsMobileMenuOpen(!isMobileMenuOpen); }}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>

                        <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} onMouseEnter={playHover} className="hidden md:flex bg-primary-600 hover:bg-primary-500 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors items-center gap-2 shadow-lg shadow-primary-600/20">
                            {t.nav.cta} <Send size={16} />
                        </a>
                    </div>

                    {/* --- DESKTOP: Tools --- */}
                    <div className="hidden md:flex glass px-4 py-4 rounded-full items-center gap-3">
                        <button
                            onClick={() => { playClick(); setShowTerminal(true); }}
                            onMouseEnter={playHover}
                            className="flex items-center justify-center w-8 h-8 rounded-full text-slate-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                        >
                            <TerminalIcon size={18} />
                        </button>

                        <button
                            onClick={() => { playClick(); toggleMode(); }}
                            onMouseEnter={playHover}
                            className="flex items-center justify-center w-8 h-8 rounded-full text-slate-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                        >
                            {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        <button
                            onClick={() => { playClick(); toggleSounds(); }}
                            onMouseEnter={playHover}
                            className="flex items-center justify-center w-8 h-8 rounded-full text-slate-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                        >
                            {enableSounds ? <Volume2 size={18} /> : <VolumeX size={18} />}
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
                                        className="absolute top-full right-0 mt-6 p-5 glass rounded-2xl flex flex-col gap-6 min-w-[280px] shadow-2xl z-50"
                                    >
                                        {/* Themes */}
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Themes</p>
                                            <div className="grid grid-cols-5 gap-2">
                                                {Object.entries(themes).map(([key, theme]) => (
                                                    <button
                                                        key={key}
                                                        onClick={() => { playClick(); setCurrentTheme(key); }}
                                                        className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${currentTheme === key ? 'border-white ring-2 ring-primary-500' : 'border-transparent'}`}
                                                        style={{ backgroundColor: `rgb(${theme.colors[500]})` }}
                                                        title={theme.name}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Fonts */}
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Typography</p>
                                            <div className="grid grid-cols-2 gap-2">
                                                {Object.entries(fonts).map(([key, font]) => (
                                                    <button
                                                        key={key}
                                                        onClick={() => { playClick(); setCurrentFont(key); }}
                                                        className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${currentFont === key ? 'bg-primary-500 text-white border-primary-500' : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-400 border-transparent hover:bg-slate-200 dark:hover:bg-white/10'}`}
                                                        style={{ fontFamily: font.value }}
                                                    >
                                                        {font.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Toggles */}
                                        <div className="space-y-2">
                                            <button onClick={() => { playClick(); toggleCursor(); }} className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${enableCursor ? 'text-primary-500 bg-primary-500/10' : 'text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/5'}`}>
                                                <span className="text-sm font-medium">Custom Cursor</span>
                                                <div className={`w-2 h-2 rounded-full ${enableCursor ? 'bg-primary-500' : 'bg-slate-300 dark:bg-gray-600'}`}></div>
                                            </button>
                                            <button onClick={() => { playClick(); toggleSmoothScroll(); }} className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${enableSmoothScroll ? 'text-primary-500 bg-primary-500/10' : 'text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/5'}`}>
                                                <span className="text-sm font-medium">Smooth Scroll</span>
                                                <div className={`w-2 h-2 rounded-full ${enableSmoothScroll ? 'bg-primary-500' : 'bg-slate-300 dark:bg-gray-600'}`}></div>
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <button
                            onClick={toggleLanguage}
                            className="flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold text-slate-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all border border-slate-200 dark:border-white/10"
                        >
                            {language === 'fr' ? 'EN' : 'FR'}
                        </button>
                    </div>

                </div>
            </motion.nav>

            {/* --- FULL SCREEN MOBILE OVERLAY --- */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={containerVariants}
                        className="fixed inset-0 z-40 bg-white dark:bg-[#050505] md:hidden flex flex-col pt-32 p-6 overflow-y-auto"
                    >
                        {/* MAIN LINKS */}
                        <div className="flex-1 flex flex-col justify-start gap-6">
                            {['hero', 'about', 'projects', 'services', 'contact'].map((item) => (
                                <motion.a
                                    key={item}
                                    href={`#${item}`}
                                    variants={itemVariants}
                                    onClick={(e) => handleNavClick(e, `#${item}`)}
                                    className={`text-4xl xs:text-5xl font-black uppercase tracking-tighter ${item === 'contact' ? 'text-primary-500' : 'text-slate-900 dark:text-white'} transition-colors`}
                                >
                                    {t.nav[item === 'cta' ? 'contact' : item] || (item === 'hero' ? 'Home' : item)}
                                </motion.a>
                            ))}
                        </div>

                        {/* FOOTER CONTROLS */}
                        <motion.div variants={itemVariants} className="mt-8 pt-8 border-t border-slate-100 dark:border-white/10 pb-10">

                            {/* Primary Controls Row */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex gap-3">
                                    <button onClick={toggleMode} className="p-3 bg-slate-100 dark:bg-white/5 rounded-full text-slate-900 dark:text-white border border-slate-200 dark:border-white/10">
                                        {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                                    </button>
                                    <button onClick={toggleLanguage} className="w-12 h-[46px] flex items-center justify-center bg-slate-100 dark:bg-white/5 rounded-full font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 text-sm">
                                        {language === 'fr' ? 'EN' : 'FR'}
                                    </button>
                                    <button onClick={toggleSounds} className="p-3 bg-slate-100 dark:bg-white/5 rounded-full text-slate-900 dark:text-white border border-slate-200 dark:border-white/10">
                                        {enableSounds ? <Volume2 size={20} /> : <VolumeX size={20} />}
                                    </button>
                                </div>

                                <button
                                    onClick={() => setShowMobileSettings(!showMobileSettings)}
                                    className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest px-4 py-3 rounded-full border transition-colors ${showMobileSettings ? 'bg-primary-500 text-white border-primary-500' : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-400 border-slate-200 dark:border-white/10'}`}
                                >
                                    <Settings size={16} /> Customize
                                </button>
                            </div>

                            {/* Expandable Settings (Themes/Fonts) */}
                            <AnimatePresence>
                                {showMobileSettings && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden space-y-8 bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-100 dark:border-white/5"
                                    >
                                        {/* Themes */}
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">Themes</p>
                                            <div className="flex flex-wrap gap-3">
                                                {Object.entries(themes).map(([key, theme]) => (
                                                    <button
                                                        key={key}
                                                        onClick={() => setCurrentTheme(key)}
                                                        className={`w-10 h-10 rounded-full border-2 ${currentTheme === key ? 'border-white ring-2 ring-primary-500 scale-110' : 'border-transparent'} shadow-sm`}
                                                        style={{ backgroundColor: `rgb(${theme.colors[500]})` }}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Fonts */}
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">Typography</p>
                                            <div className="flex flex-wrap gap-2">
                                                {Object.entries(fonts).map(([key, font]) => (
                                                    <button
                                                        key={key}
                                                        onClick={() => setCurrentFont(key)}
                                                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${currentFont === key ? 'bg-primary-500 text-white border-primary-500 shadow-lg' : 'bg-white dark:bg-white/10 text-slate-700 dark:text-gray-300 border-transparent'}`}
                                                        style={{ fontFamily: font.value }}
                                                    >
                                                        {font.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Toggles */}
                                        <div className="grid grid-cols-1 gap-3">
                                            <button onClick={toggleCursor} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${enableCursor ? 'bg-primary-500/10 border-primary-500 text-primary-500' : 'bg-white dark:bg-white/5 border-transparent text-slate-600 dark:text-gray-400'}`}>
                                                <span className="text-sm font-bold">Custom Cursor</span>
                                                <div className={`w-3 h-3 rounded-full ${enableCursor ? 'bg-primary-500' : 'bg-slate-300 dark:bg-gray-600'}`}></div>
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
