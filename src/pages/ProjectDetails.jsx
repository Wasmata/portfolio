import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Github, Calendar, Layers } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { projectsData } from '../data/projects'

const ProjectDetails = () => {
    const { id } = useParams()
    const { language, t } = useLanguage()
    const { mode } = useTheme()

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

    const project = projectsData[language].find(p => p.id === id)

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center dark:text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">404</h1>
                    <p className="mb-8">Projet non trouvé / Project not found</p>
                    <Link to="/" className="text-primary-500 hover:underline">Return Home</Link>
                </div>
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-slate-50 dark:bg-black transition-colors pt-24 pb-20"
        >
            {/* Header / Hero */}
            <div className="container mx-auto px-4">
                <Link to="/" className="inline-flex items-center gap-2 text-slate-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 mb-8 transition-colors">
                    <ArrowLeft size={20} />
                    {language === 'fr' ? 'Retour' : 'Back'}
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="relative h-[60vh] rounded-3xl overflow-hidden shadow-2xl mb-12 group">
                        <img
                            src={mode === 'dark' ? project.image.dark : project.image.light}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <span className="inline-block px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full mb-4">
                                    {project.category}
                                </span>
                                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{project.title}</h1>

                                <div className="flex flex-wrap gap-4">
                                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform">
                                        <ExternalLink size={20} /> Live Demo
                                    </a>
                                    {project.links.github && (
                                        <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white border border-white/20 px-6 py-3 rounded-full font-bold hover:bg-white/30 transition-colors">
                                            <Github size={20} /> Github
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-12">
                        <motion.section
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-3">
                                💡 {language === 'fr' ? 'À propos du projet' : 'About the Project'}
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-gray-300 leading-relaxed">
                                {project.description}
                            </p>
                        </motion.section>

                        <motion.section
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-3">
                                🚀 {language === 'fr' ? 'Challenge' : 'Challenge'}
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-gray-300 leading-relaxed mb-12">
                                {project.challenge}
                            </p>

                            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-3">
                                💡 {language === 'fr' ? 'Solution' : 'Solution'}
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-gray-300 leading-relaxed">
                                {project.solution}
                            </p>
                        </motion.section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-slate-200 dark:border-white/10">
                            <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
                                <Layers size={20} className="text-primary-500" /> Tech Stack
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag, i) => (
                                    <span key={i} className="px-3 py-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-700 dark:text-gray-300">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-primary-900 to-slate-900 p-6 rounded-2xl text-white">
                            <h3 className="text-xl font-bold mb-4">Need a similar project?</h3>
                            <p className="text-gray-300 mb-6 text-sm">
                                I can help you build high-performance web applications like this one.
                            </p>
                            <Link to="/#contact" className="block w-full text-center bg-white text-primary-900 font-bold py-3 rounded-lg hover:bg-slate-200 transition-colors">
                                Let's Talk
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default ProjectDetails
