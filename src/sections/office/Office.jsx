import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValueEvent, useSpring, useTransform  } from "framer-motion";

import "../../styles/Office.scss";

const Office = ({ progress, updateRange, officeRange, isHeroAnimatedOut }) => {
  const [leftVideoSrc, setLeftVideoSrc] = useState("src/assets/office/office party.mp4");
  const [rightVideoSrc, setRightVideoSrc] = useState("src/assets/office/cat.mp4");
  const [globalProgress, setGlobalProgress] = useState(0)
  const containerRef = useRef(null);
  // const y = useTransform(progress, [0, 0.2], [0, -window.innerHeight]);
  // const officeProgress = useTransform(progress, [0.46, 0.84], [0, 1]);
  const officeY = useSpring(0, { stiffness: 200, damping: 50 }); 

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
  // console.log(officeRange)
  // const officeRef = useRef(null);
  // const [officeScrollRange, setofficeScrollRange] = useState([0, 1]); // Store start and end progress dynamically

  // // Dynamically calculate start and end points for .office-section
  // useLayoutEffect(() => {
  //   if (officeRef.current) {
  //     const officeSection = officeRef.current;
  //     const totalAppHeight = document.body.scrollHeight - window.innerHeight; // Total scrollable height
  //     const officeOffsetTop = officeSection.offsetTop; // Distance from the top of the document
  //     const officeHeight = officeSection.offsetHeight; // Height of .office-section

  //     // Calculate global progress range for .office-section
  //     const start = officeOffsetTop / totalAppHeight;
  //     const end = (officeOffsetTop + officeHeight) / totalAppHeight;

  //     setofficeScrollRange([start, end]); // Update the range
  //   }
  // }, []);

  // // Transform global scroll progress into local progress for .office-section
  // const officeProgress = useTransform(progress, officeScrollRange, [0, 1]);

  useMotionValueEvent(officeProgress, "change", (latest) => {
    console.log("Office progress  " +latest)
  });

  useEffect(() => {
    const handleOfficeAnimation = () => {
      if (officeProgress.get() <= 0.1 ) {
        setLeftVideoSrc("src/assets/office/glitch.mp4");
        setRightVideoSrc("src/assets/office/glitch.mp4");
        
      } 
      else if (officeProgress.get() > 0.1 && officeProgress.get() <= 0.6 ){
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
// useEffect(()=>{console.log(progress)},[progress])
useEffect(()=>{console.log(""+globalProgress)},[globalProgress])

useEffect(()=>{setGlobalProgress(progress.get())},[progress])

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
        style={{
          opacity: useTransform(officeProgress, [0, 0.05, 0.6], [0, 1, 0]),
          y: useTransform(officeProgress, [0, 0.05, 0.6], [-30, 0, 30]),
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
