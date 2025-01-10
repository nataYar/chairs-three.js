import React, { Suspense, useRef, useEffect, useState, useLayoutEffect } from "react";
import * as THREE from "three";
import { SpotLightHelper, DirectionalLightHelper } from 'three';
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Plane, OrbitControls, Preload } from '@react-three/drei';
import { useHelper, GizmoHelper, GizmoViewcube, GizmoViewport, } from '@react-three/drei';
import { motion, AnimatePresence, useScroll,  useSpring } from "framer-motion";

// Import Components
import Loading from "../loading/Loading";
import Chair1 from "./Chair1";
import Chair2 from "./Chair2";
import Chair3 from "./Chair3";
import Chair4 from "./Chair4";
import Chair5 from "./Chair5";
import Chair6 from "./Chair6";
import Chair7 from "./Chair7";
import HeroChair from "./HeroChair";
import IntroText from "./IntroText";
// Animation
import ChairAnimation from "./ChairAnimation";
import HeroZoomAnimation from "./HeroZoomAnimation";
// Styles
import "../../styles/sections/Hero.scss";

const Hero = () => {
  const [isCanvasLoaded, setIsCanvasLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const containerHeroRef = useRef(null);
  const heroChairRef = useRef(null);
  const [chairPositions, setChairPositions] = useState(
    [
      {
        "index": 0,
        "position": [2.342245498538476, -5.371288915852722, 0]
      },
      {
        "index": 1,
        "position": [5.184134707893358, 7.548172560936193, -12] //chair2
      },
      {
        "index": 2,
        "position": [-1.0520808602996226, 2.067989981787372, -2]
      },
      {
        "index": 3,
        "position": [-2.927806873173095, -4.220298433884283, -3]
      },
      {
        "index": 4,
        "position": [-2.16657708614809, -5.371288915852722, 1]
      },
      {
        "index": 5,
        "position": [4.684490997076952, -5.754952409842203, -5]
      },
      {
        "index": 6,
        "position": [5.2700523717115715, 2.3019809639368813, -7]
      }
     
    ]
  );
  const [chairRefs, setChairRefs] = useState([
    { index: 0, ref: useRef(null) },
    { index: 1, ref: useRef(null) },
    { index: 2, ref: useRef(null) },
    { index: 3, ref: useRef(null) },
    { index: 4, ref: useRef(null) },
    { index: 5, ref: useRef(null) },
    { index: 6, ref: useRef(null) },
  ]);
 
 
  const updateViewportSize = (size) => {
    setViewportSize(size);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    console.log(progress)
  }, [progress]);
 
//   const setInitialPosition = (index, position) => {
//     // console.log(index, position);
//     setChairPositions((prevPositions) => {
//       const updatedPositions = [...prevPositions];
//       updatedPositions[index] = { index, position }; // Store index and position in an object
//       // console.log(index, position);
//       return updatedPositions;
//     });
// };

// useEffect(()=>{console.log(chairPositions)}, [chairPositions])

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
  const isDesktop = useMediaQuery("(min-width: 800px)");
  // CHAIRS ANIMATION - State for initial positions
  // useLayoutEffect(() => {
  //   // Check if all refs are populated and have the position set
  //   if (
  //    isCanvasLoaded
  //   ) {
  //     const rightPositions = [
  //       chairRef1.current.position.x,
  //       chairRef2.current.position.x,
  //       chairRef6.current.position.x,
  //       chairRef7.current.position.x,
  //     ];
  
  //     const leftPositions = [
  //       chairRef3.current.position.x,
  //       chairRef4.current.position.x,
  //       chairRef5.current.position.x,
  //     ];
  
  //     setInitialPositionsRight(rightPositions);
  //     setInitialPositionsLeft(leftPositions);
  //   }
  // }, [
  //   isCanvasLoaded
  // ]);
  
  // useEffect(() => {
  //   if (isCanvasLoaded) {
  //     const rightPositions = [
  //       isMobile
  //         ? [viewport.width * 0.4, -viewport.height * 0.7, 0]
  //         : [viewport.width * 0.3, -viewport.height * 0.4, 0],
  //       // isMobile
  //       //   ? [viewport.width * 0.9, -viewport.height * -1, -12]
  //       //   : [viewport.width * 0.9, -viewport.height * -1, -12],
  //       // isMobile
  //       //   ? [viewport.width * 0.8, -viewport.height * 0.75, -5]
  //       //   : [viewport.width * 0.8, -viewport.height * 0.75, -5],
  //       // isMobile
  //       //   ? [viewport.width * 0.9, -viewport.height * -0.3, -7]
  //       //   : [viewport.width * 0.9, -viewport.height * -0.3, -7],
  //     ];
  
  //     setInitialPositionsRight(rightPositions);
  //     setInitialPositionsLeft(leftPositions);
  //   }
  // }, [isMobile, isCanvasLoaded, viewport.width, viewport.height]);
  
  // useEffect(()=>{console.log(initialPositionsRight)}, initialPositionsRight)
  
  return (
    <div className="hero-section_container"
      ref={containerHeroRef}>
      <HeroZoomAnimation 
      onProgressUpdate={setProgress}
      isDesktop={isDesktop} 
      isMobile={isMobile}
      containerHeroRef={containerHeroRef}
      isCanvasLoaded={isCanvasLoaded} 
      />
      <Suspense fallback={null}>
      <div className="canvas-container">
      <Canvas shadows 
      onCreated={() => setIsCanvasLoaded(true)} 
      // camera={{ position: isMobile ? [0, 0, 5] : [0, 0, 5], fov: 75 }} 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2, 
        pointerEvents: 'none',
        }}>
       <CameraAnimation progress={progress} isMobile={isMobile}
       updateViewportSize={updateViewportSize}/>
        <Preload all />
        <Lighting 
        isDesktop={isDesktop} 
        isMobile={isMobile}
        />
        <Chair1 ref={chairRefs[0].ref}  isMobile={isMobile} />
        <Chair2 ref={chairRefs[1].ref}  isMobile={isMobile}  />
        <Chair3 ref={chairRefs[2].ref}  isMobile={isMobile} />
        <Chair4 ref={chairRefs[3].ref} isMobile={isMobile} />
        <Chair5 ref={chairRefs[4].ref}  isMobile={isMobile} />
        <Chair6 ref={chairRefs[5].ref}  isMobile={isMobile} />
        <Chair7 ref={chairRefs[6].ref}  isMobile={isMobile} />
        <HeroChair ref={heroChairRef}  progress={progress}   heroChairRef={heroChairRef}/>
        <ShadowPlane />
        {/* <ChairAnimation
          isMobile={isMobile}
          isCanvasLoaded={isCanvasLoaded} 
          progress={progress}
          chairPositions={chairPositions}
          chairRefs={chairRefs}
          /> */}
      </Canvas>
    </div>
  </Suspense>
  {/* INTRO TEXT */}
  <IntroText progress={progress} isMobile={isMobile} />
 
      {/* <div className="additional-content">
        <h2>Scroll down to see the effect!</h2>
        <p>More content goes here...</p>
      </div> */}
    </div>
  );
};


