import React, { useRef, forwardRef, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useThree } from "@react-three/fiber";
import Chair from './Chair';

const Chair5 = forwardRef((props, ref) => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    
    const { viewport } = useThree();


   const scale = useMemo(() => 4.5, []); // constant, no need for dependencies

const position = useMemo(() => {
  const x = +(viewport.width * -0.37).toFixed(2);
  const y = +(-viewport.height * 0.7).toFixed(2);
  const z = 1;

  return [x, y, z];
}, [viewport.width, viewport.height]);
    
    const rotation = [0, 13 * Math.PI / 18, 0];
  

    return <Chair ref={ref}  modelPath="src/assets/chairs/chair_round.glb" scale={scale} position={position} rotation={rotation}/>;
})

export default Chair5

