import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowRight, Github, Linkedin, Instagram } from 'lucide-react'
import TiltCard from './TiltCard'
import { useLanguage } from '../context/LanguageContext'
import TextReveal from './Showcase/TextReveal'

import useSound from '../hooks/useSound'

const Hero = () => {
    const { t } = useLanguage()
    const [isFlipped, setIsFlipped] = useState(false)
    const { playClick, playHover } = useSound()

    return (
        <section id="hero" className="min-h-screen flex items-center relative overflow-hidden pt-24 pb-12 lg:pt-32">
            {/* Background Effects - Scaled down blur for better performance/vis on smaller screens */}
            <div className="absolute top-0 left-1/4 w-64 h-64 lg:w-96 lg:h-96 bg-primary-600 rounded-full mix-blend-multiply filter blur-[96px] opacity-20 animate-blob"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 lg:w-96 lg:h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[96px] opacity-20 animate-blob animation-delay-2000"></div>

            {/* Content - Compact formatting for laptops */}
            <div className="container mx-auto px-6 max-w-[1200px] z-10 relative">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Left Column: Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center lg:text-left flex flex-col items-center lg:items-start"
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

                        <div className="mt-10 flex items-center gap-6 text-slate-400 dark:text-gray-500">
                            <a href="https://github.com/Wasmata" target="_blank" rel="noopener noreferrer" onMouseEnter={playHover} onClick={playClick} className="hover:text-primary-600 dark:hover:text-white transition-colors transform hover:scale-110 duration-200"><Github size={22} /></a>
                            <a href="https://www.linkedin.com/in/wassim-maataoui-113395267/" target="_blank" rel="noopener noreferrer" onMouseEnter={playHover} onClick={playClick} className="hover:text-primary-600 dark:hover:text-white transition-colors transform hover:scale-110 duration-200"><Linkedin size={22} /></a>
                        </div>
                    </motion.div>

                    {/* Right Column: WOW Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 50, rotateY: 30 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative flex justify-center items-center perspective-1000 w-full mt-12 lg:mt-0"
                    >
                        {/* Card Background Glow - Reduced */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-primary-500/20 rounded-full blur-[80px] animate-pulse"></div>

                        {/* Card Size Control: max-w-sm for laptops is key. No upscaling. */}
                        <div className="w-full max-w-[300px] md:max-w-sm z-10 hover:scale-105 active:scale-95 transition-transform duration-500">
                            <TiltCard isFlipped={isFlipped} onFlip={() => setIsFlipped(!isFlipped)} />
                            <p className="text-center text-xs text-slate-400 dark:text-gray-500 mt-4 lg:hidden animate-bounce">
                                Tap to flip card 👆
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Hero