const CameraAnimation = ({ progress }) => {
  const { camera } = useThree();
  const { viewport } = useThree();
  const zoomProgress = useRef(0);
  const isZoomComplete = useRef(false);

 

  // Initial camera position
  const initialZ = 5;
  const targetZoom = 4.5;

  // Camera position variants for Framer Motion
  const cameraVariants = {
    initial: { z: initialZ, y: 0, rotationX: 0 },
    zoomIn: { z: targetZoom, transition: { duration: 2, ease: 'easeInOut'  } }, // Adjust duration as needed
    scrollPhase1: { 
      y: 6 * progress, 
      z: initialZ - progress * 0.3, 
      rotationX: -0.01 * progress, 
      transition: { duration: 2, ease: 'easeInOut'  } 
    },
    scrollPhase2: { 
      y: (progress - 0.5) / 0.2 * 2 + 3, 
      z: initialZ - 0.15 - (progress - 0.5) / 0.2 * 0.5, 
      rotationX: (progress - 0.5) / 0.2 * 0.005 - 0.005, 
      transition: { duration: 2, ease: 'easeInOut'  } 
    },
    scrollPhase3: { 
      y: (progress - 0.7) / 0.3 * 5 + 5, 
      z: initialZ - 0.15 - 0.5 - (progress - 0.7) / 0.3 * 1.5, 
      rotationX: 0, 
      transition: { duration: 3, ease: 'easeInOut'  } 
    },
    reset: { z: initialZ, y: 0, rotationX: 0, transition: { duration: 3, ease: 'easeInOut'  } } // Adjust duration as needed
  };

  const [currentAnimation, setCurrentAnimation] = useState('initial');

  useEffect(() => {
    // Zoom-in effect
    const zoomIn = () => {
      if (zoomProgress.current < 1) {
        zoomProgress.current += 0.02; 
        camera.position.z = initialZ + (targetZoom - initialZ) * zoomProgress.current; 
      } else if (!isZoomComplete.current) {
        isZoomComplete.current = true;
        console.log("Zoom complete"); 
        document.body.classList.remove("no-scroll"); 
        setCurrentAnimation('scrollPhase1'); // Start scroll animations
      }
    };

    const interval = setInterval(zoomIn, 16); 
    return () => clearInterval(interval);
  }, []); 

  useEffect(() => {
    if (progress === 0) {
      setCurrentAnimation('reset'); 
    } else if (progress <= 0.5) {
      setCurrentAnimation('scrollPhase1');
    } else if (progress <= 0.7) {
      setCurrentAnimation('scrollPhase2');
    } else {
      setCurrentAnimation('scrollPhase3');
    }
  }, [progress]);

  // Update camera position and rotation within useFrame
  useFrame(() => {
    camera.position.z = cameraVariants[currentAnimation].z;
    camera.position.y = cameraVariants[currentAnimation].y;
    camera.rotation.x = cameraVariants[currentAnimation].rotationX;
  });

  return null; // No need to render a visible element
};





