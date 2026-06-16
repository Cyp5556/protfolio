import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Reveal animation from bottom
export const revealFromBottom = (element, options = {}) => {
    const {
        y = 60,
        duration = 1,
        delay = 0,
        ease = 'power3.out',
        stagger = 0,
    } = options;

    return gsap.fromTo(
        element,
        { y, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration,
            delay,
            ease,
            stagger,
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
            },
        }
    );
};

// Reveal animation from left
export const revealFromLeft = (element, options = {}) => {
    const { x = -80, duration = 1, delay = 0, ease = 'power3.out' } = options;

    return gsap.fromTo(
        element,
        { x, opacity: 0 },
        {
            x: 0,
            opacity: 1,
            duration,
            delay,
            ease,
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            },
        }
    );
};

// Reveal animation from right
export const revealFromRight = (element, options = {}) => {
    const { x = 80, duration = 1, delay = 0, ease = 'power3.out' } = options;

    return gsap.fromTo(
        element,
        { x, opacity: 0 },
        {
            x: 0,
            opacity: 1,
            duration,
            delay,
            ease,
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            },
        }
    );
};

// Scale reveal animation
export const revealScale = (element, options = {}) => {
    const { scale = 0.8, duration = 1, delay = 0, ease = 'power3.out' } = options;

    return gsap.fromTo(
        element,
        { scale, opacity: 0 },
        {
            scale: 1,
            opacity: 1,
            duration,
            delay,
            ease,
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            },
        }
    );
};

// Stagger children reveal
export const staggerReveal = (parent, children, options = {}) => {
    const {
        y = 40,
        duration = 0.8,
        stagger = 0.1,
        ease = 'power3.out',
    } = options;

    return gsap.fromTo(
        children,
        { y, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration,
            stagger,
            ease,
            scrollTrigger: {
                trigger: parent,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            },
        }
    );
};

// Text split and animate
export const animateText = (element, options = {}) => {
    const { duration = 0.8, stagger = 0.03, ease = 'power3.out', delay = 0 } = options;
    const text = element.textContent;
    element.textContent = '';

    const chars = text.split('').map((char) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        element.appendChild(span);
        return span;
    });

    return gsap.fromTo(
        chars,
        { y: 50, opacity: 0, rotationX: -90 },
        {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration,
            stagger,
            ease,
            delay,
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            },
        }
    );
};

// Parallax effect
export const parallax = (element, options = {}) => {
    const { y = -100, ease = 'none' } = options;

    return gsap.to(element, {
        y,
        ease,
        scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
        },
    });
};

// Horizontal scroll animation
export const horizontalScroll = (container, sections) => {
    return gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            end: () => '+=' + container.offsetWidth,
        },
    });
};

// Progress bar animation
export const animateProgress = (element, targetWidth, options = {}) => {
    const { duration = 1.5, ease = 'power2.out', delay = 0 } = options;

    return gsap.fromTo(
        element,
        { width: '0%' },
        {
            width: targetWidth + '%',
            duration,
            delay,
            ease,
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            },
        }
    );
};
