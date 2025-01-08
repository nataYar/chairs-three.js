import { useEffect } from "react";
import { useSpring } from "framer-motion";
import { useFrame } from "@react-three/fiber";

const ChairAnimation = ({ chairPositions, chairRefs, isCanvasLoaded, progress, isMobile, viewportHeight }) => {
  // Spring configuration
  const springConfig = { mass: 5, stiffness: 400, damping: 80, restDelta: 0.001 };

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    
  // Create springs for each chair position
  const springs = chairPositions.map((chair) => {
    return useSpring(chair.position[0], springConfig); // Only animate the x position
  });

  // Speed multipliers for each chair index
  const speedMultipliers = {
    0: 1.0, // Normal speed
    1: 0.2, // Slower than chairs 6 and 2
    2: 0.5, // Slower than chairs 0, 3, 4, 5
    3: 1.0, // Normal speed
    4: 1.0, // Normal speed
    5: 1.0, // Normal speed
    6: 0.5, // Slower than chairs 0, 3, 4, 5
  };

  // Update spring targets based on progress
  useEffect(() => {
    if (!isCanvasLoaded || chairPositions.length === 0) return; // Exit if canvas isn't loaded or positions aren't set

    chairRefs.forEach((chair, index) => {
      if (chair.ref.current) {
        let targetX;

        // Get the speed multiplier for the current chair index
        const speedMultiplier = speedMultipliers[index] || 1.0; // Default to 1.0 if index is not found

        // Chairs with indexes 2, 3, and 4 move to the left
        if ([2, 3, 4].includes(index)) {
          if (progress === 0) {
            targetX = chair.ref.current.position.x; // Keep the initial position
          } else if (progress < 0.25) {
            targetX = isMobile ? chair.ref.current.position.x - 0.5 * speedMultiplier : chair.ref.current.position.x - 2 * speedMultiplier;
          } else if (progress < 0.90) {
            targetX = isMobile ? chair.ref.current.position.x - 4 * speedMultiplier : chair.ref.current.position.x - 2 * speedMultiplier;
          } else {
            targetX = isMobile ? chair.ref.current.position.x - 5 * speedMultiplier : chair.ref.current.position.x - 2 * speedMultiplier;
          }
        }
        // Other chairs move to the right
        else {
          if (progress === 0) {
            targetX = chair.ref.current.position.x; // Keep the initial position
          } else if (progress < 0.25) {
            targetX = isMobile ? chair.ref.current.position.x + 1 * speedMultiplier : chair.ref.current.position.x + 400 * speedMultiplier;
          } else if (progress < 0.90) {
            targetX = isMobile ? chair.ref.current.position.x + 1 * speedMultiplier : chair.ref.current.position.x + 400 * speedMultiplier;
          } else {
            targetX = isMobile ? chair.ref.current.position.x + 1 * speedMultiplier : chair.ref.current.position.x + 500 * speedMultiplier;
          }
        }

        // Update the spring target with the new offset position
        springs[index].set(targetX);

        // Update the position based on the spring's current value
        chair.ref.current.position.x = springs[index].get();
      }
    });
  }, [progress, isCanvasLoaded, isMobile, viewportHeight, chairRefs, chairPositions, springs]);

  // Update chair positions in the render loop
  useFrame(() => {
    if (chairPositions.length === 0) return; // Exit if positions aren't set

    chairRefs.forEach((chair, index) => {
      if (chair.ref.current) {
        // Update the position based on the spring's current value
        chair.ref.current.position.x = springs[index].get();
      }
    });
  });

  return null; // This component doesn't render anything
};

export default ChairAnimation;