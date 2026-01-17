import { motion } from 'framer-motion'
import { Layout, Smartphone, Database, Globe } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import SpotlightCard from './Showcase/SpotlightCard'

const Services = () => {
    const { t } = useLanguage()

    // Map icons to the translated items based on index
    const icons = [
        <Layout size={32} />,
        <Smartphone size={32} />,
        <Database size={32} />,
        <Globe size={32} />
    ]

    return (
        <section id="services" className="py-20 relative">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">{t.services.title} <span className="gradient-text">{t.services.title_highlight}</span></h2>
                    <p className="text-slate-600 dark:text-gray-400 max-w-xl">
                        {t.services.description}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {t.services.items.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <SpotlightCard className="p-8 h-full">
                                <div className="text-indigo-500 mb-4">{icons[index]}</div>
                                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{service.title}</h3>
                                <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
                                    {service.desc}
                                </p>
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Services
