import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsComplete(true);
                        setTimeout(() => onComplete?.(), 600);
                    }, 300);
                    return 100;
                }
                return prev + Math.random() * 8 + 2;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
                    style={{ background: '#030014' }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                    {/* Background glow */}
                    <div className="absolute inset-0">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-neon-cyan/5 via-transparent to-transparent" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-radial from-neon-purple/5 via-transparent to-transparent animate-pulse" />
                    </div>

                    {/* Logo / Name */}
                    <motion.div
                        className="relative z-10 mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-display font-bold gradient-text tracking-wider">
                            CP
                        </h1>
                    </motion.div>

                    {/* Progress bar */}
                    <div className="relative z-10 w-48 md:w-64">
                        <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan rounded-full"
                                style={{ width: `${Math.min(progress, 100)}%` }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>
                        <div className="mt-4 text-center">
                            <span className="text-sm font-mono text-white/40 tracking-widest">
                                {Math.min(Math.round(progress), 100)}%
                            </span>
                        </div>
                    </div>

                    {/* Loading text */}
                    <motion.p
                        className="relative z-10 mt-8 text-sm text-white/30 font-mono tracking-widest"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        INITIALIZING
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Loader;
