import React, { useRef, useEffect, useState } from "react";
import { ReactLenis, useLenis } from 'lenis/react'
import { useScroll, useMotionValueEvent } from "framer-motion";

import Hero from "./sections/hero/Hero";
import Office from "./sections/office/office";
import Slides from "./sections/slides/Slides";
import HeroTransition from "./sections/HeroTransition/HeroTransition";
import AfterHero from "./sections/Afterhero";
import './styles/App.scss';
import AfterOffice from "./sections/AfterOffice";
import { debounce } from 'lodash';

import SharedChair from "./sections/SharedChair";
import CarouselSection from "./sections/CarouselSection/CarouselSection";

const App = () => { 
  const [scrollDirection, setScrollDirection] = useState("down")
  const containerRef = useRef(null);
  const heroRef = useRef(null)
  const heroTransitionRef = useRef(null)
  const officeRef = useRef(null);
  const afterOfficeRef = useRef(null)
  const slidesRef = useRef(null);
  const carouselRef = useRef(null)
  
  
  const { scrollYProgress } = useScroll();

  const [heroRange, setHeroRange] = useState([0, 1]);
  const [heroTransitionRange, setHeroTransitionRange] = useState([0, 1]);
  const [officeRange, setOfficeRange] = useState([0, 1]);
  const [afterOfficeRange, setAfterOfficeRange] =  useState([0, 1]);
 
  const [slidesRange, setSlidesRange] = useState([0, 1]);
  const [carouselRange, setCarouselRange] = useState([0, 1]);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("scrollYProgress changed:", latest);
  });
  


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
    console.log(" heroTransitionRange "+  heroTransitionRange)
    console.log("officeRange "+ officeRange)
    console.log("afterOfficeRange "+ afterOfficeRange)
    console.log("slidesRange "+ slidesRange)
    console.log("carouselRange"+ carouselRange)
  }, [heroRange, heroTransitionRange, afterOfficeRange, officeRange, slidesRange, carouselRange])


    // Function to update Hero and office scroll ranges dynamically
    const updateHeroRange = (start, end) => {
      setHeroRange([start, end]);
    };

    
  useEffect(() => {
    const handleResize = () => {
      if (!heroRef.current) return;
      const totalScrollHeight = document.body.scrollHeight - window.innerHeight;
      const heroOffsetTop = heroRef.current.offsetTop;
      const heroHeight = heroRef.current.offsetHeight;
      const heroStart = heroOffsetTop / totalScrollHeight;
      const heroEnd = (heroOffsetTop + heroHeight) / totalScrollHeight;
      updateHeroRange(heroStart, heroEnd);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const updateOfficeRange = (start, end) => {
    setOfficeRange([start, end]);
  };

  

  // HeroTransition section

  const updateHeroTransitionRange = (start, end) => {
    setHeroTransitionRange([start, end]);
  };
  
  useEffect(() => {
    const handleResize = () => {
      if (!heroTransitionRef.current) return;
      const totalScrollHeight = document.body.scrollHeight - window.innerHeight;
      const heroTransitionOffsetTop = heroTransitionRef.current.offsetTop;
      const heroTransitionHeight = heroTransitionRef.current.offsetHeight;
      const heroTransitionStart = heroTransitionOffsetTop / totalScrollHeight;
      const heroTransitionEnd = (heroTransitionOffsetTop + heroTransitionHeight) / totalScrollHeight;
      updateHeroTransitionRange(heroTransitionStart, heroTransitionEnd);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  


  // Office section:
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
  }, []);
  

  const updateAfterOfficeRange = (start, end) => {
    setAfterOfficeRange([start, end]);
  };
  
  useEffect(() => {
    if (afterOfficeRef.current) {
      const handleResize = () => {
        const totalScrollHeight = document.body.scrollHeight - window.innerHeight;
        const afterOfficeOffsetTop = afterOfficeRef.current.offsetTop;
        const afterOfficeHeight = afterOfficeRef.current.offsetHeight;
        const afterOfficeStart = afterOfficeOffsetTop / totalScrollHeight;

        const afterOfficeEnd = (afterOfficeOffsetTop + afterOfficeHeight) / totalScrollHeight;
        updateAfterOfficeRange(afterOfficeStart, afterOfficeEnd);
      };
  
      // Initial calculation
      handleResize();
  
      // Recalculate on window resize
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  
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
    const slidesStart = slidesOffsetTop / totalScrollHeight;

    const slidesEnd = (slidesOffsetTop + slidesHeight) / totalScrollHeight;
    updateSlidesRange(slidesStart, slidesEnd);
  };

  const timeout = setTimeout(handleResize, 100); // delay resize for layout
  window.addEventListener('resize', handleResize);
  return () => {
    clearTimeout(timeout);
    window.removeEventListener('resize', handleResize);
  };
}, []);

const updateCarouselRange = (start, end) => {
  setCarouselRange([start, end]);
};

useEffect(() => {
  const handleResize = () => {
    if (!carouselRef.current) return;
    
    const totalScrollHeight = document.body.scrollHeight - window.innerHeight;
    const carouselOffsetTop = carouselRef.current.offsetTop;
    const carouselHeight = carouselRef.current.offsetHeight;

    const carouselStart = carouselOffsetTop / totalScrollHeight;
    const carouselEnd = (carouselOffsetTop + carouselHeight) / totalScrollHeight;
    updateCarouselRange(carouselStart, carouselEnd);
  };

  handleResize(); // Initial run
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);




  const OPTIONS = { loop: true }
  const SLIDE_COUNT = 5
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  return (
    <div id="smooth-wrapper"> 
      <ReactLenis root />
      <div
      ref={containerRef}
      className="app-container" 
      >
     
     <div ref={heroRef} >
       <Hero progress={scrollYProgress} updateRange={updateHeroRange} 
       heroRange={heroRange}  
       heroTransitionRange={heroTransitionRange}
        officeRange={officeRange}
        afterOfficeRange={afterOfficeRange}
        slidesRange={slidesRange} 
        carouselRange={carouselRange}
        isMobile={isMobile}/>
     </div>
     

     <div className="hero_transition" ref={heroTransitionRef} >
        <HeroTransition progress={scrollYProgress}  
        updateRange={updateHeroTransitionRange} 
        />
      </div>

 
      <div className="office" ref={officeRef} >
        <Office progress={scrollYProgress} updateRange={updateOfficeRange} officeRange={officeRange} />
      </div>

      <div ref={afterOfficeRef}>
        <AfterOffice progress={scrollYProgress} updateRange={updateAfterOfficeRange} afterOfficeRange={afterOfficeRange}/>
      </div>

      {/* <SharedChair
        progress={scrollYProgress}
        officeRange={officeRange}
        slidesRange={slidesRange}
        isMobile={isMobile}
      />
       */}

      <div ref={slidesRef}>
        <Slides progress={scrollYProgress} scrollDirection={scrollDirection} updateRange={updateSlidesRange} slidesRange={slidesRange} isMobile={isMobile}/>
      </div>

      <div ref={carouselRef}>
        <CarouselSection /> 
      </div>
      
     
     
  
     
    </div>
  </div>
  );
};

export default App;