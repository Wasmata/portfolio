import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calculator, ArrowRight, ArrowLeft, Check, Smartphone, Globe, ShoppingCart, Layout, Monitor, PenTool, Database, Shield, Zap, Search, FileText, ChevronRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import SpotlightCard from './Showcase/SpotlightCard'

const QuoteSimulator = ({ isOpen, onClose }) => {
    const { t } = useLanguage()
    const [step, setStep] = useState(0) // 0: intro, 1-6: questions, 7: result
    const [answers, setAnswers] = useState({})
    const [totalPrice, setTotalPrice] = useState(0)

    // Reset when opening
    useEffect(() => {
        if (isOpen) {
            setStep(0)
            setAnswers({})
            setTotalPrice(0)
        }
    }, [isOpen])

    // Prevent body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    if (!isOpen) return null

    const simulator = t.pricing.simulator
    const questions = ['type', 'design', 'pages', 'features', 'services', 'deadline']
    const totalSteps = questions.length
    const currentQuestionKey = questions[step - 1]
    const currentQuestion = step > 0 && step <= totalSteps ? simulator.steps[currentQuestionKey] : null

    // Progress Calculation
    const progress = step === 0 ? 0 : step === 7 ? 100 : ((step - 1) / totalSteps) * 100

    const handleOptionSelect = (key, option) => {
        if (currentQuestion.multi) {
            // Multi-select logic
            let currentSelections = answers[key] || []

            if (option.exclusive) {
                // If exclusive option (None), clear others or toggle off
                if (currentSelections.some(s => s.value === option.value)) {
                    setAnswers({ ...answers, [key]: [] })
                } else {
                    setAnswers({ ...answers, [key]: [option] })
                }
            } else {
                // Remove exclusive option if selecting normal option
                currentSelections = currentSelections.filter(s => !s.exclusive)

                // Toggle selection
                if (currentSelections.some(s => s.value === option.value)) {
                    const newSelections = currentSelections.filter(s => s.value !== option.value)
                    setAnswers({ ...answers, [key]: newSelections })
                } else {
                    setAnswers({ ...answers, [key]: [...currentSelections, option] })
                }
            }
        } else {
            // Single select logic
            setAnswers({ ...answers, [key]: option })
        }
    }

    const HOURLY_RATE = 36 // €/h brut
    const HOURS_BUFFER = 1.2 // 20% buffer on total hours

    const calculateTotal = () => {
        let totalHours = 0
        let deadlineMultiplier = 1

        Object.keys(answers).forEach(key => {
            const answer = answers[key]
            if (!answer) return

            if (Array.isArray(answer)) {
                // Multi-select: sum hours
                answer.forEach(item => { totalHours += item.hours || 0 })
            } else {
                if (key === 'deadline') {
                    deadlineMultiplier = answer.multiplier || 1
                } else {
                    totalHours += answer.hours || 0
                }
            }
        })

        // Apply 1.2x buffer on total hours, then multiply by rate and deadline
        const bufferedHours = totalHours * HOURS_BUFFER
        const total = Math.round(bufferedHours * HOURLY_RATE * deadlineMultiplier)
        return total < 300 ? 300 : total
    }

    const nextStep = () => {
        let next = step + 1

        // Skip 'pages' step if type is 'landing'
        if (questions[next - 1] === 'pages' && answers.type?.value === 'landing') {
            next++
        }

        if (step === totalSteps || next > totalSteps) {
            setTotalPrice(calculateTotal())
            setStep(7)
        } else {
            setStep(next)
        }
    }

    const prevStep = () => {
        if (step > 0) {
            let prev = step - 1
            // Skip 'pages' step if going back and type is 'landing'
            if (questions[prev - 1] === 'pages' && answers.type?.value === 'landing') {
                prev--
            }
            setStep(prev)
        }
    }

    // Check if current step is valid to proceed
    const isStepValid = () => {
        const answer = answers[currentQuestionKey]
        if (!answer) return false
        if (Array.isArray(answer) && answer.length === 0) return false
        return true
    }

    // Icons mapping
    const getIcon = (value) => {
        switch (value) {
            case 'showcase': return <Globe size={32} />
            case 'ecommerce': return <ShoppingCart size={32} />
            case 'app': return <Smartphone size={32} />
            case 'landing': return <Zap size={32} />
            case 'standard': return <Layout size={32} />
            case 'custom': return <PenTool size={32} />
            case 'premium': return <Monitor size={32} />
            case 'seo': return <Search size={28} />
            case 'content': return <FileText size={28} />
            case 'branding': return <PenTool size={28} />
            case 'maintenance': return <Shield size={28} />
            case 'auth': return <Database size={28} />
            default: return <Check size={28} />
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop - Sharper Blur */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 30 }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="relative w-full max-w-5xl bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] h-auto md:h-[650px]"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 z-30 p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm"
                >
                    <X size={18} />
                </button>

                {/* Left Panel (Progress & Title) - Hidden on Mobile */}
                {(step > 0 && step <= totalSteps) && (
                    <div className="hidden md:flex md:w-1/3 bg-slate-50 dark:bg-[#0F172A] p-6 md:p-8 flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 shrink-0">
                        <div>
                            <div className="flex items-center gap-2 mb-8 text-primary-600 dark:text-primary-500 font-bold uppercase tracking-wider text-xs">
                                <Calculator size={16} />
                                <span>Simulateur</span>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                    <span>Progression</span>
                                    <span>{Math.round(progress)}%</span>
                                </div>
                                <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-primary-600 to-primary-400"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                    />
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                                    {currentQuestion.question}
                                </h3>
                                {currentQuestion.multi && (
                                    <div className="mt-4 inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-300 px-3 py-1.5 rounded-md text-xs font-semibold border border-primary-100 dark:border-primary-500/20">
                                        <Check size={12} /> Choix multiples
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="hidden md:block">
                            <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                                Les estimations sont basées sur les tarifs standards du marché et mon expertise.
                            </p>
                        </div>
                    </div>
                )}

                {/* Mobile Header (Progress only) */}
                {(step > 0 && step <= totalSteps) && (
                    <div className="md:hidden px-4 py-3 bg-slate-50 dark:bg-[#0F172A] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
                        <div className="flex flex-col gap-1 w-full mr-8">
                            <div className="flex justify-between text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                                <span>{currentQuestion.question}</span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden w-full">
                                <motion.div
                                    className="h-full bg-primary-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Right Panel (Content) */}
                <div className={`flex-1 flex flex-col relative w-full overflow-hidden ${step === 0 || step === 7 ? 'md:col-span-2 w-full' : ''} bg-white dark:bg-[#0B1120]`}>

                    {/* Grid Background Effect */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar p-5 md:p-10 relative z-10" data-lenis-prevent>
                        <AnimatePresence mode="wait">
                            {/* INTRO STEP - PREMIUM REDESIGN */}
                            {step === 0 && (
                                <motion.div
                                    key="intro"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    className="min-h-full flex flex-col items-center justify-center text-center space-y-6 md:space-y-10 py-6"
                                >
                                    <div className="relative">
                                        <div className="absolute -inset-4 bg-primary-500/20 rounded-full blur-2xl animate-pulse"></div>
                                        <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-white to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-3xl shadow-2xl shadow-primary-500/10 border border-white/50 dark:border-slate-700 flex items-center justify-center transform hover:rotate-6 transition-transform duration-500 rotate-3">
                                            <Calculator size={40} className="text-primary-600 dark:text-primary-400 md:w-12 md:h-12" />
                                        </div>
                                    </div>

                                    <div className="max-w-xl mx-auto space-y-2 md:space-y-4 px-2">
                                        <h2 className="text-3xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                                            {simulator.title}
                                        </h2>
                                        <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg mx-auto">
                                            {simulator.subtitle}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => setStep(1)}
                                        className="group relative inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-5 text-base md:text-lg font-bold text-white transition-all duration-300 bg-slate-900 dark:bg-white dark:text-slate-900 rounded-full hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/25 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 w-full md:w-auto"
                                    >
                                        <span className="mr-3">Commencer l'estimation</span>
                                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                                    </button>
                                </motion.div>
                            )}

                            {/* QUESTION STEPS - SHARP REDESIGN */}
                            {step > 0 && step <= totalSteps && (
                                <motion.div
                                    key={`step-${step}`}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 pb-10 md:pb-0 max-w-3xl mx-auto"
                                >
                                    {currentQuestion.options.map((option) => {
                                        const isSelected = currentQuestion.multi
                                            ? (answers[currentQuestionKey] || []).some(s => s.value === option.value)
                                            : answers[currentQuestionKey]?.value === option.value

                                        return (
                                            <div
                                                key={option.value}
                                                onClick={() => handleOptionSelect(currentQuestionKey, option)}
                                                className={`
                                                    cursor-pointer group relative p-4 md:p-6 rounded-2xl border-2 transition-all duration-200
                                                    ${isSelected
                                                        ? 'border-primary-600 dark:border-primary-500 bg-primary-50/50 dark:bg-primary-900/10 shadow-[0_0_0_1px_rgba(79,70,229,0.1)]'
                                                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                                                    }
                                                `}
                                            >
                                                <div className="flex items-start justify-between mb-3 md:mb-4">
                                                    <div className={`p-2 md:p-3 rounded-xl transition-colors ${isSelected ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-primary-600 dark:group-hover:text-primary-400'}`}>
                                                        {getIcon(option.value)}
                                                    </div>
                                                    <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'border-primary-600 bg-primary-600 scale-110' : 'border-slate-300 dark:border-slate-700'}`}>
                                                        {isSelected && <Check size={12} className="text-white" />}
                                                    </div>
                                                </div>

                                                <h4 className={`text-base md:text-lg font-bold mb-1 md:mb-2 ${isSelected ? 'text-primary-900 dark:text-primary-100' : 'text-slate-900 dark:text-white'}`}>
                                                    {option.label}
                                                </h4>

                                                {option.desc && (
                                                    <p className={`text-xs md:text-sm leading-relaxed ${isSelected ? 'text-primary-700 dark:text-primary-300' : 'text-slate-500 dark:text-slate-400'}`}>
                                                        {option.desc}
                                                    </p>
                                                )}
                                            </div>
                                        )
                                    })}
                                </motion.div>
                            )}

                            {/* RESULT STEP - CLEAN REDESIGN */}
                            {step === 7 && (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center space-y-6 md:space-y-8 py-6"
                                >
                                    <div className="w-full max-w-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500"></div>

                                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Estimation du budget</p>

                                        <div className="flex items-center justify-center mb-6 md:mb-8">
                                            <span className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter">
                                                {totalPrice}
                                            </span>
                                            <span className="text-2xl md:text-3xl text-primary-500 font-bold ml-2">{simulator.currency}</span>
                                        </div>

                                        <div className="space-y-2 md:space-y-3 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-4">
                                            {[
                                                { label: "Type", value: answers.type?.label },
                                                { label: "Design", value: answers.design?.label },
                                                { label: "Délai", value: answers.deadline?.label }
                                            ].map((item) => (
                                                <div key={item.label} className="flex items-center justify-between text-xs md:text-sm">
                                                    <span className="text-slate-500 dark:text-slate-400">{item.label}</span>
                                                    <span className="font-semibold text-slate-900 dark:text-white">{item.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row w-full max-w-md gap-3">
                                        <a
                                            href="#contact"
                                            onClick={onClose}
                                            className="flex-1 px-6 py-3 md:px-8 md:py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-primary-600/25 flex items-center justify-center gap-2 text-sm md:text-base"
                                        >
                                            {simulator.result.cta} <ArrowRight size={18} />
                                        </a>
                                        <button
                                            onClick={() => setStep(0)}
                                            className="px-6 py-3 md:px-8 md:py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm md:text-base"
                                        >
                                            Relancer
                                        </button>
                                    </div>

                                    <p className="text-[10px] md:text-xs text-slate-400 max-w-xs mx-auto">
                                        {simulator.result.disclaimer}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Footer Actions (Only for Questions) */}
                    {step > 0 && step <= totalSteps && (
                        <div className="p-4 md:p-6 border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#0B1120]/90 backdrop-blur-md flex justify-between items-center z-20 shrink-0">
                            <button
                                onClick={prevStep}
                                className="group flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white font-medium transition-colors px-3 py-2 md:px-4 md:py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-sm md:text-base"
                            >
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                <span className="hidden sm:inline">Retour</span>
                            </button>
                            <button
                                onClick={nextStep}
                                disabled={!isStepValid()}
                                className={`flex items-center gap-2 px-6 py-3 md:px-8 md:py-3 rounded-xl font-bold transition-all shadow-lg text-sm md:text-base
                                    ${isStepValid()
                                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-105 hover:shadow-xl'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600 cursor-not-allowed shadow-none'
                                    }`}
                            >
                                {step === totalSteps ? 'Voir le prix' : 'Suivant'}
                                {step !== totalSteps && <ChevronRight size={18} />}
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    )
}

export default QuoteSimulator
