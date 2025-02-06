import React, { useState, useEffect, useRef } from 'react'
import BackgroundSlider from './BackgroundSlider'
import { motion, AnimatePresence, useMotionValueEvent, useSpring, useTransform, useAnimation  } from "framer-motion";
import "../../styles/Carousel.scss";
import '../../styles/Carousel.scss'

const Carousel = ({ progress, updateRange, carouselRange,  }) => {
const containerRef = useRef(null);
const carouselProgress = useTransform(progress, carouselRange, [0, 1]);

  useMotionValueEvent(progress, "change", (latest) => {
   console.log("global " +latest)
  });

  useMotionValueEvent(carouselProgress, "change", (latest) => {
    console.log("carousel Progress " +carouselProgress)
   });

  useEffect(() => {
    console.log("carouselRange "+ carouselRange)
  }, [carouselProgress]);

//  useEffect(() => {
//     if (containerRef.current) {
//       const totalScrollHeight = document.body.scrollHeight - window.innerHeight;

//       // Get the carousel section's offset and height
//       const carouselOffsetTop = containerRef.current.offsetTop;
//       const carouselHeight = containerRef.current.offsetHeight;

//       // Calculate the dynamic range for carousel
//       const carouselStart = carouselOffsetTop / totalScrollHeight;
//       const carouselEnd = (carouselOffsetTop + carouselHeight) / totalScrollHeight;

//       // Pass the range to App.js through the updateRange function
//       updateRange(carouselStart, carouselEnd);
//     }
//   }, []);

  useMotionValueEvent(carouselProgress, "change", (latest) => {
    if (latest >= 0) {
        console.log("started CAROUSEL")
      // Start the one-time animation (if not already started)
    //   textControls.start({
    //     opacity: 1,
    //     y: 0,
    //     transition: { duration: 1, ease: "easeInOut", delay: 1 }

    //   });
    }
  });


    const backgrounds = [
        {
          src: "src/assets/carousel/office.jpg",
          overlays: [
            { src: "src/assets/carousel/office-top.png", 
                zIndex: 3, 
                className: "" 
            },
          ],
        },

        {
            src: "src/assets/carousel/art-studio.jpg",
            overlays: []
        },
        {
            src: "src/assets/carousel/underwater-min.jpg",
            overlays: [
                 { src: "src/assets/carousel/underwater-bush.png", 
                  zIndex: 5, 
                  className: ""
                },
                // { src: "src/assets/carousel/reef-left.png", 
                //     zIndex: 4, 
                //     className: "" 
                // },
                { src: "src/assets/carousel/fish-single.png", 
                    zIndex: 4, 
                    className: "fish-single" 
                },
                { src: "src/assets/carousel/fish-right.png", 
                    zIndex: 20, 
                    className: "fish-right" 
                },
                { src: "src/assets/carousel/fish-left.png", 
                    zIndex: 2, 
                    className: "fish-left" 
                },
            ],
        },
        {
            src: "src/assets/carousel/photo-studio.jpg",
            overlays: [
                { src: "src/assets/carousel/photo-studio-overlay.png", 
                    zIndex: 10, 
                    className: null
                },
            ],
        },
        {
            src: "src/assets/carousel/car.jpg",
            overlays: [
                
            ],
        },
        {
            src: "src/assets/carousel/jungle-min.jpg",
            overlays: [
                { src: "src/assets/carousel/jungle-overlay.png",
                    zIndex: 10, 
                    className: "shake" 
                },
            ],
        },
        {
            src: "src/assets/carousel/library.jpg",
            overlays: [
              { src: "src/assets/carousel/library-gates.png", 
                  zIndex: 3, 
                  className: "" 
              },
              { src: "src/assets/carousel/books-back-layer.png", 
                zIndex: 2, 
                className: "books-back" 
                },
                { src: "src/assets/carousel/books-front.png", 
                    zIndex: 4, 
                    className: "books-front" 
                },
            ],
        },
        {
            src: "src/assets/carousel/space-red.jpg",
            overlays: [
                { src: "src/assets/carousel/sparks-bottom.png", 
                    zIndex: 2, 
                    className: "stars-move" 
                },
            ],
        },
      ];

      const [currentIndex, setCurrentIndex] = useState(0);
      const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
    
      useEffect(() => {
        const interval = setInterval(() => {
          setDirection(1);
          setCurrentIndex((prevIndex) =>
            prevIndex === backgrounds.length - 1 ? 0 : prevIndex + 1
          );
        }, 2000); // Change image every 2 seconds
    
        return () => clearInterval(interval);
      }, []);

  return (
    <div  ref={containerRef} 
    className='carousel-container'
    >
      <div className="scroll-container">
        <AnimatePresence custom={direction}>
          <motion.div
            key={currentIndex}
            className="background"
            style={{ backgroundImage: `url(${backgrounds[currentIndex].src})` }}
          >
            {
            (backgrounds[currentIndex].overlays || []).map((overlay, index) => (
              <img 
                key={index} 
                src={overlay.src} 
                alt="Overlay" 
                style={{zIndex: overlay.zIndex}}
                className={`overlay-image ${overlay.className || ''}`} 
              />
            ))}
          </motion.div>
        </AnimatePresence>
        <img src="src/assets/carousel/chair.png" alt="Hero Chair" className="chair" />
        
        <motion.div
            className="carousel-text-container"
            initial={{ opacity: 0, y: "-60vh" }}
            style={{
                opacity: useTransform(carouselProgress, [-0.1, 0], [0, 1]),
                y: useTransform(carouselProgress, [0, 0.3], ["-60vh", "0vh"]),
              }}
            >
        <div className="carousel-text">
            <h2 className='first'>
                <span>One</span> 
                <br/>
            Chair,
            </h2>
            <h2
            className={`${
                (backgrounds[currentIndex].overlays || []).some(overlay =>
                  overlay.src .includes('photo-studio-overlay.png')
                ) ? 'text-black' : 'text-white'
              }`}
             >
                <br/>
                    <span>Infinite </span> 
                    <br/>
                Contexts
            </h2>
        </div>
      </motion.div>
      </div>
    </div>
  );
}

export default Carousel