import React, { useRef, useEffect, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Hero from "./sections/hero/Hero";
import Office from "./sections/office/office";
import Carousel from "./sections/carousel/Carousel";
import Transition from "./sections/Transition";
import AfterHero from "./sections/Afterhero";
import './styles/App.scss';
import AfterOffice from "./sections/AfterOffice";

const App = () => {
  const [scrollDirection, setScrollDirection] = useState("down")
  const containerRef = useRef(null);
  const officeRef = useRef(null);
  const carouselRef = useRef(null);
  const afterOfficeRef = useRef(null)

  const { scrollYProgress } = useScroll();

  const [heroRange, setHeroRange] = useState([0, 1]);
  const [officeRange, setOfficeRange] = useState([0, 1]);
  const [carouselRange, setCarouselRange] = useState([0, 1]);
  const [afterOfficeRange, setAfterOfficeRange] = useState([0, 1]);

  const [isAfterheroVisible, setIsAfterheroVisible] = useState(false);
  const [isAfterheroSticky, setIsAfterheroSticky] = useState(false);
  const [hasShownAfterhero, setHasShownAfterhero] = useState(false); // to make it show just once
  
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  
  useEffect(() => {
    window.scrollTo(0, 0); 
    if (containerRef.current) {
      containerRef.current.scrollTop = 0; 
    }
  }, []);

  useEffect(()=> {
    console.log("heroRange " + heroRange)
    console.log("officeRange "+ officeRange)
    console.log("carouselRange "+ carouselRange)
  }, [heroRange, officeRange, carouselRange])


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
      // console.log("heroHeight "+heroHeight) 
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

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const container = containerRef.current;
    if (container) { 
      const diff = latest - scrollYProgress.getPrevious();
      setScrollDirection(diff > 0 ? "down" : "up");
  
      // Reset hasShownAfterhero when scrolling back up past heroRange[1]
      if (latest < heroRange[1] && scrollDirection === "up") {
        setHasShownAfterhero(false);
      }
  
      // Trigger Afterhero visibility only once when scrolling down past heroRange[1]
      if (latest >= heroRange[1] && scrollDirection === "down" && !isAfterheroSticky && !hasShownAfterhero) {
        setIsAfterheroSticky(true); // Mark as sticky immediately
        setHasShownAfterhero(true); // Mark as shown
  
        // Delay the appearance of Afterhero by 1 second
        setTimeout(() => {
          setIsAfterheroVisible(true); // Make Afterhero visible after 1 second
        }, 500); // 300ms delay
  
        // Set a timeout to hide the Afterhero after 1.5 seconds of being visible
        setTimeout(() => {
          setIsAfterheroVisible(false);
          setIsAfterheroSticky(false); // Reset sticky state
        }, 1500); // 300ms delay + 1.5 seconds visible = 1.8 seconds total
      }
    }
  });

  // In App.jsx
const updateCarouselRange = (start, end) => {
  setCarouselRange([start, end]);
};

useEffect(() => {
  if (carouselRef.current) {
    const handleResize = () => {
      const totalScrollHeight = document.body.scrollHeight - window.innerHeight;
      const carouselOffsetTop = carouselRef.current.offsetTop;
      const carouselHeight = carouselRef.current.offsetHeight;
      const carouselStart = (carouselOffsetTop - window.innerHeight) / totalScrollHeight;
      const carouselEnd = (carouselOffsetTop + carouselHeight) / totalScrollHeight;
      updateCarouselRange(carouselStart, carouselEnd);
    };

    // Initial calculation
    handleResize();

    // Recalculate on window resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }
}, [carouselRef]);


  return (
    <div id="smooth-wrapper" style={{ overflow: "hidden"}} > 
      <div
      ref={containerRef}
      className="app-container" >
      <Hero progress={scrollYProgress} scrollDirection={scrollDirection} updateRange={updateHeroRange} heroRange={heroRange}/>
      
      <AfterHero progress={scrollYProgress} isVisible={isAfterheroVisible}/>
      
      <div ref={officeRef}>
        <Office progress={scrollYProgress} scrollDirection={scrollDirection} updateRange={updateOfficeRange} officeRange={officeRange}/>
      </div>
      <div ref={afterOfficeRef}>
        <AfterOffice progress={scrollYProgress} scrollDirection={scrollDirection} updateRange={updateAfterOfficeRange} afterOfficeRange={afterOfficeRange}/>
      </div>
      {/* <Transition color="black" height={"100vh"}/> */}
      <div ref={carouselRef}>

      <Carousel progress={scrollYProgress} scrollDirection={scrollDirection} updateRange={updateCarouselRange} carouselRange={carouselRange} />
      </div>
     
      <Transition color="black" height={"100vh"}/>
     <div style={{height:"500vh", backgroundColor:"red"}}></div>
    </div>
  </div>
  );
};

export default App;