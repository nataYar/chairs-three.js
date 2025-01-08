import React, { forwardRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useThree } from "@react-three/fiber";
import Chair from './Chair';

const Chair5 = forwardRef((props, ref) => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const { viewport } = useThree();

    const rotation = [0, 13 * Math.PI / 18, 0];
    const scale = isMobile ? 4.5 : 4.5; 
    const position = isMobile
    ?  [ viewport.width * -0.37, 
        -viewport.height * 0.7, 
        1]
    : [viewport.width * -0.37, 
        -viewport.height * 0.7, 
        1 ]

    return <Chair ref={ref}  modelPath="src/assets/chair_round.glb" scale={scale} position={position} rotation={rotation}/>;
})

export default Chair5

