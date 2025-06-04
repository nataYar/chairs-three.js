import React, { forwardRef, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useThree, useFrame } from "@react-three/fiber";
import Chair from './Chair';

const Chair6 = forwardRef(({ progress }, ref) => {
    const localRef = useRef();
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' }); 
      const { viewport } = useThree();
      const cachedViewport = useRef({ width: viewport.width, height: viewport.height });

    const rotation = [0, Math.PI / 3, 0]; // tilt, rotation, twist
    const scale = isMobile ? 3.3 : 3.5; // Adjust the size

    // Initial position values (X, Y, Z)
    const initialPosition = [
      +(cachedViewport.current.width * 0.8).toFixed(2),
      +(-cachedViewport.current.height * 0.75).toFixed(2),
      -5
    ];


    // Use scroll progress to animate the X position (moving right)
    useFrame(() => {
        if (localRef.current) {
            const moveX = (progress.get() * viewport.width * 0.5); 
            localRef.current.position.x = initialPosition[0] + moveX;
        }
    });

    return <Chair ref={(node) => { localRef.current = node; if (ref) ref.current = node; }} modelPath="src/assets/chairs/victorian_chair.glb" scale={scale} position={initialPosition} rotation={rotation} />;
});

export default Chair6;
