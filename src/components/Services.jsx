import { motion } from 'framer-motion'
import { Layout, Smartphone, Database, Globe } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import SpotlightCard from './Showcase/SpotlightCard'

const Services = () => {
    const { t } = useLanguage()

    return (
        <section id="services" className="py-20 relative">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">{t.pricing.title} <span className="gradient-text">{t.pricing.title_highlight}</span></h2>
                    <p className="text-slate-600 dark:text-gray-400 max-w-xl">
                        {t.pricing.subtitle}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Offer 1: Showcase - Clean & Visual */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <SpotlightCard className="p-8 h-full flex flex-col justify-between border-slate-200 dark:border-white/5">
                            <div>
                                <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">{t.pricing.showcase.title}</h3>
                                <div className="text-3xl font-black text-primary-500 mb-4">{t.pricing.showcase.price}</div>
                                <p className="text-slate-600 dark:text-gray-400 text-sm mb-6 pb-6 border-b border-slate-200 dark:border-white/10">
                                    {t.pricing.showcase.desc}
                                </p>
                                <ul className="space-y-3 mb-8">
                                    {t.pricing.showcase.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-gray-300">
                                            <span className="text-green-500 mt-0.5">✔</span> {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <a href="#contact" className="block w-full py-3 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-900 dark:text-white font-bold text-center rounded-lg transition-colors">
                                {t.pricing.cta}
                            </a>
                        </SpotlightCard>
                    </motion.div>

                    {/* Offer 2: Custom App - Premium Highlight */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute -inset-[1px] bg-gradient-to-r from-primary-500 to-purple-500 rounded-2xl opacity-70 blur-sm"></div>
                        <SpotlightCard className="relative p-8 h-full flex flex-col justify-between bg-white dark:bg-[#0a0a0a]">
                            <div>
                                <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-r from-primary-500 to-purple-500 text-white text-xs font-bold uppercase tracking-wider rounded-bl-xl rounded-tr-xl">Popular</div>
                                <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">{t.pricing.custom.title}</h3>
                                <div className="text-3xl font-black text-primary-500 mb-4">{t.pricing.custom.price}</div>
                                <p className="text-slate-600 dark:text-gray-400 text-sm mb-6 pb-6 border-b border-slate-200 dark:border-white/10">
                                    {t.pricing.custom.desc}
                                </p>
                                <ul className="space-y-3 mb-8">
                                    {t.pricing.custom.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-gray-300">
                                            <span className="text-primary-500 mt-0.5">✔</span> {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <a href="#contact" className="block w-full py-3 bg-gradient-to-r from-primary-500 to-purple-500 text-white font-bold text-center rounded-lg shadow-lg hover:shadow-primary-500/25 transition-all">
                                {t.pricing.cta}
                            </a>
                        </SpotlightCard>
                    </motion.div>

                    {/* Offer 3: Freelance - Business */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <SpotlightCard className="p-8 h-full flex flex-col justify-between border-slate-200 dark:border-white/5">
                            <div>
                                <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">{t.pricing.freelance.title}</h3>
                                <div className="text-3xl font-black text-slate-900 dark:text-white mb-4">{t.pricing.freelance.price}</div>
                                <p className="text-slate-600 dark:text-gray-400 text-sm mb-6 pb-6 border-b border-slate-200 dark:border-white/10">
                                    {t.pricing.freelance.desc}
                                </p>
                                <ul className="space-y-3 mb-8">
                                    {t.pricing.freelance.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-gray-300">
                                            <span className="text-slate-400 mt-0.5">✔</span> {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <a href="#contact" className="block w-full py-3 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-900 dark:text-white font-bold text-center rounded-lg transition-colors">
                                {t.pricing.cta}
                            </a>
                        </SpotlightCard>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Services
