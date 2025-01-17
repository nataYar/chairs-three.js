import React, { forwardRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useThree } from "@react-three/fiber";
import Chair from './Chair';

const Chair2 = forwardRef((props, ref) => {
    
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' }); // Mobile-first design
    const { viewport } = useThree();

    const rotation = [0.9, 25 * Math.PI / 18, 0.5]; // tilt, rotation, twist
    
    // Scaling and positioning based on device
    const scale = isMobile ? 5 : 5; // Adjust the size
    const position = [
        viewport.width * 0.9, // 60% of viewport width
        -viewport.height * -1, // 90% from the top
        -12
    ];
    

    return <Chair ref={ref} modelPath="src/assets/chairs/chair_round.glb" scale={scale} position={position} rotation={rotation}/>;
})

export default Chair2