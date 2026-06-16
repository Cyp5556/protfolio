import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, GraduationCap, Award, Code } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { value: '4+', label: 'Projects Completed' },
    { value: '2+', label: 'Years Experience' },
    { value: 'Full-Stack', label: 'Development' },
    { value: 'PICT', label: 'Third Year ENTC' },
];

const quickFacts = [
    { icon: MapPin, text: 'Based in Pune, India' },
    { icon: GraduationCap, text: 'Third Year ENTC Student at PICT' },
    { icon: Award, text: 'Learning MERN stack to become Full Stack Developer' },
    { icon: Code, text: 'Strong interest in UI/UX and clean design' },
];

const About = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const statsRef = useRef(null);
    const factsRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Content reveal
            gsap.fromTo(
                contentRef.current,
                { x: -60, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // Stats stagger
            gsap.fromTo(
                statsRef.current.children,
                { y: 40, opacity: 0, scale: 0.9 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'back.out(1.5)',
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // Facts reveal
            gsap.fromTo(
                factsRef.current,
                { x: 60, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: factsRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // Animate each fact item
            const factItems = factsRef.current.querySelectorAll('.fact-item');
            gsap.fromTo(
                factItems,
                { x: 40, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: factsRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" ref={sectionRef} className="relative py-24 md:py-32">
            {/* Background accent */}
            <div className="absolute top-1/2 left-0 w-[300px] h-[300px] rounded-full bg-neon-purple/3 blur-[100px] -translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionHeading
                    title="About Me"
                    subtitle="I'm a passionate frontend developer currently pursuing my third year in Electronics and Telecommunication Engineering at PICT."
                />

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Left - Story */}
                    <div ref={contentRef}>
                        <h3 className="text-2xl md:text-3xl font-display font-semibold text-neon-cyan mb-8">
                            My Journey
                        </h3>
                        <div className="space-y-5 text-white/60 leading-relaxed text-base md:text-lg">
                            <p>
                                My journey began with a curiosity to build beautiful and functional websites. Over the last two years, I've worked on four diverse projects that challenged my creativity and technical skills.
                            </p>
                            <p>
                                I love solving real-world problems with simple, intuitive designs and clean code. As I continue learning backend technologies to become a full-stack developer, I focus on writing maintainable code and understanding best practices in modern development.
                            </p>
                            <p>
                                Outside coding, I enjoy exploring tech trends, bikes, and improving my communication skills.
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div ref={statsRef} className="grid grid-cols-2 gap-4 mt-10">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="group p-5 rounded-2xl glass glass-hover transition-all duration-300"
                                >
                                    <div className="text-2xl md:text-3xl font-display font-bold gradient-text mb-1">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-white/50 group-hover:text-white/70 transition-colors">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right - Quick Facts */}
                    <div ref={factsRef} className="rounded-3xl glass p-8 md:p-10">
                        <h3 className="text-2xl md:text-3xl font-display font-semibold text-neon-purple mb-8">
                            Quick Facts
                        </h3>
                        <div className="space-y-4">
                            {quickFacts.map((fact, index) => (
                                <div
                                    key={index}
                                    className="fact-item flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 group"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-neon-cyan/10 flex items-center justify-center group-hover:bg-neon-cyan/20 transition-colors">
                                        <fact.icon className="h-5 w-5 text-neon-cyan" />
                                    </div>
                                    <span className="text-white/70 group-hover:text-white/90 transition-colors">
                                        {fact.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
