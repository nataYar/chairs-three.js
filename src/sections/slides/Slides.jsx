import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValueEvent, useSpring, useTransform, useAnimation  } from "framer-motion";
import "../../styles/Slides.scss";


const Slides = ({ progress, slidesRange, isMobile }) => {
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
    src: "/assets/slides/office.webp",
    srcMob: "/assets/slides/mob/office-mob.webp",
    overlays: [
      {
        src: "/assets/slides/office-top.png",
        srcMob: "/assets/slides/mob/office-cropped.webp",
        zIndex: 3,
        className: ""
      },
    ],
  },
  {
    src: "/assets/slides/art-studio.webp",
    srcMob: "/assets/slides/mob/art-studio-min.webp",
    overlays: []
  },
  {
    src: "/assets/slides/underwater.webp",
    srcMob: "/assets/slides/mob/underwater-min.webp",
    overlays: [
      {
        src: "/assets/slides/underwater-bush.png",
        srcMob: "/assets/slides/mob/underwater-bush-min.webp",
        zIndex: 5,
        className: ""
      },
      {
        src: "/assets/slides/fish-single.png",
        srcMob: "/assets/slides/mob/fish-single-min.png",
        zIndex: 4,
        className: "fish-single"
      },
      {
        src: "/assets/slides/fish-right.png",
        srcMob: "/assets/slides/mob/fish-right-min.png",
        zIndex: 20,
        className: "fish-right"
      },
      {
        src: "/assets/slides/fish-left.png",
        srcMob: "/assets/slides/mob/fish-left-min.png",
        zIndex: 2,
        className: "fish-left"
      },
    ],
  },
  {
    src: "/assets/slides/photo-studio.webp",
    srcMob: "/assets/slides/mob/photo-studio-min.webp",
    overlays: [
      {
        src: "/assets/slides/photo-studio-overlay.png",
        srcMob: "/assets/slides/mob/photo-studio-overlay-min.png",
        zIndex: 10,
        className: null
      },
    ],
  },
  {
    src: "/assets/slides/car.webp",
    srcMob: "/assets/slides/mob/car-min.webp",
    overlays: []
  },
  {
    src: "/assets/slides/jungle.webp",
    srcMob: "/assets/slides/mob/jungle-min.webp",
    overlays: [
      {
        src: "/assets/slides/jungle-overlay.png",
        srcMob: "/assets/slides/mob/jungle-overlay-min.webp",
        zIndex: 4,
        className: "shake"
      },
    ],
  },
  {
    src: "/assets/slides/library.webp",
    srcMob: "/assets/slides/mob/library-min.webp",
    overlays: [
      {
        src: "/assets/slides/library-gates.png",
        srcMob: "/assets/slides/mob/library-gates-min.webp",
        zIndex: 3,
        className: ""
      },
      {
        src: "/assets/slides/books-back-layer.png",
        srcMob: "/assets/slides/mob/books-back-layer-min.webp",
        zIndex: 2,
        className: "books-back"
      },
      {
        src: "/assets/slides/books-front.png",
        srcMob: "/assets/slides/mob/books-front-min.webp",
        zIndex: 4,
        className: "books-front"
      },
    ],
  },
  {
    src: "/assets/slides/space-red.webp",
    srcMob: "/assets/slides/mob/space-red-min.webp",
    overlays: [
      {
        src: "/assets/slides/sparks-bottom.png",
        srcMob: "/assets/slides/mob/sparks-bottom-min.webp",
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
        }, 2000); // Change image every 1 seconds
    
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
            style={{ 
              backgroundImage:`url(${isMobile ? backgrounds[currentIndex].srcMob : backgrounds[currentIndex].src})` 
          }}
          >
            {
            (backgrounds[currentIndex].overlays || []).map((overlay, index) => (
              <img 
                key={index} 
                src={isMobile ? overlay.srcMob : overlay.src} 
                alt="Overlay" 
                style={{zIndex: overlay.zIndex}}
                className={`overlay-image ${overlay.className || ''}`} 
              />
            ))}
          </motion.div>
        </AnimatePresence>
        <img src="/assets/slides/chair.png" alt="Hero Chair" className="chair" />
      </div>
    </div>
  );
}

export default Slides