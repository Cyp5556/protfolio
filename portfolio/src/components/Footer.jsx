import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                footerRef.current,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: 'top 95%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        });

        return () => ctx.revert();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer ref={footerRef} className="relative border-t border-white/5">
            {/* Gradient line at top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Left - Brand */}
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-display font-bold gradient-text mb-2">
                            Chaitanya Patil
                        </h3>
                        <p className="text-sm text-white/40">
                            Full Stack Developer & Problem Solver
                        </p>
                    </div>

                    {/* Center - Social Links */}
                    <div className="flex items-center gap-3">
                        <MagneticButton
                            variant="icon"
                            href="https://www.linkedin.com/in/chaitanya-patil-7769b1292/"
                            target="_blank"
                            strength={0.4}
                        >
                            <Linkedin className="h-5 w-5 text-white/70 group-hover:text-neon-cyan transition-colors" />
                        </MagneticButton>
                        <MagneticButton
                            variant="icon"
                            href="https://github.com/Cyp5556"
                            target="_blank"
                            strength={0.4}
                        >
                            <Github className="h-5 w-5 text-white/70 group-hover:text-neon-cyan transition-colors" />
                        </MagneticButton>
                        <MagneticButton
                            variant="icon"
                            href="mailto:chaitanya241005@gmail.com"
                            strength={0.4}
                        >
                            <Mail className="h-5 w-5 text-white/70 group-hover:text-neon-cyan transition-colors" />
                        </MagneticButton>
                    </div>

                    {/* Right - Scroll to top */}
                    <div className="flex items-center gap-4">
                        <p className="text-sm text-white/30">
                            © {new Date().getFullYear()} Chaitanya Patil
                        </p>
                        <MagneticButton variant="icon" onClick={scrollToTop} strength={0.4}>
                            <ArrowUp className="h-5 w-5 text-white/70 group-hover:text-neon-cyan transition-colors" />
                        </MagneticButton>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
