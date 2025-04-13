import React, { useState, useEffect, useRef } from 'react'
import BackgroundSlider from './BackgroundSlider'
import { motion, AnimatePresence, useMotionValueEvent, useSpring, useTransform, useAnimation  } from "framer-motion";
import "../../styles/Carousel.scss";
import '../../styles/Carousel.scss'

const Carousel = ({ progress, carouselRange, scrollDirection }) => {
const containerRef = useRef(null);
const carouselProgress = useTransform(progress, carouselRange, [0, 1]);

const [hasSnappedToCarousel, setHasSnappedToCarousel] = useState(false);

// useMotionValueEvent( progress, "change", (latest) => {
//   const prev = progress.getPrevious();
//   const scrollDirection = latest > prev ? "down" : "up";

//   // Reset flag when scrolling up past Carousel
//   if (latest < carouselRange[0] && scrollDirection === "up") {
//     setHasSnappedToCarousel(false);
//   }

//   // Snap when getting close to Carousel
//   const snapThreshold = 0.007; // tweak this value for sensitivity

//   if (
//     scrollDirection === "down" &&
//     !hasSnappedToCarousel &&
//     Math.abs(latest - carouselRange[0]) <= snapThreshold
//   ) {
//     setHasSnappedToCarousel(true);
//     containerRef.current?.scrollIntoView({ behavior: "smooth" });
//   }
// });


//   useMotionValueEvent(progress, "change", (latest) => {
//    console.log("global " +latest)
//   });

//   useMotionValueEvent(carouselProgress, "change", (latest) => {
//     console.log("carousel Progress " +carouselProgress)
//    });

//   useEffect(() => {
//     console.log("carouselRange "+ carouselRange)
//   }, [carouselProgress]);

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

//   useMotionValueEvent(carouselProgress, "change", (latest) => {
//     if (latest >= 0) {
//         console.log("started CAROUSEL")
//     }
//   });


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
        }, 1500); // Change image every 1 seconds
    
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
      </div>
    </div>
  );
}

export default Carousel