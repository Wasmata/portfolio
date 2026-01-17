import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const CustomCursor = () => {
    const { enableCursor } = useTheme();
    const cursorRef = useRef(null); // The big circle
    const dotRef = useRef(null);    // The small dot

    // Use refs for values modifying in the loop to avoid re-renders
    const mouseParams = useRef({ x: -100, y: -100 }); // Target position
    const cursorParams = useRef({ x: -100, y: -100 }); // Current interpolated position
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        // If disabled, do not run any logic
        if (!enableCursor) return;

        const onMouseMove = (e) => {
            mouseParams.current = { x: e.clientX, y: e.clientY };
            if (dotRef.current) {
                // Dot follows immediately
                dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            }
            if (!isVisible) setIsVisible(true);
        };

        const onMouseEnter = () => setIsHovering(true);
        const onMouseLeave = () => setIsHovering(false);

        window.addEventListener('mousemove', onMouseMove);

        // Add magnetic listeners
        const updateListeners = () => {
            const clickables = document.querySelectorAll('a, button, input, textarea, .magnetic-target');
            clickables.forEach((el) => {
                el.addEventListener('mouseenter', onMouseEnter);
                el.addEventListener('mouseleave', onMouseLeave);
            });
            return clickables;
        };

        let clickables = updateListeners();

        // Animation Loop
        let animationFrameId;
        const animate = () => {
            // Lerp (Linear Interpolation) for smooth trailing
            const factor = 0.15;

            cursorParams.current.x += (mouseParams.current.x - cursorParams.current.x) * factor;
            cursorParams.current.y += (mouseParams.current.y - cursorParams.current.y) * factor;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${cursorParams.current.x - 16}px, ${cursorParams.current.y - 16}px, 0) scale(${isHovering ? 1.5 : 1})`;
            }

            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        // Observer for new elements
        const observer = new MutationObserver(() => {
            clickables.forEach(el => {
                el.removeEventListener('mouseenter', onMouseEnter);
                el.removeEventListener('mouseleave', onMouseLeave);
            });
            clickables = updateListeners();
        });
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();
            clickables.forEach((el) => {
                el.removeEventListener('mouseenter', onMouseEnter);
                el.removeEventListener('mouseleave', onMouseLeave);
            });
        };
    }, [enableCursor, isHovering, isVisible]);

    // Render nothing if disabled or on mobile
    if (!enableCursor || (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches)) {
        return null;
    }

    return (
        <>
            <div
                ref={cursorRef}
                className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-primary-500 z-[9999] pointer-events-none transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                    // Initial off-screen
                    transform: 'translate3d(-100px, -100px, 0)',
                    backgroundColor: isHovering ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                    mixBlendMode: 'difference'
                }}
            />
            <div
                ref={dotRef}
                className={`fixed top-0 left-0 w-2 h-2 bg-primary-500 rounded-full z-[9999] pointer-events-none transition-opacity duration-300 -ml-1 -mt-1 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transform: 'translate3d(-100px, -100px, 0)' }}
            />
        </>
    );
};

export default CustomCursor;
