import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import SpotlightCard from './Showcase/SpotlightCard'

const Testimonials = () => {
    const { t } = useLanguage()

    // Duplicate for infinite loop
    const items = [...t.testimonials.items, ...t.testimonials.items]

    return (
        <section className="py-20 relative overflow-hidden bg-white/50 dark:bg-black/20 backdrop-blur-sm">
            {/* Header */}
            <div className="container mx-auto px-4 mb-12 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                    {t.testimonials.title} <span className="gradient-text">{t.testimonials.title_highlight}</span>
                </h2>
                <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
                    {t.testimonials.subtitle}
                </p>
            </div>

            {/* Marquee */}
            <div className="relative w-full overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                <motion.div
                    className="flex gap-6 w-max pl-4"
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 40,
                        ease: "linear",
                        repeat: Infinity
                    }}
                >
                    {items.map((item, i) => (
                        <SpotlightCard key={i} className="w-[300px] md:w-[400px] p-8 flex-shrink-0 border-slate-200 dark:border-white/5 bg-white dark:bg-[#0a0a0a]">
                            <Quote className="text-primary-500 mb-4 opacity-50" size={32} />
                            <p className="text-slate-700 dark:text-gray-300 mb-6 italic text-lg leading-relaxed">
                                "{item.text}"
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary-500/20">
                                    {item.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">{item.name}</h4>
                                    <p className="text-sm text-slate-500 dark:text-gray-500">{item.role}</p>
                                </div>
                            </div>
                        </SpotlightCard>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default Testimonials
