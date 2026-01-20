import { useEffect, useState } from 'react';

const FPSCounter = () => {
    const [fps, setFps] = useState(0);

    useEffect(() => {
        let frameCount = 0;
        let lastTime = performance.now();
        let animationFrameId;

        const loop = (time) => {
            frameCount++;
            if (time - lastTime >= 1000) {
                setFps(Math.round(frameCount * 1000 / (time - lastTime)));
                frameCount = 0;
                lastTime = time;
            }
            animationFrameId = requestAnimationFrame(loop);
        };

        animationFrameId = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div className="fixed top-24 right-4 z-[9999] pointer-events-none">
            <div className="bg-black/50 dark:bg-white/10 backdrop-blur-md text-white dark:text-white font-mono text-xs px-2 py-1 rounded border border-white/20">
                <span className={`font-bold ${fps < 30 ? 'text-red-400' : fps < 55 ? 'text-yellow-400' : 'text-green-400'}`}>
                    {fps}
                </span> FPS
            </div>
        </div>
    );
};

export default FPSCounter;
