import React, { useRef, useEffect, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Hero from "./sections/hero/Hero";
import Main from "./sections/main/Main";
import './styles/App.scss';

const App = () => {
  const [isScrollDisabled, setIsScrollDisabled] = useState(false); 
  const [hasScrolledToMain, setHasScrolledToMain] = useState(false); 
  const [scrollDirection, setScrollDirection] = useState("down")
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const [heroRange, setHeroRange] = useState([0, 1]);
  const [mainRange, setMainRange] = useState([0, 1]);

  useEffect(()=> {
    console.log(heroRange)
    // console.log(mainRange)
  }, [heroRange, mainRange])

  useEffect(() => {
    window.scrollTo(0, 0); 
    if (containerRef.current) {
      containerRef.current.scrollTop = 0; 
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) { 
      const heroHeight = container.firstChild.offsetHeight; 
      const mainStart = heroHeight; 
      const mainEnd = mainStart + container.lastChild.offsetHeight; 

      setHeroRange([0, mainStart / container.scrollHeight]);
      setMainRange([mainStart / container.scrollHeight, mainEnd / container.scrollHeight]);
    }
  }, [containerRef.current]); // Depend on containerRef.current

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const container = containerRef.current;
    if (container) { 
      const heroHeight = container.firstChild.offsetHeight; // Height of Hero component
      const mainStart = heroHeight; // Scroll position where Main starts
      const mainEnd = mainStart + container.lastChild.offsetHeight; 

      const diff = latest - scrollYProgress.getPrevious()
      setScrollDirection(diff > 0 ? "down" : "up")

      // Dynamically calculate scroll ranges (already done in useEffect)

    //   // Calculate scroll progress relative to Main section
    //   const progressRelativeToMain = 
    //     (latest - heroRange[1]) / (mainRange[1] - heroRange[1]);

    //   // Trigger scroll-to when progressRelativeToMain exceeds a threshold (e.g., 0.1)
    //   if (progressRelativeToMain >= 0.1 && !hasScrolledToMain) {
    //     console.log("Scrolling to Main section...");
    //     container.scrollTo({
    //       top: mainStart, // Scroll to the top of the Main section
    //       behavior: "smooth",
    //     });
    //     setHasScrolledToMain(true); 
    //   }

    //   // Reset scroll-to flag when scrolling back up
    //   if (latest < heroRange[1] && hasScrolledToMain) {
    //     setHasScrolledToMain(false); 
    //   }
    }
  });

  // Function to update Hero and Main scroll ranges dynamically
  const updateHeroRange = (start, end) => {
    setHeroRange([start, end]);
  };

  const updateMainRange = (start, end) => {
    setMainRange([start, end]);
  };

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
    <div id="smooth-wrapper" style={{ overflow: "hidden"}} > 
      <div
      ref={containerRef}
      className="app-container" >
      <Hero progress={scrollYProgress} scrollDirection={scrollDirection} updateRange={updateHeroRange} heroRange={heroRange}/>
      <Main progress={scrollYProgress} scrollDirection={scrollDirection}  updateRange={updateMainRange} mainRange={mainRange}/>
     <div style={{height:"500vh", backgroundColor:"red"}}></div>
    </div>
  </div>
  );
};

export default App;