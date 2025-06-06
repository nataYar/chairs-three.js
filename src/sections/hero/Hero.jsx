import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Plane} from '@react-three/drei';
import { motion, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from 'gsap';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// Import Components
import Chair1 from "./Chair1";
import Chair2 from "./Chair2";
import Chair3 from "./Chair3";
import Chair4 from "./Chair4";
import Chair5 from "./Chair5";
import Chair6 from "./Chair6";
import Chair7 from "./Chair7";
import HeroChair from "./HeroChair";
import HeroZoomAnimation from "./HeroZoomAnimation";

// Styles
import "../../styles/Hero.scss";

const Hero = ({ afterOfficeRef, progress, heroRange, heroTransitionRange, officeRange, afterOfficeRange, slidesRange, carouselRange, isMobile }) => {
  const [isCanvasLoaded, setIsCanvasLoaded] = useState(false);

  const [isNonFixedDelayed, setIsNonFixedDelayed] = useState(false); 
  const containerHeroRef = useRef(null);

  const heroChairRef = useRef(null);
  const canvasRef = useRef(null);

  const [chairRefs, setChairRefs] = useState([
    { index: 0, ref: useRef(null) },
    { index: 1, ref: useRef(null) },
    { index: 2, ref: useRef(null) },
    { index: 3, ref: useRef(null) },
    { index: 4, ref: useRef(null) },
    { index: 5, ref: useRef(null) },
    { index: 6, ref: useRef(null) },
  ]);

  const heroProgress = useTransform(progress, heroRange, [0, 1]); 

  //  useEffect(() => {
  //     const unsubscribe = heroProgress.on("change", (latest) => {
  //       console.log("heroProgress:", latest);
  //     });
  //     return () => unsubscribe();
  //   }, [heroProgress]);

  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 0;

  // const canvasAnimationVariants = {
  //   moveCanvas: {
  //     y: heroProgress.get() === 1 ? '-100vh' : '0', 
  //     transition: {
  //       duration: 0.5, 
  //       ease: 'easeInOut',
  //     },
  //   },
  // };

 const officeHalfWay = officeRange[0] + (officeRange[1] - officeRange[0]) * 0.5;
const pinEnd = window.innerHeight * 5.5;

useGSAP(() => {
    if (!canvasRef.current) return;
     ScrollTrigger.create({
       trigger: containerHeroRef.current,
       start: "top top",
       end: () => `${pinEnd}`, 
       pin: canvasRef.current,
      //  pinSpacing: false,
       scrub: true,
      //  markers: true, 
      // onEnter: () => gsap.set(".canvas-container", { x: 0, left: 0, right: 0, marginLeft: 0, marginRight: 0 }),
      // onLeave: () => gsap.set(".canvas-container", { clearProps: "all" }) 
     });
   
  });



useMotionValueEvent(progress, "change", (latest) => {
  if (canvasRef.current) {
    // console.log("Motion progress:", latest);
    // console.log("Inline styles:");
    // console.log("top:", canvasRef.current.style.top);
    // console.log("position:", canvasRef.current.style.position);

    // console.log("Computed styles:");
    // console.log("left:", getComputedStyle(canvasRef.current).left);
    // console.log("position:", getComputedStyle(canvasRef.current).position);
  }
});

  return (
    <motion.div className="hero-section_container"
      ref={containerHeroRef}
      >
      <HeroZoomAnimation 
      progress={progress}
      isNonFixedDelayed={isNonFixedDelayed}
      heroProgress={heroProgress}
      heroRange={heroRange}
      isMobile={isMobile}
      containerHeroRef={containerHeroRef}
      isCanvasLoaded={isCanvasLoaded} 
      />
       <Suspense fallback={null}>
      
      <div 
      ref={canvasRef}
      className="canvas-container" 
      style={{
          // position: "relative",
          margin: "0 auto",
          // opacity: 0.5, 
         // position: isPinned ? "fixed" : "absolute",
          // top: isPinned ? 0 : `${pinThreshold}px`,
        //   left: 0,
          width: '100vw',
          height: '100vh',
          // pointerEvents: 'auto',
        }}
        // animate={canvasAnimationVariants.moveCanvas}
        // transition={{
        //   duration: 0.1, 
        //   ease: "easeInOut"
        // }} 
      >
      
          <Canvas 
        shadows 
        onCreated={() => setIsCanvasLoaded(true)} 
        camera={{
          position: [0, 0, 5],
          fov: 75,
          near: 0.1,
          far: 100,
        }}
        style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 99, 
        pointerEvents: 'auto',
        }}>
            
      <CameraAnimation progress={progress} 
        heroRange={heroRange} 
        isMobile={isMobile} />
    
      <Lighting 
        isMobile={isMobile}
        progress={progress} 
        heroRange={heroRange}  
        heroTransitionRange={heroTransitionRange}
         officeRange={officeRange}
         afterOfficeRange={afterOfficeRange}
         slidesRange={slidesRange} 
         carouselRange={carouselRange}
        />
        <Chair1 ref={chairRefs[0].ref} progress={progress} isMobile={isMobile} />
        <Chair2 ref={chairRefs[1].ref} progress={heroProgress} isMobile={isMobile}  />
        <Chair3 ref={chairRefs[2].ref}  progress={heroProgress} isMobile={isMobile} />
        <Chair4 ref={chairRefs[3].ref} isMobile={isMobile} />
        <Chair5 ref={chairRefs[4].ref}  isMobile={isMobile} />
        <Chair6 ref={chairRefs[5].ref} progress={heroProgress} isMobile={isMobile} />
        <Chair7 ref={chairRefs[6].ref} progress={heroProgress} isMobile={isMobile} />
        <HeroChair 
        canvasRef={canvasRef}
        ref={heroChairRef} 
        heroProgress={heroProgress}  
        progress={progress} 
        heroRange={heroRange} 
        heroTransitionRange={heroTransitionRange}
        officeRange={officeRange}
        afterOfficeRange={afterOfficeRange}
        slidesRange={slidesRange} 
        carouselRange={carouselRange}
        heroChairRef={heroChairRef}
        isMobile={isMobile} />
        <ShadowPlane />
      </Canvas>
     </div> 
  </Suspense>
  </motion.div>
  );
};


