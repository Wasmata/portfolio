import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ExternalLink, Github } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import SpotlightCard from './Showcase/SpotlightCard'
import useSound from '../hooks/useSound'
import { projectsData } from '../data/projects'

const Projects = () => {
    const { t, language } = useLanguage()
    const { mode } = useTheme()
    const { playClick, playHover } = useSound()



    const projects = projectsData[language]

    return (
        <section id="projects" className="py-20 bg-slate-50 dark:bg-black/50 transition-colors">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">{t.projects.title} <span className="gradient-text">{t.projects.title_highlight}</span></h2>
                    <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {t.projects.description}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <SpotlightCard className="h-full group hover:border-primary-500/50 flex flex-col">
                                <Link to={`/project/${project.id}`} className="block relative overflow-hidden h-48 cursor-pointer">
                                    <img
                                        src={mode === 'dark' ? project.image.dark : project.image.light}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                        <span className="px-4 py-2 bg-primary-600 text-white rounded-full text-sm font-bold shadow-lg hover:scale-105 transition-transform">
                                            {language === 'fr' ? 'Voir Détails' : 'View Details'}
                                        </span>
                                    </div>
                                </Link>

                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="text-sm text-primary-600 dark:text-primary-400 mb-2">{project.category}</div>
                                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                                        <Link to={`/project/${project.id}`} className="hover:text-primary-500 transition-colors">
                                            {project.title}
                                        </Link>
                                    </h3>
                                    <p className="text-slate-600 dark:text-gray-400 text-sm mb-4 flex-grow">{project.description}</p>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200 dark:border-white/5">
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.slice(0, 3).map((tag, i) => (
                                                <span key={i} className="text-xs px-2 py-1 rounded bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-gray-300">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" onMouseEnter={playHover} onClick={playClick} className="p-2 text-slate-500 hover:text-primary-500 transition-colors"><ExternalLink size={18} /></a>
                                            {project.links.github && (
                                                <a href={project.links.github} target="_blank" rel="noopener noreferrer" onMouseEnter={playHover} onClick={playClick} className="p-2 text-slate-500 hover:text-white transition-colors"><Github size={18} /></a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Projects
