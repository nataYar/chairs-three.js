import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import "../../styles/Slides.scss";

// Backgrounds array
const backgrounds = [
  "src/assets/slides/office.jpg",
  "src/assets/slides/art-studio.jpg",
  "src/assets/slides/underwater.jpg",
  "src/assets/slides/shelves.jpg",
  "src/assets/slides/disco.jpg",
];

const BackgroundSlider = () => {
  const { scrollXProgress } = useScroll();
  const smoothScroll = useSpring(scrollXProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div className="slider">
      <motion.div className="slides" style={{ x: smoothScroll }}>
        {backgrounds.map((bg, index) => (
          <div key={index} className="slide" style={{ backgroundImage: `url(${bg})` }}>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default BackgroundSlider;