const Lighting = ({ isMobile, isDesktop }) => {
  const light = useRef();
  const { viewport } = useThree();


  return (
    <>
      <ambientLight intensity={.5} />
      {/* <spotLight  
      ref={light}
      intensity={50} 
      position={[0, 20, -30]} 
      angle={Math.PI / 2}
      /> */}
      {/* <pointLight ref={light} intensity={50} position={[0, 2, 4]} /> */}
      <directionalLight 
        ref={light}
        position={isMobile ? [5, 50, -15] : [12, 50, -15]} 
        intensity={isMobile ? 9 : 3} 
        // position={isMobile ? [5, 30, 25] : [12, 50, -15]} 
        // intensity={isMobile ? 10 : 3} 
        castShadow 
      
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={100}
        shadow-camera-near={0.1}
      
        shadow-camera-left={isMobile ? -45 : -10} // Adjust shadow camera for mobile
        shadow-camera-right={isMobile ? 15 : 10}
        shadow-camera-top={isMobile ? 15 : 10}
        shadow-camera-bottom={isMobile ? -45 : -10}
      />
    </>
  );
};

const ShadowPlane = () => {
  const { viewport } = useThree();

  return (
    <Plane 
      position={[0, -7, 0]} 
      rotation={[-Math.PI / 2, 0, 0]} 
      args={[viewport.width * 30, viewport.width * 10]} // Width = 2x viewport width
      receiveShadow
    >
      {/* <meshStandardMaterial color="#ffffff" transparent opacity={1} /> */}
      <shadowMaterial transparent opacity={0.6} />
    </Plane>
  );
};

export default Hero;
