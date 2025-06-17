import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import { ReactLenis, useLenis } from 'lenis/react'
import { useScroll, useMotionValueEvent } from "framer-motion";


import Hero from "./sections/hero/Hero";
import Office from "./sections/office/Office";
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

  const [heroRange, setHeroRange] = useState([0, 1]);
  const [heroTransitionRange, setHeroTransitionRange] = useState([0, 1]);
  const [officeRange, setOfficeRange] = useState([0, 1]);
  const [afterOfficeRange, setAfterOfficeRange] =  useState([0, 1]);
 
  const [slidesRange, setSlidesRange] = useState([0, 1]);
  const [carouselRange, setCarouselRange] = useState([0, 1]);

  // const [heroRange, setHeroRange] = useState([0, 0.316]);
  // const [heroTransitionRange, setHeroTransitionRange] = useState([0.317, .624]);
  // const [officeRange, setOfficeRange] = useState([0.5511, 0.825]);
  // const [afterOfficeRange, setAfterOfficeRange] =  useState([0.53, 0.77]);
 
  // const [slidesRange, setSlidesRange] = useState([0.65, 0.88]);
  // const [carouselRange, setCarouselRange] = useState([0.79, 1]);

 
  
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


  const OPTIONS = { loop: true }
  const SLIDE_COUNT = 5
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())


  
 
useEffect(()=> {
    console.log("heroRange " + heroRange)
    console.log(" heroTransitionRange "+  heroTransitionRange)
    console.log("officeRange "+ officeRange)
    console.log("afterOfficeRange "+ afterOfficeRange)
    console.log("slidesRange "+ slidesRange)
    console.log("carouselRange"+ carouselRange)

  }, [heroRange, heroTransitionRange, afterOfficeRange, officeRange, slidesRange, carouselRange])

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (!heroRef.current) return;
  //     const totalScrollHeight = document.body.scrollHeight - window.innerHeight;
  //     const heroOffsetTop = heroRef.current.offsetTop;
  //     const heroHeight = heroRef.current.offsetHeight;
  //     const heroStart = heroOffsetTop / totalScrollHeight;
  //     const heroEnd = (heroOffsetTop + heroHeight) / totalScrollHeight;
  //     updateHeroRange(heroStart, heroEnd);
  //   };
  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  // const updateHeroRange = (start, end) => {
  //   setHeroRange([start, end]);
  // }


  useEffect(() => {
  const handleResize = () => {
    const totalScrollHeight = document.body.scrollHeight - window.innerHeight;

    const calcRange = (ref) => {
      if (!ref.current) return null;
      const offset = ref.current.offsetTop;
      const height = ref.current.offsetHeight;
      const start = parseFloat((offset / totalScrollHeight).toFixed(3));
      const end = parseFloat(((offset + height) / totalScrollHeight).toFixed(3));
      return [start, end];
    };

    const hero = calcRange(heroRef);
    if (hero) setHeroRange(hero);

    const heroTransition = calcRange(heroTransitionRef);
    if (heroTransition) setHeroTransitionRange(heroTransition);

    const office = calcRange(officeRef);
    if (office) setOfficeRange(office);

    const afterOffice = calcRange(afterOfficeRef);
    if (afterOffice) setAfterOfficeRange(afterOffice);

    const slides = calcRange(slidesRef);
    if (slides) setSlidesRange(slides);

    const carousel = calcRange(carouselRef);
    if (carousel) setCarouselRange(carousel);
  };

  handleResize(); // Run on initial mount
  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);



  return (
    <> 
      <ReactLenis root />
      <div
      ref={containerRef}
      className="app-container" 
      >
     
     <div ref={heroRef}   style={{ width: "100v%" }}>
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
        containerRef={heroTransitionRef} 
        />
      </div>

 
      <div className="office" ref={officeRef} >
        <Office progress={scrollYProgress} officeRange={officeRange} ref={officeRef}/>
      </div>

      <div ref={afterOfficeRef}>
        <AfterOffice progress={scrollYProgress} afterOfficeRange={afterOfficeRange} />
      </div>

      <div ref={slidesRef}>
        <Slides progress={scrollYProgress} slidesRange={slidesRange} isMobile={isMobile} />
      </div>

      <div ref={carouselRef}>
        <CarouselSection isMobile={isMobile} /> 
      </div>

    </div>
  </>
  );
};

export default App;