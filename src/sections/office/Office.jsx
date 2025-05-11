import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValueEvent, useSpring, useTransform, useAnimation  } from "framer-motion";


import "../../styles/Office.scss";

const Office = ({ progress, updateRange, officeRange, isHeroAnimatedOut }) => {
  const [leftVideoSrc, setLeftVideoSrc] = useState("src/assets/office/office party.mp4");
  const [rightVideoSrc, setRightVideoSrc] = useState("src/assets/office/cat.mp4");
  const [globalProgress, setGlobalProgress] = useState(0)
  const containerRef = useRef(null);
  const [hasFadedIn, setHasFadedIn] = useState(false);
  
  // const y = useTransform(progress, [0, 0.2], [0, -window.innerHeight]);
  // const officeProgress = useTransform(progress, [0.46, 0.84], [0, 1]);
  const officeY = useSpring(0, { stiffness: 200, damping: 50 }); 
  const textControls = useAnimation();
 

  useEffect(() => {
    if (containerRef.current) {
      const totalScrollHeight = document.body.scrollHeight - window.innerHeight;

      // Get the office section's offset and height
      const officeOffsetTop = containerRef.current.offsetTop;
      const officeHeight = containerRef.current.offsetHeight;

      // Calculate the dynamic range for office
      const officeStart = officeOffsetTop / totalScrollHeight;
      const officeEnd = (officeOffsetTop + officeHeight) / totalScrollHeight;

      // Pass the range to App.js through the updateRange function
      updateRange(officeStart, officeEnd);
    }
  }, []);

  const officeProgress = useTransform(progress, officeRange, [0, 1]);

  useEffect(() => {
    const handleOfficeAnimation = () => {
      if (officeProgress.get() <= 0.05 ) {
        setLeftVideoSrc("src/assets/office/glitch.mp4");
        setRightVideoSrc("src/assets/office/glitch.mp4");
        
      } 
      else if (officeProgress.get() > 0.05 && officeProgress.get() <= 0.6 ){
        setLeftVideoSrc("src/assets/office/office party.mp4");
        setRightVideoSrc("src/assets/office/cat.mp4");
        
      } else {
        setLeftVideoSrc("src/assets/office/glitch.mp4");
        setRightVideoSrc("src/assets/office/glitch.mp4");
      }
    };

    const unsubscribe = officeProgress.on("change", handleOfficeAnimation);

    // Clean up subscription
    return () => unsubscribe();
  }, [officeProgress]);

 
  useMotionValueEvent(progress, "change", (latest) => {
    setGlobalProgress(latest)
  });


useEffect(()=>{setGlobalProgress(progress.get())},[progress])

const fadeIn = useTransform(officeProgress, [0, 0.07], [0, 1]); // fade in
const fadeOut = useTransform(officeProgress, [0.2, 0.6], [1, 0]); // fade out
const opacity = useTransform([fadeIn, fadeOut], ([a, b]) => a * b); // combine both
// const y = useTransform(officeProgress, [0.2, 0.7], ["0vh", "60vh"]);
 

const springConfig = { mass: 0.5, stiffness: 100, damping: 40, restDelta: 0.001 };

const startY = window.innerHeight * 0.1;
const endY = window.innerHeight * 0.6;
const rawY = useTransform(officeProgress, [0.1, 0.7], [startY, endY]);

  // Wrap the transform with a spring for smooth, spring-like motion.
  const springY = useSpring(rawY, springConfig);

  return (
    <motion.div 
    ref={containerRef} 
    className='main-section' 
    style={{ y: officeY }} >
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
        className="text-container"
        initial={{ opacity: 0, y: -30 }}
        style={{
          opacity,
          y: springY,
        }}
      >
        <div className="text">
          <h2>The Backbone of <br/><span>Productivity</span><br/>Amidst Chaos</h2>
        </div>
      </motion.div>
  </motion.div>
  
  );
};

export default Office;
