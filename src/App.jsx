import React, { useRef, useEffect, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Hero from "./sections/hero/Hero";
import Main from "./sections/main/Main";
import './styles/App.scss';

const App = () => {
  const [isScrollDisabled, setIsScrollDisabled] = useState(false); 
  const [scrollDirection, setScrollDirection] = useState("down")
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    window.scrollTo(0, 0); 
    if (containerRef.current) {
      containerRef.current.scrollTop = 0; 
    }
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const container = containerRef.current;
    const heroHeight = container.firstChild.offsetHeight; // Height of Hero component
    const mainStart = heroHeight; // Scroll position where Main starts

    const diff = latest - scrollYProgress.getPrevious()
    setScrollDirection(diff > 0 ? "down" : "up")

    // console.log(heroHeight)
    // console.log(mainStart)
    // If scroll progress passes 0.2, enforce the scroll position
    // if (latest >= 0.2) {
      // console.log("latest > 0.2")
      // container.scrollTo({
      //   top: mainStart,
      //   behavior: "smooth",
      // });
    // }
  });

  // useMotionValueEvent(scrollYProgress, "change", 
  //   (latest) => {

  //     console.log("Global progress "+latest)
  //   })

  // useEffect(() => {
  //   // Subscribe to `scrollYProgress` updates
  //   const unsubscribe = scrollYProgress.on("change", (value) => {
  //     console.log("Scroll Progress:", value); // Log updated progress
  //   });

  //   return () => unsubscribe(); // Clean up the listener
  // }, [scrollYProgress]);

  return (
    // <div id="smooth-wrapper" className={isScrollDisabled ? 'no-scroll' : ''}> 
    //   <div id="smooth-content" className="app-container" ref={containerRef}>
    //     <Hero progress={scrollYProgress} />
    //     <Main progress={scrollYProgress}  />
    //   </div>
    // </div>
    <div id="smooth-wrapper"> 
      <div
      ref={containerRef}
      className="app-container"
     >
      {/* <div style={{ scrollSnapAlign: "start", height: "100vh" }}> */}
        <Hero progress={scrollYProgress} scrollDirection={scrollDirection}/>
      {/* </div> */}
      {/* <div style={{ scrollSnapAlign: "start", height: "100vh" }}> */}
        <Main progress={scrollYProgress} />
      {/* </div> */}
    </div>
  </div>
  );
};

export default App;