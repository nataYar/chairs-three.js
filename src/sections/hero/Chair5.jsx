import React, { useRef, forwardRef, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useThree } from "@react-three/fiber";
import Chair from './Chair';

const Chair5 = forwardRef((props, ref) => {
     const {progress, isMobile, aspect, ...otherProps} = props; 

    const scale = useMemo(() => (isMobile ? 4 : 2.7), [isMobile]);
 
 const position = useMemo(() => {
        const x = isMobile
        ? aspect * -2.2
        : aspect * -2.9;

       const y = isMobile
            ? -4.2 
            :  -3;
        const z = isMobile ? 2.3 : -1;

        return [x, y, z];
        }, [isMobile, aspect]);


    const rotation = [0, isMobile ? 25 * Math.PI / 19 : Math.PI/12, 0];
  

    return <Chair ref={ref}  modelPath="/assets/chairs/chair_round.glb" scale={scale} position={position} rotation={rotation}/>;
})

export default Chair5

