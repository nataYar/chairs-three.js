import React, { forwardRef, useRef, useEffect, useState, useMemo, useCallback } from "react";
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
  const [isResizing, setIsResizing] = useState(false);
  const resizeTimerRef = useRef(null);
  
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
  // Define rotation
    const rotation = isMobile ?  [0.4, 0.3, 0.1] : [0.2, 0.3, 0];
    const posYStart = initialPosition[1];  // Starting Y position (from initialPosition)
    const posYEnd = -10;                   // Ending Y position (chair drops to this point)
    const rotationStart = rotation[1];     // Starting Y rotation
    const rotationEnd = rotation[1] + Math.PI; 
    const bigScale = 0.8;

  // Add target state refs that persist during resize
  const targetPosition = useRef({ x: initialPosition[0], y: initialPosition[1], z: initialPosition[2] });
  const targetRotation = useRef({ x: rotation[0], y: rotation[1], z: rotation[2] });
  const targetScale = useRef(initialScale);

  // Add refs to store the last stable position before resize
  const lastStablePosition = useRef({ x: initialPosition[0], y: initialPosition[1], z: initialPosition[2] });
  const lastStableRotation = useRef({ x: rotation[0], y: rotation[1], z: rotation[2] });
  const lastStableScale = useRef(initialScale);
  

  const heroTransition = useTransform(progress, heroTransitionRange , [0, 1]); 
  
  const heroTransitionRef = useRef(0);


 // Handle resize events
  useEffect(() => {
    const handleResize = () => {
      if (!isResizing && localRef.current) {
        // Store the current chair state before resize starts
        lastStablePosition.current = {
          x: localRef.current.position.x,
          y: localRef.current.position.y,
          z: localRef.current.position.z
        };
        lastStableRotation.current = {
          x: localRef.current.rotation.x,
          y: localRef.current.rotation.y,
          z: localRef.current.rotation.z
        };
        lastStableScale.current = localRef.current.scale.x;
      }
      
      setIsResizing(true);
      
      clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = setTimeout(() => {
        // When resize ends, update the target positions to match last stable position
        targetPosition.current = {...lastStablePosition.current};
        targetRotation.current = {...lastStableRotation.current};
        targetScale.current = lastStableScale.current;
        
        setIsResizing(false);
      }, 200);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimerRef.current);
    };
  }, [isResizing]);

  // useMotionValueEvent(heroTransition, "change", (latest) => {
  //   heroTransitionRef.current = latest;
  // });

   // Update targets based on scroll, not direct position
  useMotionValueEvent(heroTransition, "change", (latest) => {
    heroTransitionRef.current = latest;
    
    // Update animation targets without directly moving the chair
    if (!isResizing) {
      updateAnimationTargets(latest);
    }
  });
  
  // Function to update animation targets
  const updateAnimationTargets = (t) => {
    if (t >= 0 && t < 0.474) {
      const p = t / 0.474;
      targetPosition.current.y = lerp(posYStart, posYEnd, p * p);
      targetRotation.current.y = lerp(rotationStart, rotationEnd, p * p);
      targetScale.current = initialScale;
    } 
    else if (t >= 0.474 && t < 0.6) {
       // Calculate normalized progress for this phase (0-1)
      const phaseProgress = (t - 0.474) / (0.6 - 0.474);
      
      // Ease the progress for smoother animation
      const easedProgress = phaseProgress * phaseProgress;
      
      // Set target scale (grow from initialScale to bigScale)
      const bigScale = 0.8; // You might want to define this elsewhere
      targetScale.current = lerp(initialScale, bigScale, easedProgress);
      
      // Set target position (adjust y and z based on scale)
      targetPosition.current.y = lerp(posYEnd, posYEnd - 5, easedProgress);
      targetPosition.current.z = lerp(initialPosition[2], initialPosition[2] - 5, easedProgress);
      
      // Keep rotation stable in this phase
      targetRotation.current.y = rotationEnd;
    }
    
  };


  const lerp = (start, end, t) => start * (1 - t) + end * t;

  useFrame((state, delta) => {
    if (!localRef.current || isResizing) return;
    
    const obj = localRef.current;
    const smoothFactor = delta * 3; // Adjust for smoothness
    
    // Always smoothly move toward targets
    obj.position.y = lerp(obj.position.y, targetPosition.current.y, smoothFactor);
    obj.position.z = lerp(obj.position.z, targetPosition.current.z, smoothFactor);
    obj.rotation.y = lerp(obj.rotation.y, targetRotation.current.y, smoothFactor);
    
    // Scale smoothly
    const currentScale = obj.scale.x;
    const newScale = lerp(currentScale, targetScale.current, smoothFactor);
    obj.scale.set(newScale, newScale, newScale);
  });


  // Pre-calculate constants outside the useFrame loop
  // const rotationStart = rotation[1];
  // const rotationEnd = rotation[1] + Math.PI;
  // const posYStart = initialPosition[1];
  // const posYEnd = -5;

