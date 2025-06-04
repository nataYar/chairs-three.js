import React, { useRef, forwardRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useThree } from "@react-three/fiber";
import Chair from './Chair';

const Chair5 = forwardRef((props, ref) => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    
    const { viewport } = useThree();
    const cachedViewport = useRef({ width: viewport.width, height: viewport.height });
   
    const position = [
      cachedViewport.current.width * -0.37.toFixed(2),
      -cachedViewport.current.height * 0.7.toFixed(2),
      1
      ];
    
    const rotation = [0, 13 * Math.PI / 18, 0];
    const scale = isMobile ? 4.5 : 4.5; 

    return <Chair ref={ref}  modelPath="src/assets/chairs/chair_round.glb" scale={scale} position={position} rotation={rotation}/>;
})

export default Chair5

