import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll,  useSpring } from "framer-motion";
import "../../styles/Hero.scss";

const HeroAnimation = ({ isDesktop, isMobile, containerHeroRef, isCanvasLoaded, onProgressUpdate, isNonFixedDelayed, progress  }) => {
  const { scrollYProgress } = useScroll({ container: containerHeroRef.current, layoutEffect: false });
  const springConfig = { mass: 0.5, stiffness: 100, damping: 30, restDelta: 0.01 };
  const backgroundScale = useSpring(1, springConfig);
  const backgroundTranslateY = useSpring(0, springConfig);

  const viewportHeight = window.innerHeight;

  useEffect(() => {
      window.scrollTo(0, 0);
    }, [isCanvasLoaded]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      if (!isCanvasLoaded) return;

      if (onProgressUpdate) {
        onProgressUpdate(progress);
      }

      // Calculate backgroundScale based on progress with smoother transition
      let backgroundScaleValue = 1;
      let backgroundTranslateYValue = 0;
      if (progress === 0) { 
        backgroundScaleValue = 1;
        backgroundTranslateYValue = 0; 
      } else if (progress > 0) {
        backgroundScaleValue = 1 + progress * 1.5; 
      }

      // Gradual vertical translation throughout the scroll
      if (progress > 0.5) {
        backgroundTranslateYValue = (progress - 0.5) * viewportHeight * 0.8; 
      }
        
        backgroundScale.set(backgroundScaleValue);
        backgroundTranslateY.set(backgroundTranslateYValue);
      });
    return () => unsubscribe(); // Cleanup the listener
  }, [scrollYProgress, isMobile, isDesktop, isCanvasLoaded, onProgressUpdate ]);

  return (
      <motion.div
      // className="hero-section"
      className={`hero-section ${progress >= 1 && isNonFixedDelayed ? "non-fixed" : ""
      }`}
          style={{
              scale: backgroundScale,
              y: backgroundTranslateY,
          }}
      />
  );
};

export default HeroAnimation;