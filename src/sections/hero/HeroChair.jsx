import React, { forwardRef, useRef, useEffect, useMemo } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useMotionValueEvent, useTransform } from "framer-motion";
import { damp } from 'maath/easing';

import Chair from "./Chair";

const HeroChair = forwardRef((props, ref) => {
  const { progress, 
    heroProgress, 
    heroRange, 
    heroTransitionRange,
    afterOfficeRange,
    officeRange,
    slidesRange,
    carouselRange,
    heroChairRef, 
    canvasRef,
    isMobile,
    aspect,
    ...otherProps } = props;
  const localRef = useRef();
  const lastTRef = useRef(0); 

  // Define rotation
  const rotation = isMobile ?  [0.4, 0.3, 0.1] : [0.2, 0.3, 0];

  // Define initial scale and position
  const initialScale = useMemo(() => (isMobile ? 0.13 : 0.2), [isMobile]);

   const initialPosition = useMemo(() => {
          const x = isMobile
          ? aspect * 1.5
          : aspect * 1.5
  
          const y = isMobile
              ? 25
              : 32
          const z = isMobile ?  -25 : -35;
  
          return [x, y, z];
      }, [isMobile, aspect]);

  const heroTransition = useTransform(progress, heroTransitionRange , [0, 1]); 
  
  const heroTransitionRef = useRef(0);

  useMotionValueEvent(heroTransition, "change", (latest) => {
    heroTransitionRef.current = latest;
  });

  const lerp = (start, end, t) => start * (1 - t) + end * t;

  // Pre-calculate constants outside the useFrame loop
  const rotationStart = rotation[1];
  const rotationEnd = rotation[1] + Math.PI;
  const posYStart = initialPosition[1];
  const posYEnd = -5;

  useFrame((state, delta) => {
  if (!localRef.current) return;

   const obj = localRef.current;
  const bigScale = 0.8;
  const t = heroTransitionRef.current;

  // Prevent sudden jumps in scroll progress (like mobile scroll up/down or resize)
  if (Math.abs(t - lastTRef.current) > 0.2) {
    return; // skip this frame
  }
  lastTRef.current = t;

  // Rotation and drop
  if (t >= 0 && t < 0.474) {
    const p = t / 0.474;

    const targetY = lerp(posYStart, posYEnd, p * p); // eased Y
    const targetRotY = lerp(rotationStart, rotationEnd, p * p);

    damp(obj.position, "y", targetY, 0.3, delta);
    damp(obj.rotation, "y", targetRotY, 0.3, delta);
    damp(obj.scale, "x", initialScale, 0.3, delta);
    damp(obj.scale, "y", initialScale, 0.3, delta);
    damp(obj.scale, "z", initialScale, 0.3, delta);
  }

  // SCALE-UP PHASE (~0.474 to 0.7)
  else if (t >= 0.474 && t < 0.6) {
    const start = 0.474;
    const end = 0.6;
    const p = (t - start) / (end - start);
    const eased = p * p;

    const scale = initialScale + (bigScale - initialScale) * eased;
    const targetZ = initialPosition[2] - (scale - initialScale); // compensation
    const targetY = posYEnd - 50 * eased;

    damp(obj.scale, "x", scale, 0.1, delta);
    damp(obj.scale, "y", scale, 0.1, delta);
    damp(obj.scale, "z", scale, 0.1, delta);

    damp(obj.position, "y", targetY, 0.3, delta);
    damp(obj.position, "z", targetZ, 0.3, delta);

    // Dampen rotation to zero (no tilt)
    damp(obj.rotation, "x", 0, 0.3, delta);
    // damp(obj.rotation, "y", 0, 0.3, delta);
    damp(obj.rotation, "z", 0, 0.3, delta);
  }
});


  return (
    <Chair
      ref={(node) => {
        localRef.current = node; 
        if (ref) ref.current = node; 
      }}
      modelPath="/assets/chairs/office_chair.glb"
      scale={initialScale} 
      position={initialPosition}
      rotation={rotation}
      castShadow={false}
      {...otherProps}
    />
  );
});

export default HeroChair;
