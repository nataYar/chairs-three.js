import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useAnimation,  useMotionValueEvent, useMotionValue  } from "framer-motion";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);


import "../../styles/Hero.scss";
import "../../styles/IntroText.scss";

const HeroAnimation = ({
  progress,
  heroRange, 
  heroProgress, 
  isCanvasLoaded,
  containerHeroRef,
  isMobile
}) => {

  const backgroundScale = useMotionValue(1);
  const backgroundTranslateY = useMotionValue(0);
  const backgroundOpacity = useMotionValue(1);
  const viewportHeight = window.innerHeight;
  const [introTextVisible, setIntroTextVisible] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [gradientVisible, setGradientVisible] = useState(false);
  const [isAnimatingUp, setIsAnimatingUp] = useState(false); 
  const [isFixed, setIsFixed] = useState(true);

  // const animationControls = useAnimation();
  const heroRef = useRef(null);
  const textRef= useRef(null);

useEffect(() => {
  backgroundScale.set(1);        // force initial scale
  backgroundTranslateY.set(0);   // force initial position
  backgroundOpacity.set(1);      // make sure it's visible
}, []);

 useGSAP(() => {
  // text animation
  if(!textRef.current) return;
  if (!heroRef.current) return;
     ScrollTrigger.create({
       trigger: containerHeroRef.current,
       start: "top top",
       end: "+=400%",    
       pin: heroRef.current,
       scrub: true,
      //  markers: true, 
     });
  });

  // useMotionValueEvent(progress, "change", (latest) => {
  //   const maxScroll = heroRange[1];
  //   const viewportHeight = window.innerHeight;
  
  //   if (latest < maxScroll) {
  //     setIsFixed(true); 
  //   } else if (latest >= maxScroll){
  //     setIsFixed(false); 
  //   }
  // });

 useMotionValueEvent(progress, "change", (scrollProgress) => {
  const fadeStart = heroRange[1] - 0.04;
  const fadeEnd = heroRange[1] - 0.005;

  // Only scale on non-mobile
  if (scrollProgress >= heroRange[0] && scrollProgress < fadeStart && !isMobile) {
    backgroundScale.set(1 + scrollProgress * 2.2);
  }

  // Fade logic
  let mobileFadeStart = heroRange[0] + (heroRange[1] - heroRange[0]) * 0.4; // 40% into heroRange
  let mobileFadeEnd = heroRange[1];

  if (isMobile) {
    // Fade starts from 50% into heroRange on mobile
    if (scrollProgress >= mobileFadeStart && scrollProgress <= mobileFadeEnd) {
      const fadeProgress = (scrollProgress - mobileFadeStart) / (mobileFadeEnd - mobileFadeStart);
      backgroundOpacity.set(1 - fadeProgress);
    } else if (scrollProgress < mobileFadeStart) {
      backgroundOpacity.set(1);
    } else {
      backgroundOpacity.set(0);
    }
  } else {
    // Default fade for non-mobile
    if (scrollProgress >= fadeStart && scrollProgress <= fadeEnd) {
      const fadeProgress = (scrollProgress - fadeStart) / (fadeEnd - fadeStart);
      backgroundOpacity.set(1.2 - fadeProgress);
    } else if (scrollProgress < fadeStart) {
      backgroundOpacity.set(1);
    } else {
      backgroundOpacity.set(0);
    }
  }
});


    // Handle animations based on scroll progress
    // useEffect(() => {
    //   const unsubscribe = heroProgress.on("change", (scrollProgress) => {

    //     if (!isCanvasLoaded) return;
    //     const eightyPercentIntoHero = heroRange[0] + (heroRange[1] - heroRange[0]) * 0.8;

    //     if (scrollProgress >= 0.8 && scrollProgress < 0.95) {
    //       setIntroTextVisible(true);
    //     } else {
    //       setIntroTextVisible(false);
    //     }
    //     let backgroundScaleValue = 1;

    //     if (scrollProgress > 0) {
    //       backgroundScaleValue = 1 + scrollProgress * 1.5;    
    //     }
    //     backgroundScale.set(backgroundScaleValue);
    //   });

    //   return () => unsubscribe();
    // }, [heroProgress, isCanvasLoaded, backgroundScale, backgroundTranslateY, animationControls, viewportHeight, isJumping]);

  return (
    <>
      <div
      ref={textRef}
        className={`intro-text ${introTextVisible ? "visible" : "hidden"} `}
      >
          <h2>It all starts with a ...</h2>
          {/* <div className="chair-container">
            <h2 ref={chaRef} className="cha">cha</h2>
            <h2>ir</h2>
          </div> */}
        </div>

      <motion.div 
        ref={heroRef}
        className={`hero-section  ${gradientVisible ? "gradient-visible" : ""}`}
        
        style={{
          scale: backgroundScale,
          y: backgroundTranslateY,
          opacity: backgroundOpacity,
        }}
        // animate={animationControls}
      />
    </>
  );
};

export default HeroAnimation;