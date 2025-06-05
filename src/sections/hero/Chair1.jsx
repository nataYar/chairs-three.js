import React, { forwardRef, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';
import { useThree } from '@react-three/fiber';
import { useMotionValueEvent } from "framer-motion";
import Chair from './Chair';

const Chair1 = forwardRef((props, ref) => {
    const {progress, ...otherProps} = props; 
    const localRef = useRef();
      const { viewport } = useThree();
      const cachedViewport = useRef({ width: viewport.width, height: viewport.height });
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    // Initial rotation based on device type
    const initialRotation = [0, 13 * Math.PI / 22, 0]

//      useEffect(() => {
//   const handleResize = () => {
//     cachedViewport.current = {
//       width: viewport.width,
//       height: viewport.height,
//     };
//   };
//   handleResize(); // update once on mount
//   window.addEventListener("resize", handleResize);
//   return () => window.removeEventListener("resize", handleResize);
// }, [viewport]);



    // Device-specific position and scale
    const scale = isMobile ? 3 : 3;
    // console.log("Viewport:", viewport); 

    const position = isMobile ? [cachedViewport.current.width  * 0.4, -cachedViewport.current.height  * 0.7, 0] : [cachedViewport.current.width  * 0.4, -cachedViewport.current.height  * 0.65, -.3];
       

    // const position = isMobile
    //     ? [cachedViewport.current.width  * 0.4, -cachedViewport.current.height  * 0.7, 0]
    //     : [cachedViewport.current.width  * 0.3, -cachedViewport.current.height  * 0.4, 0];


        // useEffect(() => {
        //     if (!initialized.current && localRef.current) {
        //         console.log("Setting initial position for chair:", index, position); // Debugging
        //         setInitialPosition(index, position); // Use index to update the parent
        //         initialized.current = true; // Mark as initialized
        //     }
        // }, [index, position, setInitialPosition]);

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
