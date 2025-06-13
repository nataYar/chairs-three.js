import React, { forwardRef, useRef, useState, useEffect, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useThree, useFrame } from "@react-three/fiber";
import Chair from './Chair';

const Chair4 = forwardRef((props, ref) => {
    const {isMobile, aspect, ...otherProps} = props; // Destructure isMobile and aspect from props
    const localRef = useRef(); // Local ref for animation
  

    // Initial rotation values
    const baseRotation = [0, 5 * Math.PI / 6, 0]; // tilt, rotation, twist

// Inside your component

// const scale = useMemo(() => 1, []); 

 const scale = useMemo(() => (isMobile ? 1 : 1.1), [isMobile]);

// const position = useMemo(() => {
//   const width = viewport.width;
//   const height = viewport.height;

//   const x = isMobile 
//     ? +(width * -0.5).toFixed(2) 
//     : +(width * -0.3).toFixed(2);

//   const y = isMobile 
//     ? +(-height * 0.55).toFixed(2) 
//     : +(-height * 0.5).toFixed(2);

//   const z = -3;

//   return [x, y, z];
// }, [viewport.width, viewport.height, isMobile]);



const position = useMemo(() => {
  const x = isMobile
    ? -aspect * 4.8
    : -aspect * 1.7;

    // Y hardcoded for stability
  const y = isMobile
    ? -3.2 
    :  -3.3;;
  const z = -3;
  return [x, y, z];
}, [isMobile, aspect]);


// useEffect(() => {
//   console.log("aspect", aspect);
// }, [aspect]);

// useEffect(() => {
//     console.log(`chair4 ${position}`);
// }, [position]);

    // State to control shaking
    const [isShaking, setIsShaking] = useState(false);

    // Add occasional rapid side-to-side shaking
    useFrame(({ clock }) => {
        if (localRef.current) {
            const time = clock.getElapsedTime();

            // Occasional shaking (1% chance per frame)
            if (!isShaking && Math.random() < 0.01) {
                setIsShaking(true); // Start shaking
                const shakeDuration = Math.random() * 2000 + 1000; // 1000ms to 4000ms
                setTimeout(() => setIsShaking(false), shakeDuration);// Stop shaking after 500ms
            }

            // Apply rapid side-to-side shaking
            if (isShaking) {

                const shakeFrequency = 25; // How fast the chair shakes
                const shakeAmplitude =  0.01;; // How far the chair shakes

                // Apply shaking to the Y-axis rotation
                localRef.current.rotation.y = baseRotation[1] + Math.sin(time * shakeFrequency) * shakeAmplitude;
            } else {
                // Reset to base rotation when not shaking
                localRef.current.rotation.y = baseRotation[1];
            }
        }
    });

    return (
        <Chair
            ref={(node) => {
                localRef.current = node; // Assign local ref
                if (ref) ref.current = node; // Pass to parent ref if provided
            }}
            modelPath="/assets/chairs/chair_thin.glb"
            scale={scale}
            position={position}
            rotation={baseRotation} // Base rotation
        />
    );
});

export default Chair4;