const CameraAnimation = ({ progress, heroRange }) => {
  const { camera } = useThree();
  const clampedProgress = useTransform(progress, heroRange, [0, 1], { clamp: true });
  const smoothProgress = useSpring(clampedProgress, {
    stiffness: 80,
    damping: 20,
    ease: 'easeInOut'
  });

  // Step 3: Map the smooth progress to Y and Z values
  const yValue = useTransform(smoothProgress, [0, 1], [0, 3.2]);
  const zValue = useTransform(smoothProgress, [0, 1], [5, 2]);

  
  useFrame(() => {
    const y = yValue.get();
    const z = zValue.get();

    if (typeof y !== 'number' || typeof z !== 'number') return;
    camera.position.set(0, y, z);
    camera.updateProjectionMatrix();
    camera.lookAt(0, y, z - 1); 
    // console.log(camera.position)
  });
  
  return null;
};

const Lighting = ({
  progress,
  heroRange,
  heroTransitionRange,
  afterOfficeRange,
  officeRange,
  slidesRange,
  carouselRange,
  isMobile
}) => {
  const directionalLightRef = useRef();
  const ambientLightRef = useRef();

  const hero = useTransform(progress, heroRange, [0, 1]);
  const heroTransition = useTransform(progress, heroTransitionRange, [0, 1]);
  const afterOffice = useTransform(progress, afterOfficeRange, [0, 1]);
  const office = useTransform(progress, officeRange, [0, 1]);
  const slides = useTransform(progress, slidesRange, [0, 1]);
  const carousel = useTransform(progress, carouselRange, [0, 1])
  
  const currentLighting = useRef({
    ambientIntensity: 0,
    directionalIntensity: 0,
  });
  const currentColor = useRef(new THREE.Color('#ffffff'));


  useFrame(() => {
    const heroVal = hero.get();
    const heroT = heroTransition.get();
   
    const officeP = office.get();
    const afterO = afterOffice.get();
    const slidesP = slides.get();
    const carouselS = carousel.get()
    const weights = [heroVal, heroT,  officeP, afterO, slidesP, carouselS];
    const keys = ["heroRange", "heroTransitionRange", "officeRange", "afterOfficeRange", "slidesRange", "carouselRange"];

      const lightingPresets = {
      heroRange: {
        ambientIntensity: 0.5,
        directionalIntensity: 9,
        directionalColor: '#ffffff',
      },
      heroTransitionRange: {
        ambientIntensity: 0.5,
        directionalIntensity: 9,
        directionalColor: '#ffffff',
      },
      officeRange: {
        ambientIntensity: 0.2,
        directionalIntensity: 18,
        directionalColor: '#cdf7ff',
      },
      carouselRange: {
        ambientIntensity: 0.5,
        directionalIntensity: 9,
        directionalColor: '#ffffff',
      },
    };

 
      const p = progress.get(); // current scroll progress between 0 and 1
      const officeHalfWay = officeRange[0] + (officeRange[1] - officeRange[0]) * 0.2;

      let currentKey = "heroRange"; // fallback

      if (p < heroTransitionRange[0]) {
        currentKey = "heroRange";
      } else if (p >= officeHalfWay) {
        currentKey = "officeRange";
      } else {
        currentKey = "carouselRange";
      }

     

      const lerp = (a, b, t) => a + (b - a) * t;
      // Use a default if nothing matched
      const preset = lightingPresets[currentKey] || lightingPresets.heroRange;
      const t = 0.025; // Adjust for speed of transition (smaller = slower)

     // Lerp intensities
    currentLighting.current.ambientIntensity = lerp(
      currentLighting.current.ambientIntensity,
      preset.ambientIntensity,
      t
    );
    currentLighting.current.directionalIntensity = lerp(
      currentLighting.current.directionalIntensity,
      preset.directionalIntensity,
      t
    );

    // Lerp color
    const targetColor = new THREE.Color(preset.directionalColor);
    currentColor.current.lerp(targetColor, t);

    // Apply lighting
    if (ambientLightRef.current) {
      ambientLightRef.current.intensity = currentLighting.current.ambientIntensity;
    }
    if (directionalLightRef.current) {
      directionalLightRef.current.intensity = currentLighting.current.directionalIntensity;
      directionalLightRef.current.color.copy(currentColor.current);
    }

  });
  
  return (
    <>
      <ambientLight ref={ambientLightRef} />
      <directionalLight
        ref={directionalLightRef}
        position={isMobile ? [5, 50, -15] : [12, 50, -15]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={100}
        shadow-camera-near={0.1}
        shadow-camera-left={isMobile ? -45 : -10}
        shadow-camera-right={isMobile ? 15 : 10}
        shadow-camera-top={isMobile ? 15 : 10}
        shadow-camera-bottom={isMobile ? -45 : -10}
      />
    </>
  );
};



// const Lighting = ({ isMobile, isDesktop, 
//   heroProgress,
//   heroTransitionRange, 
//   afterOfficeRange,
//   officeRange,
//   slidesRange }) => {
//   const light = useRef();


//   return (
//     <>
//       <ambientLight intensity={.5} />
//       <directionalLight 
//         ref={light}
//         position={isMobile ? [5, 50, -15] : [12, 50, -15]} 
//         intensity={isMobile ? 9 : 3} 
//         castShadow 
//         shadow-mapSize-width={1024}
//         shadow-mapSize-height={1024}
//         shadow-camera-far={100}
//         shadow-camera-near={0.1}
      
//         shadow-camera-left={isMobile ? -45 : -10} // Adjust shadow camera for mobile
//         shadow-camera-right={isMobile ? 15 : 10}
//         shadow-camera-top={isMobile ? 15 : 10}
//         shadow-camera-bottom={isMobile ? -45 : -10}
//       />
//     </>
//   );
// };

const ShadowPlane = () => {
  const { viewport } = useThree();

  return (
    <Plane 
      position={[0, -7, 0]} 
      rotation={[-Math.PI / 2, 0, 0]} 
      args={[viewport.width * 30, viewport.width * 10]}
      receiveShadow
    >
      <shadowMaterial transparent opacity={0.6} />
    </Plane>
  );
};

export default Hero;
