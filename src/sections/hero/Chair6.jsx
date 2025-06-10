import React, { forwardRef, useRef, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useThree, useFrame } from "@react-three/fiber";
import Chair from './Chair';

const Chair6 = forwardRef(({ progress }, ref) => {
    const localRef = useRef();
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' }); 
      const { viewport } = useThree();
     

    const rotation = isMobile ? [0, Math.PI / 3, 0] : [0, Math.PI / 4, 0] // tilt, rotation, twist
    const scale = useMemo(() => (isMobile ? 3.3 : 3.4), [isMobile]);

    // Initial position values (X, Y, Z)
  const initialPosition = useMemo(() => {
    const x = isMobile 
      ? +(viewport.width * 0.8).toFixed(2) 
      : +(viewport.width * 0.25).toFixed(2);

    const y = +(-viewport.height * 0.75).toFixed(2);
    const z = isMobile ? -5 : -3;

    return [x, y, z];
  }, [viewport.width, viewport.height, isMobile]);


    // Use scroll progress to animate the X position (moving right and towards the viewer)
    useFrame(() => {
    if (localRef.current) {
        const p = progress.get();

        // Move right on X and toward viewer on Z
        const moveX = p * 0.1;         // Adjust as needed
        const moveZ = p * 3;           // Positive Z = toward viewer

        localRef.current.position.x = initialPosition[0] + moveX;
        localRef.current.position.z = initialPosition[2] + moveZ;
    }
});


    return <Chair ref={(node) => { localRef.current = node; if (ref) ref.current = node; }} modelPath="src/assets/chairs/victorian_chair.glb" scale={scale} position={initialPosition} rotation={rotation} />;
});

export default Chair6;
