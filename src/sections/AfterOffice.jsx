import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useSpring, useTransform, useAnimation  } from "framer-motion";
import "../styles/AfterOffice.scss"

const AfterOffice = ({ progress, updateRange, afterOfficeRange }) => {

  const currentProgress = useTransform(progress, afterOfficeRange, [0, 1]);

  const springConfig = { mass: 1, stiffness: 100, damping: 40, restDelta: 0.001 };

  // Define the pixel values for the y-axis transformation.
  const startY = window.innerHeight * 0.1; // Equivalent to "30vh"
  const endY = window.innerHeight * 0.8; // Equivalent to "80vh"

  // Create a raw transform for the y position using numerical values.
  const rawY = useTransform(currentProgress, [0.4, 0.8], [startY, endY]);

  // Wrap the transform with a spring for smooth, spring-like motion.
  const springY = useSpring(rawY, springConfig);

  return (
  <div 
  // ref={containerRef}
  className="after-office">
     <motion.div
            className="carousel-text-container"
            initial={{ opacity: 0, y: "10vh" }}
            style={{
              opacity: useTransform(currentProgress, [0.4, 0.8], [0, 1]),
              y: springY,
            }}
            >
        <div className="carousel-text">
            <h2 className='first'>
                <span>One</span> 
                <br/>
            Chair,
            </h2>
            <h2
            // className={`${
            //     (backgrounds[currentIndex].overlays || []).some(overlay =>
            //       overlay.src .includes('photo-studio-overlay.png')
            //     ) ? 'text-black' : 'text-white'
            //   }`}
             >
                <br/>
                    <span>Infinite </span> 
                    <br/>
                Contexts
            </h2>
        </div>
      </motion.div>
  </div>
)
}

export default AfterOffice