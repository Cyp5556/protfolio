import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ChevronDown, Briefcase, Download, ArrowRight } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';

const Hero = () => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const descRef = useRef(null);
    const buttonsRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.fromTo(
                imageRef.current,
                { scale: 0, opacity: 0, rotation: -180 },
                { scale: 1, opacity: 1, rotation: 0, duration: 1.2 },
                0.3
            )
                .fromTo(
                    titleRef.current,
                    { y: 80, opacity: 0, skewY: 5 },
                    { y: 0, opacity: 1, skewY: 0, duration: 1 },
                    0.6
                )
                .fromTo(
                    subtitleRef.current,
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    0.9
                )
                .fromTo(
                    descRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    1.1
                )
                .fromTo(
                    buttonsRef.current.children,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, stagger: 0.15 },
                    1.3
                );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const downloadResume = () => {
        const link = document.createElement('a');
        link.href = '/resume/Chaitanya_Patil_Resume.pdf';
        link.download = 'Chaitanya_Patil_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section
            id="home"
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background glows */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-neon-cyan/5 blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-neon-purple/5 blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                {/* Profile Image */}
                <div ref={imageRef} className="mb-8">
                    <div className="relative inline-block">
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink opacity-60 blur-md animate-spin-slow" />
                        <img
                            src="https://media.licdn.com/dms/image/v2/D5603AQHVvAWKMOeGxw/profile-displayphoto-shrink_800_800/B56Zag8cNEHUAc-/0/1746456921931?e=1757548800&v=beta&t=NNtwg2z2LTRbGP_WvUc9qM0Ay9BTM6GajadC-Fh7IHI"
                            alt="Chaitanya Patil"
                            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-white/10"
                        />
                    </div>
                </div>

                {/* Title */}
                <h1 ref={titleRef} className="text-5xl sm:text-6xl md:text-8xl font-display font-bold mb-6 leading-tight">
                    <span className="text-white">Hi, I'm </span>
                    <span className="gradient-text-animated">
                        Chaitanya
                    </span>
                </h1>

                {/* Subtitle */}
                <div ref={subtitleRef} className="mb-6">
                    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border border-neon-cyan/20 text-neon-cyan font-mono text-sm md:text-base tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                        Full Stack Developer & Problem Solver
                    </span>
                </div>

                {/* Description */}
                <p ref={descRef} className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed">
                    I create exceptional digital experiences with modern technologies.
                    Passionate about clean code, user experience, and continuous learning.
                </p>

                {/* Buttons */}
                <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center">
                    <MagneticButton variant="primary" onClick={() => scrollToSection('projects')}>
                        <Briefcase className="h-5 w-5" />
                        View My Work
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </MagneticButton>

                    <MagneticButton variant="secondary" onClick={downloadResume}>
                        <Download className="h-5 w-5" />
                        Download Resume
                    </MagneticButton>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <button
                        onClick={() => scrollToSection('about')}
                        className="text-white/30 hover:text-neon-cyan transition-colors"
                        data-cursor-hover
                    >
                        <ChevronDown className="h-8 w-8" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
