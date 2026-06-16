import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleField = ({ count = 2000, spread = 80, size = 1.5 }) => {
    const meshRef = useRef();
    const lightRef = useRef();

    const [positions, colors, sizes] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        const colorPalette = [
            new THREE.Color('#00f0ff'),
            new THREE.Color('#bf5af2'),
            new THREE.Color('#0a84ff'),
            new THREE.Color('#5e5ce6'),
            new THREE.Color('#64d2ff'),
        ];

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Distribute in a sphere-like shape
            const radius = Math.random() * spread;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);

            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            sizes[i] = Math.random() * size + 0.5;
        }

        return [positions, colors, sizes];
    }, [count, spread, size]);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.elapsedTime;

        meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
        meshRef.current.rotation.y = time * 0.05;

        // Subtle floating effect on positions
        const positionAttr = meshRef.current.geometry.attributes.position;
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const originalY = positions[i3 + 1];
            positionAttr.array[i3 + 1] = originalY + Math.sin(time + i * 0.1) * 0.3;
        }
        positionAttr.needsUpdate = true;
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={count}
                    array={sizes}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial
                size={size}
                vertexColors
                transparent
                opacity={0.7}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                sizeAttenuation
            />
        </points>
    );
};

export default ParticleField;
