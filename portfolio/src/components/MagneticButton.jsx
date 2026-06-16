import React from 'react';
import { useMagnetic } from '../hooks/useMagnetic';

const MagneticButton = ({
    children,
    onClick,
    className = '',
    variant = 'primary',
    href,
    target,
    strength = 0.3,
    ...props
}) => {
    const magneticRef = useMagnetic({ strength });

    const baseClasses = 'relative inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 overflow-hidden group';

    const variants = {
        primary:
            'px-8 py-4 bg-gradient-to-r from-neon-cyan/20 to-accent-500/20 border border-neon-cyan/30 rounded-full text-white hover:from-neon-cyan/30 hover:to-accent-500/30 hover:border-neon-cyan/60 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)]',
        secondary:
            'px-8 py-4 border-2 border-neon-cyan text-neon-cyan rounded-full hover:bg-neon-cyan hover:text-dark-900 hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]',
        ghost:
            'px-6 py-3 text-white/80 hover:text-neon-cyan',
        icon:
            'p-4 rounded-xl glass glass-hover hover:scale-110 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]',
    };

    const content = (
        <>
            <span className="relative z-10 flex items-center gap-2">{children}</span>
            {(variant === 'primary' || variant === 'secondary') && (
                <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 to-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            )}
        </>
    );

    if (href) {
        return (
            <a
                ref={magneticRef}
                href={href}
                target={target}
                className={`${baseClasses} ${variants[variant]} ${className}`}
                {...props}
            >
                {content}
            </a>
        );
    }

    return (
        <button
            ref={magneticRef}
            onClick={onClick}
            className={`${baseClasses} ${variants[variant]} ${className}`}
            {...props}
        >
            {content}
        </button>
    );
};

export default MagneticButton;
