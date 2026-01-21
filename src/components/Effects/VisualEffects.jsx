import { useTheme } from '../../context/ThemeContext';
import { useEffect } from 'react';

const VisualEffects = () => {
    const { filmGrain, scanlines, wireframeMode, focusMode, monoMode, debugGrid, lowPowerMode } = useTheme();

    // Toggle Body Classes
    useEffect(() => {
        document.body.classList.toggle('wireframe-mode', wireframeMode);
        document.body.classList.toggle('focus-mode', focusMode);
        document.body.classList.toggle('mono-mode', monoMode);
        document.body.classList.toggle('low-power', lowPowerMode);
    }, [wireframeMode, focusMode, monoMode, lowPowerMode]);

    return (
        <>
            {/* FILM GRAIN */}
            {filmGrain && !lowPowerMode && (
                <div className="fixed inset-0 z-30 pointer-events-none opacity-[0.10] w-full h-full overflow-hidden">
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

            {/* CRT SCANLINES */}
            {scanlines && !lowPowerMode && (
                <div className="fixed inset-0 z-30 pointer-events-none w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-50" />
            )}

            {/* DEBUG GRID */}
            {debugGrid && (
                <div className="fixed inset-0 z-30 pointer-events-none w-full h-full flex justify-center opacity-30">
                    <div className="w-full max-w-[1400px] grid grid-cols-4 md:grid-cols-12 gap-4 px-4 h-full">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="h-full bg-red-500/10 dark:bg-cyan-500/10 border-x border-red-500/20 dark:border-cyan-500/20"></div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default VisualEffects;
