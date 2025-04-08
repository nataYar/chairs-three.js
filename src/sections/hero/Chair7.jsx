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
    const position = isMobile ? [viewport.width * 0.9, -viewport.height * -0.3, -7 ] : [ viewport.width * 0.9, -viewport.height * -0.3, -7 ];

    // Ease-in function for smooth transition
    const easeIn = (start, end, t) => start + (end - start) * t * t;

    useFrame(({ clock }) => {
        if (localRef.current) {
            const time = clock.getElapsedTime();

            // Unpredictable rotation animation
            localRef.current.rotation.x = rotation[0] + Math.sin(time * 1.7) * 0.02; 
            localRef.current.rotation.y = rotation[1] + Math.cos(time * 1.3) * 0.04; 
            localRef.current.rotation.z = rotation[2] + Math.sin(time * 1.7) * 0.03; 

            // Flying effect (right and slightly up)
            const moveSpeed = 1;
            let moveX = 0;
            let moveY = 0;

            const progress = props.progress || { get: () => 0.5 };
            if (progress.get() >= 0.1) {
                moveX = easeIn(0, (progress.get() - 0.1) * moveSpeed * 3.5, progress.get()); 
                moveY = easeIn(0, (progress.get() - 0.1) * moveSpeed * 1.5, progress.get()); 
            }

            // Apply the flying movement
            localRef.current.position.x = position[0] + moveX;
            localRef.current.position.y = position[1] + moveY;
        }
    });

    return (
        <Chair
            ref={(node) => {
                localRef.current = node; 
                if (ref) ref.current = node; 
            }}
            modelPath="src/assets/chairs/chair_thin.glb"
            scale={scale}
            position={position}
            rotation={rotation} 
        />
    );
});

export default Chair7;
