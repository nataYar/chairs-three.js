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
    canvasRef,
    ...otherProps } = props;

    // console.log(canvasRef.current)
  const localRef = useRef();
  const transitionStartY = useRef(null);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const { viewport } = useThree();
const screenWidth = viewport.width;

  // Define rotation
  const rotation = [0.4, 0.3, 0.1];

  // Define initial scale and position
  const initialScale = isMobile ? 0.13 : 0.2;
  const initialPosition = isMobile
    ? [viewport.width * 0.85, -viewport.height * -2.8, -25]
    : [viewport.width * 0, -viewport.height * -4.3, -35];

  // Use progress to animate Y position and scale
  const easeIn = (start, end, t) => start + (end - start) * t * t;

  useFrame(() => {
  if (!localRef.current) return;
// console.log(localRef.current.position)
  const p = typeof progress === "number" ? progress : progress.get();
  const heroStart = heroRange[0];
  const heroEnd = heroRange[1];

  const heroTransitionStart = heroTransitionRange[0] + (heroTransitionRange[1] - heroTransitionRange[0]) * 0.4;
  const heroTransitionEnd = heroTransitionRange[1];
  //  const shiftAmount = viewport.width * 0.3;
  const officeHalfWay = officeRange[0] + (officeRange[1] - officeRange[0]) * 0.5;
  const shiftXOffice = 10;
  const shiftYOffice = 25;

  // Animate Y position
  if (p >= heroStart && p < heroTransitionStart) {
    const moveY = easeIn(0, -20, heroProgress.get());
    localRef.current.position.y = initialPosition[1] + moveY;
  }

  else if (p >= heroTransitionStart && p <= heroTransitionEnd) {
    const t = (p - heroTransitionStart) / (heroTransitionEnd - heroTransitionStart);

    // Rotation
    const spinAmount = 150 * (Math.PI / 180); // 150 degrees
    localRef.current.rotation.y = rotation[1] + t * spinAmount; 

    // Scale
    const finalScale = initialScale * 1.5;
    const scale = initialScale + (finalScale - initialScale) * t;
    localRef.current.scale.set(scale, scale, scale);

    // move down and further left
    localRef.current.position.x = initialPosition[0] - t * shiftXOffice;
    localRef.current.rotation.x = rotation[0] - t * 0.5;
    localRef.current.rotation.z = localRef.current.rotation.z * (1 - t);
    // Store current Y only once at start of transition
    if (transitionStartY.current === null) {
      transitionStartY.current = localRef.current.position.y;
    }
    const baseY = transitionStartY.current;
    // Move from baseY down by up to 2 units
    localRef.current.position.y = baseY - t * shiftYOffice;
  } 
   else if (p >= officeHalfWay) {
    const finalScale = initialScale * 1.5;
    localRef.current.scale.set(finalScale, finalScale, finalScale);
    localRef.current.rotation.set(rotation[0] - 0.5, rotation[1] + (150 * Math.PI / 180), 0);
    localRef.current.position.set(
      initialPosition[0] - 10,
      (transitionStartY.current ?? initialPosition[1]) - 25,
      initialPosition[2]
    );
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
