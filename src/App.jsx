import React, { useRef, useEffect, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Hero from "./sections/hero/Hero";
import Office from "./sections/office/office";
import Carousel from "./sections/carousel/Carousel";
import Transition from "./sections/Transition";
import './styles/App.scss';

const App = () => {
  const [isScrollDisabled, setIsScrollDisabled] = useState(false); 
  const [hasScrolledTooffice, setHasScrolledTooffice] = useState(false); 
  const [scrollDirection, setScrollDirection] = useState("down")
  const containerRef = useRef(null);
  const officeRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const [heroRange, setHeroRange] = useState([0, 1]);
  const [officeRange, setOfficeRange] = useState([0, 1]);

  useEffect(()=> {
    // console.log(heroRange)
    console.log(officeRange)
  }, [heroRange, officeRange])

  // useEffect(() => {
  //   window.scrollTo(0, 0); 
  //   if (containerRef.current) {
  //     containerRef.current.scrollTop = 0; 
  //   }
  // }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const container = containerRef.current;
    if (container) { 
      const diff = latest - scrollYProgress.getPrevious()
      setScrollDirection(diff > 0 ? "down" : "up")
    }
  });

  useEffect(() => {
    const container = containerRef.current;
    if (container) { 
      const heroHeight = container.firstChild?.offsetHeight || 0;
      console.log("heroHeight "+heroHeight) 
      const officeStart = heroHeight; 
      setHeroRange([0, officeStart / container.scrollHeight]);
    }
  }, [containerRef.current?.scrollHeight]);

  // Function to update Hero and office scroll ranges dynamically
  const updateHeroRange = (start, end) => {
    setHeroRange([start, end]);
  };

  const updateOfficeRange = (start, end) => {
    setOfficeRange([start, end]);
  };

  useEffect(() => {
    if (officeRef.current) {
      const handleResize = () => {
        // const totalScrollHeight = document.documentElement.scrollHeight;
        // const officeOffsetTop = officeRef.current.offsetTop;
        // const officeHeight = officeRef.current.offsetHeight;
    
        // const officeStart = officeOffsetTop / totalScrollHeight;
        // const officeEnd = (officeOffsetTop + officeHeight) / totalScrollHeight;
        const totalScrollHeight = document.body.scrollHeight - window.innerHeight;
        const officeOffsetTop = officeRef.current.offsetTop;
        console.log("officeOffsetTop "+officeOffsetTop)
        const officeHeight = officeRef.current.offsetHeight;
        console.log("office Height "+officeHeight)
        const officeStart = officeOffsetTop / totalScrollHeight;
        const officeEnd = (officeOffsetTop + officeHeight) / totalScrollHeight;
        console.log("start "+officeStart +" end "+ officeEnd)
        updateOfficeRange(officeStart, officeEnd);
      };

      // Initial calculation
      handleResize();

      // Recalculate on window resize
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [officeRef]);

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
      <div ref={officeRef}>
        <Office progress={scrollYProgress} scrollDirection={scrollDirection} updateRange={updateOfficeRange} officeRange={officeRange}/>
      </div>
      
      <Transition color="black" height={"80vh"}/>
      <Carousel />
      <Transition color="black" height={"80vh"}/>
     <div style={{height:"500vh", backgroundColor:"red"}}></div>
    </div>
  </div>
  );
};

export default App;