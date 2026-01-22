import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calculator, ArrowRight, ArrowLeft, Check, Smartphone, Globe, ShoppingCart, Layout, Monitor } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const QuoteSimulator = ({ isOpen, onClose }) => {
    const { t } = useLanguage()
    const [step, setStep] = useState(0) // 0: intro, 1-5: questions, 6: result
    const [answers, setAnswers] = useState({})
    const [totalPrice, setTotalPrice] = useState(0)
    const [durationMultiplier, setDurationMultiplier] = useState(1)

    // Reset when opening
    useEffect(() => {
        if (isOpen) {
            setStep(0)
            setAnswers({})
            setTotalPrice(0)
            setDurationMultiplier(1)
        }
    }, [isOpen])

    if (!isOpen) return null

    const simulator = t.pricing.simulator
    const questions = ['type', 'design', 'pages', 'features', 'services', 'deadline']
    const currentQuestionKey = questions[step - 1]
    const currentQuestion = step > 0 && step <= 6 ? simulator.steps[currentQuestionKey] : null

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

        return Math.round(base * multiplier)
    }

    const nextStep = () => {
        if (step === 6) {
            setTotalPrice(calculateTotal())
            setStep(7)
        } else {
            setStep(step + 1)
        }
    }

    const prevStep = () => {
        if (step > 0) setStep(step - 1)
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
            case 'showcase': return <Globe size={24} />
            case 'ecommerce': return <ShoppingCart size={24} />
            case 'app': return <Smartphone size={24} />
            case 'standard': return <Layout size={24} />
            case 'premium': return <Monitor size={24} />
            default: return <Check size={24} />
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative bg-white dark:bg-[#0a0a0a] w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col max-h-[90vh]"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-white/5 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary-500/10 rounded-lg text-primary-500">
                            <Calculator size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            {simulator.title}
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full text-slate-500 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                    <AnimatePresence mode="wait">
                        {step === 0 && (
                            <motion.div
                                key="intro"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="h-full flex flex-col items-center justify-center text-center space-y-6"
                            >
                                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-primary-500/25">
                                    <Calculator size={40} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                        {simulator.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-gray-400 max-w-sm mx-auto">
                                        {simulator.subtitle}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setStep(1)}
                                    className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2"
                                >
                                    Commencer <ArrowRight size={18} />
                                </button>
                            </motion.div>
                        )}

                        {step > 0 && step <= 6 && (
                            <motion.div
                                key={`step-${step}`}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex flex-col h-full"
                            >
                                <div className="mb-8 shrink-0">
                                    <span className="text-xs font-bold text-primary-500 uppercase tracking-wider">Step {step}/6</span>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
                                        {currentQuestion.question}
                                    </h3>
                                    {currentQuestion.multi && (
                                        <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">
                                            (Multi-sélection possible)
                                        </p>
                                    )}
                                </div>

                                <div className={`grid gap-4 ${currentQuestion.columns === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
                                    {currentQuestion.options.map((option) => {
                                        const isSelected = currentQuestion.multi
                                            ? (answers[currentQuestionKey] || []).some(s => s.value === option.value)
                                            : answers[currentQuestionKey]?.value === option.value

                                        return (
                                            <button
                                                key={option.value}
                                                onClick={() => handleOptionSelect(currentQuestionKey, option)}
                                                className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden group
                                                    ${isSelected
                                                        ? 'border-primary-500 bg-primary-500/5 ring-1 ring-primary-500'
                                                        : 'border-slate-200 dark:border-white/10 hover:border-primary-500/50 hover:bg-slate-50 dark:hover:bg-white/5'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3 mb-2">
                                                    {!currentQuestion.multi && (
                                                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 group-hover:bg-primary-500 group-hover:text-white transition-colors'}`}>
                                                            {getIcon(option.value)}
                                                        </div>
                                                    )}
                                                    {currentQuestion.multi && (
                                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-primary-500 border-primary-500 text-white' : 'border-slate-300 dark:border-slate-600'}`}>
                                                            {isSelected && <Check size={14} />}
                                                        </div>
                                                    )}
                                                    <span className="font-bold text-slate-900 dark:text-white">{option.label}</span>
                                                </div>
                                                {option.desc && (
                                                    <p className="text-sm text-slate-500 dark:text-gray-400 ml-1">
                                                        {option.desc}
                                                    </p>
                                                )}
                                            </button>
                                        )
                                    })}
                                </div>
                            </motion.div>
                        )}

                        {step === 7 && (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex-1 flex flex-col items-center justify-center text-center py-6"
                            >
                                <div className="w-full max-w-sm p-6 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 mb-8">
                                    <h3 className="text-slate-500 dark:text-gray-400 font-medium mb-1">Estimation</h3>
                                    <div className="text-5xl font-black text-slate-900 dark:text-white mb-2">
                                        {totalPrice} {simulator.currency}
                                    </div>
                                    <div className="flex items-center justify-center gap-2 text-sm text-green-500">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                        {simulator.result.cta}
                                    </div>
                                </div>

                                <p className="text-slate-500 dark:text-gray-400 text-sm mb-8 max-w-md">
                                    {simulator.result.disclaimer}
                                </p>

                                <a
                                    href="#contact"
                                    onClick={onClose}
                                    className="px-8 py-4 bg-gradient-to-r from-primary-500 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-105 transition-all w-full sm:w-auto"
                                >
                                    {simulator.result.cta}
                                </a>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer / Navigation */}
                {step > 0 && step <= 6 && (
                    <div className="p-6 border-t border-slate-100 dark:border-white/5 flex justify-between items-center shrink-0">
                        <button
                            onClick={prevStep}
                            className="text-slate-500 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
                        >
                            Back
                        </button>
                        <button
                            onClick={nextStep}
                            disabled={!isStepValid()}
                            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-all
                                ${isStepValid()
                                    ? 'bg-slate-900 dark:bg-white text-white dark:text-black transform hover:scale-105'
                                    : 'bg-slate-100 dark:bg-white/5 text-slate-400 cursor-not-allowed'
                                }`}
                        >
                            Next <ArrowRight size={18} />
                        </button>
                    </div>
                )}
            </motion.div>
        </div>
    )
}

export default QuoteSimulator
