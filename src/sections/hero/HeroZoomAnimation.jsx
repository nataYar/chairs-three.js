import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll,  useSpring } from "framer-motion";
import "../../styles/Hero.scss";
import "../../styles/IntroText.scss";

const HeroAnimation = ({ isDesktop, isMobile, containerHeroRef, isCanvasLoaded, onProgressUpdate, isNonFixedDelayed, progress  }) => {
  const { scrollYProgress } = useScroll({ container: containerHeroRef.current, layoutEffect: false });
  const springConfig = { mass: 0.5, stiffness: 150, damping: 40, restDelta: 0.01 };
  const backgroundScale = useSpring(1, springConfig);
  const backgroundTranslateY = useSpring(0, springConfig);

  const viewportHeight = window.innerHeight;
  const isTextVisible = progress >= 0.9;
  const [isJumping, setIsJumping] = useState(false);

  useEffect(() => {
    if (progress >= 1) {
      setIsJumping(true);
    }
  }, [progress]);

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
        backgroundTranslateYValue = (progress - 0.5) * viewportHeight * 0.5; 
      }
        backgroundScale.set(backgroundScaleValue);
        backgroundTranslateY.set(backgroundTranslateYValue);
      });
    return () => unsubscribe(); // Cleanup the listener
  }, [scrollYProgress, isMobile, isDesktop, isCanvasLoaded, onProgressUpdate ]);

  useEffect(()=>{
    console.log("isNonFixedDelayed " + isNonFixedDelayed)
  }, [isNonFixedDelayed])

  
  return (
    <>
      {/* <div className="hero-section_sibling">
      <div className={`intro-text ${isTextVisible ? 'visible' : ''}`}> 
      <h2>It all starts with a</h2>
      <div className='chair-container'>
          <h2 className='cha'>cha</h2>
          <h2>ir</h2>
      </div>
    </div>
      </div>
      <motion.div
        className={`hero-section ${
          progress >= 1 && isNonFixedDelayed ? "non-fixed" : ""
        }`}
            style={{
                scale: backgroundScale,
                y: backgroundTranslateY,
            }}
            animate={{
              top: progress >= 1 && isNonFixedDelayed ? "-200%" : "0",
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
            }}
      /> */}
       <motion.div className="hero-section_sibling">
        <div className={`intro-text ${isTextVisible ? "visible" : ""}`}>
          <h2>It all starts with a</h2>
          <div className="chair-container">
            <h2 className="cha">cha</h2>
            <h2>ir</h2>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        className={`hero-section ${progress >= 1 && isNonFixedDelayed ? "non-fixed" : ""}`}
        style={{
          scale: backgroundScale,
          y: backgroundTranslateY,
        }}
        // animate={{
        //   top: progress >= 1 && isNonFixedDelayed ? "-200%" : "0",
        // }}
        transition={{
          duration: 2,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="hero-transition"
        // animate={{
        //   bottom: progress >= 1 && isNonFixedDelayed ? "100vh" : "-150vh", // Adjust position dynamically based on progress
        // }}
        transition={{
          duration: 2, // Slower transition
          ease: "easeInOut",
        }}
      />
    </>
  );
};

export default HeroAnimation;