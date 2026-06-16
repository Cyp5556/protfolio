import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, GraduationCap } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        type: 'education',
        title: 'B.E. in Electronics & Telecommunication',
        organization: 'Pune Institute of Computer Technology (PICT)',
        period: '2023 - Present',
        description:
            'Currently in third year, building strong foundations in engineering while specializing in web development and software engineering.',
        icon: GraduationCap,
    },
    {
        type: 'project',
        title: 'Full Stack Developer',
        organization: 'PasteRoom.live',
        period: '2024',
        description:
            'Built a complete file sharing platform with React frontend, Node.js backend, MongoDB database, user authentication, and Azure deployment.',
        icon: Briefcase,
    },
    {
        type: 'project',
        title: 'Frontend Developer',
        organization: 'CampusResults.live',
        period: '2024',
        description:
            'Developed a student academic results tracker with data visualization using Apex Charts, responsive design with TailwindCSS, and  REST API integration.',
        icon: Briefcase,
    },
    {
        type: 'learning',
        title: 'MERN Stack Development',
        organization: 'Self-Learning Journey',
        period: '2023 - Present',
        description:
            'Continuously learning MongoDB, Express.js, React, and Node.js through hands-on projects and online resources to become a full-stack developer.',
        icon: GraduationCap,
    },
];

const TimelineItem = ({ item, index, isLeft }) => {
    const itemRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Card animation
            gsap.fromTo(
                itemRef.current,
                { x: isLeft ? -60 : 60, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: itemRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // Line grow animation
            if (lineRef.current) {
                gsap.fromTo(
                    lineRef.current,
                    { scaleY: 0 },
                    {
                        scaleY: 1,
                        duration: 0.6,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: itemRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }
        });

        return () => ctx.revert();
    }, [isLeft]);

    return (
        <div
            ref={itemRef}
            className={`relative flex items-start gap-6 mb-12 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
        >
            {/* Content Card */}
            <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                <div className="group rounded-2xl glass glass-hover p-6 md:p-8 transition-all duration-300 hover:scale-[1.02]">
                    <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:justify-end' : ''}`}>
                        <span className="text-xs font-mono text-neon-cyan/60 px-2 py-1 rounded-full bg-neon-cyan/10">
                            {item.period}
                        </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-display font-bold text-white mb-1 group-hover:text-neon-cyan transition-colors">
                        {item.title}
                    </h3>
                    <p className="text-sm text-neon-purple mb-3 font-medium">{item.organization}</p>
                    <p className="text-sm text-white/50 leading-relaxed">{item.description}</p>
                </div>
            </div>

            {/* Timeline node */}
            <div className="hidden md:flex flex-col items-center flex-shrink-0">
                <div className="w-12 h-12 rounded-full glass border border-neon-cyan/20 flex items-center justify-center group-hover:border-neon-cyan/50 transition-colors">
                    <item.icon className="h-5 w-5 text-neon-cyan" />
                </div>
                <div
                    ref={lineRef}
                    className="w-px h-full min-h-[80px] bg-gradient-to-b from-neon-cyan/30 to-transparent origin-top"
                />
            </div>

            {/* Spacer for alignment */}
            <div className="hidden md:block flex-1" />
        </div>
    );
};

const Experience = () => {
    const sectionRef = useRef(null);

    return (
        <section id="experience" ref={sectionRef} className="relative py-24 md:py-32">
            {/* Background accent */}
            <div className="absolute top-1/2 left-0 w-[300px] h-[300px] rounded-full bg-neon-cyan/3 blur-[100px] -translate-y-1/2" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionHeading
                    title="Experience & Education"
                    subtitle="My journey in tech and learning"
                />

                <div className="relative">
                    {/* Center line (desktop) */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-neon-cyan/20 via-neon-purple/20 to-transparent" />

                    {experiences.map((item, index) => (
                        <TimelineItem
                            key={index}
                            item={item}
                            index={index}
                            isLeft={index % 2 === 0}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