//   useFrame((state, delta) => {
//   if (!localRef.current) return;

//    const obj = localRef.current;
//   const bigScale = 0.8;
//   const t = heroTransitionRef.current;

//   // Rotation and drop
//   if (t >= 0 && t < 0.474) {
//     const p = t / 0.474;

//     const targetY = lerp(posYStart, posYEnd, p * p); // eased Y
//     const targetRotY = lerp(rotationStart, rotationEnd, p * p);

//     damp(obj.position, "y", targetY, 0.3, delta);
//     damp(obj.rotation, "y", targetRotY, 0.3, delta);
//     damp(obj.scale, "x", initialScale, 0.3, delta);
//     damp(obj.scale, "y", initialScale, 0.3, delta);
//     damp(obj.scale, "z", initialScale, 0.3, delta);
//   }

//   // SCALE-UP PHASE (~0.474 to 0.7)
//   else if (t >= 0.474 && t < 0.6) {
//     const start = 0.474;
//     const end = 0.6;
//     const p = (t - start) / (end - start);
//     const eased = p * p;

//     const scale = initialScale + (bigScale - initialScale) * eased;
//     const targetZ = initialPosition[2] - (scale - initialScale); // compensation
//     const targetY = posYEnd - 50 * eased;

//     damp(obj.scale, "x", scale, 0.1, delta);
//     damp(obj.scale, "y", scale, 0.1, delta);
//     damp(obj.scale, "z", scale, 0.1, delta);

//     damp(obj.position, "y", targetY, 0.3, delta);
//     damp(obj.position, "z", targetZ, 0.3, delta);

//     // Dampen rotation to zero (no tilt)
//     damp(obj.rotation, "x", 0, 0.3, delta);
//     // damp(obj.rotation, "y", 0, 0.3, delta);
//     damp(obj.rotation, "z", 0, 0.3, delta);
//   }
// });


  // Update the return to apply the last stable values during resize
  return (
    <Chair
      ref={(node) => {
        localRef.current = node; 
        if (ref) ref.current = node;
        
        // If we're resizing, apply the last stable position immediately
        if (node && isResizing) {
          node.position.set(
            lastStablePosition.current.x,
            lastStablePosition.current.y, 
            lastStablePosition.current.z
          );
          node.rotation.set(
            lastStableRotation.current.x,
            lastStableRotation.current.y,
            lastStableRotation.current.z
          );
          node.scale.set(
            lastStableScale.current,
            lastStableScale.current,
            lastStableScale.current
          );
        }
      }}
      modelPath="/assets/chairs/office_chair.glb"
      scale={isResizing ? lastStableScale.current : initialScale} 
      position={isResizing ? 
        [lastStablePosition.current.x, lastStablePosition.current.y, lastStablePosition.current.z] : 
        initialPosition
      }
      rotation={isResizing ? 
        [lastStableRotation.current.x, lastStableRotation.current.y, lastStableRotation.current.z] : 
        rotation
      }
      castShadow={false}
      {...otherProps}
    />
  );
});

export default HeroChair;
