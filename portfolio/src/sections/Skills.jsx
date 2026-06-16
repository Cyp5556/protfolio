import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '../components/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

const skills = [
    {
        name: 'React',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        category: 'Frontend',
        level: 90,
        color: '#61DAFB',
    },
    {
        name: 'JavaScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        category: 'Language',
        level: 85,
        color: '#F7DF1E',
    },
    {
        name: 'Node.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
        category: 'Backend',
        level: 80,
        color: '#339933',
    },
    {
        name: 'Python',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
        category: 'Language',
        level: 75,
        color: '#3776AB',
    },
    {
        name: 'MySQL',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
        category: 'Database',
        level: 70,
        color: '#4479A1',
    },
    {
        name: 'MongoDB',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
        category: 'Database',
        level: 80,
        color: '#47A248',
    },
];

const categoryColors = {
    Frontend: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
    Language: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
    Backend: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' },
    Database: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
};

const SkillCard = ({ skill, index }) => {
    const cardRef = useRef(null);
    const progressRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Card reveal
            gsap.fromTo(
                cardRef.current,
                { y: 50, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.7,
                    delay: index * 0.08,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: cardRef.current,
                        start: 'top 88%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // Progress bar animation
            gsap.fromTo(
                progressRef.current,
                { width: '0%' },
                {
                    width: `${skill.level}%`,
                    duration: 1.2,
                    delay: index * 0.08 + 0.3,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: cardRef.current,
                        start: 'top 88%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        });

        return () => ctx.revert();
    }, [index, skill.level]);

    const colors = categoryColors[skill.category] || categoryColors.Frontend;

    return (
        <div
            ref={cardRef}
            className="group rounded-2xl glass glass-hover p-6 transition-all duration-500 hover:scale-[1.03]"
        >
            <div className="flex items-center gap-4 mb-5">
                <div className="relative">
                    <div
                        className="absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                        style={{ backgroundColor: skill.color }}
                    />
                    <div className="relative w-14 h-14 rounded-xl glass flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <img
                            src={skill.icon}
                            alt={skill.name}
                            className="w-8 h-8"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-neon-cyan transition-colors">
                        {skill.name}
                    </h3>
                    <span
                        className={`text-xs px-2 py-0.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}
                    >
                        {skill.category}
                    </span>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="relative">
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                        ref={progressRef}
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                            background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
                            width: '0%',
                            boxShadow: `0 0 10px ${skill.color}44`,
                        }}
                    />
                </div>
                <div className="flex justify-end mt-2">
                    <span className="text-xs text-white/40 font-mono">{skill.level}%</span>
                </div>
            </div>
        </div>
    );
};

const Skills = () => {
    return (
        <section id="skills" className="relative py-24 md:py-32">
            {/* Background accent */}
            <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-neon-cyan/3 blur-[120px] -translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionHeading
                    title="Skills & Technologies"
                    subtitle="Here are the technologies I work with to bring ideas to life"
                />

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skill, index) => (
                        <SkillCard key={skill.name} skill={skill} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
