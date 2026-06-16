import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, ArrowUpRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: 'PasteRoom',
        description:
            'Full-stack file sharing platform with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.',
        tech: ['React', 'Node.js', 'Express.js', 'Azure'],
        github: '#',
        live: 'https://www.pasteroom.live',
        image:
            'https://product-list.sfo3.digitaloceanspaces.com/products/paste-room/images/d36dd897-58bf-4224-8a8c-c73f2b20e2a2.jpeg',
        featured: true,
        color: '#00f0ff',
    },
    {
        title: 'CampusResults',
        description:
            'CampusResults is a web application designed to help students manage their academic results and track their progress over time with data visualization and a responsive design.',
        tech: ['React', 'Node.js', 'Express.js', 'TailwindCSS', 'Apex Chart'],
        github: '#',
        live: 'https://www.campusresults.live/',
        image:
            'https://media.licdn.com/dms/image/v2/D5622AQHKSGIz86DTnQ/feedshare-shrink_800/B56ZTFyceEGUAg-/0/1738485123155?e=2147483647&v=beta&t=ByC-h68GAmYcou1QY7CxZ0FMCrom0dOQHmoFhCVfN7g',
        featured: false,
        color: '#bf5af2',
    },
];

const ProjectCard = ({ project, index }) => {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                cardRef.current,
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: index * 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: cardRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        });

        return () => ctx.revert();
    }, [index]);

    return (
        <div
            ref={cardRef}
            className="group relative rounded-3xl overflow-hidden glass transition-all duration-500"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            data-cursor-hover
        >
            {/* Featured badge */}
            {project.featured && (
                <div className="absolute top-5 right-5 z-20 flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 backdrop-blur-sm">
                    <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-semibold text-amber-400">Featured</span>
                </div>
            )}

            {/* Image */}
            <div className="relative h-56 md:h-64 overflow-hidden">
                <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    animate={{ scale: isHovered ? 1.08 : 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />

                {/* Hover overlay with links */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center gap-4 bg-dark-900/60 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-neon-cyan/20 border border-neon-cyan/30 text-neon-cyan text-sm font-medium hover:bg-neon-cyan/30 transition-colors"
                    >
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                    </a>
                    {project.github !== '#' && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors"
                        >
                            <Github className="h-4 w-4" />
                            Code
                        </a>
                    )}
                </motion.div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl md:text-2xl font-display font-bold text-white group-hover:text-neon-cyan transition-colors duration-300">
                        {project.title}
                    </h3>
                    <ArrowUpRight
                        className="h-5 w-5 text-white/30 group-hover:text-neon-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                    />
                </div>
                <p className="text-white/50 text-sm md:text-base leading-relaxed mb-5">
                    {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 rounded-full text-xs font-medium border transition-all duration-300 hover:scale-105"
                            style={{
                                backgroundColor: `${project.color}10`,
                                borderColor: `${project.color}25`,
                                color: `${project.color}cc`,
                            }}
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Bottom glow */}
            <div
                className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${project.color}60, transparent)` }}
            />
        </div>
    );
};

const Projects = () => {
    return (
        <section id="projects" className="relative py-24 md:py-32">
            {/* Background accent */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-neon-purple/3 blur-[150px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionHeading
                    title="Featured Projects"
                    subtitle="Some of my recent work that I'm proud of"
                />

                <div className="grid lg:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.title} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
