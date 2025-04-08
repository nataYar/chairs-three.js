import React, { forwardRef, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useThree, useFrame } from "@react-three/fiber";
import Chair from './Chair';

const Chair2 = forwardRef(({ progress }, ref) => {
    const localRef = useRef(); // Local ref for applying animation
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' }); // Mobile-first design
    const { viewport } = useThree();

    const rotation = [0.9, 25 * Math.PI / 18, 0.5]; // tilt, rotation, twist
    
    // Scaling and positioning based on device
    const scale = isMobile ? 5 : 5; 
    const position = [
        viewport.width * 0.9, // 90% of viewport width
        -viewport.height * -1, // 90% from the top
        -12
    ];

    // Ease-in function for smooth transition
    const easeIn = (start, end, t) => start + (end - start) * t * t;

    useFrame(() => {
        if (localRef.current) {
            const time = performance.now() / 1000;
            localRef.current.rotation.x = rotation[0] + Math.sin(time * 1.7) * 0.02;
            localRef.current.rotation.y = rotation[1] + Math.cos(time * 1.3) * 0.04;
            localRef.current.rotation.z = rotation[2] + Math.sin(time * 1.7) * 0.03;

            const moveSpeed = 1;
            let moveX = 0;
            let moveY = 0;

            if (progress.get() >= 0.3) {
                moveX = easeIn(0, (progress.get() - 0.1) * moveSpeed * 3, progress.get()); 
                moveY = easeIn(0, (progress.get() - 0.1) * moveSpeed * 1.8, progress.get()); 
            }

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
            modelPath="src/assets/chairs/chair_round.glb"
            scale={scale}
            position={position}
            rotation={rotation}
        />
    );
});

export default Chair2;
