import React, { forwardRef, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useThree, useFrame } from "@react-three/fiber";
import Chair from './Chair';

const Chair7 = forwardRef((props, ref) => {
    const localRef = useRef(); // Local ref for applying animation
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' }); 
    const { viewport } = useThree();

    const rotation = [-1.3, -25 * Math.PI / 18, -0.6]; // tilt, rotation, twist
    
    const scale = isMobile ? 1 : 1; 
    const position = [
        viewport.width * 0.9,
        -viewport.height * -0.3, 
        -7
    ];

    // Unpredictable rotation animation
    useFrame(({ clock }) => {
        if (localRef.current) {
            const time = clock.getElapsedTime();

            localRef.current.rotation.x = rotation[0] + Math.sin(time * 1.2) * 0.02; 
            localRef.current.rotation.y = rotation[1] + Math.cos(time * 1.1) * 0.04; 
            localRef.current.rotation.z = rotation[2] + Math.sin(time * 1.5) * 0.03; 
        }
    });

    return (
        <Chair
            ref={(node) => {
                localRef.current = node; 
                if (ref) ref.current = node; 
            }}
            modelPath="src/assets/chair_thin.glb"
            scale={scale}
            position={position}
            rotation={rotation} 
        />
    );
});

export default Chair7;
