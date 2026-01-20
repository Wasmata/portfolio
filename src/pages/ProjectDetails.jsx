import { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from 'framer-motion'
import { ArrowLeft, ExternalLink, Github, Zap, Target, Cpu, ArrowUpRight, Sparkles, Layers } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { projectsData } from '../data/projects'

// --- 3D TILT INFO CARD (Ultra Premium) ---
const TiltBentoCard = ({ children, className = "", delay = 0 }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(yPct * -10); // Tilt strength
        y.set(xPct * 10);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay, type: "spring", stiffness: 100 }}
            style={{ transformStyle: "preserve-3d", transform }}
            className={`relative group rounded-3xl border border-slate-200/50 dark:border-white/10 bg-white/70 dark:bg-black/50 backdrop-blur-xl overflow-hidden shadow-2xl hover:shadow-primary-500/20 transition-shadow ${className}`}
        >
            {/* Grain Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            {/* Glossy Reflection Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div style={{ transform: "translateZ(20px)" }} className="relative h-full">
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

    // Parallax & Scale effects
    const heroScale = useTransform(scrollY, [0, 500], [1, 1.2])
    const heroOpacity = useTransform(scrollY, [0, 500], [1, 0])
    const textY = useTransform(scrollY, [0, 500], [0, 200])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

    const project = projectsData[language]?.find(p => p.id === id)

    if (!project) return null;

    return (
        <div className="min-h-screen bg-[#030303] text-white selection:bg-primary-500 selection:text-white overflow-hidden perspective-1000">

            {/* --- 1. CINEMATIC HERO SECTION --- */}
            <div className="relative h-[110vh] w-full flex items-center justify-center overflow-hidden">

                {/* Dynamic Background Image */}
                <motion.div
                    style={{ scale: heroScale, opacity: heroOpacity }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={mode === 'dark' ? project.image.dark : project.image.light}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-40 brightness-50"
                    />
                    {/* Vignette & Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-[#030303]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030303_100%)]"></div>
                    {/* Animated Grain */}
                    <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] animate-pulse"></div>
                </motion.div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <Link
                        to="/#projects"
                        className="absolute top-10 left-6 md:left-20 flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase tracking-[0.2em] text-xs font-bold"
                    >
                        <ArrowLeft size={14} /> {t.project_details.back}
                    </Link>

                    <motion.div style={{ y: textY }}>
                        {/* Floating Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
                        >
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            <span className="text-sm font-medium tracking-widest uppercase text-white/80">{project.category}</span>
                        </motion.div>

                        {/* MASSIVE 3D TITLE */}
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
                            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="text-7xl md:text-9xl lg:text-[10rem] font-black tracking-tighter mb-8 leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 mix-blend-overlay"
                            style={{ textShadow: "0px 20px 50px rgba(0,0,0,0.5)" }}
                        >
                            {project.title.toUpperCase()}
                        </motion.h1>

                        {/* Hero Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="flex justify-center gap-6"
                        >
                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg overflow-hidden hover:scale-110 transition-transform duration-300">
                                <span className="relative z-10 flex items-center gap-2">Live Site <ArrowUpRight size={20} /></span>
                                <div className="absolute inset-0 bg-primary-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                            </a>
                            {project.links.github && (
                                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full font-bold text-lg border border-white/20 text-white hover:bg-white/10 transition-colors backdrop-blur-sm flex items-center gap-2">
                                    <Github size={20} /> Code
                                </a>
                            )}
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* --- 2. THE TILT BENTO GRID (The "MAX WOW" Part) --- */}
            <div className="container mx-auto px-6 py-20 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* A. DESCRIPTION (Wide Card) */}
                    <div className="lg:col-span-2">
                        <TiltBentoCard className="h-full p-10 bg-gradient-to-br from-zinc-900/80 to-black/80 border-white/10">
                            <Sparkles className="text-yellow-400 mb-6 w-12 h-12" />
                            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">{t.project_details.about}</h2>
                            <p className="text-xl text-gray-300 leading-relaxed font-light">
                                {project.description}
                            </p>
                        </TiltBentoCard>
                    </div>

                    {/* B. TECH STACK (Tall Card) */}
                    <div className="lg:row-span-2">
                        <TiltBentoCard className="h-full p-8 bg-zinc-900/40 border-primary-500/20" delay={0.2}>
                            <div className="w-12 h-12 bg-primary-500/20 rounded-2xl flex items-center justify-center mb-6">
                                <Layers className="text-primary-400" size={24} />
                            </div>
                            <h3 className="text-2xl font-bold mb-6 text-white">{t.project_details.tech_stack}</h3>
                            <div className="flex flex-col gap-3">
                                {project.tags.map((tag, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                                        <span className="font-mono text-primary-200">{tag}</span>
                                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                    </div>
                                ))}
                            </div>
                        </TiltBentoCard>
                    </div>

                    {/* C. CHALLENGE */}
                    <TiltBentoCard className="p-8 bg-zinc-900/60 border-red-500/20" delay={0.3}>
                        <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-3">
                            <Target size={24} /> {t.project_details.challenge}
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                            {project.challenge}
                        </p>
                    </TiltBentoCard>

                    {/* D. SOLUTION */}
                    <TiltBentoCard className="p-8 bg-zinc-900/60 border-emerald-500/20" delay={0.4}>
                        <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-3">
                            <Zap size={24} /> {t.project_details.solution}
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                            {project.solution}
                        </p>
                    </TiltBentoCard>

                    {/* E. CTA (Full Width) */}
                    <div className="lg:col-span-3 mt-8">
                        <TiltBentoCard className="relative p-12 overflow-hidden bg-white text-black" delay={0.5}>
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary-400 to-purple-500 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>

                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div>
                                    <h3 className="text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-black to-slate-600">
                                        {t.project_details.cta_title}
                                    </h3>
                                    <p className="text-slate-600 text-lg font-medium">{t.project_details.cta_desc}</p>
                                </div>

                                <Link
                                    to="/#contact"
                                    className="px-10 py-5 bg-black text-white rounded-full font-bold text-xl hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/20 transition-all flex items-center gap-3"
                                >
                                    {t.project_details.cta_btn} <ArrowUpRight />
                                </Link>
                            </div>
                        </TiltBentoCard>
                    </div>

                </div>
            </div>

            {/* Footer space */}
            <div className="h-20"></div>
        </div>
    )
}

export default ProjectDetails
