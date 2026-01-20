import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, ExternalLink, Github, Zap, Target, Cpu, ArrowUpRight, Sparkles, Layers } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { projectsData } from '../data/projects'

// --- STANDARD PREMIUM CARD (No Tilt, Clean) ---
const BentoCard = ({ children, className = "", delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className={`relative rounded-3xl border overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 ${className}`}
        >
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none"></div>

            <div className="relative h-full z-10">
                {children}
            </div>
        </motion.div>
    );
};

const ProjectDetails = () => {
    const { id } = useParams()
    const { language, t } = useLanguage()
    const { mode } = useTheme()
    const { scrollY } = useScroll()

    // Parallax & Fade
    const heroScale = useTransform(scrollY, [0, 500], [1, 1.1])
    const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.4])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

    const project = projectsData[language]?.find(p => p.id === id)

    if (!project) return null;

    return (
        <div className="min-h-screen bg-white dark:bg-[#030303] transition-colors duration-500 selection:bg-primary-500 selection:text-white">

            {/* --- 1. HERO SECTION (Light & Dark Compatible) --- */}
            <div className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden bg-slate-100 dark:bg-black">

                {/* Background Image */}
                {/* Background Image */}
                <motion.div
                    style={{ opacity: heroOpacity }}
                    className="absolute inset-0 z-0"
                >
                    <motion.img
                        initial={{ scale: 1 }}
                        animate={{ scale: 1.15 }}
                        transition={{
                            duration: 20,
                            ease: "linear",
                            repeat: Infinity,
                            repeatType: "mirror"
                        }}
                        src={mode === 'dark' ? project.image.dark : project.image.light}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-80 dark:opacity-50 blur-sm brightness-90 dark:brightness-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/50 dark:from-[#030303] dark:via-transparent dark:to-black/50"></div>
                </motion.div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <Link
                        to="/#projects"
                        className="absolute top-10 left-6 md:left-20 flex items-center gap-2 text-slate-700 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors uppercase tracking-widest text-xs font-bold bg-white/50 dark:bg-black/20 p-2 rounded-lg backdrop-blur-md"
                    >
                        <ArrowLeft size={16} /> {t.project_details.back}
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md mb-8 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                            <span className="text-sm font-bold tracking-widest uppercase text-slate-800 dark:text-white/90">{project.category}</span>
                        </div>

                        {/* Title - Adaptive Color */}
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 text-slate-900 dark:text-white drop-shadow-sm dark:drop-shadow-lg leading-[1.1]">
                            {project.title.toUpperCase()}
                        </h1>

                        {/* Buttons */}
                        <div className="flex justify-center gap-4 mt-4">
                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-lg hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg hover:shadow-xl">
                                Live Site <ArrowUpRight size={20} />
                            </a>
                            {project.links.github && (
                                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full font-bold text-lg bg-white dark:bg-black border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition-colors flex items-center gap-2">
                                    <Github size={20} /> Code
                                </a>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* --- 2. CLEAN BENTO GRID (Stable, No 3D) --- */}
            <div className="container mx-auto px-6 py-20 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* A. DESCRIPTION */}
                    <div className="lg:col-span-2">
                        <BentoCard className="h-full p-8 md:p-10 bg-white dark:bg-zinc-900 border-slate-100 dark:border-white/5 shadow-slate-200/50 dark:shadow-none">
                            <Sparkles className="text-amber-500 mb-6 w-8 h-8 md:w-10 md:h-10" />
                            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-900 dark:text-white">{t.project_details.about}</h2>
                            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                                {project.description}
                            </p>
                        </BentoCard>
                    </div>

                    {/* B. TECH STACK */}
                    <div className="lg:row-span-2">
                        <BentoCard className="h-full p-8 bg-slate-50 dark:bg-zinc-900/50 border-slate-200 dark:border-white/10" delay={0.1}>
                            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-500/20 rounded-xl flex items-center justify-center mb-6">
                                <Layers className="text-primary-600 dark:text-primary-400" size={24} />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold mb-6 text-slate-900 dark:text-white">{t.project_details.tech_stack}</h3>
                            <div className="flex flex-col gap-3">
                                {project.tags.map((tag, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm">
                                        <span className="font-semibold text-slate-700 dark:text-slate-200">{tag}</span>
                                        <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                                    </div>
                                ))}
                            </div>
                        </BentoCard>
                    </div>

                    {/* C. CHALLENGE */}
                    <BentoCard className="p-8 bg-white dark:bg-zinc-900 border-red-100 dark:border-red-500/20" delay={0.2}>
                        <h3 className="text-xl font-bold text-red-500 dark:text-red-400 mb-4 flex items-center gap-3">
                            <Target size={24} /> {t.project_details.challenge}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                            {project.challenge}
                        </p>
                    </BentoCard>

                    {/* D. SOLUTION */}
                    <BentoCard className="p-8 bg-white dark:bg-zinc-900 border-emerald-100 dark:border-emerald-500/20" delay={0.3}>
                        <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-3">
                            <Zap size={24} /> {t.project_details.solution}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                            {project.solution}
                        </p>
                    </BentoCard>

                    {/* E. CTA */}
                    <div className="lg:col-span-3 mt-8">
                        <BentoCard className="relative p-10 md:p-12 overflow-hidden bg-primary-600 text-white shadow-xl shadow-primary-900/20" delay={0.4}>
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                                <div>
                                    <h3 className="text-3xl md:text-4xl font-bold mb-2">
                                        {t.project_details.cta_title}
                                    </h3>
                                    <p className="text-primary-100 text-lg">{t.project_details.cta_desc}</p>
                                </div>

                                <Link
                                    to="/#contact"
                                    className="px-8 py-4 bg-white text-primary-600 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center gap-3 shadow-lg"
                                >
                                    {t.project_details.cta_btn} <ArrowUpRight />
                                </Link>
                            </div>
                        </BentoCard>
                    </div>

                </div>
            </div>

            <div className="h-20"></div>
        </div>
    )
}

export default ProjectDetails
