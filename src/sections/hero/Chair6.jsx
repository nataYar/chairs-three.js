import React, { forwardRef, useRef, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useThree, useFrame } from "@react-three/fiber";
import Chair from './Chair';

const Chair6 = forwardRef((props, ref) => {
    const {progress, isMobile, aspect, ...otherProps} = props; 
    const localRef = useRef();

    const rotation = isMobile ? [0, Math.PI / 3, 0] : [0, Math.PI / 2.5, 0] // tilt, rotation, twist

    const scale = useMemo(() => (isMobile ? 3 : 3), [isMobile]);

   
    const initialPosition = useMemo(() => {
      const x = isMobile
        ? aspect * 5.2
        : aspect * 3.7
    
        // Y hardcoded for stability
      const y = isMobile
        ? -4.5 
        : -4.1;

      const z = isMobile
        ? -3.5 
        : -2;
      return [x, y, z];
    }, [isMobile, aspect]);

   
      //  const rotation = [0, isMobile ? 25 * Math.PI / 18 : Math.PI / 2, 0];

  //   const initialPosition = useMemo(() => {
  //   const x = isMobile 
  //     ? +(viewport.width * 0.8).toFixed(2) 
  //     : +(viewport.width * 0.25).toFixed(2);

  //   const y = +(-viewport.height * 0.75).toFixed(2);
  //   const z = isMobile ? -5 : -3;

  //   return [x, y, z];
  // }, [viewport.width, viewport.height, isMobile]);


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


    return <Chair ref={(node) => { localRef.current = node; if (ref) ref.current = node; }} 
    modelPath="/assets/chairs/victorian_chair.glb" scale={scale} position={initialPosition} rotation={rotation} />;
});

export default Chair6;
