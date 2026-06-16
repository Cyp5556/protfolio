import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import ParticleField from './ParticleField';
import FloatingObjects from './FloatingObjects';
import Stars from './Stars';

// Camera rig that follows mouse
const CameraRig = () => {
    const { camera } = useThree();
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame(() => {
        camera.position.x += (mouse.current.x * 3 - camera.position.x) * 0.02;
        camera.position.y += (mouse.current.y * 2 - camera.position.y) * 0.02;
        camera.lookAt(0, 0, 0);
    });

    return null;
};

const Scene = ({ className = '' }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [dpr, setDpr] = useState(1.5);

    useEffect(() => {
        const checkDevice = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            setDpr(mobile ? 1 : Math.min(window.devicePixelRatio, 2));
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    return (
        <div className={`fixed inset-0 -z-10 ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 30], fov: 60, near: 0.1, far: 200 }}
                dpr={dpr}
                gl={{
                    antialias: !isMobile,
                    alpha: true,
                    powerPreference: 'high-performance',
                    stencil: false,
                    depth: false,
                }}
                style={{ background: 'transparent' }}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.2} />
                    <pointLight position={[10, 10, 10]} intensity={0.3} color="#00f0ff" />
                    <pointLight position={[-10, -10, -10]} intensity={0.2} color="#bf5af2" />

                    <Stars count={isMobile ? 1000 : 3000} />
                    <ParticleField count={isMobile ? 500 : 1500} size={isMobile ? 1 : 1.5} />
                    {!isMobile && <FloatingObjects />}

                    <CameraRig />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Scene;
