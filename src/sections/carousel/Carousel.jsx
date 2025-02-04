import React, { useState, useEffect } from 'react'
import BackgroundSlider from './BackgroundSlider'
import { motion,  AnimatePresence, useTransform   } from "framer-motion";
import "../../styles/Carousel.scss";
import '../../styles/Carousel.scss'

const Carousel = () => {
    const backgrounds = [
        // "src/assets/carousel/office-min.jpg",
        // "src/assets/carousel/art-studio-min.jpg",
        // "src/assets/carousel/underwater-min.jpg",
        // "src/assets/carousel/photo-studio.jpg",
        "src/assets/carousel/space-red.jpg",
        // "src/assets/carousel/car.jpg",
        // "src/assets/carousel/jungle-min.jpg",
        // "src/assets/carousel/library-min.jpg",
      ];


      const overlayImages = [
        // "src/assets/carousel/office-top-min.png",
        // null, // No overlay for art-studio.jpg
        // "src/assets/carousel/underwater-bush.png", // Overlay for underwater.jpg
        // "src/assets/carousel/photo-studio-overlay.png",
        "src/assets/carousel/sparks-bottom.png",
        // null, // No overlay for car.jpg
        // "src/assets/carousel/jungle-overlay.png",
        // null, // No overlay for library.jpg
      ];
      const [currentIndex, setCurrentIndex] = useState(0);
      const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
    
      useEffect(() => {
        const interval = setInterval(() => {
          setDirection(1);
          setCurrentIndex((prevIndex) =>
            prevIndex === backgrounds.length - 1 ? 0 : prevIndex + 1
          );
        }, 1500); // Change image every 2 seconds
    
        return () => clearInterval(interval);
      }, []);

  return (
    <div className='carousel-container'>
      <div className="scroll-container">
        <AnimatePresence custom={direction}>
          <motion.div
            key={currentIndex}
            className="background"
            style={{ backgroundImage: `url(${backgrounds[currentIndex]})` }}
            // initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
            // animate={{ opacity: 1, x: 0 }}
            // exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
            // transition={{ duration: 1 }}
          >
            {overlayImages[currentIndex] && (
              <img
                src={overlayImages[currentIndex]}
                alt="Overlay"
                className={`overlay-image ${overlayImages[currentIndex].includes('jungle-overlay.png') ? 'shake' : overlayImages[currentIndex].includes('sparks-bottom.png') ? 'move' : ''}`}
               
              />
            )}
          </motion.div>
        </AnimatePresence>
        <img src="src/assets/carousel/chair.png" alt="Hero Chair" className="chair" />
        <motion.div
            className="text-container"
            // style={{
            // opacity: useTransform(officeProgress, [0, 0.05, 0.6], [0, 1, 0]),
            // y: useTransform(officeProgress, [0, 0.05, 0.6], [-30, 0, 30]),
            // }}
        >
        <div className="text">
          <h2>One <br/>Chair,<br/><span>Infinite Contexts</span></h2>
        </div>
      </motion.div>
      </div>
    </div>
  );
}

export default Carousel