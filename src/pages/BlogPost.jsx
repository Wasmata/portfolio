import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Share2, Tag } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { articles } from '../data/blog'

const BlogPost = () => {
    const { slug } = useParams()
    const { t, language } = useLanguage()
    const navigate = useNavigate()

    const article = articles.find(a => a.slug === slug)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (!article) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">404</h2>
                <p className="text-slate-600 dark:text-gray-400 mb-8">Article not found.</p>
                <Link to="/blog" className="px-6 py-3 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 transition-colors">
                    {t.blog.back}
                </Link>
            </div>
        )
    }

    const content = article.content[language]

    // Simple markdown-like parser for the content
    // CAUTION: This is basic. For production, use 'react-markdown'
    const renderContent = (text) => {
        return text.split('\n').map((line, i) => {
            if (line.startsWith('## ')) {
                return <h2 key={i} className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-white">{line.replace('## ', '')}</h2>
            }
            if (line.startsWith('### ')) {
                return <h3 key={i} className="text-xl md:text-2xl font-bold mt-8 mb-4 text-slate-800 dark:text-gray-100">{line.replace('### ', '')}</h3>
            }
            if (line.startsWith('> ')) {
                return <blockquote key={i} className="border-l-4 border-primary-500 pl-6 py-2 my-8 italic text-slate-700 dark:text-gray-300 bg-slate-50 dark:bg-white/5 rounded-r-lg">{line.replace('> ', '')}</blockquote>
            }
            if (line.trim().startsWith('* ')) {
                return <li key={i} className="ml-6 list-disc text-slate-600 dark:text-gray-300 mb-2">{line.replace('* ', '')}</li>
            }
            if (line.trim().match(/^\d+\./)) {
                return <li key={i} className="ml-6 list-decimal text-slate-600 dark:text-gray-300 mb-2">{line.replace(/^\d+\.\s/, '')}</li>
            }
            if (line.trim() === '') {
                return <br key={i} />
            }
            return <p key={i} className="text-lg leading-relaxed text-slate-600 dark:text-gray-300 mb-4">{line}</p>
        })
    }

    return (
        <article className="pt-32 pb-20 min-h-screen relative">
            <div className="container mx-auto px-4 max-w-4xl">

                {/* Back Button */}
                <Link to="/blog" className="inline-flex items-center gap-2 text-slate-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 font-medium mb-8 transition-colors">
                    <ArrowLeft size={20} /> {t.blog.back}
                </Link>

                {/* Header */}
                <header className="mb-12">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {article.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 text-sm font-bold uppercase tracking-wider bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-full">{tag}</span>
                        ))}
                    </div>

                    <h1 className="text-3xl md:text-5xl md:leading-tight font-extrabold mb-6 text-slate-900 dark:text-white">
                        {article.title[language]}
                    </h1>

                    <div className="flex flex-wrap items-center justify-between gap-6 border-b border-slate-200 dark:border-white/10 pb-8">
                        <div className="flex items-center gap-6 text-sm md:text-base text-slate-500 dark:text-gray-400">
                            <span className="flex items-center gap-2"><Calendar size={18} /> {article.date}</span>
                            <span className="flex items-center gap-2"><Clock size={18} /> {article.readTime}</span>
                        </div>

                        <button className="flex items-center gap-2 text-primary-500 font-bold hover:text-primary-600 transition-colors">
                            <Share2 size={18} /> Share
                        </button>
                    </div>
                </header>

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    {renderContent(content)}
                </div>

                {/* Footer CTA */}
                <div className="mt-20 p-8 md:p-12 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center">
                    <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{t.contact.title} <span className="gradient-text">{t.contact.title_highlight}</span> ?</h3>
                    <p className="text-slate-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
                        {t.contact.description}
                    </p>
                    <Link to="/#contact" className="inline-flex items-center justify-center px-8 py-3 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition-all shadow-lg hover:shadow-primary-500/25">
                        {t.contact.send}
                    </Link>
                </div>
            </div>
        </article>
    )
}

export default BlogPost
