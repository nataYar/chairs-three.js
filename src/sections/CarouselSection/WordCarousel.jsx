import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/WordCarousel.scss";

const words = ["bars", "castles", "attics"];
const duration = 0.3;
const stagger = 0.05;
const delayBetweenWords = 1800; // ms

const WordCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, delayBetweenWords);
    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <>
    <p>They come from </p>
    <div className="word-carousel">
     
      <AnimatePresence mode="wait">
        <motion.div
          key={words[index]}
          className="word"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
        >
          {words[index].split("").map((char, i) => (
            <motion.span
              className="letter"
              key={i}
              variants={letterVariants}
              transition={{
                duration: duration,
                delay: i * stagger,
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
    </>
    
  );
};

const containerVariants = {
  hidden: {},
  visible: {},
  exit: {},
};

const letterVariants = {
  hidden: { y: "100%", opacity: 1 },
  visible: { y: "0%", opacity: 1 },
  exit: { y: "-100%", opacity: 1 },
};

export default WordCarousel;
