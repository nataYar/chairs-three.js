import React, { forwardRef, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useMotionValueEvent, useTransform } from "framer-motion";
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
    ...otherProps } = props;

    // console.log(canvasRef.current)
  const localRef = useRef();
  const transitionStartY = useRef(null);
 
  
  // const { size } = useThree(); // canvas size in pixels
  // const cachedSize = useRef({ width: size.width, height: size.height });


  const { viewport } = useThree();
  const cachedViewport = useRef({ width: viewport.width, height: viewport.height });

// useEffect(() => {
//   let timeout;
//   const handleResize = () => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       cachedSize.current = {
//         width: size.width,
//         height: size.height,
//       };
//       console.log("Resize complete:", cachedSize.current);
//     }, 500); // debounce time
//   };

//   window.addEventListener("resize", handleResize);
//   return () => window.removeEventListener("resize", handleResize);
// }, [size]);

  // Define rotation
  const rotation = isMobile ?  [0.4, 0.3, 0.1] : [0.2, 0.3, 0];

  // Define initial scale and position
  const initialScale = isMobile ? 0.13 : 0.2;

  const initialPosition = isMobile
    ? [cachedViewport.current.width * 0.85, cachedViewport.current.height * 2.8, -25]
    : [cachedViewport.current.width * 0, -cachedViewport.current.height * -4.3, -35];

  // Use progress to animate Y position and scale
  const easeIn = (start, end, t) => start + (end - start) * t * t;
  const heroTransition = useTransform(progress, heroTransitionRange , [0, 1]); 
  
  const heroTransitionRef = useRef(0);
  const tHeroTransition = heroTransitionRef.current;

  useMotionValueEvent(heroTransition, "change", (latest) => {
    heroTransitionRef.current = latest;
  });

  const lastPhase = useRef(null);
const scalePhaseStartY = useRef(null); 

  useFrame(() => {
  if (!localRef.current) return;

  const t = heroTransitionRef.current;
const finalY = -10;
  // Phase 1: rotate & descend
  if (t >= 0 && t < 0.474) {
    const p = t / 0.474;
    localRef.current.rotation.y = rotation[1] + p * Math.PI;

    localRef.current.position.y = initialPosition[1] + (finalY - initialPosition[1]) * p;
    localRef.current.scale.set(initialScale, initialScale, initialScale);

    lastPhase.current = "rotate";
  }

  // Phase 2: scale up and descend
  else if (t >= 0.474 && t < 0.7) {
    const start = 0.474;
    const end = 0.7;
    const p = (t - start) / (end - start);
    const eased = p * p;

    if (lastPhase.current !== 'scaleUp') {
      scalePhaseStartY.current = localRef.current.position.y;
      lastPhase.current = 'scaleUp';
    }

    const bigScale = 1.1;
    const scale = initialScale + (bigScale - initialScale) * eased;
    localRef.current.scale.set(scale, scale, scale);

    const baseZ = initialPosition[2];
    const compensationZ = baseZ - (scale - initialScale) * 1;
    localRef.current.position.z = compensationZ;

    const baseY = scalePhaseStartY.current;
    const finalY = baseY - 50;
    localRef.current.position.y = baseY + (finalY - baseY) * eased;
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
