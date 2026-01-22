import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShieldCheck, PenTool, Server, User, Mail, Shield } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const LegalModal = ({ isOpen, onClose }) => {
    const { t } = useLanguage()
    const modalRef = useRef(null)

    // Icons map based on the string ID in translations
    const iconMap = {
        PenTool: <PenTool size={20} />,
        Server: <Server size={20} />,
        User: <User size={20} />,
        Mail: <Mail size={20} />,
        Shield: <Shield size={20} />
    }

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) {
            document.addEventListener('keydown', handleEsc)
            document.body.style.overflow = 'hidden' // Lock scroll
        }
        return () => {
            document.removeEventListener('keydown', handleEsc)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    if (!t.footer.legal_modal.sections) return null; // Safety check

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md"
                    onClick={onClose}
                >
                    <motion.div
                        ref={modalRef}
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white dark:bg-[#0a0a0a] w-full max-w-3xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-white/10"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary-500/10 rounded-lg text-primary-500">
                                    <ShieldCheck size={24} />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t.footer.legal_modal.title}</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div
                            className="p-6 overflow-y-auto custom-scrollbar overscroll-y-contain bg-slate-50 dark:bg-black/20"
                            data-lenis-prevent
                        >
                            <div className="grid gap-4">
                                {t.footer.legal_modal.sections.map((section) => (
                                    <div key={section.id} className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl p-5 hover:border-slate-200 dark:hover:border-white/10 transition-colors shadow-sm">
                                        <div className="flex items-start gap-4">
                                            <div className="p-2.5 bg-slate-100 dark:bg-white/5 rounded-lg text-slate-600 dark:text-slate-300 shrink-0">
                                                {iconMap[section.icon] || <Shield size={20} />}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">{section.title}</h3>
                                                <div className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                                                    {section.content.split('**').map((part, i) =>
                                                        i % 2 === 1 ? <strong key={i} className="text-slate-900 dark:text-white font-semibold">{part}</strong> : part
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-slate-100 dark:border-white/5 flex justify-end bg-white dark:bg-[#0a0a0a]">
                            <button
                                onClick={onClose}
                                className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl font-bold hover:opacity-90 transition-opacity text-sm shadow-lg"
                            >
                                {t.footer.legal_modal.close}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default LegalModal
