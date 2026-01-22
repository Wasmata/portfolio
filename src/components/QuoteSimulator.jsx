import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calculator, ArrowRight, ArrowLeft, Check, Smartphone, Globe, ShoppingCart, Layout, Monitor, PenTool, Database, Shield, Zap, Search, FileText } from 'lucide-react'
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
            // Auto advance for single select? No, let's keep manual validation
        }
    }

    const calculateTotal = () => {
        let base = 0
        let multiplier = 1

        Object.keys(answers).forEach(key => {
            const answer = answers[key]
            if (!answer) return

            if (Array.isArray(answer)) {
                // Multi-select sum
                answer.forEach(item => { base += item.price })
            } else {
                // Single select
                if (key === 'deadline') {
                    multiplier = answer.multiplier || 1
                } else {
                    base += answer.price || 0
                }
            }
        })

        const total = Math.round(base * multiplier)
        return total < 400 ? 400 : total
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
            case 'showcase': return <Globe size={28} />
            case 'ecommerce': return <ShoppingCart size={28} />
            case 'app': return <Smartphone size={28} />
            case 'landing': return <Zap size={28} />
            case 'standard': return <Layout size={28} />
            case 'custom': return <PenTool size={28} />
            case 'premium': return <Monitor size={28} />
            case 'seo': return <Search size={24} />
            case 'content': return <FileText size={24} />
            case 'branding': return <PenTool size={24} />
            case 'maintenance': return <Shield size={24} />
            case 'auth': return <Database size={24} />
            default: return <Check size={24} />
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-md"
            />

            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="relative w-full max-w-4xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:h-[600px]"
            >
                {/* Close Button Mobile */}
                <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-slate-100 dark:bg-slate-800/50 rounded-full text-slate-500 dark:text-slate-400 md:hidden hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    <X size={20} />
                </button>

                {/* Left Panel (Progress & Info) */}
                {(step > 0 && step <= totalSteps) && (
                    <div className="md:w-1/3 bg-slate-50 dark:bg-slate-900/50 p-5 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 shrink-0">
                        <div>
                            <div className="hidden md:flex items-center gap-3 mb-8 text-primary-500">
                                <Calculator size={24} />
                                <span className="font-bold tracking-wide uppercase text-sm">Simulateur</span>
                            </div>

                            <div className="mb-2 flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                                <span>Progression</span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mb-4 md:mb-8">
                                <motion.div
                                    className="h-full bg-primary-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>

                            <h3 className="text-xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                                {currentQuestion.question}
                            </h3>
                            {currentQuestion.multi && (
                                <p className="text-xs md:text-sm text-primary-600 dark:text-primary-400 font-medium bg-primary-50 dark:bg-primary-500/10 inline-block px-3 py-1 rounded-full border border-primary-100 dark:border-transparent">
                                    Choix multiples possibles
                                </p>
                            )}
                        </div>

                        <div className="hidden md:block">
                            <button onClick={onClose} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-medium">
                                <X size={16} /> Fermer
                            </button>
                        </div>
                    </div>
                )}

                {/* Right Panel (Content) */}
                <div className={`flex-1 flex flex-col relative overflow-hidden ${step === 0 || step === 7 ? 'md:col-span-2' : ''}`}>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8" data-lenis-prevent>
                        <AnimatePresence mode="wait">
                            {/* INTRO STEP */}
                            {step === 0 && (
                                <motion.div
                                    key="intro"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="h-full flex flex-col items-center justify-center text-center space-y-6 md:space-y-8 py-8"
                                >
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-primary-500 blur-3xl opacity-20 rounded-full" />
                                        <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-tr from-slate-100 to-white dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl flex items-center justify-center text-slate-900 dark:text-white shadow-xl rotate-3 hover:rotate-6 transition-transform duration-500">
                                            <Calculator size={40} className="text-primary-500 md:w-12 md:h-12" />
                                        </div>
                                    </div>

                                    <div className="max-w-md mx-auto px-4">
                                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4 tracking-tight">
                                            {simulator.title}
                                        </h2>
                                        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                            {simulator.subtitle}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => setStep(1)}
                                        className="group relative px-6 py-3 md:px-8 md:py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold text-lg rounded-xl overflow-hidden transition-all shadow-lg hover:shadow-primary-500/25 hover:-translate-y-1 w-full md:w-auto max-w-xs"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-3">
                                            Commencer <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </button>
                                </motion.div>
                            )}

                            {/* QUESTION STEPS */}
                            {step > 0 && step <= totalSteps && (
                                <motion.div
                                    key={`step-${step}`}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="grid grid-cols-1 gap-3 md:gap-4 pb-20 md:pb-0"
                                >
                                    {currentQuestion.options.map((option) => {
                                        const isSelected = currentQuestion.multi
                                            ? (answers[currentQuestionKey] || []).some(s => s.value === option.value)
                                            : answers[currentQuestionKey]?.value === option.value

                                        return (
                                            <SpotlightCard
                                                key={option.value}
                                                spotlightColor="rgba(99, 102, 241, 0.25)"
                                                className={`cursor-pointer group relative transition-all duration-300 border 
                                                ${isSelected
                                                        ? 'ring-2 ring-primary-500 border-transparent bg-primary-50 dark:bg-slate-800/80'
                                                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/40 hover:border-slate-300 dark:hover:bg-slate-800/60'
                                                    }`}
                                            >
                                                <div
                                                    onClick={() => handleOptionSelect(currentQuestionKey, option)}
                                                    className="p-4 md:p-5 h-full flex flex-col"
                                                >
                                                    <div className="flex justify-between items-start mb-3 md:mb-4">
                                                        <div className={`p-2 md:p-3 rounded-lg transition-colors ${isSelected ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 group-hover:text-slate-700 dark:group-hover:text-white'}`}>
                                                            {getIcon(option.value)}
                                                        </div>
                                                        {currentQuestion.multi && (
                                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-primary-500 border-primary-500 scale-110' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-transparent'}`}>
                                                                {isSelected && <Check size={14} className="text-white" />}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <h4 className={`font-bold text-base md:text-lg mb-1 ${isSelected ? 'text-primary-700 dark:text-white' : 'text-slate-900 dark:text-slate-200'}`}>
                                                        {option.label}
                                                    </h4>

                                                    {option.desc && (
                                                        <p className="text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300">
                                                            {option.desc}
                                                        </p>
                                                    )}
                                                </div>
                                            </SpotlightCard>
                                        )
                                    })}
                                </motion.div>
                            )}

                            {/* RESULT STEP */}
                            {step === 7 && (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center space-y-6 md:space-y-8"
                                >
                                    <div className="w-full max-w-sm bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 p-6 md:p-8 rounded-3xl relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50" />

                                        <h3 className="text-slate-500 dark:text-slate-400 text-xs md:text-sm font-semibold uppercase tracking-wider mb-2">Estimation Finale</h3>
                                        <div className="flex items-baseline justify-center gap-1 mb-4 md:mb-6">
                                            <span className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
                                                {totalPrice}
                                            </span>
                                            <span className="text-xl md:text-2xl text-primary-500 font-bold">{simulator.currency}</span>
                                        </div>

                                        <div className="space-y-2 md:space-y-3">
                                            <div className="flex items-center justify-between text-sm py-2 border-b border-slate-200 dark:border-slate-700/50">
                                                <span className="text-slate-500 dark:text-slate-400">Projet</span>
                                                <span className="text-slate-900 dark:text-white font-medium">{answers.type?.label}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm py-2 border-b border-slate-200 dark:border-slate-700/50">
                                                <span className="text-slate-500 dark:text-slate-400">Design</span>
                                                <span className="text-slate-900 dark:text-white font-medium">{answers.design?.label}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm py-2">
                                                <span className="text-slate-500 dark:text-slate-400">Délai</span>
                                                <span className="text-slate-900 dark:text-white font-medium">{answers.deadline?.label}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="max-w-md px-4">
                                        <p className="text-xs md:text-sm text-yellow-600 dark:text-yellow-500/90 bg-yellow-50 dark:bg-yellow-500/10 p-3 md:p-4 rounded-xl border border-yellow-200 dark:border-yellow-500/20 mb-6">
                                            ⚠️ {simulator.result.disclaimer}
                                        </p>

                                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                                            <a
                                                href="#contact"
                                                onClick={onClose}
                                                className="px-6 py-3 md:px-8 md:py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors shadow-lg"
                                            >
                                                {simulator.result.cta}
                                            </a>
                                            <button
                                                onClick={() => setStep(0)}
                                                className="px-6 py-3 md:px-8 md:py-4 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white font-medium transition-colors"
                                            >
                                                Relancer
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Footer Actions (Only for Questions) */}
                    {step > 0 && step <= totalSteps && (
                        <div className="p-4 md:p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30 flex justify-between items-center md:rounded-br-3xl bg-opacity-90 backdrop-blur-sm z-10">
                            <button
                                onClick={prevStep}
                                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white font-medium transition-colors px-3 py-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-sm md:text-base"
                            >
                                <ArrowLeft size={18} /> <span className="hidden sm:inline">Retour</span>
                            </button>
                            <button
                                onClick={nextStep}
                                disabled={!isStepValid()}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg text-sm md:text-base
                                    ${isStepValid()
                                        ? 'bg-slate-900 dark:bg-white text-white dark:text-black hover:scale-105 hover:bg-slate-800 dark:hover:bg-slate-200'
                                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                                    }`}
                            >
                                {step === totalSteps ? 'Voir le prix' : 'Suivant'} {step !== totalSteps && <ArrowRight size={18} />}
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    )
}

export default QuoteSimulator
