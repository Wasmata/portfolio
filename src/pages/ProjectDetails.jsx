import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, ExternalLink, Github, Layers, Calendar, Rocket, Sparkles } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { projectsData } from '../data/projects'

const ProjectDetails = () => {
    const { id } = useParams()
    const { language, t } = useLanguage()
    const { mode } = useTheme()
    const { scrollY } = useScroll()

    // Parallax effect for hero image
    const y = useTransform(scrollY, [0, 500], [0, 150])
    const opacity = useTransform(scrollY, [0, 300], [1, 0])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

    const project = projectsData[language]?.find(p => p.id === id)

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center dark:text-white bg-slate-50 dark:bg-black transition-colors">
                <h1 className="text-6xl font-bold mb-4 gradient-text">404</h1>
                <p className="text-xl mb-8 text-slate-600 dark:text-gray-400">Projet non trouvé / Project not found</p>
                <Link
                    to="/"
                    className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-full hover:bg-primary-700 transition-colors"
                >
                    <ArrowLeft size={20} /> Home
                </Link>
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-white dark:bg-black transition-colors"
        >
            {/* 1. IMMERSIVE HERO SECTION */}
            <div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] w-full overflow-hidden">
                <Link
                    to="/#projects"
                    className="absolute top-8 left-8 z-50 flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full hover:bg-white/30 transition-colors"
                >
                    <ArrowLeft size={18} />
                    <span className="font-medium">{t.project_details.back}</span>
                </Link>

                <motion.div
                    style={{ y, opacity }}
                    className="absolute inset-0 w-full h-full"
                >
                    <img
                        src={mode === 'dark' ? project.image.dark : project.image.light}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30"></div>
                </motion.div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="max-w-5xl"
                    >
                        <span className="inline-block px-4 py-1.5 bg-primary-500/20 text-primary-300 border border-primary-500/30 backdrop-blur-md rounded-full text-sm font-medium mb-6">
                            {project.category}
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                            {project.title}
                        </h1>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href={project.links.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-bold transition-all hover:scale-105 shadow-lg shadow-primary-900/20"
                            >
                                <Rocket size={20} /> Live Demo
                            </a>
                            {project.links.github && (
                                <a
                                    href={project.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md px-8 py-4 rounded-full font-bold transition-all"
                                >
                                    <Github size={20} /> Github
                                </a>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* 2. MAIN CONTENT GRID */}
            <div className="container mx-auto px-6 py-20">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">

                    {/* LEFT COLUMN: Narrative (8 cols) */}
                    <div className="lg:col-span-8 space-y-16">
                        {/* Summary */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-3">
                                <Sparkles className="text-yellow-500" /> {t.project_details.about}
                            </h2>
                            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                                {project.description}
                            </p>
                        </motion.section>

                        {/* Challenge & Solution Cards */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-slate-50 dark:bg-zinc-900/50 p-8 rounded-2xl border border-slate-100 dark:border-white/5"
                            >
                                <h3 className="text-xl font-bold mb-4 text-red-500 flex items-center gap-2">
                                    🎯 {t.project_details.challenge}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {project.challenge}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-slate-50 dark:bg-zinc-900/50 p-8 rounded-2xl border border-slate-100 dark:border-white/5"
                            >
                                <h3 className="text-xl font-bold mb-4 text-emerald-500 flex items-center gap-2">
                                    💡 {t.project_details.solution}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {project.solution}
                                </p>
                            </motion.div>
                        </div>

                        {/* Large Image Showcase (Optional - reusing image for now but styled differently) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10"
                        >
                            <img
                                src={mode === 'dark' ? project.image.dark : project.image.light}
                                alt="Detail view"
                                className="w-full hover:scale-105 transition-transform duration-700"
                            />
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: Sidebar (4 cols) */}
                    <div className="lg:col-span-4 space-y-8 h-fit lg:sticky lg:top-24">

                        {/* Tech Stack Card */}
                        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 p-6 rounded-2xl shadow-sm">
                            <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                                <Layers size={20} className="text-primary-500" />
                                {t.project_details.tech_stack}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* CTA Card - FIXED VISIBILITY */}
                        <div className="relative overflow-hidden bg-primary-900 dark:bg-primary-950 p-8 rounded-2xl text-center text-white shadow-xl">
                            {/* Distinctive background pattern */}
                            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-3">{t.project_details.cta_title}</h3>
                                <p className="text-primary-100 mb-6">
                                    {t.project_details.cta_desc}
                                </p>
                                <Link
                                    to="/#contact"
                                    className="inline-flex items-center gap-2 bg-white text-primary-900 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                >
                                    {t.project_details.cta_btn} <ArrowLeft size={18} className="rotate-180" />
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default ProjectDetails
