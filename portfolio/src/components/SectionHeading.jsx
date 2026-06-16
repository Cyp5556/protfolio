import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SectionHeading = ({ title, subtitle, align = 'center', className = '' }) => {
    const headingRef = useRef(null);
    const subtitleRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate heading text
            gsap.fromTo(
                headingRef.current,
                { y: 60, opacity: 0, skewY: 3 },
                {
                    y: 0,
                    opacity: 1,
                    skewY: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // Animate subtitle
            if (subtitleRef.current) {
                gsap.fromTo(
                    subtitleRef.current,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        delay: 0.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: subtitleRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }

            // Animate accent line
            if (lineRef.current) {
                gsap.fromTo(
                    lineRef.current,
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        duration: 0.8,
                        delay: 0.3,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: lineRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    const alignmentClass = {
        center: 'text-center items-center',
        left: 'text-left items-start',
        right: 'text-right items-end',
    };

    return (
        <div className={`flex flex-col ${alignmentClass[align]} mb-16 md:mb-20 ${className}`}>
            <h2
                ref={headingRef}
                className="text-4xl sm:text-5xl md:text-6xl font-display font-bold gradient-text-animated mb-4"
            >
                {title}
            </h2>
            <div
                ref={lineRef}
                className="w-20 h-1 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full mb-6 origin-left"
            />
            {subtitle && (
                <p
                    ref={subtitleRef}
                    className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed"
                >
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default SectionHeading;
