import React, { forwardRef, useRef, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useThree, useFrame } from "@react-three/fiber";
import Chair from './Chair';

const Chair7 = forwardRef((props, ref) => {
    const {progress, isMobile, aspect, ...otherProps} = props; 
    const localRef = useRef();
   
    const rotation = [-1.3, -25 * Math.PI / 18, -0.6]; // tilt, rotation, twist
    
    const scale = useMemo(() => (isMobile ? 1 : 1), [isMobile]);


     const position = useMemo(() => {
        const x = isMobile
        ? aspect * 6.5
        : aspect * 4.5


        const y = isMobile
            ? 2.8 
            : 3 
        const z = isMobile ? -7 : -7;

        return [x, y, z];
    }, [isMobile, aspect]);

    // Ease-in function for smooth transition
    const easeIn = (start, end, t) => start + (end - start) * t * t;

    useFrame(({ clock }) => {
    if (localRef.current) {
        const time = clock.getElapsedTime();

        // Subtle unpredictable rotation
        localRef.current.rotation.x = rotation[0] + Math.sin(time * 1.7) * 0.02;
        localRef.current.rotation.y = rotation[1] + Math.cos(time * 1.3) * 0.04;
        localRef.current.rotation.z = rotation[2] + Math.sin(time * 1.7) * 0.03;

        const moveSpeed = 1;
        let moveX = 0;
        let moveY = 0;
        let moveZ = 0;

        const progress = props.progress || { get: () => 0.5 };
        if (progress.get() >= 0.1) {
            const p = progress.get();

            // More exaggerated X movement
            moveX = easeIn(0, (p - 0.1) * moveSpeed * 15, p); 

            // Slightly less Y
            moveY = easeIn(0, (p - 0.1) * moveSpeed * 1.5, p);

            // Move forward toward viewer on Z axis
            moveZ = easeIn(0, (p - 0.1) * moveSpeed * 3, p);
        }

        localRef.current.position.x = position[0] + moveX;
        localRef.current.position.y = position[1] + moveY;
        localRef.current.position.z = position[2] + moveZ; // 👈 New movement toward viewer
    }
});


    return (
        <Chair
            ref={(node) => {
                localRef.current = node; 
                if (ref) ref.current = node; 
            }}
            modelPath="/assets/chairs/chair_thin.glb"
            scale={scale}
            position={position}
            rotation={rotation} 
        />
    );
});

export default Chair7;
