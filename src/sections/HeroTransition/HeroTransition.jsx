import React, { useState, useEffect, useRef } from 'react'
import { motion, useTransform, useSpring, useMotionValueEvent, useAnimation } from "framer-motion";
import "../../styles/HeroTransition.scss";
import { C, H, A, I, R } from "./chair";


const HeroTransition = ({ progress, heroTransitionRange  }) => {
  const containerRef = useRef(null);
  const controls = useAnimation();

   const heroTransition = useTransform(progress, heroTransitionRange , [0, 1]); 
  
   const animationProgress = useTransform(heroTransition, [0.2, 0.6], [0, 1]);

  useMotionValueEvent(heroTransition, "change", (latest) => {
    if (containerRef.current) {
      if (latest > 0.5) {
        controls.start("visible");
      } else {
        controls.start("hidden");
      }
    }
  });

  const letters = [C, H, A, I, R];

  const sliceVariants = {
    hidden: { y: "100%"},
    visible: { 
      y: "0%",
      transition: { duration: .5, ease: "easeOut",staggerChildren: 0.1,  }
    }
  };

  const letterVariants = {
  hidden: { scale: .4, y: 50 },
  visible: {
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1,  },
  },
};

const slicePositions = ["0%", "25%", "50%", "75%"];

  return (
    <div ref={containerRef} className="hero-wrapper">
     {slicePositions.map((top, idx) => (
  <motion.div
    key={idx}
    // style={{top}}
    className={`slice slice-index-${idx}`}
    variants={sliceVariants}
    initial="hidden"
    animate={controls}
    
  >
    <motion.div className="word-svg">
      {letters.map((Letter, i) => (
        <motion.div key={i} variants={letterVariants}>
          <Letter />
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
))}

    </div>
  );
};

export default HeroTransition;