import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useAnimation, useTransform } from "framer-motion";
import "../../styles/Hero.scss";
import "../../styles/IntroText.scss";

const HeroAnimation = ({
  isDesktop,
  isMobile,
  containerHeroRef,
  isCanvasLoaded,
  onProgressUpdate,
  isNonFixedDelayed,
  progress,
}) => {


  const { scrollYProgress } = useScroll({
    container: containerHeroRef.current,
    offset: ["start start", "end start"]
  });

  useEffect(() => {
    const handleScroll = () => {
      const heroBounds = containerHeroRef.current.getBoundingClientRect();
  
  
      console.log("Hero Bottom:", heroBounds.bottom);

      console.log("Hero Scroll Progress:", scrollYProgress.get());
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollYProgress]);

  const springConfig = { mass: 0.5, stiffness: 150, damping: 40, restDelta: 0.01 };
  const backgroundScale = useSpring(1, springConfig);
  const backgroundTranslateY = useSpring(0, springConfig);

  const viewportHeight = window.innerHeight;
  const [isJumping, setIsJumping] = useState(false);
  const [gradientVisible, setGradientVisible] = useState(false);
  const animationControls = useAnimation();
  const heroRef = useRef(null);
  const [isScrollingDown, setIsScrollingDown] = useState(true); // Track scroll direction
  let previousProgress = useRef(0);

  // Smooth out scroll progress
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  //  useEffect(() => {
  //     console.log("HERO "+ progress)
  //   }, [progress]);

  // Update gradient visibility
  // useEffect(() => {
  //   setGradientVisible(progress >= 1);
  // }, [progress]);

  // Ensure the page starts at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isCanvasLoaded]);

  const remappedProgress = useTransform(smoothScrollYProgress, [0, 0.5], [0, 1]);


  useEffect(() => {
    let debounceTimeout;
    
    const handleScrollDirection = () => {
      if (progress > previousProgress.current) {
        debounceTimeout = setTimeout(() => setIsScrollingDown(true), 50);
      } else {
        debounceTimeout = setTimeout(() => setIsScrollingDown(false), 50);
      }
      previousProgress.current = progress; // Update the previous progress value
    };
  
    handleScrollDirection();
  return () => clearTimeout(debounceTimeout);
  }, [progress]);


  useEffect(() => {
    const handleScroll = () => {
      const heroBounds = containerHeroRef.current.getBoundingClientRect();
      console.log("Container Top:", heroBounds.top);
      console.log("Container Bottom:", heroBounds.bottom);
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  // Handle animations based on scroll progress
  useEffect(() => {
    const unsubscribe = remappedProgress.on("change", (scrollProgress) => {
      if (!isCanvasLoaded) return;

      if (onProgressUpdate) {
        onProgressUpdate(scrollProgress);
      }
      // Background scale
      let backgroundScaleValue = 1;
      if (scrollProgress > 0) {
        backgroundScaleValue = 1 + scrollProgress * 1.5;
      }
      backgroundScale.set(backgroundScaleValue);

      // Background translation
      let backgroundTranslateYValue = 0;
      if (scrollProgress > 0.5) {
        backgroundTranslateYValue = (scrollProgress - 0.5) * viewportHeight * 1.5;
      }
      backgroundTranslateY.set(backgroundTranslateYValue);

      // Trigger animations at specific points
      if (scrollProgress >= 1 && !isJumping) {
        setIsJumping(true);
        animationControls.start({
          y: -viewportHeight * 2,
          transition: { duration: 1, ease: "easeInOut" },
        });
      } else if (scrollProgress < 1 && isJumping) {
        setIsJumping(false);
        animationControls.start({
          y: 0,
          transition: { duration: 1, ease: "easeOut" },
        });
      }
    });

    return () => unsubscribe();
  }, [remappedProgress, isCanvasLoaded, backgroundScale, animationControls, viewportHeight, isJumping]);

  const siblingAnimationVariants = {
  initial: {
    opacity: 1,
    y: 0,
  },
  animate: (isScrollingDown) => ({
    opacity: 0,
    y: "-100vh",
    transition: {
      delay: isScrollingDown ? 0 : 0,
      opacity: {
        duration: isScrollingDown ? 1 : 1, // Faster fade-out when scrolling back up
        ease: "easeIn",
      },
      y: {
        duration: isScrollingDown ? 1 : 1, // Control vertical animation speed
        ease: isScrollingDown ? "easeOut" : "easeOut",
      },
    },
  }),
};


  useEffect(() => {
    let timeout;
  
    if (progress >= 1) {
      setGradientVisible(true); // Immediately show the gradient when progress >= 1
    } else {
      // Delay the removal of the gradient-visible class
      timeout = setTimeout(() => {
        setGradientVisible(false);
      }, 2000); // Adjust the delay (200ms here) as needed
    }
  
    return () => clearTimeout(timeout); // Cleanup timeout on effect re-run
  }, [progress]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const heroContainerBounds = containerHeroRef.current.getBoundingClientRect();
  //     console.log("Container Top:", heroContainerBounds .top);
  //     console.log("Container Bottom:", heroContainerBounds .bottom);
  //     console.log("Scroll Progress:", scrollYProgress.get());

  //     const heroSectionBounds = heroRef.current.getBoundingClientRect();
  //     console.log("Section Top:", heroSectionBounds.top);
  //     console.log("Section Bottom:", heroSectionBounds.bottom);
  //     console.log("Scroll Progress:", scrollYProgress.get());
  //   };
  
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [scrollYProgress]);

  return (
    <>
      <motion.div
        className="hero-section_sibling"
        variants={siblingAnimationVariants}
        initial="initial"
        animate={progress >= 1 ? "animate" : "initial"}
        custom={isScrollingDown} 
      >
        <div className={`intro-text ${progress >= 0.9 ? "visible" : ""}`}>
          <h2>It all starts with a</h2>
          <div className="chair-container">
            <h2 className="cha">cha</h2>
            <h2>ir</h2>
          </div>
        </div>
      </motion.div>

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
