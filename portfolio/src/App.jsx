import React, { useState, useEffect, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components (eager load - small)
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import Loader from './components/Loader';

// 3D Scene (lazy load - heavy)
const Scene = lazy(() => import('./canvas/Scene'));

// Sections (lazy load)
const Hero = lazy(() => import('./sections/Hero'));
const About = lazy(() => import('./sections/About'));
const Skills = lazy(() => import('./sections/Skills'));
const Projects = lazy(() => import('./sections/Projects'));
const Experience = lazy(() => import('./sections/Experience'));
const Contact = lazy(() => import('./sections/Contact'));

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative noise-overlay">
      {/* Loading Screen */}
      {isLoading && <Loader onComplete={handleLoadComplete} />}

      {/* Custom Cursor */}
      <CustomCursor />

      {/* 3D Background */}
      <Suspense fallback={null}>
        <Scene />
      </Suspense>

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Suspense fallback={<div className="min-h-screen" />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<div className="min-h-[50vh]" />}>
          <About />
        </Suspense>
        <Suspense fallback={<div className="min-h-[50vh]" />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<div className="min-h-[50vh]" />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<div className="min-h-[50vh]" />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<div className="min-h-[50vh]" />}>
          <Contact />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;