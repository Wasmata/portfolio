import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Github, Layers, ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { projectsData } from '../data/projects'

const ProjectDetails = () => {
    const { id } = useParams()
    const { language, t } = useLanguage()
    const { mode } = useTheme()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

    const project = projectsData[language]?.find(p => p.id === id)

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-slate-900 dark:text-white transition-colors">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="mb-6">Projet non trouvé</p>
                <Link to="/" className="text-primary-600 hover:underline">Return Home</Link>
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-white dark:bg-black transition-colors pt-24 pb-20"
        >
            <div className="max-w-4xl mx-auto px-6">

                {/* 1. HEADER: Simple & Clean */}
                <div className="mb-12">
                    <Link
                        to="/#projects"
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white mb-8 transition-colors text-sm font-medium"
                    >
                        <ArrowLeft size={18} />
                        {t.project_details.back}
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-gray-300 rounded-full text-sm font-medium">
                                {project.category}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
                            {project.title}
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                            {project.description}
                        </p>
                    </motion.div>
                </div>

                {/* 2. MAIN IMAGE: Clean, Rounded, No Gradient Overlay */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-zinc-800 mb-16 bg-slate-100 dark:bg-zinc-900"
                >
                    <img
                        src={mode === 'dark' ? project.image.dark : project.image.light}
                        alt={project.title}
                        className="w-full h-auto object-cover"
                    />
                </motion.div>

                {/* 3. CONTENT GRID: Tech Stack + Details */}
                <div className="grid md:grid-cols-12 gap-12">

                    {/* DETAILS (8 cols) */}
                    <div className="md:col-span-8 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                                {t.project_details.challenge}
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-gray-300 leading-relaxed">
                                {project.challenge}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                                {t.project_details.solution}
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-gray-300 leading-relaxed">
                                {project.solution}
                            </p>
                        </section>

                        <div className="pt-8 flex flex-wrap gap-4">
                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="bg-slate-900 dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
                                <ExternalLink size={18} /> Live Demo
                            </a>
                            {project.links.github && (
                                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white px-6 py-3 rounded-lg font-bold hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors flex items-center gap-2">
                                    <Github size={18} /> GitHub
                                </a>
                            )}
                        </div>
                    </div>

                    {/* SIDEBAR (4 cols) */}
                    <div className="md:col-span-4 space-y-8">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-gray-500 mb-4 border-b border-slate-200 dark:border-zinc-800 pb-2">
                                {t.project_details.tech_stack}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1.5 bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-md text-sm text-slate-700 dark:text-gray-300">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. FOOTER CTA: Simple Block */}
                <div className="mt-20 pt-12 border-t border-slate-100 dark:border-zinc-800">
                    <div className="bg-slate-50 dark:bg-zinc-900 rounded-2xl p-8 md:p-12 text-center">
                        <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                            {t.project_details.cta_title}
                        </h3>
                        <p className="text-slate-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
                            {t.project_details.cta_desc}
                        </p>
                        <Link
                            to="/#contact"
                            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-bold hover:underline text-lg"
                        >
                            {t.project_details.cta_btn} <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>

            </div>
        </motion.div>
    )
}

export default ProjectDetails
