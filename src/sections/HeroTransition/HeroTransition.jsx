import React, { useState, useEffect, useRef } from 'react'
import { motion, useTransform, useSpring, useMotionValueEvent, useAnimation } from "framer-motion";
import "../../styles/HeroTransition.scss";
import { C, H, A, I, R } from "./chair";


const HeroTransition = ({ progress, heroTransitionRange  }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const containerRef = useRef(null);
  const controls = useAnimation();

   const heroTransition = useTransform(progress, heroTransitionRange , [0, 1]); 
  
   const animationProgress = useTransform(heroTransition, [0.2, 0.6], [0, 1]);

useMotionValueEvent(heroTransition, "change", (latest) => {
    console.log("heroTransition changed:", latest);
  });
  

const hasTriggeredRef = useRef(false);


// useMotionValueEvent(heroTransition, "change", (latest) => {
//     if (containerRef.current) {
//       if (latest >= 0.5 || latest <= 1) {
//         controls.start("visible");
//       } else if (latest < 0.5) {
//         controls.start("hidden");
//       }
//     }
//   });



// useEffect(() => {
//   const handleHeroAnimation = async () => {
//     const value = heroTransition.get();
//     if (!containerRef.current) return;

//     // Scroll past 0.5 triggers the animation ONCE
//     if (value >= 0.5 && !hasTriggeredRef.current) {
//       hasTriggeredRef.current = true;

//       controls.start("visible")
//       // await controls.start("visible").then(() => {
//         // const svgs = containerRef.current.querySelectorAll(
//         // ".slice-index-0 .word-svg > div > svg, " +
//         // ".slice-index-1 .word-svg > div > svg, " +
//         // ".slice-index-2 .word-svg > div > svg, " +
//         // ".slice-index-3 .word-svg > div > svg"
//         // );
//         // console.log(svgs.length)
//         // svgs.forEach((svg, idx) => {
//         //     const sliceIndex = Math.floor(idx / 5); // groups of 5: 0–4, 5–9, etc.
//         //     svg.style.transition = "transform 0.4s ease";
//         //     svg.style.transform = `scaleY(4) translateY(-${sliceIndex * 25}%)`;  
//         // });
//       // })
//     }
//     // Optional: reset only if user scrolls **far** back
//     if (value < 0.5 && hasTriggeredRef.current) {
//       hasTriggeredRef.current = false;

//       await controls.start("hidden").then(() => {
//         // const svgs = containerRef.current.querySelectorAll(
//         //   ".slice-index-0 .word-svg > div > svg, " +
//         //   ".slice-index-1 .word-svg > div > svg, " +
//         //   ".slice-index-2 .word-svg > div > svg, " +
//         //   ".slice-index-3 .word-svg > div > svg"
//         // );

//         // svgs.forEach((svg, idx) => {
//         //   const sliceIndex = Math.floor(idx / 5);
//         //   svg.style.transition = "transform 0.3s ease";
//         //   svg.style.transform = `scaleY(1) translateY(${sliceIndex * 25}%)`;
//         // });
//       });
//     }

//   };

//   handleHeroAnimation(); // Run once on mount

//   const unsubscribe = heroTransition.on("change", handleHeroAnimation);
//   return () => unsubscribe();
// }, [heroTransition, controls]);



  const letters = [C, H, A, I, R];

const slicePositions = ["0%", "25%", "50%", "75%"];

const baseStart = 0.5;
const baseEnd = 0.6;
const staggerStep = 0.0025; 
// const staggerStep = 0; 
const sliceTargets = [145, 45, -55, -155]; // in %, for each slice row


  return (
  <div ref={containerRef} className="hero-wrapper">
  
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
      ["500vw", "100vw"]
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
          {/* <div className="word-svg"> */}
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
          {/* </div> */}
        </motion.div>
      );
    })}
  </div>
  )
};

export default HeroTransition;