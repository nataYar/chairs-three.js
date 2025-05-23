import React, { useState, useEffect, useRef } from 'react'
import BackgroundSlider from './BackgroundSlider'
import { motion, AnimatePresence, useMotionValueEvent, useSpring, useTransform, useAnimation  } from "framer-motion";
import "../../styles/Slides.scss";


const Slides = ({ progress, slidesRange, scrollDirection }) => {
const containerRef = useRef(null);
const slidesProgress = useTransform(progress, slidesRange, [0, 1]);

const [hasSnappedToslides, setHasSnappedToslides] = useState(false);

// useMotionValueEvent( progress, "change", (latest) => {
//   const prev = progress.getPrevious();
//   const scrollDirection = latest > prev ? "down" : "up";

//   // Reset flag when scrolling up past slides
//   if (latest < slidesRange[0] && scrollDirection === "up") {
//     setHasSnappedToslides(false);
//   }

//   // Snap when getting close to slides
//   const snapThreshold = 0.007; // tweak this value for sensitivity

//   if (
//     scrollDirection === "down" &&
//     !hasSnappedToslides &&
//     Math.abs(latest - slidesRange[0]) <= snapThreshold
//   ) {
//     setHasSnappedToslides(true);
//     containerRef.current?.scrollIntoView({ behavior: "smooth" });
//   }
// });


//   useMotionValueEvent(progress, "change", (latest) => {
//    console.log("global " +latest)
//   });

//   useMotionValueEvent(slidesProgress, "change", (latest) => {
//     console.log("slides Progress " +slidesProgress)
//    });

//   useEffect(() => {
//     console.log("slidesRange "+ slidesRange)
//   }, [slidesProgress]);

//  useEffect(() => {
//     if (containerRef.current) {
//       const totalScrollHeight = document.body.scrollHeight - window.innerHeight;

//       // Get the slides section's offset and height
//       const slidesOffsetTop = containerRef.current.offsetTop;
//       const slidesHeight = containerRef.current.offsetHeight;

//       // Calculate the dynamic range for slides
//       const slidesStart = slidesOffsetTop / totalScrollHeight;
//       const slidesEnd = (slidesOffsetTop + slidesHeight) / totalScrollHeight;

//       // Pass the range to App.js through the updateRange function
//       updateRange(slidesStart, slidesEnd);
//     }
//   }, []);

//   useMotionValueEvent(slidesProgress, "change", (latest) => {
//     if (latest >= 0) {
//         console.log("started slides")
//     }
//   });


    const backgrounds = [
        {
          src: "src/assets/slides/office.jpg",
          overlays: [
            { src: "src/assets/slides/office-top.png", 
                zIndex: 3, 
                className: "" 
            },
          ],
        },

        {
            src: "src/assets/slides/art-studio.jpg",
            overlays: []
        },
        {
            src: "src/assets/slides/underwater-min.jpg",
            overlays: [
                 { src: "src/assets/slides/underwater-bush.png", 
                  zIndex: 5, 
                  className: ""
                },
                // { src: "src/assets/slides/reef-left.png", 
                //     zIndex: 4, 
                //     className: "" 
                // },
                { src: "src/assets/slides/fish-single.png", 
                    zIndex: 4, 
                    className: "fish-single" 
                },
                { src: "src/assets/slides/fish-right.png", 
                    zIndex: 20, 
                    className: "fish-right" 
                },
                { src: "src/assets/slides/fish-left.png", 
                    zIndex: 2, 
                    className: "fish-left" 
                },
            ],
        },
        {
            src: "src/assets/slides/photo-studio.jpg",
            overlays: [
                { src: "src/assets/slides/photo-studio-overlay.png", 
                    zIndex: 10, 
                    className: null
                },
            ],
        },
        {
            src: "src/assets/slides/car.jpg",
            overlays: [
                
            ],
        },
        {
            src: "src/assets/slides/jungle-min.jpg",
            overlays: [
                { src: "src/assets/slides/jungle-overlay.png",
                    zIndex: 10, 
                    className: "shake" 
                },
            ],
        },
        {
            src: "src/assets/slides/library.jpg",
            overlays: [
              { src: "src/assets/slides/library-gates.png", 
                  zIndex: 3, 
                  className: "" 
              },
              { src: "src/assets/slides/books-back-layer.png", 
                zIndex: 2, 
                className: "books-back" 
                },
                { src: "src/assets/slides/books-front.png", 
                    zIndex: 4, 
                    className: "books-front" 
                },
            ],
        },
        {
            src: "src/assets/slides/space-red.jpg",
            overlays: [
                { src: "src/assets/slides/sparks-bottom.png", 
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
    className='slides-container'
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
        <img src="src/assets/slides/chair.png" alt="Hero Chair" className="chair" />
      </div>
    </div>
  );
}

export default Slides