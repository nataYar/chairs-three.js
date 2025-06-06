import React, { forwardRef, useRef, useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useThree, useFrame } from "@react-three/fiber";
import Chair from './Chair';

const Chair4 = forwardRef((props, ref) => {
    const localRef = useRef(); // Local ref for animation
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
      const { viewport } = useThree();
      const cachedViewport = useRef({ width: viewport.width, height: viewport.height });

    // Initial rotation values
    const baseRotation = [0, 5 * Math.PI / 6, 0]; // tilt, rotation, twist

    // Scaling and positioning based on device
    const scale = isMobile ? 1 : 1; // Adjust the size
    const position =  isMobile ? [
    +(cachedViewport.current.width * -0.5).toFixed(2),
    +(-cachedViewport.current.height * 0.55).toFixed(2),
    -3
    ] : 
    [+(cachedViewport.current.width * -0.3).toFixed(2),
    +(-cachedViewport.current.height * 0.5).toFixed(2),
    -3]
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
            modelPath="src/assets/chairs/chair_thin.glb"
            scale={scale}
            position={position}
            rotation={baseRotation} // Base rotation
        />
    );
});

export default Chair4;