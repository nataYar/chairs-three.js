import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useAnimation, useTransform, useMotionValueEvent } from "framer-motion";
import "../../styles/Hero.scss";
import "../../styles/IntroText.scss";

const HeroAnimation = ({
  progress,
  heroProgress, 
  isCanvasLoaded,
  // onProgressUpdate,
}) => {
  const springConfig = { mass: 0.5, stiffness: 150, damping: 30, restDelta: 0.001 };
  const backgroundScale = useSpring(1, springConfig);
  const backgroundTranslateY = useSpring(0, springConfig);

  const viewportHeight = window.innerHeight;
  const [introTextVisible, setIntroTextVisible] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [gradientVisible, setGradientVisible] = useState(false);
  const [isAnimatingUp, setIsAnimatingUp] = useState(false); 
  const animationControls = useAnimation();
  const heroRef = useRef(null);


    useMotionValueEvent(heroProgress, "change", (scrollProgress) => {
      console.log(scrollProgress)
      const chaElement = document.querySelector(".cha");
      if (chaElement) {
        if (scrollProgress >= 0.85 && scrollProgress <= 1) {
          chaElement.classList.add("padding-right");
        } else {
          chaElement.classList.remove("padding-right");
        }
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

        let backgroundTranslateYValue = 0;
        if (scrollProgress > 0.7) {
          backgroundTranslateYValue = (scrollProgress - 0.5) * viewportHeight * 1.5; 
        
          setGradientVisible(true);
        } 
        else {
          setGradientVisible(false);
        
        }
        backgroundTranslateY.set(backgroundTranslateYValue);
      
        // Trigger animations at specific points
        if (scrollProgress >= 1) {
          animationControls.start({
            y: -viewportHeight * 2,
            transition: { duration: 2, ease: "easeInOut" },
          });
        } 
        else if (scrollProgress < 1) {
          // setIsJumping(false);
          animationControls.start({
            y: 0,
            transition: { duration: 2, ease: "easeInOut" },
          });
        }
      });

      return () => unsubscribe();
    }, [heroProgress, isCanvasLoaded, backgroundScale, backgroundTranslateY, animationControls, viewportHeight, isJumping]);

  const siblingAnimationVariants = {
    initial: {
      opacity: 0,
      y: "50px",
    },
    animate: {
      opacity: 1,
      y: 0, 
      transition: {
        opacity: { duration: 1, ease: "easeInOut" },
        y: { duration: 1, ease: "easeInOut" },
      },
    },
    exit: {
      opacity: 0, 
      y: `-${window.innerHeight}px`, 
      transition: {
        opacity: { duration: 1, ease: "easeIn" },
        y: { duration: 1, ease: "easeInOut" }, 
      },
    },
  };


  return (
    <>
      <div
        className={`intro-text ${introTextVisible ? "visible" : "hidden"} `}
        
      >
          <h2>It all starts with a</h2>
          <div className="chair-container">
            <h2 className="cha">cha</h2>
            <h2>ir</h2>
          </div>
        </div>

      <motion.div
        className={`hero-section ${gradientVisible ? "gradient-visible" : ""}`}
        ref={heroRef}
        style={{
          scale: backgroundScale,
          y: backgroundTranslateY,
        }}
        animate={animationControls}
      />
    </>
  );
};

export default HeroAnimation;