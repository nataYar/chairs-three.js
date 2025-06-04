import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import { ReactLenis, useLenis } from 'lenis/react'
import { useScroll, useMotionValueEvent } from "framer-motion";


import Hero from "./sections/hero/Hero";
import Office from "./sections/office/office";
import Slides from "./sections/slides/Slides";
import HeroTransition from "./sections/HeroTransition/HeroTransition";

import './styles/App.scss';
import AfterOffice from "./sections/AfterOffice";
import { debounce } from 'lodash';
import CarouselSection from "./sections/CarouselSection/CarouselSection";



const App = () => { 
  const containerRef = useRef(null);
  const heroRef = useRef(null)
  const heroTransitionRef = useRef(null)
  const officeRef = useRef(null);
  const afterOfficeRef = useRef(null)
  const slidesRef = useRef(null);
  const carouselRef = useRef(null)
  
  
  const { scrollYProgress } = useScroll();

  // const [heroRange, setHeroRange] = useState([0, 1]);
  // const [heroTransitionRange, setHeroTransitionRange] = useState([0, 1]);
  // const [officeRange, setOfficeRange] = useState([0, 1]);
  // const [afterOfficeRange, setAfterOfficeRange] =  useState([0, 1]);
 
  // const [slidesRange, setSlidesRange] = useState([0, 1]);
  // const [carouselRange, setCarouselRange] = useState([0, 1]);

  const [heroRange, setHeroRange] = useState([0, 0.43]);
  const [heroTransitionRange, setHeroTransitionRange] = useState([0.32, 0.59]);
  const [officeRange, setOfficeRange] = useState([0.489, 0.7]);
  const [afterOfficeRange, setAfterOfficeRange] =  useState([0.53, 0.77]);
 
  const [slidesRange, setSlidesRange] = useState([0.65, 0.88]);
  const [carouselRange, setCarouselRange] = useState([0.79, 1]);
  
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

  const OPTIONS = { loop: true }
  const SLIDE_COUNT = 5
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  return (
    <div id="smooth-wrapper"> 
      {/* <ReactLenis root /> */}
      <div
      ref={containerRef}
      className="app-container" 
      >
     
     <div ref={heroRef} >
       <Hero 
       afterOfficeRef={afterOfficeRef}
       progress={scrollYProgress} 
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
        heroTransitionRange={heroTransitionRange}
       
        />
      </div>

 
      <div className="office" ref={officeRef} >
        <Office progress={scrollYProgress} officeRange={officeRange} />
      </div>

      <div ref={afterOfficeRef}>
        <AfterOffice progress={scrollYProgress} afterOfficeRange={afterOfficeRange}/>
      </div>

      {/* <SharedChair
        progress={scrollYProgress}
        officeRange={officeRange}
        slidesRange={slidesRange}
        isMobile={isMobile}
      />
       */}

      <div ref={slidesRef}>
        <Slides progress={scrollYProgress} slidesRange={slidesRange} isMobile={isMobile}/>
      </div>

      <div ref={carouselRef}>
        <CarouselSection /> 
      </div>
      
     
     
  
     
    </div>
  </div>
  );
};

export default App;