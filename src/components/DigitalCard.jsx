import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import TiltCard from './TiltCard'

const DigitalCard = ({ isOpen, onClose }) => {
    const { t } = useLanguage()
    const [isFlipped, setIsFlipped] = useState(false)

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 dark:bg-black/90 backdrop-blur-md p-4"
                    onClick={onClose}
                >
                    <div className="relative w-full max-w-[420px]" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={onClose}
                            className="absolute -top-12 right-0 text-slate-500 hover:text-slate-900 dark:text-white/50 dark:hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                            <TiltCard isFlipped={isFlipped} onFlip={() => setIsFlipped(!isFlipped)} />
                        </motion.div>

                        <p className="text-center text-slate-500 dark:text-white/30 text-xs mt-8 animate-pulse font-light tracking-widest">
                            {t.card.flip}
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default DigitalCard
