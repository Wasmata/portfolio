import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import SpotlightCard from './Showcase/SpotlightCard'
import useSound from '../hooks/useSound'

const Projects = () => {
    const { t, language } = useLanguage()
    const { mode } = useTheme()
    const { playClick, playHover } = useSound()

    const projectsData = {
        fr: [
            {
                title: "SMA Anime",
                category: "Streaming & Lecture",
                image: {
                    light: "/projects/sma_light.png",
                    dark: "/projects/sma_dark.png"
                },
                tags: ["Django", "Tailwind CSS", "Python"],
                links: { demo: "https://up.sma-anime.com/", github: null },
                description: "Plateforme complète de streaming d'animés et de lecture de mangas."
            },
            {
                title: "JeuxCracks",
                category: "Gaming & Téléchargement",
                image: {
                    light: "/projects/jeuxcracks_light.png",
                    dark: "/projects/jeuxcracks_dark.png"
                },
                tags: ["Django", "Vue.js", "Nuxt", "Vite"],
                links: { demo: "https://jeuxcracks.fr/", github: null },
                description: "Catalogue de jeux PC gratuits. Interface moderne et rapide utilisant la puissance de Nuxt et Django."
            },
            {
                title: "WassiHost",
                category: "Hébergement & Réseaux",
                image: {
                    light: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2534&auto=format&fit=crop",
                    dark: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2534&auto=format&fit=crop"
                },
                tags: ["Hosting", "Pterodactyl", "Linux", "Networking"],
                links: { demo: "https://panel.wassihost.com/", github: null },
                description: "Hébergeur web et serveurs de jeux. Je gère tout de A à Z : création du site, hébergement, noms de domaine et infrastructure réseau."
            }
        ],
        en: [
            {
                title: "SMA Anime",
                category: "Streaming & Reading",
                image: {
                    light: "/projects/sma_light.png",
                    dark: "/projects/sma_dark.png"
                },
                tags: ["Django", "Tailwind CSS", "Python"],
                links: { demo: "https://up.sma-anime.com/", github: null },
                description: "Complete platform for streaming anime and reading manga."
            },
            {
                title: "JeuxCracks",
                category: "Gaming & Downloads",
                image: {
                    light: "/projects/jeuxcracks_light.png",
                    dark: "/projects/jeuxcracks_dark.png"
                },
                tags: ["Django", "Vue.js", "Nuxt", "Vite"],
                links: { demo: "https://jeuxcracks.fr/", github: null },
                description: "Catalog of free PC games. Modern and fast interface leveraging Nuxt and Django."
            },
            {
                title: "WassiHost",
                category: "Hosting & Networking",
                image: {
                    light: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2534&auto=format&fit=crop",
                    dark: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2534&auto=format&fit=crop"
                },
                tags: ["Hosting", "Pterodactyl", "Linux", "Networking"],
                links: { demo: "https://panel.wassihost.com/", github: null },
                description: "Web and game server hosting provider. I handle everything from A to Z: website creation, hosting, domain names, and network infrastructure."
            }
        ]
    }

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
                            <SpotlightCard className="h-full group hover:border-primary-500/50">
                                <div className="relative overflow-hidden h-48">
                                    <img
                                        src={mode === 'dark' ? project.image.dark : project.image.light}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer" onMouseEnter={playHover} onClick={playClick} className="p-2 bg-white text-black rounded-full hover:scale-110 transition-transform"><ExternalLink size={20} /></a>
                                        {project.links.github && (
                                            <a href={project.links.github} target="_blank" rel="noopener noreferrer" onMouseEnter={playHover} onClick={playClick} className="p-2 bg-zinc-800 text-white rounded-full hover:scale-110 transition-transform"><Github size={20} /></a>
                                        )}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="text-sm text-primary-600 dark:text-primary-400 mb-2">{project.category}</div>
                                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{project.title}</h3>
                                    <p className="text-slate-600 dark:text-gray-400 text-sm mb-4">{project.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag, i) => (
                                            <span key={i} className="text-xs px-2 py-1 rounded bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-gray-300">
                                                {tag}
                                            </span>
                                        ))}
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
