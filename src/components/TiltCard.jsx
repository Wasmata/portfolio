import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { QrCode, Globe, Mail, Github, Copy, Check, Download, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { toPng, toBlob } from 'html-to-image';

const TiltCard = ({ isFlipped, onFlip }) => {
    const { t } = useLanguage();
    const ref = useRef(null);
    const downloadCardRef = useRef(null);
    const [copied, setCopied] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    // Mouse position logic for Tilt - BALANCED
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring animation for tilt
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 20 });

    // Glare position
    const glareX = useTransform(x, [-0.5, 0.5], [0, 100]);
    const glareY = useTransform(y, [-0.5, 0.5], [0, 100]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const handleDownload = async (e) => {
        e.stopPropagation();
        if (downloadCardRef.current === null) {
            return;
        }

        setIsDownloading(true);

        try {
            // Generate Blob instead of DataURL for better performance/handling
            const blob = await toBlob(downloadCardRef.current, {
                cacheBust: true,
                skipFonts: true,
                pixelRatio: 2,
                backgroundColor: '#0a0a0a'
            });

            if (!blob) throw new Error('Generation failed');

            const file = new File([blob], 'wassidev-card.png', { type: 'image/png' });

            // Use Web Share API if available (Mobile Native Share)
            // Note: navigator.share with files usually requires HTTPS (Secure Context)
            if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] }) && window.isSecureContext) {
                try {
                    await navigator.share({
                        files: [file],
                        title: 'Wassim M. - Business Card',
                        text: 'Connect with me!',
                    });
                    setCopied(true);
                } catch (shareError) {
                    if (shareError.name !== 'AbortError') {
                        // Fallback to simpler download if share fails for technical reasons
                        console.warn('Share failed, falling back to download:', shareError);
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.download = 'wassidev-card.png';
                        link.href = url;
                        link.click();
                        URL.revokeObjectURL(url);
                        setCopied(true);
                    }
                }
            } else {
                // Fallback: Direct Download (Desktop or Non-Secure Mobile)
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = 'wassidev-card.png';
                link.href = url;
                link.click();
                URL.revokeObjectURL(url);
                setCopied(true);
            }

            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Download failed:', err);
            // Only alert if it's a real error, not a user cancellation
            if (err.name !== 'AbortError') {
                alert("Erreur de sauvegarde. Réessayez.");
            }
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <>
            <motion.div
                ref={ref}
                className="relative w-full aspect-[1.586/1] cursor-pointer will-change-transform"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={onFlip}
                style={{
                    rotateX: isFlipped ? 0 : rotateX,
                    rotateY: isFlipped ? 180 : rotateY,
                    transformStyle: "preserve-3d",
                    perspective: "1000px"
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
                {/* --- FRONT SIDE --- */}
                <div
                    className="absolute inset-0 rounded-2xl border border-white/10 dark:border-[#AA771C]/40 shadow-2xl bg-[#1a1a1a] dark:bg-gradient-to-br dark:from-[#BF953F] dark:via-[#FCF6BA] dark:to-[#B38728]"
                    style={{
                        transformStyle: "preserve-3d",
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        zIndex: isFlipped ? 0 : 1,
                        opacity: isFlipped ? 0 : 1,
                        transition: 'opacity 0.3s',
                        transitionDelay: isFlipped ? '0s' : '0.2s'
                    }}
                >
                    {/* Holographic Background - Optimized: Single layer if possible, or simple opacity */}
                    <div className="absolute inset-0 opacity-20 dark:opacity-25 bg-gradient-to-br from-primary-500/20 via-purple-500/20 to-blue-500/20 dark:from-[#AA771C]/20 dark:via-[#FFF8DC]/10 dark:to-[#8B6508]/20 w-full h-full rounded-2xl"></div>

                    {/* Content Container - LEVITATING */}
                    <div
                        className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-between"
                        style={{ transform: "translateZ(40px)" }}
                    >
                        <div className="flex justify-between items-start">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 dark:border-[#594212]/30 flex items-center justify-center bg-white/5 shadow-xl dark:bg-black/5">
                                <span className="font-bold text-lg md:text-xl text-white dark:text-[#3E2F1B]">W.</span>
                            </div>
                            <div className="px-3 py-1 rounded-full border border-white/10 dark:border-[#594212]/20 bg-white/5 text-[10px] uppercase tracking-widest text-white/50 dark:text-[#3E2F1B]/70 dark:bg-black/5 shadow-lg"
                                style={{ transform: "translateZ(20px)" }}>
                                Premium Dev
                            </div>
                        </div>

                        <div style={{ transform: "translateZ(30px)" }}>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 font-display tracking-wide glow-text drop-shadow-lg dark:text-[#282012] dark:glow-none dark:drop-shadow-none">
                                WASSIM M.
                            </h2>
                            <p className="text-primary-400 dark:text-[#5c4a2b] text-xs md:text-sm font-medium tracking-[0.2em] uppercase dark:font-bold">
                                {t.card.role}
                            </p>
                        </div>

                        <div className="flex gap-4 text-white/40 dark:text-[#3E2F1B]/60" style={{ transform: "translateZ(20px)" }}>
                            <Globe size={18} className="drop-shadow-md" />
                            <Mail size={18} className="drop-shadow-md" />
                            <Github size={18} className="drop-shadow-md" />
                        </div>
                    </div>

                    {/* Glare Effect - Optimized */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 dark:via-white/30 to-transparent z-30 pointer-events-none rounded-2xl will-change-transform"
                        style={{
                            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, transparent 100%)`,
                            transform: "translateZ(1px)" // Slightly above background
                        }}
                    />
                </div>

                {/* --- BACK SIDE --- */}
                <div
                    className="absolute inset-0 rounded-2xl border border-white/10 dark:border-[#AA771C]/30 shadow-2xl bg-[#0a0a0a] dark:bg-gradient-to-br dark:from-[#9c7c38] dark:to-[#6d5627] flex flex-col items-center justify-center p-4 md:p-6"
                    style={{
                        transform: "rotateY(180deg)",
                        transformStyle: "preserve-3d",
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        zIndex: isFlipped ? 1 : 0,
                        opacity: isFlipped ? 1 : 0,
                        transition: 'opacity 0.3s',
                        transitionDelay: isFlipped ? '0.2s' : '0s'
                    }}
                >
                    <div className="absolute inset-0 opacity-20 bg-gradient-to-tl from-primary-900/40 to-black dark:from-[#FCF6BA]/20 dark:to-black rounded-2xl"></div>
                    <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] rounded-2xl"></div>

                    <div className="relative z-10 flex flex-col items-center gap-3 md:gap-4 w-full" style={{ transform: "translateZ(40px)" }}>
                        {/* Real QR Code - Responsive sizing */}
                        <div className="p-1.5 md:p-2 bg-white rounded-xl shadow-2xl shadow-white/10">
                            <img
                                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://wassidev.fr&color=000000"
                                alt="QR Code to wassidev.fr"
                                className="w-16 h-16 md:w-24 md:h-24"
                            />
                        </div>

                        {/* Contact Info */}
                        <div className="text-center space-y-0.5 md:space-y-1">
                            <div className="flex items-center justify-center gap-1.5 text-white/90 dark:text-[#3E2F1B] font-bold text-xs md:text-sm">
                                <Mail size={12} className="md:w-3.5 md:h-3.5" />
                                <span>contact@wassidev.fr</span>
                            </div>
                            <div className="flex items-center justify-center gap-1.5 text-white/70 dark:text-[#3E2F1B]/80 font-medium text-[10px] md:text-xs">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-3.5 md:h-3.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                <span>07 68 31 27 68</span>
                            </div>
                            <div className="text-primary-400 dark:text-white/60 text-[9px] md:text-[10px] uppercase tracking-widest pt-0.5">
                                France
                            </div>
                        </div>

                        <button
                            onClick={handleDownload}
                            disabled={isDownloading}
                            aria-label={isDownloading ? "Téléchargement en cours" : (copied ? "Carte sauvegardée" : "Sauvegarder la carte")}
                            className="flex items-center gap-1.5 px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-white/10 border border-white/10 hover:bg-white/20 transition-all text-white text-[9px] md:text-[10px] font-bold uppercase tracking-wider shadow-lg dark:text-[#3E2F1B] dark:bg-black/5 dark:border-[#3E2F1B]/10 dark:hover:bg-black/10 mt-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isDownloading ? (
                                <div className="w-3 h-3 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                            ) : (
                                copied ? <Check size={10} className="md:w-3 md:h-3" /> : <Download size={10} className="md:w-3 md:h-3" />
                            )}
                            {isDownloading ? '...' : (copied ? t.card.saved : t.card.save)}
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* --- HIDDEN DOWNLOAD TEMPLATE --- */}
            <div className="fixed left-[-9999px] top-0 pointer-events-none">
                <div
                    ref={downloadCardRef}
                    className="w-[600px] h-[350px] bg-[#0a0a0a] relative overflow-hidden flex rounded-xl border border-white/10"
                >
                    {/* Background Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
                    <div className="absolute inset-0 opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full blur-[80px]"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]"></div>

                    {/* Left Column: Identity */}
                    <div className="w-1/2 p-8 flex flex-col justify-between relative z-10 border-r border-white/5 bg-white/5 backdrop-blur-sm">
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5">
                                <span className="font-bold text-xl text-white">W.</span>
                            </div>
                            <div className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-widest text-white/50 whitespace-nowrap">
                                Premium Dev
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2 tracking-wide whitespace-nowrap">
                                WASSIM M.
                            </h2>
                            <p className="text-primary-400 text-sm font-medium tracking-[0.2em] uppercase whitespace-nowrap">
                                {t.card.role}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Contact & QR */}
                    <div className="w-1/2 p-8 flex flex-col justify-center items-center gap-6 relative z-10">
                        <div className="p-3 bg-white rounded-xl shadow-2xl">
                            <img
                                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://wassidev.fr&color=000000"
                                alt="QR Code"
                                className="w-24 h-24"
                            />
                        </div>

                        <div className="text-center space-y-2">
                            <div className="flex items-center justify-center gap-2 text-white/90 font-bold text-sm whitespace-nowrap">
                                <Mail size={14} />
                                <span>contact@wassidev.fr</span>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-white/70 font-medium text-xs whitespace-nowrap">
                                <Phone size={14} />
                                <span>07 68 31 27 68</span>
                            </div>
                            <div className="text-primary-400 text-[10px] uppercase tracking-widest pt-2">
                                France
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TiltCard;
