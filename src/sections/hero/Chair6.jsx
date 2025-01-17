import React, { forwardRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useThree } from "@react-three/fiber";
import Chair from './Chair';

const Chair6 = forwardRef((props, ref) => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' }); 
    const { viewport } = useThree();

    const rotation = [0, Math.PI / 3, 0]; // tilt, rotation, twist
    const scale = isMobile ? 3.3 : 3.5; // Adjust the size
    const position = [
        viewport.width * 0.8, 
            -viewport.height * 0.75, 
            -5,
        ];
       
    return <Chair ref={ref}  modelPath="src/assets/chairs/victorian_chair.glb" scale={scale} position={position} rotation={rotation}/>;
})

export default Chair6