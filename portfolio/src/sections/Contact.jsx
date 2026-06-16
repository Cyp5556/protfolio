import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, MessageCircle, Send, CheckCircle } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import MagneticButton from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
    { icon: Mail, text: 'chaitanya241005@gmail.com', href: 'mailto:chaitanya241005@gmail.com', label: 'Email' },
    { icon: Phone, text: '+91 6396663693', href: 'tel:+916396663693', label: 'Phone' },
    { icon: MapPin, text: 'Pune, India', href: null, label: 'Location' },
];

const socialLinks = [
    {
        icon: Linkedin,
        href: 'https://www.linkedin.com/in/chaitanya-patil-7769b1292/',
        label: 'LinkedIn',
        color: '#0A66C2',
    },
    {
        icon: Github,
        href: 'https://github.com/Cyp5556',
        label: 'GitHub',
        color: '#ffffff',
    },
];

const Contact = () => {
    const sectionRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const [formStatus, setFormStatus] = useState('idle'); // idle, sending, sent

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                leftRef.current,
                { x: -60, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: leftRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            gsap.fromTo(
                rightRef.current,
                { x: 60, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: rightRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('sending');
        setTimeout(() => {
            setFormStatus('sent');
            setTimeout(() => setFormStatus('idle'), 3000);
        }, 1500);
    };

    return (
        <section id="contact" ref={sectionRef} className="relative py-24 md:py-32">
            {/* Background accents */}
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-neon-purple/3 blur-[120px]" />
            <div className="absolute top-1/4 right-0 w-[300px] h-[300px] rounded-full bg-neon-cyan/3 blur-[100px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionHeading
                    title="Get In Touch"
                    subtitle="I'm always open to discussing new opportunities and interesting projects"
                />

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left - Contact Info */}
                    <div ref={leftRef}>
                        <h3 className="text-2xl md:text-3xl font-display font-semibold text-neon-cyan mb-8">
                            Let's Connect
                        </h3>

                        <div className="space-y-4 mb-10">
                            {contactInfo.map((contact, i) => (
                                <div
                                    key={i}
                                    className="group flex items-center gap-4 p-4 rounded-xl glass glass-hover transition-all duration-300"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-neon-cyan/10 flex items-center justify-center group-hover:bg-neon-cyan/20 transition-colors">
                                        <contact.icon className="h-5 w-5 text-neon-cyan" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-white/40 mb-0.5">{contact.label}</p>
                                        {contact.href ? (
                                            <a
                                                href={contact.href}
                                                className="text-white/70 hover:text-neon-cyan transition-colors text-sm md:text-base"
                                                data-cursor-hover
                                            >
                                                {contact.text}
                                            </a>
                                        ) : (
                                            <span className="text-white/70 text-sm md:text-base">{contact.text}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div>
                            <h4 className="text-lg font-display font-semibold text-neon-purple mb-5">
                                Follow Me
                            </h4>
                            <div className="flex gap-3">
                                {socialLinks.map((social, i) => (
                                    <MagneticButton
                                        key={i}
                                        variant="icon"
                                        href={social.href}
                                        target="_blank"
                                        strength={0.4}
                                    >
                                        <social.icon className="h-5 w-5 text-white/70 group-hover:text-neon-cyan transition-colors" />
                                    </MagneticButton>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right - Contact Form */}
                    <div ref={rightRef}>
                        <form onSubmit={handleSubmit} className="rounded-3xl glass p-8 md:p-10 space-y-6">
                            <h3 className="text-2xl font-display font-semibold text-neon-purple mb-2">
                                Send a Message
                            </h3>

                            {/* Name */}
                            <div className="group">
                                <label className="block text-sm font-medium text-white/50 mb-2">Name</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-neon-cyan/50 focus:ring-2 focus:ring-neon-cyan/10 focus:outline-none transition-all duration-300 text-sm"
                                        placeholder="Your Name"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="group">
                                <label className="block text-sm font-medium text-white/50 mb-2">Email</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-neon-cyan/50 focus:ring-2 focus:ring-neon-cyan/10 focus:outline-none transition-all duration-300 text-sm"
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                            </div>

                            {/* Message */}
                            <div className="group">
                                <label className="block text-sm font-medium text-white/50 mb-2">Message</label>
                                <div className="relative">
                                    <textarea
                                        rows={4}
                                        required
                                        className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-neon-cyan/50 focus:ring-2 focus:ring-neon-cyan/10 focus:outline-none transition-all duration-300 resize-none text-sm"
                                        placeholder="Your message here..."
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={formStatus === 'sending'}
                                className="w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden"
                                style={{
                                    background:
                                        formStatus === 'sent'
                                            ? 'linear-gradient(135deg, rgba(52, 211, 153, 0.3), rgba(16, 185, 129, 0.3))'
                                            : 'linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(191, 90, 242, 0.2))',
                                    border:
                                        formStatus === 'sent'
                                            ? '1px solid rgba(52, 211, 153, 0.3)'
                                            : '1px solid rgba(0, 240, 255, 0.2)',
                                }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {formStatus === 'idle' && (
                                    <>
                                        <Send className="h-4 w-4" />
                                        Send Message
                                    </>
                                )}
                                {formStatus === 'sending' && (
                                    <>
                                        <motion.div
                                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                        />
                                        Sending...
                                    </>
                                )}
                                {formStatus === 'sent' && (
                                    <>
                                        <CheckCircle className="h-4 w-4 text-emerald-400" />
                                        <span className="text-emerald-400">Message Sent!</span>
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
