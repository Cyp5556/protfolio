import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook to animate elements on scroll using GSAP ScrollTrigger
 * @param {object} options - Animation options
 * @returns {React.RefObject} - Ref to attach to the element
 */
export const useScrollAnimation = (options = {}) => {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const {
            from = { y: 60, opacity: 0 },
            to = { y: 0, opacity: 1 },
            duration = 1,
            delay = 0,
            ease = 'power3.out',
            start = 'top 85%',
            toggleActions = 'play none none reverse',
            scrub = false,
        } = options;

        const animation = gsap.fromTo(element, from, {
            ...to,
            duration,
            delay,
            ease: scrub ? 'none' : ease,
            scrollTrigger: {
                trigger: element,
                start,
                toggleActions: scrub ? undefined : toggleActions,
                scrub: scrub ? 1 : false,
            },
        });

        return () => {
            animation.kill();
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === element) trigger.kill();
            });
        };
    }, []);

    return ref;
};

export default useScrollAnimation;
