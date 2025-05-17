import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import "../../styles/Slides.scss";

// Backgrounds array
const backgrounds = [
  "src/assets/carousel/office.jpg",
  "src/assets/carousel/art-studio.jpg",
  "src/assets/carousel/underwater.jpg",
  "src/assets/carousel/shelves.jpg",
  "src/assets/carousel/disco.jpg",
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
