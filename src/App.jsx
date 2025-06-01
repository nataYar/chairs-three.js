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

  // const [sectionRanges, setSectionRanges] = useState({});


// useLayoutEffect(() => {
//   const sections = [
//     { key: 'hero', ref: heroRef },
//     { key: 'heroTransition', ref: heroTransitionRef },
//     { key: 'office', ref: officeRef },
//     { key: 'afterOffice', ref: afterOfficeRef },
//     { key: 'slides', ref: slidesRef },
//     { key: 'carousel', ref: carouselRef },
//   ];

//   const totalHeight = document.body.scrollHeight - window.innerHeight;

//   const ranges = {};

//   let prevEnd = 0;
//   sections.forEach(({ key, ref }) => {
//     const el = ref.current;
//     const start = el.offsetTop;
//     const end = start + el.offsetHeight;
//     const normalized = [start / totalHeight, end / totalHeight];
//     ranges[key] = normalized;
//     prevEnd = end;
//   });

//   setSectionRanges(ranges);
// }, []);


  // let ranges = {};

  // const calculateSectionRanges = () => {
  //   const sectionVHs = {
  //     hero: 400,
  //     heroTransition: 150,
  //     office: 100,
  //     afterOffice: 60,
  //     slides: 100,
  //     carousel: 210,
  //   };
  
  //   let scrollStartVH = 0;
  //   const ranges = {};
  
  //   const totalVH = Object.values(sectionVHs).reduce((sum, vh) => sum + vh, 0);
  
  //   for (const key in sectionVHs) {
  //     const start = scrollStartVH;
  //     const end = scrollStartVH + sectionVHs[key];
  //     ranges[key] = [start / totalVH, end / totalVH];
  //     scrollStartVH = end;
  //   }
  
  //   return ranges;
  // };
  

  
  // useEffect(() => {
  //   const ranges = calculateSectionRanges();
  //   setSectionRanges(ranges);
  // }, []);

  // useEffect(() => {
  //  console.log(sectionRanges)
  // }, [sectionRanges]);

  
  // const normalizeRanges = (ranges, totalScroll) => {
  //   const normalize = ([start, end]) => [start / totalScroll, end / totalScroll];
  
  //   return {
  //     hero: normalize(ranges.hero),
  //     heroTransition: normalize(ranges.heroTransition),
  //     office: normalize(ranges.office),
  //     afterOffice: normalize(ranges.afterOffice),
  //     slides: normalize(ranges.slides),
  //     carousel: normalize(ranges.carousel),
  //   };
  // };

  // useEffect(() => {
  //   const normalized = calculateSectionRanges();
  
  //   setHeroRange(normalized.hero);
  //   setHeroTransitionRange(normalized.heroTransition);
  //   setOfficeRange(normalized.office);
  //   setAfterOfficeRange(normalized.afterOffice);
  //   setSlidesRange(normalized.slides);
  //   setCarouselRange(normalized.carousel);
  // }, []);
  
  

  // useEffect(() => {
  //   const sections = {
  //     hero: 400,
  //     heroTransition: 150,
  //     office: 100,
  //     afterOffice: 60,
  //     slides: 100,
  //     carousel: 210,
  //   };

  //   const sectionNames = Object.keys(sections);

  //   const totalVh = Object.values(sections).reduce((sum, h) => sum + h, 0);
  //   const scrollableVh = totalVh - 100; // subtract 100vh of initial visible viewport

  //   let cumulativeVh = 0;
  //   const ranges = {};

  //   for (const name of sectionNames) {
  //     const start = cumulativeVh / scrollableVh;
  //     cumulativeVh += sections[name];
  //     const end = cumulativeVh / scrollableVh;

  //     ranges[name] = [parseFloat(start.toFixed(4)), parseFloat(end.toFixed(4))];
  //   }

  //   setHeroRange(ranges.hero);
  //   setHeroTransitionRange(ranges.heroTransition);
  //   setOfficeRange(ranges.office);
  //   setAfterOfficeRange(ranges.afterOffice);
  //   setSlidesRange(ranges.slides);
  //   setCarouselRange(ranges.carousel);
  // }, []);
  
  
  // useEffect(() => {
  //   const updateRanges = () => {
  //     const vh = window.innerHeight;
  
  //     // Define section heights in vh
  //     const sectionHeightsVh = {
  //       hero: 400,
  //       heroTransition: 150,
  //       office: 100,
  //       afterOffice: 60,
  //       slides: 100,
  //       carousel: 210,
  //     };
  
  //     // Convert to px
  //     const sectionHeightsPx = Object.entries(sectionHeightsVh).map(
  //       ([key, value]) => [key, (value / 100) * vh]
  //     );
  
  //     const totalScrollableHeight =
  //       sectionHeightsPx.reduce((sum, [, px]) => sum + px, 0) - vh;
  
  //     let offset = 0;
  //     for (let [key, height] of sectionHeightsPx) {
  //       const start = offset / totalScrollableHeight;
  //       const end = (offset + height) / totalScrollableHeight;
  
  //       // Set the corresponding range
  //       switch (key) {
  //         case "hero":
  //           setHeroRange([start, end]);
  //           break;
  //         case "heroTransition":
  //           setHeroTransitionRange([start, end]);
  //           break;
  //         case "office":
  //           setOfficeRange([start, end]);
  //           break;
  //         case "afterOffice":
  //           setAfterOfficeRange([start, end]);
  //           break;
  //         case "slides":
  //           setSlidesRange([start, end]);
  //           break;
  //         case "carousel":
  //           setCarouselRange([start, end]);
  //           break;
  //         default:
  //           break;
  //       }
  
  //       offset += height;
  //     }
  //   };
  
  //   updateRanges();
  //   window.addEventListener("resize", updateRanges);
  //   return () => window.removeEventListener("resize", updateRanges);
  // }, []);
  
  
  
 


    

  return (
    <div id="smooth-wrapper"> 
      <ReactLenis root />
      <div
      ref={containerRef}
      className="app-container" 
      >
     
     <div ref={heroRef} >
       <Hero 
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