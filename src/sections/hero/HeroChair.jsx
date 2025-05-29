import React, { forwardRef, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useThree, useFrame } from "@react-three/fiber";
import Chair from "./Chair";

const HeroChair = forwardRef((props, ref) => {
  const { progress, heroProgress, heroRange, heroChairRef, ...otherProps } = props;

  const localRef = useRef();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const { viewport } = useThree();

  // Define rotation
  const rotation = [0.4, 0.3, 0.1];

  // Define initial scale and position
  const initialScale = isMobile ? 0.13 : 0.2;
  const initialPosition = isMobile
    ? [viewport.width * 0.7, -viewport.height * -2.8, -25]
    : [viewport.width * 0, -viewport.height * -4.3, -35];

  // Use progress to animate Y position and scale
  const easeIn = (start, end, t) => start + (end - start) * t * t;

  // useFrame(() => {
  //   if (localRef.current && progress >= heroRange[0] && progress <= heroRange[1]) {
  //     const normalizedProgress = (progress - 0.1) / (0.9 - 0.1); // Map 0.1 → 0.0 and 0.9 → 1.0
  //     const moveY = easeIn(0, -20, normalizedProgress);
  //     localRef.current.position.y = initialPosition[1] + moveY;
  //   } else if (localRef.current && progress > heroRange[1]) {
  //     // Snap to final position when past 0.9
  //     localRef.current.position.y = initialPosition[1] - 20;
  //   }
  // });
  useFrame(() => {
    if (!localRef.current) return;
    const heroStart = heroRange[0];
    const heroEnd = heroRange[1]; // 100% of hero range
  
    if (progress >= heroStart && progress <= heroEnd) {
      const moveY = easeIn(0, -20, heroProgress.get());
      localRef.current.position.y = initialPosition[1] + moveY
        0;
    } else if(heroProgress.get())
    {
      localRef.current.position.y = initialPosition[1];
    }
  });
  
  
  

  return (
    <Chair
      ref={(node) => {
        localRef.current = node; 
        if (ref) ref.current = node; 
      }}
      modelPath="src/assets/chairs/office_chair.glb"
      scale={initialScale} 
      position={initialPosition}
      rotation={rotation}
      castShadow={false}
      {...otherProps}
    />
  );
});

export default HeroChair;
