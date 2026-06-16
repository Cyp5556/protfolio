import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

/**
 * Hook to create magnetic button effect
 * Elements are attracted to the cursor when hovering
 * @param {object} options - strength and ease options
 * @returns {React.RefObject} - Ref to attach to the element
 */
export const useMagnetic = (options = {}) => {
    const ref = useRef(null);

    const { strength = 0.3, ease = 'power2.out', duration = 0.4 } = options;

    const handleMouseMove = useCallback(
        (e) => {
            const element = ref.current;
            if (!element) return;

            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - centerX) * strength;
            const deltaY = (e.clientY - centerY) * strength;

            gsap.to(element, {
                x: deltaX,
                y: deltaY,
                duration,
                ease,
            });
        },
        [strength, ease, duration]
    );

    const handleMouseLeave = useCallback(() => {
        const element = ref.current;
        if (!element) return;

        gsap.to(element, {
            x: 0,
            y: 0,
            duration,
            ease,
        });
    }, [ease, duration]);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [handleMouseMove, handleMouseLeave]);

    return ref;
};

export default useMagnetic;
