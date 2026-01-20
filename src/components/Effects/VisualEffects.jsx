import { useTheme } from '../../context/ThemeContext';
import { useEffect } from 'react';

const VisualEffects = () => {
    const { filmGrain, scanlines, wireframeMode, focusMode, monoMode, debugGrid, lowPowerMode } = useTheme();

    // Wireframe logic
    useEffect(() => {
        if (wireframeMode) document.body.classList.add('wireframe-mode');
        else document.body.classList.remove('wireframe-mode');
    }, [wireframeMode]);

    // Focus Mode logic
    useEffect(() => {
        if (focusMode) document.body.classList.add('focus-mode');
        else document.body.classList.remove('focus-mode');
    }, [focusMode]);

    // Mono Mode Logic
    useEffect(() => {
        if (monoMode) document.body.classList.add('mono-mode');
        else document.body.classList.remove('mono-mode');
    }, [monoMode]);

    // Low Power logic
    useEffect(() => {
        if (lowPowerMode) document.body.classList.add('low-power');
        else document.body.classList.remove('low-power');
    }, [lowPowerMode]);

    return (
        <>
            {/* FILM GRAIN - Increased Opacity / Changed Blend */}
            {filmGrain && !lowPowerMode && (
                <div className="fixed inset-0 z-40 pointer-events-none opacity-[0.20] mix-blend-hard-light w-full h-full overflow-hidden">
                    <svg className="w-full h-full">
                        <filter id="noise">
                            <feTurbulence
                                type="fractalNoise"
                                baseFrequency="0.80"
                                numOctaves="3"
                                stitchTiles="stitch"
                            />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#noise)" />
                    </svg>
                </div>
            )}

            {/* CRT SCANLINES - Boosted Visibility */}
            {scanlines && !lowPowerMode && (
                <div className="fixed inset-0 z-40 pointer-events-none w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-80" />
            )}

            {/* DEBUG GRID */}
            {debugGrid && (
                <div className="fixed inset-0 z-40 pointer-events-none w-full h-full flex justify-center opacity-30">
                    <div className="w-full max-w-[1400px] grid grid-cols-4 md:grid-cols-12 gap-4 px-4 h-full">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="h-full bg-red-500/10 dark:bg-cyan-500/10 border-x border-red-500/20 dark:border-cyan-500/20"></div>
                        ))}
                    </div>
                </div>
            )}

            {/* CSS INJECTIONS */}
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
                    /* Updates to dim backgrounds */
                    .focus-mode .animate-blob, 
                    .focus-mode .gradient-text,
                    .focus-mode .bg-gradient-to-r,
                    .focus-mode .bg-gradient-to-br,
                    .focus-mode img {
                        opacity: 0.2 !important;
                        transition: opacity 0.5s ease;
                        filter: blur(5px) grayscale(100%);
                    }
                    .focus-mode main {
                        backdrop-filter: blur(0px); /* Clear main content */
                    }
                ` : ''}

                ${monoMode ? `
                    .mono-mode {
                        filter: grayscale(100%) !important;
                    }
                    .mono-mode img {
                        filter: grayscale(100%) contrast(1.2) !important;
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
