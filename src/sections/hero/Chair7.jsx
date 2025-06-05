import React, { forwardRef, useRef, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useThree, useFrame } from "@react-three/fiber";
import Chair from './Chair';

const Chair7 = forwardRef((props, ref) => {
    const localRef = useRef(); // Local ref for applying animation
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' }); 
      const { viewport } = useThree();
      const cachedViewport = useRef({ width: viewport.width, height: viewport.height });

    const rotation = [-1.3, -25 * Math.PI / 18, -0.6]; // tilt, rotation, twist
    
    const scale = isMobile ? 1 : 1.5; 
    const position = isMobile ?  [ cachedViewport.current.width.toFixed(2) * 0.9, -cachedViewport.current.height.toFixed(2) * -0.3, -7
    ] : 
     [ cachedViewport.current.width.toFixed(2) * 0.9, -cachedViewport.current.height.toFixed(2) * -0.3, -7
    ];

    // useEffect(() => {
    //     const handleResize = () => {
    //         cachedViewport.current = {
    //         width: viewport.width,
    //         height: viewport.height,
    //         };
    //     };
    //     handleResize(); // update once on mount
    //     window.addEventListener("resize", handleResize);
    //     return () => window.removeEventListener("resize", handleResize);
    //     }, [viewport]);


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
            moveX = easeIn(0, (p - 0.1) * moveSpeed * 5, p); 

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
            modelPath="src/assets/chairs/chair_thin.glb"
            scale={scale}
            position={position}
            rotation={rotation} 
        />
    );
});

export default Chair7;
