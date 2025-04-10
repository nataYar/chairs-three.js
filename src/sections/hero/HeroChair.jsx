import React, { forwardRef, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useThree, useFrame } from "@react-three/fiber";
import Chair from "./Chair";

const HeroChair = forwardRef((props, ref) => {
  const { progress, heroChairRef, ...otherProps } = props;

  const localRef = useRef();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const { viewport } = useThree();

  // Define rotation
  const rotation = [0.4, 0.3, 0.1];

  // Define initial scale and position
  const initialScale = isMobile ? 0.13 : 0.2;
  const initialPosition = isMobile
    ? [viewport.width * 0.5, -viewport.height * -2.8, -25]
    : [viewport.width * 0, -viewport.height * -4.3, -35];

  // Use progress to animate Y position and scale
  const easeIn = (start, end, t) => start + (end - start) * t * t;

  useFrame(() => {
    if (localRef.current && progress.get() >= 0.1) {
      const moveY = easeIn(0, -20, progress.get()); // Move down the Y-axis (adjust the value for desired distance)
      // const newScale = easeIn(initialScale, 0.13, progress.get()); // Increase scale slightly

      // Update position and scale
      localRef.current.position.y = initialPosition[1] + moveY;
      // localRef.current.scale.set(newScale, newScale, newScale);
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
