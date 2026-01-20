import { useTheme } from '../../context/ThemeContext';
import { useEffect } from 'react';

const VisualEffects = () => {
    const { filmGrain, wireframeMode, debugGrid, lowPowerMode } = useTheme();

    // Wireframe Mode Logic : Injects CSS to force wireframe look
    useEffect(() => {
        if (wireframeMode) {
            document.body.classList.add('wireframe-mode');
        } else {
            document.body.classList.remove('wireframe-mode');
        }
    }, [wireframeMode]);

    // Low Power Mode Logic : Reduces animations
    useEffect(() => {
        if (lowPowerMode) {
            document.body.classList.add('low-power');
        } else {
            document.body.classList.remove('low-power');
        }
    }, [lowPowerMode]);

    return (
        <>
            {/* FILM GRAIN */}
            {filmGrain && !lowPowerMode && (
                <div className="fixed inset-0 z-[9990] pointer-events-none opacity-50 mix-blend-overlay w-full h-full overflow-hidden">
                    <svg className="w-full h-full opacity-20">
                        <filter id="noise">
                            <feTurbulence
                                type="fractalNoise"
                                baseFrequency="0.80"
                                numOctaves="4"
                                stitchTiles="stitch"
                            />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#noise)" />
                    </svg>
                </div>
            )}

            {/* DEBUG GRID */}
            {debugGrid && (
                <div className="fixed inset-0 z-[9991] pointer-events-none w-full h-full flex justify-center">
                    <div className="w-full max-w-[1400px] grid grid-cols-4 md:grid-cols-12 gap-4 px-4 h-full">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="h-full bg-red-500/5 dark:bg-cyan-500/5 border-x border-red-500/10 dark:border-cyan-500/10"></div>
                        ))}
                    </div>
                </div>
            )}

            {/* WIREFRAME CSS INJECTION */}
            {wireframeMode && (
                <style>{`
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
                `}</style>
            )}

            {/* LOW POWER CSS INJECTION */}
            {lowPowerMode && (
                <style>{`
                    .low-power * {
                        animation: none !important;
                        transition: none !important;
                        backdrop-filter: none !important;
                    }
                `}</style>
            )}
        </>
    );
};

export default VisualEffects;
