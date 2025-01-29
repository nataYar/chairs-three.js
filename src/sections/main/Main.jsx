import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import { motion, useScroll, useMotionValueEvent, useSpring, useTransform  } from "framer-motion";

import "../../styles/Main.scss";

const Main = ({ progress, updateRange, mainRange, isHeroAnimatedOut }) => {
  const [leftVideoSrc, setLeftVideoSrc] = useState("src/assets/office/office party.mp4");
  const [rightVideoSrc, setRightVideoSrc] = useState("src/assets/office/cat.mp4");
  const containerRef = useRef(null);
  // const y = useTransform(progress, [0, 0.2], [0, -window.innerHeight]);
  // const officeProgress = useTransform(progress, [0.46, 0.84], [0, 1]);
  const mainY = useSpring(0, { stiffness: 200, damping: 50 }); 

  useEffect(() => {
    if (containerRef.current) {
      const totalScrollHeight = document.body.scrollHeight - window.innerHeight;

      // Get the Main section's offset and height
      const mainOffsetTop = containerRef.current.offsetTop;
      const mainHeight = containerRef.current.offsetHeight;

      // Calculate the dynamic range for Main
      const mainStart = mainOffsetTop / totalScrollHeight;
      const mainEnd = (mainOffsetTop + mainHeight) / totalScrollHeight;

      // Pass the range to App.js through the updateRange function
      updateRange(mainStart, mainEnd);
    }
  }, []);

  const mainProgress = useTransform(progress, mainRange, [0, 1]);
  // console.log(mainRange)
  // const mainRef = useRef(null);
  // const [mainScrollRange, setMainScrollRange] = useState([0, 1]); // Store start and end progress dynamically

  // // Dynamically calculate start and end points for .main-section
  // useLayoutEffect(() => {
  //   if (mainRef.current) {
  //     const mainSection = mainRef.current;
  //     const totalAppHeight = document.body.scrollHeight - window.innerHeight; // Total scrollable height
  //     const mainOffsetTop = mainSection.offsetTop; // Distance from the top of the document
  //     const mainHeight = mainSection.offsetHeight; // Height of .main-section

  //     // Calculate global progress range for .main-section
  //     const start = mainOffsetTop / totalAppHeight;
  //     const end = (mainOffsetTop + mainHeight) / totalAppHeight;

  //     setMainScrollRange([start, end]); // Update the range
  //   }
  // }, []);

  // // Transform global scroll progress into local progress for .main-section
  // const mainProgress = useTransform(progress, mainScrollRange, [0, 1]);

  // useMotionValueEvent(mainProgress, "change", (latest) => {
  //   console.log("Main Section Progress:", latest);
  // });

  useEffect(() => {
    const handleOfficeAnimation = () => {
      if (mainProgress.get() >= 0.7 ) {
        setLeftVideoSrc("src/assets/office/office party.mp4");
        setRightVideoSrc("src/assets/office/cat.mp4");
      } 
      // else if (mainProgress.get() >= 0.5) {
      //   setLeftVideoSrc("src/assets/office/chair_pink.mp4");
      //   setRightVideoSrc("src/assets/office/chair_pink.mp4");
      // } 
      else {
        setLeftVideoSrc("src/assets/office/glitch.mp4");
        setRightVideoSrc("src/assets/office/glitch.mp4");
        
      }
    };

    const unsubscribe = mainProgress.on("change", handleOfficeAnimation);

    // Clean up subscription
    return () => unsubscribe();
  }, [mainProgress]);

  return (
    <motion.div 
    ref={containerRef} 
    className='main-section' 
    style={{ y: mainY }} 
  >

     <div className="pc-container">
    <div className="pc pc-left">
      <video src={leftVideoSrc} autoPlay muted loop></video>
    </div>
    <div className="pc pc-right">
      <video src={rightVideoSrc} autoPlay muted loop></video>
    </div>
  </div>

{/* <div className="black-transition"></div> */}
    {/* .pc elements are now inside .office-content */}
    <div className='office-content'>
      
    </div>
    <motion.div
        className="hero-section_sibling"
        initial="initial"
        animate={progress >= 1 ? "animate" : "initial"}
      >
        <div className={`intro-text ${progress >= 0.4 ? "visible" : ""}`}>
          <h2>The Backbone of Productivity<br />Amidst Chaos.</h2>
        </div>
      </motion.div>
  </motion.div>
  
  );
};

export default Main;
