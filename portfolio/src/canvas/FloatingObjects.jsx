import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

const FloatingObject = ({ position, geometry, color, speed = 1, distort = 0.3, scale = 1 }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.elapsedTime;
        meshRef.current.rotation.x = Math.sin(time * speed * 0.5) * 0.3;
        meshRef.current.rotation.z = Math.cos(time * speed * 0.3) * 0.2;
    });

    return (
        <Float speed={speed * 2} rotationIntensity={0.5} floatIntensity={1.5}>
            <mesh ref={meshRef} position={position} scale={scale}>
                {geometry === 'icosahedron' && <icosahedronGeometry args={[1, 1]} />}
                {geometry === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
                {geometry === 'torus' && <torusGeometry args={[1, 0.3, 16, 32]} />}
                {geometry === 'torusKnot' && <torusKnotGeometry args={[0.8, 0.25, 100, 16]} />}
                {geometry === 'dodecahedron' && <dodecahedronGeometry args={[1, 0]} />}
                <MeshDistortMaterial
                    color={color}
                    transparent
                    opacity={0.15}
                    wireframe
                    distort={distort}
                    speed={speed}
                    roughness={0}
                />
            </mesh>
        </Float>
    );
};

const FloatingObjects = () => {
    const objects = useMemo(() => [
        { position: [-8, 4, -10], geometry: 'icosahedron', color: '#00f0ff', speed: 0.8, distort: 0.4, scale: 2 },
        { position: [10, -3, -15], geometry: 'octahedron', color: '#bf5af2', speed: 1.2, distort: 0.3, scale: 2.5 },
        { position: [-12, -5, -8], geometry: 'torus', color: '#0a84ff', speed: 0.6, distort: 0.2, scale: 1.5 },
        { position: [6, 6, -12], geometry: 'torusKnot', color: '#5e5ce6', speed: 1, distort: 0.5, scale: 1.2 },
        { position: [14, 2, -20], geometry: 'dodecahedron', color: '#64d2ff', speed: 0.9, distort: 0.3, scale: 1.8 },
        { position: [-6, -7, -18], geometry: 'icosahedron', color: '#ff2d55', speed: 0.7, distort: 0.4, scale: 1.3 },
    ], []);

    return (
        <group>
            {objects.map((obj, i) => (
                <FloatingObject key={i} {...obj} />
            ))}
        </group>
    );
};

export default FloatingObjects;
