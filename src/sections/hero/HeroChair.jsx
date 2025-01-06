import React, { forwardRef, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useThree, useFrame } from "@react-three/fiber";
import Chair from './Chair';

const HeroChair = forwardRef((props, ref)  => {
    const localRef = useRef(); // Local ref for applying animation
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' }); // Mobile-first design
    const { viewport } = useThree();

    const rotation = [0.1, 0.2, 0.7]; // tilt, rotation, twist

    const scale = isMobile ? 0.08 : 0.2; 

    const position = isMobile
    ?  [ viewport.width * 2, 
        -viewport.height * -4.5, 
        -35]
    : [viewport.width * 0, 
        -viewport.height * -4.3, 
        -35]

    useFrame(({ clock }) => {
            if (localRef.current) {
                const time = clock.getElapsedTime();

                localRef.current.rotation.x = rotation[0] + Math.sin(time * 1.2) * 0.06; 
                localRef.current.rotation.y = rotation[1] + Math.cos(time * 1.1) * 0.08; 
                localRef.current.rotation.z = rotation[2] + Math.sin(time * 1.5) * 0.06; 
            }
        });

    return <Chair 
    ref={(node) => {
        localRef.current = node; 
        if (ref) ref.current = node; 
    }} 
    modelPath="src/assets/office_chair.glb" 
    scale={scale} position={position} rotation={rotation}
    castShadow={false}/>
    ;
})

export default HeroChair