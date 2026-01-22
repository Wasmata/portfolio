import { useState } from 'react'
import { Github, Linkedin, Mail, Heart, Code } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import useSound from '../hooks/useSound'
import LegalModal from './LegalModal'

const Footer = () => {
    const { t } = useLanguage()
    const { playClick, playHover } = useSound()
    const [isLegalOpen, setIsLegalOpen] = useState(false)

    return (
        <>
            <footer className="py-8 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-black transition-colors relative z-10">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                        <Code className="text-primary-500" />
                        <span>Wassidev<span className="text-primary-500">.</span>fr</span>
                    </div>

                    <div className="text-gray-500 text-sm flex flex-col items-center gap-1">
                        <p>{t.footer.made_by} <Heart size={14} className="text-red-500 fill-red-500 inline" /> by Wassim Maataoui © 2026</p>
                        <p className="text-xs text-gray-600">SIRET: 930 611 165 00018 • <button onClick={() => setIsLegalOpen(true)} className="hover:text-primary-500 underline decoration-dotted underline-offset-2">{t.footer.legal}</button></p>
                    </div>

                    <div className="flex justify-center gap-6 mb-4 text-slate-500 dark:text-gray-400">
                        <a href="https://github.com/Wasmata" target="_blank" rel="noopener noreferrer" onMouseEnter={playHover} onClick={playClick} className="hover:text-primary-500 dark:hover:text-white transition-colors transform hover:scale-110"><Github size={20} /></a>
                        <a href="https://www.linkedin.com/in/wassim-maataoui-113395267/" target="_blank" rel="noopener noreferrer" onMouseEnter={playHover} onClick={playClick} className="hover:text-primary-500 dark:hover:text-white transition-colors transform hover:scale-110"><Linkedin size={20} /></a>
                        <a href="mailto:contact@wassidev.fr" onMouseEnter={playHover} onClick={playClick} className="hover:text-primary-500 dark:hover:text-white transition-colors transform hover:scale-110"><Mail size={20} /></a>
                    </div>
                </div>
            </footer>
            <LegalModal isOpen={isLegalOpen} onClose={() => setIsLegalOpen(false)} />
        </>
    )
}

export default Footer
