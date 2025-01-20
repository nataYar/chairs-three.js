import React, { Suspense, useRef, useEffect, useState } from "react";
import { motion, useScroll, useSpring,  } from "framer-motion";

import "../../styles/Main.scss";

const Main = ({ isHeroAnimatedOut }) => {
  const [progress, setProgress] = useState(0);
  const [leftVideoSrc, setLeftVideoSrc] = useState("src/assets/office/office party.mp4");
  const [rightVideoSrc, setRightVideoSrc] = useState("src/assets/office/cat.mp4");
  
  const officeSectionRef = useRef(null);
 // Track scroll progress within the office-section
 
 const { scrollYProgress } = useScroll({
  target: officeSectionRef,
  offset: ["start start", "end end"]
});

useEffect(() => {
  const handleScroll = () => {
    const mainBounds = officeSectionRef.current.getBoundingClientRect();
    console.log("Main Top:", mainBounds.top);
    console.log("Main Scroll Progress:", scrollYProgress.get());
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [scrollYProgress]);

// useEffect(() => {
//   console.log("isHeroAnimatedOut " + isHeroAnimatedOut)
// }, [isHeroAnimatedOut]);

  // useEffect(() => {
  //   console.log("Office "+ progress)
  // }, [progress]);

  // const springConfig = { mass: 0.5, stiffness: 150, damping: 40, restDelta: 0.01 };
  // const backgroundTranslateY = useSpring(0, springConfig);

  // const { scrollY } = useScroll({
  //   container: officeSectionRef.current,
  //   layoutEffect: false,
  // });

  useEffect(() => {
    const handleScroll = () => {
      // Update progress from scrollYProgress (0 to 1)
      const scrollProgress = scrollYProgress.get();
      setProgress(scrollProgress);

      // Change video sources based on scroll progress
      if (scrollProgress >= 0.4 && scrollProgress < 0.7) {
        setLeftVideoSrc("src/assets/office/glitch.mp4");
        setRightVideoSrc("src/assets/office/glitch.mp4");
      } else if (scrollProgress >= 0.7) {
        setLeftVideoSrc("src/assets/office/chair_pink.mp4");
        setRightVideoSrc("src/assets/office/chair_pink.mp4");
      } else {
        setLeftVideoSrc("src/assets/office/office party.mp4");
        setRightVideoSrc("src/assets/office/cat.mp4");
      }
    };

    // Subscribe to scrollYProgress changes
    const unsubscribe = scrollYProgress.onChange(handleScroll);

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <motion.div 
      className='main-section' 
      ref={officeSectionRef}
      // variants={officeAnimationVariants} 
      // initial="initial" 
      // animate={isHeroAnimatedOut ? "animate" : "initial"} 
      >
      <div className="black-transition"></div>
      {/* <motion.div className="black-screen"></motion.div> */}
      <div className='office-content'>
        <motion.div
          className="hero-section_sibling"
          initial="initial"
          animate={progress >= 1 ? "animate" : "initial"}
        >
          <div className={`intro-text ${progress >= 0.4 ? "visible" : ""}`}>
            <h2>The Backbone of Productivity<br />Amidst Chaos.</h2>
          </div>
        </motion.div>
        <div className='pc-left pc'>
        <video src={leftVideoSrc} autoPlay muted loop></video>
      </div>
      <div className='pc-right pc'>
        <video src={rightVideoSrc} autoPlay muted loop></video>
      </div>
      </div>
    </motion.div>
  );
};

export default Main;
