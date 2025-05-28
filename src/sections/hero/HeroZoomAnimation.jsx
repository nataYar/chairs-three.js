import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useAnimation,  useMotionValueEvent, useMotionValue  } from "framer-motion";
import "../../styles/Hero.scss";
import "../../styles/IntroText.scss";

const HeroAnimation = ({
  progress,
  heroRange, 
  heroProgress, 
  isCanvasLoaded,
  // onProgressUpdate,
}) => {
  const springConfig = { mass: 0.2, stiffness: 50, damping: 10, restDelta: 0.001 };
  // const backgroundScale = useSpring(1, springConfig);
  // const backgroundTranslateY = useSpring(1, springConfig);
  const backgroundScale = useMotionValue(1);
  const backgroundTranslateY = useMotionValue(0);
  const backgroundOpacity = useMotionValue(1);
  const viewportHeight = window.innerHeight;
  const [introTextVisible, setIntroTextVisible] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [gradientVisible, setGradientVisible] = useState(false);
  const [isAnimatingUp, setIsAnimatingUp] = useState(false); 
  const [isFixed, setIsFixed] = useState(true);

  const animationControls = useAnimation();
  const heroRef = useRef(null);
 const chaRef= useRef(null);

  useMotionValueEvent(progress, "change", (latest) => {
    const maxScroll = heroRange[1];
    const viewportHeight = window.innerHeight;
  
    if (latest < maxScroll) {
      setIsFixed(true); 
    } else if (latest >= maxScroll){
      setIsFixed(false); 
    }
  
   
    if (chaRef.current) {
      if (latest >= heroRange[1]-0.1 && latest <= heroRange[1]) {
        chaRef.current.classList.add("padding-right");
      } else {
        chaRef.current.classList.remove("padding-right");
      }
    }
  });

  useMotionValueEvent(progress, "change", (scrollProgress) => {
    const fadeStart = heroRange[1] - 0.025;
    const fadeEnd = heroRange[1];

    if (scrollProgress >= fadeStart && scrollProgress <= fadeEnd) {
      const fadeProgress = (scrollProgress - fadeStart) / (fadeEnd - fadeStart);
      backgroundOpacity.set(1 - fadeProgress); 
    } else if (scrollProgress < fadeStart) {
      backgroundOpacity.set(1); // fully visible before fade starts
    } else {
      backgroundOpacity.set(0); // fully invisible past fade end
    }
  });

    // Handle animations based on scroll progress
    useEffect(() => {
      const unsubscribe = heroProgress.on("change", (scrollProgress) => {
        if (!isCanvasLoaded) return;
        if (scrollProgress >= 1) {
          setIntroTextVisible(false); 
        } else {
          setIntroTextVisible(true);
        }
        let backgroundScaleValue = 1;

        if (scrollProgress > 0) {
          backgroundScaleValue = 1 + scrollProgress * 1.5;    
        }
        backgroundScale.set(backgroundScaleValue);
      });

      return () => unsubscribe();
    }, [heroProgress, isCanvasLoaded, backgroundScale, backgroundTranslateY, animationControls, viewportHeight, isJumping]);



    

    

    
  return (
    <>
      <div
        className={`intro-text ${introTextVisible ? "visible" : "hidden"} `}
        
      >
          <h2>It all starts with a</h2>
          <div className="chair-container">
            <h2 ref={chaRef} className="cha">cha</h2>
            <h2>ir</h2>
          </div>
        </div>

      <motion.div
        className={`hero-section ${isFixed ? "fixed" : "unfixed"}  ${gradientVisible ? "gradient-visible" : ""}`}
        ref={heroRef}
        style={{
          scale: backgroundScale,
          y: backgroundTranslateY,
          opacity: backgroundOpacity,
        }}
        animate={animationControls}
      />
    </>
  );
};

export default HeroAnimation;