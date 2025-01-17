import React, { forwardRef, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useThree, useFrame } from "@react-three/fiber";
import Chair from './Chair';

const HeroChair = forwardRef((props, ref) => {
    const { progress, heroChairRef, ...otherProps } = props;

    const localRef = useRef(); 
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' }); 
    const { viewport } = useThree();

    const rotation = [0.4, 0.3, 0.1]; 
    const scale = isMobile ? 0.08 : 0.2; 

    const initialPosition = isMobile
        ? [ viewport.width * 0.5, -viewport.height * -3, -25 ]
        : [ viewport.width * 0, -viewport.height * -4.3, -35 ];

    const finalPosition = isMobile
        ? [ viewport.width * 0.12, -viewport.height * -0.6, -10 ]
        : [ viewport.width * 0, -viewport.height * -4.3, -35 ];

        useFrame(({ clock }) => {
            const easeInOutCubic = (t) =>
                t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            
            const progressForChair = Math.max(0, Math.min(1, (progress - 0.5) / 0.5));
            const easedProgress = easeInOutCubic(progressForChair);
            if (localRef.current) {
                const time = clock.getElapsedTime();
                localRef.current.rotation.x = rotation[0] + Math.sin(time * 1.2) * 0.02;
                localRef.current.rotation.y = rotation[1] + Math.cos(time * 1.1) * 0.02;
                localRef.current.rotation.z = rotation[2] + Math.sin(time * 1.5) * 0.02;
            }
        
            if (heroChairRef.current) {
                // Adjust the start and end of the animation
                const progressForChair = Math.max(0, Math.min(1, (progress - 0.5) / 0.5));
                // Apply easing
                const easedProgress = easeInOutCubic(progressForChair);
        
                // Interpolate the position smoothly
                heroChairRef.current.position.x =
                    initialPosition[0] + (finalPosition[0] - initialPosition[0]) * easedProgress;
                heroChairRef.current.position.y =
                    initialPosition[1] + (finalPosition[1] - initialPosition[1]) * easedProgress;
                heroChairRef.current.position.z =
                    initialPosition[2] + (finalPosition[2] - initialPosition[2]) * easedProgress;
            }
        });
        

    
    useFrame(({ clock }) => {
        if (localRef.current) {
            const time = (clock.getElapsedTime() - 5) * 0.7; // Start earlier and slow down

            localRef.current.rotation.x = rotation[0] + Math.sin(time * 1.2) * 0.02;
            localRef.current.rotation.y = rotation[1] + Math.cos(time * 1.1) * 0.02;
            localRef.current.rotation.z = rotation[2] + Math.sin(time * 1.5) * 0.02;
        }
    });

    return <Chair 
        ref={(node) => {
            localRef.current = node; 
            if (ref) ref.current = node; 
        }} 
        modelPath="src/assets/chairs/office_chair.glb" 
        scale={scale} 
        position={initialPosition} 
        rotation={rotation}
        castShadow={false}
    />;
})

export default HeroChair;