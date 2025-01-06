import React, { forwardRef, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';
import { useThree } from '@react-three/fiber';
import Chair from './Chair';

const Chair1 = forwardRef((props, ref) => {
    const localRef = useRef();
    const { viewport } = useThree();
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    // Initial rotation based on device type
    const initialRotation = isMobile
        ? [0, 13 * Math.PI / 18, 0]
        : [0, -Math.PI / 3, 0];

    // Device-specific position and scale
    const scale = isMobile ? 3 : 3;
    const position = isMobile
        ? [viewport.width * 0.4, -viewport.height * 0.7, 0]
        : [viewport.width * 0.3, -viewport.height * 0.4, 0];

    // Rocking animation
    useFrame(({ clock }) => {
        if (localRef.current) {
            const time = clock.getElapsedTime();
            const amplitude = 0.06; // How far the chair rocks (in radians)
            const frequency = 1.6; // How fast the chair rocks

           
            const rockingAngle = Math.sin(time * frequency) * amplitude;

            localRef.current.rotation.x = initialRotation[0] - rockingAngle * Math.cos(Math.PI / 4); // 25% clockwise adjustment
            localRef.current.rotation.z = initialRotation[2] + rockingAngle * Math.sin(Math.PI / 4); // 25% clockwise adjustment

            // Maintain baseline Y rotation
            localRef.current.rotation.y = initialRotation[1];
        }
    });

    return (
        <Chair
            ref={(node) => {
                localRef.current = node; // Assign local ref
                if (ref) ref.current = node; // Pass to parent ref if provided
            }}
            modelPath="src/assets/rocking_chair.glb"
            scale={scale}
            position={position}
            rotation={initialRotation} // Initial rotation as baseline
        />
    );
});

export default Chair1;
