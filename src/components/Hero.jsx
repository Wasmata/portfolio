import { motion } from 'framer-motion'
import { useState, Suspense, lazy } from 'react'
import { ArrowRight, Github, Linkedin, Instagram, Mail } from 'lucide-react'
import TiltCard from './TiltCard'

const HeroGlobe = lazy(() => import('./Effects/HeroGlobe'))
import { useLanguage } from '../context/LanguageContext'
import TextReveal from './Showcase/TextReveal'

import useSound from '../hooks/useSound'

const Hero = () => {
    const { t } = useLanguage()
    const [isFlipped, setIsFlipped] = useState(false)
    const { playClick, playHover } = useSound()

    return (
        <section id="hero" className="min-h-screen flex items-center relative overflow-hidden pt-24 pb-12 lg:pt-32">
            {/* Background Effects - Optimized for performance */}
            <div className="absolute top-0 left-1/4 w-64 h-64 lg:w-96 lg:h-96 bg-primary-600 rounded-full mix-blend-multiply filter blur-[64px] opacity-20 animate-blob will-change-transform"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 lg:w-96 lg:h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[64px] opacity-20 animate-blob animation-delay-2000 will-change-transform"></div>

            {/* Hidden Anchor for Navigation */}
            <div id="about" className="absolute top-0 left-0 w-full h-1"></div>

            {/* Content - Compact formatting for laptops */}
            <div className="container mx-auto px-6 max-w-[1200px] z-10 relative">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Left Column: Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center lg:text-left flex flex-col items-center lg:items-start will-change-transform"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white text-xs lg:text-sm font-medium mb-6 backdrop-blur-sm"
                        >
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            {t.hero.role}
                        </motion.div>

                        {/* Font sizes dramatically reduced for 1366x768 screens */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-slate-900 dark:text-white tracking-tight">
                            <TextReveal className="block">{t.hero.headline_1}</TextReveal>
                            <span className="gradient-text block">
                                <TextReveal delay={0.5}>{t.hero.headline_2}</TextReveal>
                            </span>
                        </h1>

                        <p className="text-sm md:text-base text-slate-600 dark:text-gray-400 max-w-lg mb-8 leading-relaxed font-light">
                            {t.hero.description_pre} <span className="text-primary-600 dark:text-white font-semibold">Wassim Maataoui</span>{t.hero.description_post}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                            <a href="#projects" onMouseEnter={playHover} onClick={playClick} className="w-full sm:w-auto bg-slate-900 dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-bold hover:bg-slate-800 dark:hover:bg-gray-200 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20 text-sm md:text-base">
                                {t.hero.cta_projects} <ArrowRight size={18} />
                            </a>
                            <a href="#contact" onMouseEnter={playHover} onClick={playClick} className="w-full sm:w-auto px-6 py-3 rounded-full border border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors font-medium text-center text-sm md:text-base">
                                {t.hero.cta_contact}
                            </a>
                        </div>

                        <div className="mt-8 flex flex-col gap-4">
                            <a href="mailto:contact@wassidev.fr" aria-label="Envoyer un email à contact@wassidev.fr" onMouseEnter={playHover} onClick={playClick} className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors text-sm md:text-base">
                                <Mail size={18} /> contact@wassidev.fr
                            </a>
                            <div className="flex items-center gap-5 text-slate-400 dark:text-gray-500">
                                <a href="https://github.com/Wasmata" aria-label="GitHub de Wassim" target="_blank" rel="noopener noreferrer" onMouseEnter={playHover} onClick={playClick} className="hover:text-primary-600 dark:hover:text-white transition-colors transform hover:scale-110 duration-200"><Github size={20} /></a>
                                <a href="https://www.linkedin.com/in/wassim-maataoui-113395267/" aria-label="LinkedIn de Wassim" target="_blank" rel="noopener noreferrer" onMouseEnter={playHover} onClick={playClick} className="hover:text-primary-600 dark:hover:text-white transition-colors transform hover:scale-110 duration-200"><Linkedin size={20} /></a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: 3D Globe */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.3 }}
                        className="relative flex justify-center items-center w-full mt-12 lg:mt-0"
                    >
                        {/* Globe Background Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-indigo-500/15 rounded-full blur-[100px] animate-pulse"></div>

                        {/* 3D Globe Container */}
                        <div className="w-full aspect-square max-w-[400px] md:max-w-[500px] relative z-10">
                            <Suspense fallback={
                                <div className="w-full h-full flex items-center justify-center">
                                    <div className="w-48 h-48 rounded-full border border-indigo-500/20 animate-spin" style={{ borderTopColor: 'rgb(99 102 241 / 0.6)' }}></div>
                                </div>
                            }>
                                <HeroGlobe />
                            </Suspense>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Hero
