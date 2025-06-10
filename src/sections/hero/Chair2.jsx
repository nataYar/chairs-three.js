import React, { forwardRef, useRef, useEffect, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useThree, useFrame } from "@react-three/fiber";
import Chair from './Chair';

const Chair2 = forwardRef(({ progress }, ref) => {
    const localRef = useRef(); // Local ref for applying animation
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' }); // Mobile-first design
    const { viewport } = useThree();
     

    const rotation = [-3, 25 * Math.PI / 18, 0.5]; // tilt, rotation, twist
    
    // Scaling and positioning based on device
    const scale = useMemo(() => (isMobile ? 5 : 3.5), [isMobile]);
    
    //   const position = useMemo(() => {
    //     const x = isMobile 
    //         ? +(viewport.width * 0.5).toFixed(2) 
    //         : +(viewport.width * 0.1).toFixed(2);
    //     const y = isMobile 
    //         ? +(viewport.height * -1.3).toFixed(2) 
    //         : +(-viewport.height *  -0.7).toFixed(2); 
    //     const z = isMobile ? -12 : -2;

    //     return [x, y, z];
    //     }, [viewport.width, viewport.height, isMobile]);

const position = useMemo(() => {
  const width = viewport.width;
  const height = viewport.height;
  const x = isMobile ? parseFloat((width * 0.5).toFixed(2)) : parseFloat((width * 0.1).toFixed(2));

  const y = isMobile
    ? parseFloat((height * 1.3).toFixed(2))
    : parseFloat((height *  0.7).toFixed(2));
  const z = isMobile ? -12 : -2;
  return [x, y, z];
}, [viewport.width, viewport.height, isMobile]);

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


    // Ease-in function for smooth transition
    const easeIn = (start, end, t) => start + (end - start) * t * t;

   useFrame(() => {
    if (localRef.current) {
        const start = 0.3;
        const end = 1;

        if (progress.get() >= start && progress.get() <= end) {
            const raw = progress.get();
            const t = (raw - start) / (end - start); // normalized from 0 → 1

            const easedX = easeIn(0, 4.5, t);
            const easedY = easeIn(0, 1.8, t);
            const easedZ = easeIn(0, 2.0, t);

            localRef.current.position.x = position[0] + easedX;
            localRef.current.position.y = position[1] + easedY;
            localRef.current.position.z = position[2] + easedZ;
        } else if (progress.get() > end) {
            // Clamp to final positions after the scroll range
            localRef.current.position.x = position[0] + 4.5;
            localRef.current.position.y = position[1] + 1.8;
            localRef.current.position.z = position[2] + 2.0;
        } else {
            // Before animation starts — no shift
            localRef.current.position.x = position[0];
            localRef.current.position.y = position[1];
            localRef.current.position.z = position[2];
        }
    }
});


    return (
        <Chair
            ref={(node) => {
                localRef.current = node;
                if (ref) ref.current = node;
            }}
            modelPath="src/assets/chairs/chair_round.glb"
            scale={scale}
            position={position}
            rotation={rotation}
        />
    );
});

export default Chair2;
