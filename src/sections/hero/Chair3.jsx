import React, { forwardRef, useRef, useEffect, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useThree, useFrame } from "@react-three/fiber";
import { motion } from 'framer-motion';

import Chair from './Chair';

const Chair3 = forwardRef((props, ref) => {
    const {progress, isMobile, aspect, ...otherProps} = props; 
    const localRef = useRef(); // Local ref for animation
   
    // Initial rotation values
    const baseRotation = [0.2, 0, 0.5]; // Start with no rotation (tilt (x), rotation (y), twist (z))

    // Scaling and positioning based on device
    const scale = isMobile ? 0.05 : 0.05; // Adjust the size

    const position = useMemo(() => {
            const x = isMobile
            ? -aspect * 5
            : -aspect * 3.5;
    
    
           const y = isMobile
                ? 2.2 
                : 4;
            const z = isMobile ? -8 : -9;
    
            return [x, y, z];
            }, [isMobile, aspect]);
  
    // Add animation for rotation along the Y-axis
    useFrame(({ clock }) => {
    if (localRef.current) {
        const time = clock.getElapsedTime();
        const rotationSpeed = 0.05;

        // Continuous Y rotation
        localRef.current.rotation.y = baseRotation[1] + time * rotationSpeed;

        // Keep original tilt
        localRef.current.rotation.x = baseRotation[0];
        localRef.current.rotation.z = baseRotation[2];

        // Scroll-based movement
        const easeIn = (start, end, t) => start + (end - start) * t * t;
        const moveSpeed = 1;

        let moveX = 0;
        let moveY = 0;
        let moveZ = 0;

        const p = progress.get();

        if (p >= 0.1) {
            // More dramatic X and Z shifts
            moveX = easeIn(0, (p - 0.1) * moveSpeed * -1.5, p * 1.2);   // Farther left
            moveY = easeIn(0, (p - 0.1) * moveSpeed * -1.5, p * 1.3);    // Upward
           moveZ = easeIn(0, 4, p * 1.3);
        } else if (p >= 0.7) {
            moveY = easeIn(0, 1.5, p); 
        }

        localRef.current.position.x = position[0] + moveX;
        localRef.current.position.y = position[1] - moveY;
        localRef.current.position.z = position[2] + moveZ; 
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
