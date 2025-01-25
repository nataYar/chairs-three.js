import React, { Suspense, useRef, useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useSpring, useTransform  } from "framer-motion";

import "../../styles/Main.scss";

const Main = ({ progress, isHeroAnimatedOut }) => {
  const [leftVideoSrc, setLeftVideoSrc] = useState("src/assets/office/office party.mp4");
  const [rightVideoSrc, setRightVideoSrc] = useState("src/assets/office/cat.mp4");
  const containerRef = useRef(null);
  // const y = useTransform(progress, [0, 0.2], [0, -window.innerHeight]);
  const officeProgress = useTransform(progress, [0.2, 0.4], [0, 1]);
  const mainY = useSpring(0, { stiffness: 200, damping: 50 }); 

  useMotionValueEvent(officeProgress, "change", (scrollProgress) => {
    console.log(scrollProgress)
  });
  // useEffect(() => {
  //   const handleScroll = () => {
  //   if (containerRef.current) {
  //     const viewportHeight = window.innerHeight; // Get the viewport height dynamically

  //     if (officeProgress.get() >= 0.2 || officeProgress.get() <= 0.01) {
  //       mainY.set(-viewportHeight * 2); // Move Main section up by 1 viewport height
  //     } else {
  //       mainY.set(0); // Reset Main section to its original position
  //     }
  //   }
  // };
  
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [progress, mainY]); 


  useEffect(() => {
    const handleOfficeAnimation = () => {
      if (officeProgress.get() >= 0.4 && officeProgress.get() < 0.7) {
        setLeftVideoSrc("src/assets/office/glitch.mp4");
        setRightVideoSrc("src/assets/office/glitch.mp4");
      } else if (officeProgress.get() >= 0.7) {
        setLeftVideoSrc("src/assets/office/chair_pink.mp4");
        setRightVideoSrc("src/assets/office/chair_pink.mp4");
      } else {
        setLeftVideoSrc("src/assets/office/office party.mp4");
        setRightVideoSrc("src/assets/office/cat.mp4");
      }
    };

    const unsubscribe = officeProgress.on("change", handleOfficeAnimation);

    // Clean up subscription
    return () => unsubscribe();
  }, [officeProgress]);

  return (
    <motion.div 
    ref={containerRef} 
    className='main-section' 
    style={{ y: mainY }} 
  >
    {/* .pc elements are siblings of .office-content */}
    <div className='pc-left pc'>
      <video src={leftVideoSrc} autoPlay muted loop></video>
    </div>
    <div className='pc-right pc'>
      <video src={rightVideoSrc} autoPlay muted loop></video>
    </div>
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
    </div>
  </motion.div>
  );
};

export default Main;
