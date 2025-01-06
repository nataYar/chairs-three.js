import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useFrame } from '@react-three/fiber';
import "../../styles/sections/Hero.scss";

const ChairAnimation = ({ isDesktop, isMobile, refsRight, refsLeft, isCanvasLoaded, containerHeroRef }) => {
  // Track scroll progress
  const { scrollYProgress } = useScroll({ container: containerHeroRef.current });
  const viewportHeight = window.innerHeight;

  // Store initial positions
  const initialPositions = useRef([]);

  useEffect(() => {
    // Store initial x positions of the chairs
    initialPositions.current = refsRight.map(ref => ref.current?.position.x || 0);
  }, [refsRight]);

  // Spring values for translation
  const springConfig = { mass: 3, stiffness: 200, damping: 50, restDelta: 0.01 };
  const translateSpringsRight = refsRight.map(() => useSpring(0, springConfig));

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      refsRight.forEach((ref, index) => {
        if (ref?.current) {
          if (!isCanvasLoaded) return;

          let offsetX;
          if (progress === 0) {
            offsetX = 0; // Reset to initial state
          } else if (progress < 0.25) {
            offsetX = isMobile ? viewportHeight * 0.01 : -300;
          } else if (progress < 0.90) {
            offsetX = isMobile ? viewportHeight * 0.01 : -300;
          } else {
            offsetX = isMobile ? viewportHeight * 0.01 : -300;
          }

          // Update the spring target
          translateSpringsRight[index].set(offsetX);

          // Force reset to initial position if progress is 0
          if (progress === 0) {
            translateSpringsRight[index].set(0); // Reset the spring
            ref.current.position.x = initialPositions.current[index]; // Reset to initial position
          }
        }
      });
    });

    return () => unsubscribe();
  }, [scrollYProgress, refsRight, isCanvasLoaded, translateSpringsRight, isMobile, viewportHeight]);

  useFrame(() => {
    refsRight.forEach((ref, index) => {
      if (ref?.current) {
        // Add the spring value (offset) to the initial position
        ref.current.position.x = initialPositions.current[index] + translateSpringsRight[index].get();
      }
    });
  });

  return null; // This component doesn't render anything
};

export default ChairAnimation;