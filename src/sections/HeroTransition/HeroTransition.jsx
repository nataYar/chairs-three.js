import React, { useState, useEffect, useRef } from 'react'
import { motion, useTransform, useSpring, useMotionValueEvent, useAnimation } from "framer-motion";
import "../../styles/HeroTransition.scss";
import { C, H, A, I, R } from "./chair";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const HeroTransition = ({ progress, heroTransitionRange, containerRef  }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const wrapperRef = useRef(null);
  const controls = useAnimation();

   const heroTransition = useTransform(progress, heroTransitionRange , [0, 1]); 
  
   const animationProgress = useTransform(heroTransition, [0.2, 0.6], [0, 1]);

    
useMotionValueEvent(heroTransition, "change", (latest) => {
    console.log("heroTransition changed:", latest);
  });
  

useGSAP(() => {
  if (!wrapperRef.current) return;

  const trigger = ScrollTrigger.create({
    trigger: wrapperRef.current,
    start: "top top",         // when wrapper's top hits viewport top
    end: "+=100%",
    scrub: true,
    pin: wrapperRef.current,
    // markers: true,
    onUpdate: (self) => {
      progress.set(self.progress);
    },
  });

  return () => trigger.kill();
}, []);

const letters = [C, H, A, I, R];

const slicePositions = ["0%", "25%", "50%", "75%"];

const baseStart = 0.1;
const baseEnd = 0.4;
const staggerStep = 0.0025; 
// const staggerStep = 0; 
const sliceTargets = [145, 45, -55, -155]; // in %, for each slice row


  return (
    <>
      <div ref={wrapperRef} className="hero-wrapper">
  
      {slicePositions.map((top, idx) => {
      
        const rawY  = useTransform(
          heroTransition,
          [baseStart + idx * staggerStep, baseEnd + idx * staggerStep],
          ["100%", "0%"]
        );

        const lastLetterOffset = (letters.length - 1) * 0.01;

        const yValue = useSpring(rawY, {
          stiffness: 100,
          damping: 20,
          mass: 1,
          });

        const rawWidth = useTransform(
          heroTransition,
          [
            baseStart + idx * staggerStep,
            baseEnd + idx * staggerStep + lastLetterOffset
          ],
          ["400vw", "100vw"]
        );
        const widthValue = useSpring(rawWidth, {
          stiffness: 100,
          damping: 20,
          mass: 1,
        });

        const translateYStart = 250; // initial % (below the view)
        const translateYEnd = sliceTargets[idx]; // final % for this row

        return (
            <motion.div
              key={idx}
              className={`slice slice-index-${idx}`}
              style={{ width: widthValue }}
            >
             
                {letters.map((Letter, i) => {
                  const letterScrollOffset = i * 0.015; // adjust stagger

                  const rawLetterY  = useTransform(
                    heroTransition,
                    [
                      baseStart + idx * staggerStep + letterScrollOffset,
                      baseEnd + idx * staggerStep + letterScrollOffset
                    ],
                    [`${translateYStart}%`, `${translateYEnd}%`]
                  );
                  const letterTranslateY = useSpring(rawLetterY, {
                    stiffness: 100,
                    damping: 20,
                    mass: 1,
                  });

                  return (
                      <motion.div
                      className="word-svg"
                      key={i}
                        style={{
                          translateY: letterTranslateY
                        }}
                      >
                        <Letter />
                    </motion.div>
                  );
                })}
             
            </motion.div>
          );
        })}
         
      </div>
    </>
  
  )
};

export default HeroTransition;