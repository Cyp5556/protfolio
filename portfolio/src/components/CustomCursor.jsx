import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const cursorDotRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsMobile(true);
            return;
        }

        const cursor = cursorRef.current;
        const dot = cursorDotRef.current;
        if (!cursor || !dot) return;

        const moveCursor = (e) => {
            gsap.to(cursor, {
                x: e.clientX - 16,
                y: e.clientY - 16,
                duration: 0.5,
                ease: 'power2.out',
            });
            gsap.to(dot, {
                x: e.clientX - 4,
                y: e.clientY - 4,
                duration: 0.1,
            });
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        // Add hover listeners to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, [data-cursor-hover]');
        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        window.addEventListener('mousemove', moveCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    // Re-attach hover listeners after DOM changes
    useEffect(() => {
        if (isMobile) return;

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        const observer = new MutationObserver(() => {
            const interactiveElements = document.querySelectorAll('a, button, input, textarea, [data-cursor-hover]');
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
                el.addEventListener('mouseenter', handleMouseEnter);
                el.addEventListener('mouseleave', handleMouseLeave);
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, [isMobile]);

    if (isMobile) return null;

    return (
        <>
            {/* Outer ring */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    width: isHovering ? '48px' : '32px',
                    height: isHovering ? '48px' : '32px',
                    borderRadius: '50%',
                    border: `2px solid ${isHovering ? '#00f0ff' : 'rgba(255,255,255,0.6)'}`,
                    transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease',
                    transform: 'translate(-50%, -50%)',
                }}
            />
            {/* Inner dot */}
            <div
                ref={cursorDotRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999]"
                style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: isHovering ? '#00f0ff' : '#fff',
                    transition: 'background-color 0.3s ease, transform 0.3s ease',
                    transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
                }}
            />
        </>
    );
};

export default CustomCursor;
