import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { Search, PenTool, Code2, Rocket } from 'lucide-react'

const Process = () => {
    const { t } = useLanguage()

    const icons = [
        <Search size={24} />,
        <PenTool size={24} />,
        <Code2 size={24} />,
        <Rocket size={24} />
    ]

    return (
        <section className="py-20 bg-slate-50 dark:bg-white/5 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                        {t.process.title} <span className="text-primary-500">{t.process.title_highlight}</span>
                    </h2>
                    <p className="text-slate-600 dark:text-gray-400 max-w-xl mx-auto">
                        {t.process.subtitle}
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-slate-200 dark:bg-white/10 z-0"></div>

                    <div className="grid md:grid-cols-4 gap-8 relative z-10">
                        {t.process.steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className="w-14 h-14 rounded-full bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 flex items-center justify-center text-primary-500 shadow-sm group-hover:scale-110 group-hover:border-primary-500 transition-all duration-300 mb-6 relative">
                                    {icons[index]}
                                    <div className="absolute -bottom-2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-primary-500 font-bold bg-white dark:bg-black px-1">0{index + 1}</div>
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">{step.title}</h3>
                                <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed max-w-[200px]">
                                    {step.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Process
