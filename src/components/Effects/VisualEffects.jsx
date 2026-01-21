import { useTheme } from '../../context/ThemeContext';
import { useEffect } from 'react';

const VisualEffects = () => {
    const { filmGrain, wireframeMode, focusMode, readingMode, debugGrid } = useTheme();

    // Toggle Body Classes
    useEffect(() => {
        document.body.classList.toggle('wireframe-mode', wireframeMode);
        document.body.classList.toggle('focus-mode', focusMode);
        document.body.classList.toggle('reading-mode', readingMode);
    }, [wireframeMode, focusMode, readingMode]);

    return (
        <>
            {/* FILM GRAIN */}
            {filmGrain && (
                <div className="fixed inset-0 z-30 pointer-events-none opacity-[0.05] w-full h-full overflow-hidden">
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
