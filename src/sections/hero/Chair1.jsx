import React, { forwardRef, useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';
import { useThree } from '@react-three/fiber';
import { useMotionValueEvent } from "framer-motion";
import Chair from './Chair';

const Chair1 = forwardRef((props, ref) => {
    const {progress, isMobile, aspect, ...otherProps} = props; 
    const localRef = useRef();
  

    // Initial rotation based on device type
    const initialRotation = [0, 13 * Math.PI / 22, 0]

    // Device-specific position and scale
   
      const scale = useMemo(() => (isMobile ? 3 : 2.2), [isMobile]);
    

    const position = useMemo(() => {
        const x = isMobile
        ? aspect * 1.5
        : aspect * 0.8;


       const y = isMobile
            ? -4.2 
            : -2.7;
        const z = isMobile ? 0 : -0.3;

        return [x, y, z];
        }, [isMobile, aspect]);
       
// const position = useMemo(() => {
//   const width = viewport.width;
//   const height = viewport.height;
// //   const x = parseFloat((width * 0.4).toFixed(2));
//   const x = 3;
//   const y = -5;


// //   const y = isMobile ? parseFloat((-height * 0.7).toFixed(2)) : parseFloat((-height * 0.65).toFixed(2));
//   const z = isMobile ? 0 : -0.3;

//   return [x, y, z];
// }, [viewport.width, viewport.height, isMobile]);

 
// useEffect(() => {console.log(position)}), [position];

    // Rocking animation
    useFrame(({ clock }) => {
        if (localRef.current) {

            const time = clock.getElapsedTime();
            const amplitude = 0.06; // How far the chair rocks (in radians)
            const frequency = 1.6; // How fast the chair rocks
            const rockingAngle = Math.sin(time * frequency) * amplitude;

            localRef.current.rotation.x = initialRotation[0] - rockingAngle * Math.cos(Math.PI / 4); // 25% clockwise adjustment
            localRef.current.rotation.z = initialRotation[2] + rockingAngle * Math.sin(Math.PI / 4); // 25% clockwise adjustment

            // Maintain baseline Y rotation
            localRef.current.rotation.y = initialRotation[1];
        }
    });

    return (
        <Chair
            ref={(node) => {
                localRef.current = node; // Assign local ref
                if (ref) ref.current = node; // Pass to parent ref if provided
            }}
            modelPath="src/assets/chairs/rocking_chair.glb"
            scale={scale}
            position={position}
            rotation={initialRotation} // Initial rotation as baseline
        />
    );
});

export default Chair1;
