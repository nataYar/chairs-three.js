import React, { forwardRef, useRef, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useThree, useFrame } from "@react-three/fiber";
import Chair from './Chair';

const Chair2 = forwardRef(({ progress }, ref) => {
    const localRef = useRef(); // Local ref for applying animation
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' }); // Mobile-first design
      const { viewport } = useThree();
      const cachedViewport = useRef({ width: viewport.width, height: viewport.height });

    const rotation = [-3, 25 * Math.PI / 18, 0.5]; // tilt, rotation, twist
    
    // Scaling and positioning based on device
    const scale = isMobile ? 5 : 3.5; 
    const position = isMobile ? [
        cachedViewport.current.width * 0.5,
        -cachedViewport.current.height * -1.3,
        -12
        ] : [
        cachedViewport.current.width * 0.1,
        -cachedViewport.current.height * -0.7,
        -2
        ] ;
        
    // useEffect(() => {
    // const handleResize = () => {
    //     cachedViewport.current = {
    //     width: viewport.width,
    //     height: viewport.height,
    //     };
    // };
    // handleResize(); // update once on mount
    // window.addEventListener("resize", handleResize);
    // return () => window.removeEventListener("resize", handleResize);
    // }, [viewport]);


    // Ease-in function for smooth transition
    const easeIn = (start, end, t) => start + (end - start) * t * t;

   useFrame(() => {
    if (localRef.current) {
        const start = 0.3;
        const end = 1;

        if (progress.get() >= start && progress.get() <= end) {
            const raw = progress.get();
            const t = (raw - start) / (end - start); // normalized from 0 → 1

            const easedX = easeIn(0, 4.5, t);
            const easedY = easeIn(0, 1.8, t);
            const easedZ = easeIn(0, 2.0, t);

            localRef.current.position.x = position[0] + easedX;
            localRef.current.position.y = position[1] + easedY;
            localRef.current.position.z = position[2] + easedZ;
        } else if (progress.get() > end) {
            // Clamp to final positions after the scroll range
            localRef.current.position.x = position[0] + 4.5;
            localRef.current.position.y = position[1] + 1.8;
            localRef.current.position.z = position[2] + 2.0;
        } else {
            // Before animation starts — no shift
            localRef.current.position.x = position[0];
            localRef.current.position.y = position[1];
            localRef.current.position.z = position[2];
        }

        // const time = performance.now() / 1000;
        // localRef.current.rotation.x = rotation[0] + Math.sin(time * 1.7) * 0.02;
        // localRef.current.rotation.y = rotation[1] + Math.cos(time * 1.3) * 0.04;
        // localRef.current.rotation.z = rotation[2] + Math.sin(time * 1.7) * 0.03;

        // const moveSpeed = 1;
        // let moveX = 0;
        // let moveY = 0;
        // let moveZ = 0;

        // if (progress.get() >= 0.3) {
        //     moveX = easeIn(0, (progress.get() - 0.1) * moveSpeed * 4.5, progress.get() * 1.2); 
        //     moveY = easeIn(0, (progress.get() - 0.1) * moveSpeed * 1.8, progress.get()); 
        //     moveZ = easeIn(0, (progress.get() - 0.1) * moveSpeed * 2.0, progress.get()); 
        // }

        // localRef.current.position.x = position[0] + moveX;
        // localRef.current.position.y = position[1] + moveY;
        // localRef.current.position.z = position[2] + moveZ;
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
