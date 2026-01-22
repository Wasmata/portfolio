import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { articles } from '../data/blog'
import SpotlightCard from '../components/Showcase/SpotlightCard'

const Blog = () => {
    const { t, language } = useLanguage()

    return (
        <section className="pt-32 pb-20 min-h-screen relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
                        {t.blog.title} <span className="gradient-text">{t.blog.title_highlight}</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {t.blog.subtitle}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article, index) => (
                        <motion.div
                            key={article.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link to={`/blog/${article.slug}`}>
                                <SpotlightCard className="h-full flex flex-col p-0 overflow-hidden bg-white dark:bg-[#0a0a0a] border-slate-200 dark:border-white/10 group rounded-2xl hover:border-primary-500/50 transition-colors">
                                    {/* Image Placeholder */}
                                    <div className="h-48 w-full bg-slate-100 dark:bg-white/5 relative overflow-hidden border-b border-slate-200 dark:border-white/5">
                                        <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-white/5 dark:to-white/10 group-hover:scale-105 transition-transform duration-500"></div>
                                        <div className="absolute inset-0 flex items-center justify-center opacity-30 text-6xl select-none grayscale group-hover:grayscale-0 transition-all">
                                            {/* Abstract Emoji based on ID? or just a nice gradient */}
                                            {index === 0 ? '⚡' : index === 1 ? '⚛️' : '🎨'}
                                        </div>
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            {article.tags.map(tag => (
                                                <span key={tag} className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/90 dark:bg-black/80 backdrop-blur rounded-md text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 shadow-sm">{tag}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-gray-500 mb-4 uppercase tracking-wide">
                                            <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
                                            <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
                                        </div>

                                        <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors line-clamp-2">
                                            {article.title[language]}
                                        </h3>

                                        <p className="text-slate-600 dark:text-gray-400 text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">
                                            {article.excerpt[language]}
                                        </p>

                                        <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-bold text-sm group-hover:gap-3 transition-all pt-4 border-t border-slate-100 dark:border-white/5">
                                            {t.blog.read_more} <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Blog
