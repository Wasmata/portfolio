import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from 'framer-motion'
import { ArrowLeft, ExternalLink, Github, Zap, Target, Cpu, ArrowUpRight, Sparkles } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { projectsData } from '../data/projects'

// --- SPOTLIGHT CARD COMPONENT (Inline for specialized usage) ---
const BentoCard = ({ children, className = "", delay = 0 }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className={`group relative border border-slate-200 dark:border-white/10 bg-white dark:bg-black overflow-hidden rounded-3xl ${className}`}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.15),
              transparent 80%
            )
          `,
                }}
            />
            <div className="relative h-full">{children}</div>
        </motion.div>
    );
};

const ProjectDetails = () => {
    const { id } = useParams()
    const { language, t } = useLanguage()
    const { mode } = useTheme()
    const { scrollY } = useScroll()

    // Parallax & Scale effects
    const heroScale = useTransform(scrollY, [0, 500], [1, 1.1])
    const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.3])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

    const project = projectsData[language]?.find(p => p.id === id)

    if (!project) return null;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black transition-colors selection:bg-primary-500 selection:text-white">

            {/* --- 1. HUGE HERO SECTION --- */}
            <div className="relative h-screen w-full flex items-center overflow-hidden">

                {/* Dynamic Background */}
                <motion.div
                    style={{ scale: heroScale, opacity: heroOpacity }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={mode === 'dark' ? project.image.dark : project.image.light}
                        alt={project.title}
                        className="w-full h-full object-cover filter blur-sm scale-110 opacity-30 dark:opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-transparent to-slate-50 dark:from-black/80 dark:to-black"></div>
                </motion.div>

                <div className="container mx-auto px-6 relative z-10 pt-20">
                    <Link
                        to="/#projects"
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-black dark:text-gray-400 dark:hover:text-white mb-8 transition-colors uppercase tracking-widest text-xs font-bold"
                    >
                        <ArrowLeft size={16} /> {t.project_details.back}
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Category Badge */}
                        <span className="inline-block px-4 py-2 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-full text-sm font-bold shadow-lg shadow-primary-500/30 mb-6">
                            {project.category}
                        </span>

                        {/* Massive Title */}
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 dark:text-white tracking-tighter mb-8 leading-[0.9]">
                            {project.title.toUpperCase()}
                        </h1>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4 mt-8">
                            <a
                                href={project.links.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-slate-900 dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 hover:scale-105 transition-transform"
                            >
                                Live Demo <ArrowUpRight size={24} className="group-hover:rotate-45 transition-transform" />
                            </a>
                            {project.links.github && (
                                <a
                                    href={project.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 rounded-full font-bold text-lg border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                                >
                                    <Github size={24} /> Code
                                </a>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* --- 2. THE BENTO GRID (The "WOW" Part) --- */}
            <div className="container mx-auto px-6 pb-32 -mt-32 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">

                    {/* A. DESCRIPTION (Big Card) - Cols 8 */}
                    <BentoCard className="md:col-span-6 lg:col-span-8 p-10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-white/20">
                        <Sparkles className="text-amber-400 mb-6 h-10 w-10" />
                        <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">{t.project_details.about}</h2>
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-gray-300 leading-relaxed font-light">
                            {project.description}
                        </p>
                    </BentoCard>

                    {/* B. TECH STACK (Tall Card) - Cols 4 */}
                    <BentoCard className="md:col-span-6 lg:col-span-4 p-8 bg-slate-100/50 dark:bg-zinc-900/50" delay={0.1}>
                        <div className="flex items-center gap-3 mb-6">
                            <Cpu className="text-primary-500" />
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t.project_details.tech_stack}</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, i) => (
                                <span key={i} className="px-4 py-2 bg-white dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl text-sm font-semibold text-slate-700 dark:text-gray-300 shadow-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </BentoCard>

                    {/* C. CHALLENGE (Medium Card) - Cols 6 */}
                    <BentoCard className="md:col-span-6 p-8 bg-red-50/50 dark:bg-red-900/10 border-red-200 dark:border-red-500/20" delay={0.2}>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="p-3 bg-red-500 rounded-xl text-white shadow-lg shadow-red-500/30">
                                <Target size={24} />
                            </span>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{t.project_details.challenge}</h3>
                        </div>
                        <p className="text-slate-600 dark:text-gray-300 text-lg leading-relaxed mt-4">
                            {project.challenge}
                        </p>
                    </BentoCard>

                    {/* D. SOLUTION (Medium Card) - Cols 6 */}
                    <BentoCard className="md:col-span-6 p-8 bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-500/20" delay={0.3}>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="p-3 bg-emerald-500 rounded-xl text-white shadow-lg shadow-emerald-500/30">
                                <Zap size={24} />
                            </span>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{t.project_details.solution}</h3>
                        </div>
                        <p className="text-slate-600 dark:text-gray-300 text-lg leading-relaxed mt-4">
                            {project.solution}
                        </p>
                    </BentoCard>

                    {/* E. CTA (Full Width) - Cols 12 */}
                    <BentoCard className="col-span-1 md:col-span-12 p-12 bg-gradient-to-r from-slate-900 to-slate-800 text-white overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8" delay={0.4}>
                        {/* Abstract Shape */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary-500 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

                        <div className="relative z-10 max-w-2xl">
                            <h3 className="text-3xl md:text-4xl font-bold mb-4">{t.project_details.cta_title}</h3>
                            <p className="text-slate-300 text-lg">{t.project_details.cta_desc}</p>
                        </div>

                        <div className="relative z-10">
                            <Link
                                to="/#contact"
                                className="inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-50 transition-colors hover:scale-105 transform duration-300"
                            >
                                {t.project_details.cta_btn} <ArrowUpRight size={20} />
                            </Link>
                        </div>
                    </BentoCard>

                </div>
            </div>
        </div>
    )
}

export default ProjectDetails
