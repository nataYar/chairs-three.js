import React, { forwardRef, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useThree, useFrame } from "@react-three/fiber";
import { useMotionValueEvent } from "framer-motion";
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
    ...otherProps } = props;

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

  // useMotionValueEvent(progress, "change", (latest) => {
  //   console.log("progress changed:", latest);
  // });


  useFrame(() => {
    if (!localRef.current) return;
  
    const p = typeof progress === "number" ? progress : progress.get();
  
    const heroStart = heroRange[0];
    const heroEnd = heroRange[1];
  
    // Animate Y position
    if (p >= heroStart && p <= heroEnd) {
      const moveY = easeIn(0, -20, heroProgress.get());
      localRef.current.position.y = initialPosition[1] + moveY;
    }
  
    // Animate rotation & scale during heroTransitionRange
    const transitionStart = (heroTransitionRange[0] + heroTransitionRange[1]) / 2;;
    const transitionEnd = heroTransitionRange[1]; // fix here!
  
    if (p >= transitionStart && p <= transitionEnd) {
      const t = (p - transitionStart) / (transitionEnd - transitionStart);
  
      // Smooth 180° turn
      localRef.current.rotation.y = t * Math.PI;
  
      // Scale from initialScale to 1.5× initialScale
      const finalScale = initialScale * 1.5;
      const scale = initialScale + (finalScale - initialScale) * t;
      localRef.current.scale.set(scale, scale, scale);
  
    } else if (p < transitionStart) {
      localRef.current.rotation.y = 0;
      localRef.current.scale.set(initialScale, initialScale, initialScale);
    } else if (p > transitionEnd) {
      localRef.current.rotation.y = Math.PI;
      const finalScale = initialScale * 1.5;
      localRef.current.scale.set(finalScale, finalScale, finalScale);
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
