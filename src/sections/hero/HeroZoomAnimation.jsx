import { useEffect, useRef } from "react";
import { motion, useScroll,  useSpring } from "framer-motion";
import "../../styles/sections/Hero.scss";

const HeroAnimation = ({ isDesktop, isMobile, containerHeroRef, isCanvasLoaded, onProgressUpdate }) => {
  const { scrollYProgress } = useScroll({ container: containerHeroRef.current, layoutEffect: false });
  const springConfig = { mass: 3, stiffness: 200, damping: 50, restDelta: 0.01 };
  const backgroundScale = useSpring(1, springConfig);
  const backgroundTranslateY = useSpring(0, springConfig);

  const viewportHeight = window.innerHeight;

    // Track zoom-in progress
    const zoomProgress = useRef(0);
    const isZoomComplete = useRef(false);

      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
     
      
    useEffect(() => {
      if (!isCanvasLoaded) return;
        if (zoomProgress.current < 1) {
          zoomProgress.current += 0.1; // Faster zoom
          backgroundScale.set(1 + zoomProgress.current * 1.3); // Zoom in by 50%
          backgroundTranslateY.set(zoomProgress.current * -50); // Move up slightly
        } else {
          isZoomComplete.current = true;
        }
    }, [isCanvasLoaded, backgroundScale, backgroundTranslateY]);


  useEffect(() => {
      const unsubscribe = scrollYProgress.on("change", (progress) => {
          if (!isCanvasLoaded) return;

          if (onProgressUpdate) {
              onProgressUpdate(progress);
          }

          if (progress < 0.2) {
            backgroundScale.set(1.2);
            backgroundTranslateY.set(0);
        } else if (progress < 0.40) {
            backgroundScale.set(isMobile ? 1.3 : 1);
            backgroundTranslateY.set(isMobile ? viewportHeight * 0.0 : viewportHeight * 0);
        } else if (progress < 0.70) {
            backgroundScale.set(isMobile ? 1.4 : 1);
            backgroundTranslateY.set(isMobile ? -viewportHeight * 0.02 : viewportHeight * 0);
        } else if (progress < 0.90) {
            backgroundScale.set(isMobile ? 1.5 : 1);
            backgroundTranslateY.set(isMobile ? -viewportHeight * 0.03 : viewportHeight * 0);
        } else {
            backgroundScale.set(isMobile ? 2 : 1.2);
            backgroundTranslateY.set(isMobile ? viewportHeight * 0.2 : viewportHeight * 0);
        }


      });

      return () => unsubscribe(); // Cleanup the listener
  }, [scrollYProgress, isMobile, isDesktop, isCanvasLoaded, onProgressUpdate]);

  return (
      <motion.div
          className="hero-section"
          style={{
              scale: backgroundScale,
              y: backgroundTranslateY,
          }}
      />
  );
};

export default HeroAnimation;
