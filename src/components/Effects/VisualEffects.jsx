import { useTheme } from '../../context/ThemeContext';
import { useEffect } from 'react';

const VisualEffects = () => {
    const { filmGrain, scanlines, wireframeMode, focusMode, debugGrid, lowPowerMode } = useTheme();

    // Wireframe Mode Logic
    useEffect(() => {
        if (wireframeMode) document.body.classList.add('wireframe-mode');
        else document.body.classList.remove('wireframe-mode');
    }, [wireframeMode]);

    // Focus Mode Logic: Dims decorative elements to focus on content
    useEffect(() => {
        if (focusMode) document.body.classList.add('focus-mode');
        else document.body.classList.remove('focus-mode');
    }, [focusMode]);

    // Low Power Mode Logic
    useEffect(() => {
        if (lowPowerMode) document.body.classList.add('low-power');
        else document.body.classList.remove('low-power');
    }, [lowPowerMode]);

    return (
        <>
            {/* FILM GRAIN - Fixed Visibility */}
            {filmGrain && !lowPowerMode && (
                <div className="fixed inset-0 z-[9990] pointer-events-none opacity-[0.15] mix-blend-overlay w-full h-full overflow-hidden">
                    <svg className="w-full h-full">
                        <filter id="noise">
                            <feTurbulence
                                type="fractalNoise"
                                baseFrequency="0.65"
                                numOctaves="3"
                                stitchTiles="stitch"
                            />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#noise)" />
                    </svg>
                </div>
            )}

            {/* CRT SCANLINES */}
            {scanlines && !lowPowerMode && (
                <div className="fixed inset-0 z-[9990] pointer-events-none w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none" />
            )}

            {/* DEBUG GRID */}
            {debugGrid && (
                <div className="fixed inset-0 z-[9991] pointer-events-none w-full h-full flex justify-center opacity-30">
                    <div className="w-full max-w-[1400px] grid grid-cols-4 md:grid-cols-12 gap-4 px-4 h-full">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="h-full bg-red-500/10 dark:bg-cyan-500/10 border-x border-red-500/20 dark:border-cyan-500/20"></div>
                        ))}
                    </div>
                </div>
            )}

            {/* GLOBAL CSS INJECTIONS */}
            <style>{`
                ${wireframeMode ? `
                    .wireframe-mode * {
                        border: 1px solid #00f0ff !important;
                        background: rgba(0, 20, 40, 0.95) !important;
                        color: #00f0ff !important;
                        box-shadow: none !important;
                        border-radius: 0 !important;
                    }
                    .wireframe-mode img {
                        opacity: 0.5;
                        filter: grayscale(100%) sepia(100%) hue-rotate(180deg);
                    }
                ` : ''}

                ${focusMode ? `
                    .focus-mode .decorative-blob,
                    .focus-mode .background-pattern {
                        opacity: 0 !important;
                        transition: opacity 0.5s ease;
                    }
                    .focus-mode main {
                        backdrop-filter: blur(0px);
                    }
                ` : ''}

                ${lowPowerMode ? `
                    .low-power * {
                        animation: none !important;
                        transition: none !important;
                        backdrop-filter: none !important;
                        box-shadow: none !important;
                    }
                ` : ''}
            `}</style>
        </>
    );
};

export default VisualEffects;
