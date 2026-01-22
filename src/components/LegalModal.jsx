import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShieldCheck } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const LegalModal = ({ isOpen, onClose }) => {
    const { t } = useLanguage()
    const modalRef = useRef(null)

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

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        ref={modalRef}
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white dark:bg-[#121212] w-full max-w-2xl max-h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-white/10"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-white/5">
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="text-primary-500" size={24} />
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
                        <div className="p-6 overflow-y-auto custom-scrollbar text-slate-600 dark:text-gray-300 space-y-6 text-sm leading-relaxed">
                            <div dangerouslySetInnerHTML={{ __html: t.footer.legal_modal.content }} className="prose dark:prose-invert max-w-none" />
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-slate-100 dark:border-white/5 flex justify-end">
                            <button
                                onClick={onClose}
                                className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-90 transition-opacity text-sm"
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
