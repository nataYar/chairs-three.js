import React, { useRef, useEffect, useState } from "react";
import { motion, useSpring, useTransform, useAnimation, useVelocity,  useMotionValueEvent  } from "framer-motion";
import "../../styles/Office.scss";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
ScrollTrigger.config({ ignoreMobileResize: true });

const Office = React.forwardRef((props, officeWrapperRef) => {
  const { progress, officeRange } = props;
  const [leftVideoSrc, setLeftVideoSrc] = useState("/assets/office/office party.mp4");
  const [rightVideoSrc, setRightVideoSrc] = useState("/assets/office/cat.mp4");
  const mainRef = useRef(null);
  const textContainerRef = useRef(null);
  const officeProgress = useTransform(progress, officeRange, [0, 1]);

  useGSAP(() => {
    if (!officeWrapperRef.current || !mainRef.current ) return;

    ScrollTrigger.create({
      trigger: officeWrapperRef.current,
      start: "top top",      // when Office hits top of viewport
      end: "+=200%",         
      pin: mainRef.current, // pin the main section
      scrub: true,    
      // pinType: "fixed",      
      // markers: true          
    });
  }, []);

  useEffect(() => {
    const handleOfficeAnimation = () => {
      const value = officeProgress.get();
     
      if (value <= 0.05 || value > 0.6) {
        setLeftVideoSrc("/assets/office/office party.mp4");
        setRightVideoSrc("/assets/office/cat.mp4");
      } else if (value > 0.3 && value <= 0.6) {
        setLeftVideoSrc("/assets/office/glitch.mp4");
        setRightVideoSrc("/assets/office/glitch.mp4");
        
      }
    };
  
    // Run immediately on mount
    handleOfficeAnimation();
  
    const unsubscribe = officeProgress.on("change", handleOfficeAnimation);
    return () => unsubscribe();
  }, [officeProgress]);

   useMotionValueEvent(officeProgress, "change", (latest) => {
      console.log("office Progress changed:", latest);
    });

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
  const xLine2 = useSpring(createLineX(0), { mass: 3, stiffness: 200, damping: 50 });
  const xLine3 = useSpring(createLineX(0.4), { mass: 3, stiffness: 200, damping: 50 });
  

  return (
    <>
      <div 
        ref={mainRef} 
        className='main_section' 
        >
        <div>
          <div className="pc_container">
              <div className="pc pc_left">
                <video style={{ pointerEvents: 'none' }} src={leftVideoSrc}  
                autoPlay 
                muted 
                loop 
                playsInline 
                disablePictureInPicture 
                ></video>
              </div>
              <div className="pc pc_right">
                <video style={{ pointerEvents: 'none' }} src={rightVideoSrc}  autoPlay 
                muted 
                loop 
                playsInline 
                disablePictureInPicture ></video>
              </div>
          </div>

          <div className='office_content'></div> 
          <motion.div
            ref={textContainerRef}
            className="text_container"
          >
          <motion.h2 style={{ x: xLine1, skewX }}>the backbone</motion.h2>
          <motion.h2 style={{ x: xLine2, skewX }}>of productivity</motion.h2>
          <motion.h2 style={{ x: xLine3, skewX }}>amidst chaos</motion.h2>

        
          </motion.div>
        </div>
      </div>
      {/* <div style={{ height: '100vh', backgroundColor: "green" }} />  */}
    </>
  );
});

export default Office;
