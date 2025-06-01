import React, {useEffect} from 'react'
import { motion, useTransform, useSpring, useMotionValueEvent, useAnimation } from "framer-motion";

const HeroTransition = ({ progress, heroTransitionRange  }) => {
  const heroTransition = useTransform(progress, heroTransitionRange , [0, 1]); 

  //  useEffect(() => {
  //     const unsubscribe = heroTransition.on("change", (latest) => {
  //       console.log("hero Transition progress:", latest);
  //     });
  //     return () => unsubscribe();
  //   }, [heroTransition]);

  return (
    <></>
  )
}

export default HeroTransition