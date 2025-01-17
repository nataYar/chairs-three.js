import React, { forwardRef, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useThree, useFrame } from "@react-three/fiber";
import Chair from './Chair';

const Chair3 = forwardRef((props, ref) => {
    const localRef = useRef(); // Local ref for animation
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' }); // Mobile-first design
    const { viewport } = useThree();

    // Initial rotation values
    const baseRotation = [0, 0, 0.4]; // Start with no rotation // tilt (x), rotation (y), twist (z)

    // Scaling and positioning based on device
    const scale = isMobile ? 0.03 : 0.05; // Adjust the size
    const position = isMobile
    ?  [viewport.width * -0.2,  -viewport.height * -0.3, -2 ]
    : [viewport.width * -0.1, -viewport.height * -0.2,  -2 ]

    
    // Add animation for rotation along the Y-axis
    useFrame(({ clock }) => {
        if (localRef.current) {
            const time = clock.getElapsedTime();
            const rotationSpeed = 0.05; // Speed of rotation
            const rotationAmplitude = 1; // Range of rotation
            localRef.current.rotation.y = baseRotation[1] + time * rotationSpeed;

            // Maintain initial X and Z rotations
            localRef.current.rotation.x = baseRotation[0]; // Keep initial X rotation
            localRef.current.rotation.z = baseRotation[2]; // Keep initial Z rotation
        }
    });

    return (
        <Chair
            ref={(node) => {
                localRef.current = node; // Assign local ref
                if (ref) ref.current = node; // Pass to parent ref if provided
            }}
            modelPath="src/assets/chairs/old_chair.glb"
            scale={scale}
            position={position}
            rotation={baseRotation} // Base rotation
        />
    );
});

export default Chair3;
