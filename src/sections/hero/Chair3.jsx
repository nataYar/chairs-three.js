import React, { forwardRef, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useThree, useFrame } from "@react-three/fiber";
import { motion } from 'framer-motion';

import Chair from './Chair';

const Chair3 = forwardRef(({ progress }, ref) => {
    const localRef = useRef(); // Local ref for animation
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' }); // Mobile-first design
      const { viewport } = useThree();
      const cachedViewport = useRef({ width: viewport.width, height: viewport.height });
    
    // Initial rotation values
    const baseRotation = [0, 0, 0.4]; // Start with no rotation (tilt (x), rotation (y), twist (z))

    // Scaling and positioning based on device
    const scale = isMobile ? 0.03 : 0.05; // Adjust the size
    const position = isMobile
  ? [
      +(cachedViewport.current.width * -0.3).toFixed(2),
      +(cachedViewport.current.height * 0).toFixed(2),
      -2
    ]
  : [
      +(cachedViewport.current.width * -0.1).toFixed(2),
      +(cachedViewport.current.height * -0.2).toFixed(2),
      -2
    ];


    // Add animation for rotation along the Y-axis
    useFrame(({ clock }) => {
        if (localRef.current) {
            const time = clock.getElapsedTime();
            const rotationSpeed = 0.05; // Speed of rotation
            localRef.current.rotation.y = baseRotation[1] + time * rotationSpeed;

            // Maintain initial X and Z rotations
            localRef.current.rotation.x = baseRotation[0]; // Keep initial X rotation
            localRef.current.rotation.z = baseRotation[2]; // Keep initial Z rotation

            const easeIn = (start, end, t) => start + (end - start) * t * t;

            // Calculate movement based on scroll progress
            const moveSpeed = 1; // Speed of movement per unit of progress
            let moveX = 0;
            let moveY = 0;

            if (progress.get() >= 0.1) {
                moveX = easeIn(0, (progress.get() - 0.1) * moveSpeed * -1, progress.get() * 1.75); 
                moveY = easeIn(0, (progress.get() - 0.1) * moveSpeed * -1.5, progress.get() * 1.3);
            }
            localRef.current.position.x = position[0] + moveX;
            localRef.current.position.y = position[1] - moveY;
        }
    });

    

    // Apply the motion for smooth transition using spring
    return (
            <Chair
                ref={(node) => {
                    localRef.current = node; // Assign local ref
                    if (ref) ref.current = node; // Pass to parent ref if provided
                }}
                modelPath="src/assets/chairs/old_chair.glb"
                scale={scale}
                position={position} 
                rotation={baseRotation} // Keep base rotation for smooth animation
                // animate={{
                //     position: [position[0] + moveX, position[1] + moveY, position[2]], // Apply animated position
                // }}
                // transition={springConfig} 
            />
    );
});

export default Chair3;
