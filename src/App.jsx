import React, { useRef, useEffect, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

import Hero from "./sections/hero/Hero";
import Office from "./sections/office/office";
import Slides from "./sections/slides/Slides";
import Transition from "./sections/Transition";
import AfterHero from "./sections/Afterhero";
import './styles/App.scss';
import AfterOffice from "./sections/AfterOffice";
import { debounce } from 'lodash';
import Store from "./sections/store/Store";
import SharedChair from "./sections/SharedChair";
import CarouselSection from "./sections/CarouselSection/CarouselSection";

const App = () => { 
  const [scrollDirection, setScrollDirection] = useState("down")
  const containerRef = useRef(null);
  const officeRef = useRef(null);
  const slidesRef = useRef(null);
  const afterOfficeRef = useRef(null)
 
  const { scrollYProgress } = useScroll();

  const [heroRange, setHeroRange] = useState([0, 1]);
  const [officeRange, setOfficeRange] = useState([0, 1]);
  const [slidesRange, setSlidesRange] = useState([0, 1]);

  // custom hook for mob/laptop window size
  const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
      const mediaQueryList = window.matchMedia(query);
      setMatches(mediaQueryList.matches);
      const listener = () => setMatches(mediaQueryList.matches);
      mediaQueryList.addEventListener('change', listener);
      return () => {
        mediaQueryList.removeEventListener('change', listener);
      };
    }, [query]);

    return matches;
  };

  const isMobile = useMediaQuery("(max-width: 799px)");
  // const isDesktop = useMediaQuery("(min-width: 800px)");

  useEffect(()=> {
    console.log("heroRange " + heroRange)
    console.log("officeRange "+ officeRange)
    console.log("slidesRange "+ slidesRange)
  }, [heroRange, officeRange, slidesRange])


  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const container = containerRef.current;
    if (container) { 
      const diff = latest - scrollYProgress.getPrevious()
      setScrollDirection(diff > 0 ? "down" : "up")
    }
  });

  useEffect(() => {
    const handleResize = () => {
      if (!containerHeroRef.current) return;
      const totalScrollHeight = document.body.scrollHeight - window.innerHeight;
      const heroOffsetTop = containerHeroRef.current.offsetTop;
      const heroHeight = containerHeroRef.current.offsetHeight;
      const heroStart = heroOffsetTop / totalScrollHeight;
      const heroEnd = (heroOffsetTop + heroHeight) / totalScrollHeight;
      updateRange(heroStart, heroEnd);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to update Hero and office scroll ranges dynamically
  const updateHeroRange = (start, end) => {
    setHeroRange([start, end]);
  };

  const updateOfficeRange = (start, end) => {
    setOfficeRange([start, end]);
  };

  

  // Inside useEffect:
  useEffect(() => {
    if (officeRef.current) {
      const handleResize = () => {
        const totalScrollHeight = document.body.scrollHeight - window.innerHeight;
        const officeOffsetTop = officeRef.current.offsetTop;
        const officeHeight = officeRef.current.offsetHeight;
        const officeStart = officeOffsetTop / totalScrollHeight;
        const officeEnd = (officeOffsetTop + officeHeight) / totalScrollHeight;
        updateOfficeRange(officeStart, officeEnd);
      };
  
      const debouncedHandleResize = debounce(handleResize, 200); // 200ms delay
  
      handleResize(); // Initial call
      window.addEventListener('resize', debouncedHandleResize);
  
      return () => window.removeEventListener('resize', debouncedHandleResize);
    }
  }, [officeRef]);
  

  const updateAfterOfficeRange = (start, end) => {
    setAfterOfficeRange([start, end]);
  };
  
  useEffect(() => {
    if (afterOfficeRef.current) {
      const handleResize = () => {
        const totalScrollHeight = document.body.scrollHeight - window.innerHeight;
        const afterOfficeOffsetTop = afterOfficeRef.current.offsetTop;
        const afterOfficeHeight = afterOfficeRef.current.offsetHeight;
        const afterOfficeStart = (afterOfficeOffsetTop - window.innerHeight) / totalScrollHeight;
        const afterOfficeEnd = (afterOfficeOffsetTop + afterOfficeHeight) / totalScrollHeight;
        updateAfterOfficeRange(afterOfficeStart, afterOfficeEnd);
      };
  
      // Initial calculation
      handleResize();
  
      // Recalculate on window resize
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [afterOfficeRef]);
  
  // In App.jsx
const updateSlidesRange = (start, end) => {
  setSlidesRange([start, end]);
};

useEffect(() => {
  const handleResize = () => {
    if (!slidesRef.current) return;
    const totalScrollHeight = document.body.scrollHeight - window.innerHeight;
    const slidesOffsetTop = slidesRef.current.offsetTop;
    const slidesHeight = slidesRef.current.offsetHeight;
    const slidesStart = (slidesOffsetTop - window.innerHeight) / totalScrollHeight;
    const slidesEnd = (slidesOffsetTop + slidesHeight) / totalScrollHeight;
    updateSlidesRange(slidesStart, slidesEnd);
  };

  const timeout = setTimeout(handleResize, 100); // delay resize for layout
  window.addEventListener('resize', handleResize);
  return () => {
    clearTimeout(timeout);
    window.removeEventListener('resize', handleResize);
  };
}, [slidesRef]);

useEffect(() => {
  const handleResize = () => {
    if (!storeRef.current) return;
    const totalScrollHeight = document.body.scrollHeight - window.innerHeight;
    const storeOffsetTop = storeRef.current.offsetTop;
    const storeHeight = storeRef.current.offsetHeight;
    const storeStart = (storeOffsetTop - window.innerHeight) / totalScrollHeight;
    const storeEnd = (storeOffsetTop + storeHeight) / totalScrollHeight;
    updatestoreRange(storeStart, storeEnd);
  };

  const timeout = setTimeout(handleResize, 100); // delay resize for layout
  window.addEventListener('resize', handleResize);
  return () => {
    clearTimeout(timeout);
    window.removeEventListener('resize', handleResize);
  };
}, [storeRef]);

const updatestoreRange = (start, end) => {
  setStoreRange([start, end]);
};


  const OPTIONS = { loop: true }
  const SLIDE_COUNT = 5
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  return (
    <div id="smooth-wrapper"> 
      <div
      ref={containerRef}
      className="app-container" 
      >
     
      <Hero progress={scrollYProgress} scrollDirection={scrollDirection} updateRange={updateHeroRange} heroRange={heroRange} isMobile={isMobile}/>

      
      {/* <div className="office" ref={officeRef} >
        <Office progress={scrollYProgress} scrollDirection={scrollDirection} updateRange={updateOfficeRange} officeRange={officeRange}/>
      </div> */}

      {/* <div ref={afterOfficeRef}>
        <AfterOffice progress={scrollYProgress} scrollDirection={scrollDirection} updateRange={updateAfterOfficeRange} afterOfficeRange={afterOfficeRange}/>
      </div>

      <SharedChair
        progress={scrollYProgress}
        officeRange={officeRange}
        slidesRange={slidesRange}
        storeRange={storeRange}
        isMobile={isMobile}
      /> */}
      
      {/* <div ref={slidesRef}>
        <Slides progress={scrollYProgress} scrollDirection={scrollDirection} updateRange={updateSlidesRange} slidesRange={slidesRange} isMobile={isMobile}/>
      </div> */}


      {/* <CarouselSection />  */}
     
     {/* <div ref={storeRef}>
        <Store slides={SLIDES} progress={scrollYProgress} scrollDirection={scrollDirection} storeRange={storeRange}
      />
      </div> */}
     
     
  
     {/* <div style={{height:"500vh", backgroundColor:"red"}}></div> */}
    </div>
  </div>
  );
};

export default App;