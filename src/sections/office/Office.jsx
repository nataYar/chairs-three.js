import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValueEvent, useSpring, useTransform, useAnimation, useVelocity, useInView  } from "framer-motion";


import "../../styles/Office.scss";

const Office = ({ progress, officeRange }) => {
  const [leftVideoSrc, setLeftVideoSrc] = useState("src/assets/office/office party.mp4");
  const [rightVideoSrc, setRightVideoSrc] = useState("src/assets/office/cat.mp4");
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);

  const officeProgress = useTransform(progress, officeRange, [0, 1]);
  
  useEffect(() => {
    const handleOfficeAnimation = () => {
      const value = officeProgress.get();
     
      if (value <= 0.05 || value > 0.6) {
        setLeftVideoSrc("src/assets/office/glitch.mp4");
        setRightVideoSrc("src/assets/office/glitch.mp4");
      } else if (value > 0.3 && value <= 0.6) {
        setLeftVideoSrc("src/assets/office/office party.mp4");
        setRightVideoSrc("src/assets/office/cat.mp4");
      }
    };
  
    // Run immediately on mount
    handleOfficeAnimation();
  
    const unsubscribe = officeProgress.on("change", handleOfficeAnimation);
    return () => unsubscribe();
  }, [officeProgress]);

  //  useMotionValueEvent(officeProgress, "change", (latest) => {
  //     console.log("office Progress changed:", latest);
  //   });

  // useEffect(() => {
  //   const unsubscribe = officeProgress.on("change", (latest) => {
  //     console.log("officeProgress:", latest);
  //   });
  //   return () => unsubscribe();
  // }, [officeProgress]);



  const scrollVelocity = useVelocity(progress);

  const skewXRaw = useTransform(scrollVelocity, [-0.2, 0.2], ["45deg", "-45deg"]);
  const skewX = useSpring(skewXRaw, { mass: 3, stiffness: 400, damping: 50 });

  const createLineX = (offset = 0) =>
    useTransform(officeProgress, [0 + offset, 0.2 + offset, 0.55 + offset, 0.65 + offset], [-2000, 0, 0, -2000]);
  
  const xLine1 = useSpring(createLineX(0), { mass: 3, stiffness: 200, damping: 50 });
  const xLine2 = useSpring(createLineX(0.05), { mass: 3, stiffness: 200, damping: 50 });
  const xLine3 = useSpring(createLineX(0.1), { mass: 3, stiffness: 200, damping: 50 });
  

  return (
    <div 
    ref={containerRef} 
    className='main-section' 
    >
      <div>
         <div className="pc-container">
      <div className="pc pc-left">
        <video src={leftVideoSrc} autoPlay muted loop></video>
      </div>
      <div className="pc pc-right">
        <video src={rightVideoSrc} autoPlay muted loop></video>
      </div>
    </div>

    <div className='office-content'></div> 
    <motion.div
        ref={textContainerRef}
        className="text-container"
      >
       
      <motion.h2 style={{ x: xLine1, skewX }}>the backbone</motion.h2>
      <motion.h2 style={{ x: xLine2, skewX }}>of productivity</motion.h2>
      <motion.h2 style={{ x: xLine3, skewX }}>amidst chaos</motion.h2>

     
      </motion.div>
      </div>
  </div>
  
  );
};

export default Office;
