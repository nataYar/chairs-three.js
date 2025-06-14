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

  const animationControls = useAnimation();
  const heroRef = useRef(null);
  const textRef= useRef(null);

const pinEnd = window.innerHeight * 5.5;

//  useGSAP(() => {
//   // text animation
//   if(!textRef.current) return;
//   if (!heroRef.current) return;
//      ScrollTrigger.create({
//        trigger: containerHeroRef.current,
//        start: "top top",
//        end: () => `${pinEnd}`, 
//        pin: heroRef.current,
//       //  pinSpacing: false,
//        scrub: true,
//        markers: true, 
//      });
//   });

  useMotionValueEvent(progress, "change", (latest) => {
    const maxScroll = heroRange[1];
    const viewportHeight = window.innerHeight;
  
    if (latest < maxScroll) {
      setIsFixed(true); 
    } else if (latest >= maxScroll){
      setIsFixed(false); 
    }
  });

  useMotionValueEvent(progress, "change", (scrollProgress) => {
    const fadeStart = heroRange[1] - 0.02;
    const fadeEnd = heroRange[1];

    if (scrollProgress >= fadeStart && scrollProgress <= fadeEnd) {
      const fadeProgress = (scrollProgress - fadeStart) / (fadeEnd - fadeStart);
      backgroundOpacity.set(1.2 - fadeProgress); 
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
        const eightyPercentIntoHero = heroRange[0] + (heroRange[1] - heroRange[0]) * 0.8;

        if (scrollProgress >= 0.8 && scrollProgress < 0.95) {
          setIntroTextVisible(true);
        } else {
          setIntroTextVisible(false);
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
        animate={animationControls}
      />
    </>
  );
};

export default HeroAnimation;