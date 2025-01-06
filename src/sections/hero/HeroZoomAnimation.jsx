import { useEffect } from "react";
import { motion, useScroll,  useSpring } from "framer-motion";
import "../../styles/sections/Hero.scss";

const HeroAnimation = ({ isDesktop, isMobile, containerHeroRef, isCanvasLoaded, onProgressUpdate }) => {
  const { scrollYProgress } = useScroll({ container: containerHeroRef.current, layoutEffect: false });
  const springConfig = { mass: 3, stiffness: 200, damping: 50, restDelta: 0.01 };
  const backgroundScale = useSpring(1, springConfig);
  const backgroundTranslateY = useSpring(0, springConfig);

  const viewportHeight = window.innerHeight;

  useEffect(() => {
      const unsubscribe = scrollYProgress.on("change", (progress) => {
          if (!isCanvasLoaded) return;

          if (onProgressUpdate) {
              onProgressUpdate(progress);
          }

          // Animate .hero-section
          if (progress < 0.25) {
              backgroundScale.set(1);
              backgroundTranslateY.set(0);
          } else if (progress < 0.40) {
              backgroundScale.set(isMobile ? 1.4 : 1);
              backgroundTranslateY.set(isMobile ? -viewportHeight * 0.1 : viewportHeight * 0);
          } else if (progress < 0.70) {
              backgroundScale.set(isMobile ? 2 : 1);
              backgroundTranslateY.set(isMobile ? -viewportHeight * 0.2 : viewportHeight * 0);
          } else if (progress < 0.90) {
              backgroundScale.set(isMobile ? 2.1 : 1);
              backgroundTranslateY.set(isMobile ? -viewportHeight * 0.2 : viewportHeight * 0);
          } else {
              backgroundScale.set(isMobile ? 2.1 : 1.2);
              backgroundTranslateY.set(isMobile ? viewportHeight * 0.4 : viewportHeight * 0);
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
