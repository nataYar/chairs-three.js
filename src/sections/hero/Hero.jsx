import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Plane} from '@react-three/drei';
import { motion, useTransform, useSpring, useMotionValueEvent, useMotionValue } from "framer-motion";
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
  const [aspect, setAspect] = useState(1.2); // Default fallback
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
  const heroTransitionProgress = useTransform(progress, heroTransitionRange, [0, 1]);
  const halfHero = heroTransitionRange[0] + (heroTransitionRange[1] - heroTransitionRange[0]) * 0.5;
  const sixtyHero = heroTransitionRange[0] + (heroTransitionRange[1] - heroTransitionRange[0]) * 0.6;
  const fiveOffice = officeRange[0] + (officeRange[1] - officeRange[0]) * 0.05;



   const blackOverlayOpacityRaw = useTransform(progress, 
    [ halfHero, sixtyHero, officeRange[0], fiveOffice], 
    [0, 1, 1, 0]);
  
  const blackOverlayOpacity = useSpring(blackOverlayOpacityRaw, {
    duration: 0.2,
    // ease: [0.25, 0.1, 0.25, 1], 
  });

  const canvasAnimation = useTransform(progress, [officeRange[0]-0.05, officeRange[0]], [1, 0]);

  useMotionValueEvent(heroTransitionProgress, "change", (latest) => {
      console.log("hero transition Progress changed:", latest);
    });

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
const pinEnd = window.innerHeight * 4;

// useGSAP(() => {
//     if (!canvasRef.current) return;
//      ScrollTrigger.create({
//        trigger: containerHeroRef.current,
//        start: "top top",
//        end: () => `${pinEnd}`, 
//        pin: canvasRef.current,
//       //  pinSpacing: false,
//        scrub: true, 
// markers: true;
//      });
//   });


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

const AspectProvider = ({ setAspect }) => {
  const { size } = useThree();
  useEffect(() => {
    const aspect = size.width / size.height;
    const rounded = Math.floor(aspect * 10) / 10;
    setAspect(rounded);
  }, [size, setAspect]);

  return null;
};

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
        
        <motion.div
          ref={canvasRef}
          className="canvas-container"
          style={{
            position: "relative",
            margin: "0 auto",
            width: "100vw",
            height: "100vh",
            pointerEvents: "auto",
            opacity: canvasAnimation,
          }}
        >
        <Canvas 
          shadows 
          onCreated={() => setIsCanvasLoaded(true)} 
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.5,
            far: 100,
          }}
         
          style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 100, 
          pointerEvents: 'auto',
          // backgroundColor: 'green', 
          // opacity: 0.5
          }}>
          <AspectProvider setAspect={setAspect} />
          <CameraAnimation 
            progress={progress}
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
          <Chair1 ref={chairRefs[0].ref} progress={progress} isMobile={isMobile} aspect={aspect}/>
          <Chair2 ref={chairRefs[1].ref} progress={heroProgress} isMobile={isMobile} aspect={aspect}/>
           <Chair3 ref={chairRefs[2].ref}  progress={heroProgress} isMobile={isMobile} aspect={aspect}/>
          <Chair4 ref={chairRefs[3].ref} isMobile={isMobile}aspect={aspect}/>
          <Chair5 ref={chairRefs[4].ref}  isMobile={isMobile} aspect={aspect}/>
          <Chair6 ref={chairRefs[5].ref} progress={heroProgress} isMobile={isMobile} aspect={aspect}/>
          <Chair7 ref={chairRefs[6].ref} progress={heroProgress} isMobile={isMobile} aspect={aspect}/> 
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
            isMobile={isMobile} 
            aspect={aspect}
            />
          {/* <ShadowPlane /> */}
        </Canvas>
      </motion.div> 
    </Suspense>
       <motion.div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'black',
            opacity: blackOverlayOpacity,
            pointerEvents: 'none',
            zIndex: 999, 
          }}
        />

</motion.div>
  );
};





const CameraAnimation = ({ progress, heroRange }) => {

  const mouse = useRef({ x: 0, y: 0 });
  const { camera, size } = useThree();
  const aspect = size.width / size.height;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / size.width - 0.5) * 2;  // -1 to 1
      const y = (e.clientY / size.height - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [size, mouseX, mouseY]);


  const clampedProgress = useTransform(progress, heroRange, [0, 1], { clamp: true });
  const smoothProgress = useSpring(clampedProgress, {
    stiffness: 80,
    damping: 20,
    ease: 'easeInOut'
  });

  const yValue = useTransform(smoothProgress, [0, 1], [0, 3.2]);

  // Adjust Z range based on aspect
  const baseZ = aspect > 1 ? 5 / aspect : 5;
  const zoomZ = aspect > 1 ? 2 / aspect : 2;
  const zValue = useTransform(smoothProgress, [0, 1], [baseZ, zoomZ]);

  useFrame(() => {
  const y = yValue.get();
  const z = zValue.get();
  const p = progress.get();

  if (typeof y !== 'number' || typeof z !== 'number') return;

  if (p === 0) {
    camera.position.set(0, y, z);
    camera.lookAt(0, y, z - 1);
    const maxRotation = 0.02; // adjust for effect intensity

    const xRot = smoothY.get() * maxRotation;
    const yRot = smoothX.get() * maxRotation;

    camera.rotation.x = xRot;
    camera.rotation.y = yRot;
    // camera.lookAt(0, y, z - 1);
  } else {
    // Reset to default center position on scroll
    camera.position.set(0, y, z);
    camera.lookAt(0, y, z - 1);
   
  }

  camera.updateProjectionMatrix();
});


  return null;
};


// OLD ONE
// const CameraAnimation = ({ progress, heroRange }) => {
//   const { camera } = useThree();
//   const clampedProgress = useTransform(progress, heroRange, [0, 1], { clamp: true });
//   const smoothProgress = useSpring(clampedProgress, {
//     stiffness: 80,
//     damping: 20,
//     ease: 'easeInOut'
//   });

//   // Step 3: Map the smooth progress to Y and Z values
//   const yValue = useTransform(smoothProgress, [0, 1], [0, 3.2]);
//   const zValue = useTransform(smoothProgress, [0, 1], [5, 2]);

  
//   useFrame(() => {
//     const y = yValue.get();
//     const z = zValue.get();

//     if (typeof y !== 'number' || typeof z !== 'number') return;
//     camera.position.set(0, y, z);
//     camera.updateProjectionMatrix();
//     camera.lookAt(0, y, z - 1); 
//     // console.log(camera.position)
//   });
  
//   return null;
// };

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
  const heroTransitionProgress = useTransform(progress, heroTransitionRange, [0, 1]);
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
    const heroT = heroTransitionProgress.get();
   
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
  const width = viewport.width;
  const height = viewport.height;

  return (
    <Plane
      position={[0, -30, 0]} // lower edge + half of 25%
      rotation={[-Math.PI / 2, 0, 0]}
      args={[width * 100, height * 100]} // 100% width, 25% height
      receiveShadow
    >
      {/* <meshStandardMaterial color="hotpink" opacity={0.5} transparent /> */}
      <shadowMaterial transparent opacity={1} />
    </Plane>
  );
};


// const ShadowPlane = () => {
//   const { viewport } = useThree();

//   return (
//     <Plane 
//       position={[0, -7, 0]} 
//       rotation={[-Math.PI / 2, 0, 0]} 
//       args={[viewport.width * 400, viewport.width * 500]}
//       receiveShadow
//     >
//       <shadowMaterial transparent opacity={0.5} />
//     </Plane>
//   );
// };

export default Hero;
