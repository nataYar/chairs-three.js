"us"
import React, { Suspense, useRef, useEffect, useState, useLayoutEffect } from "react";
import * as THREE from "three";
import { SpotLightHelper, DirectionalLightHelper } from 'three';
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Plane, OrbitControls, Preload } from '@react-three/drei';
import { useHelper, GizmoHelper, GizmoViewcube, GizmoViewport, } from '@react-three/drei';
import { useScroll } from "framer-motion";
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
// Animation
import ChairAnimation from "./ChairAnimation";
import HeroZoomAnimation from "./HeroZoomAnimation";
// Styles
import "../../styles/sections/Hero.scss";

const Hero = () => {
  const [isCanvasLoaded, setIsCanvasLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  const containerHeroRef = useRef(null);
  const chairRef1 = useRef(null);
  const chairRef2 = useRef(null);
  const chairRef3 = useRef(null);
  const chairRef4 = useRef(null);
  const chairRef5 = useRef(null);
  const chairRef6 = useRef(null);
  const chairRef7 = useRef(null);
  const heroChairRef = useRef(null);
 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


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
      camera={{ position: isMobile ? [0, 0, 5] : [0, 0, 5], fov: 75 }} 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2, 
        pointerEvents: 'none',
        }}>
       <CameraAnimation progress={progress} isMobile={isMobile}/>
        <Preload all />
        <Lighting 
        isDesktop={isDesktop} 
        isMobile={isMobile}
        />
        <Chair1 ref={chairRef1} isMobile={isMobile}/>
        <Chair2 ref={chairRef2} />
        <Chair3 ref={chairRef3} />
        <Chair4 ref={chairRef4} />
        <Chair5 ref={chairRef5} />
        <Chair6 ref={chairRef6} />
        <Chair7 ref={chairRef7} />
        <HeroChair ref={heroChairRef} />
        <ShadowPlane />
        {/* <ChairAnimation
          isDesktop={isDesktop} 
          isMobile={isMobile}
          isCanvasLoaded={isCanvasLoaded} 
          containerHeroRef={containerHeroRef}
          refsRight={[chairRef1, chairRef2, chairRef6, chairRef7 ]} 
          refsLeft={[chairRef3, chairRef4, chairRef5]} 
          /> */}
      </Canvas>
    </div>
  </Suspense>
      {/* <div className="additional-content">
        <h2>Scroll down to see the effect!</h2>
        <p>More content goes here...</p>
      </div> */}
    </div>
  );
};




const CameraAnimation = ({ progress, isMobile }) => {
  const { camera } = useThree();
  const zoomProgress = useRef(0); // Track zoom-in progress
  const scrollProgress = useRef(0); // Track scroll animation progress
  const isZoomComplete = useRef(false); // Track if zoom-in is complete

  // Define the initial and zoomed-in positions
  const initialPosition = isMobile ? [0, 0, 5] : [0, 0, 5];
  const zoomedInPosition = isMobile ? [0, 0, 3] : [0, 0, 3]; // Adjust for zoom effect
  const scrolledPosition = isMobile ? [0, 0, 1] : [0, 0, 1]; // Final position after scrolling

  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  useFrame((state, delta) => {
    if (!isZoomComplete.current) {
      // Smoothly interpolate zoom progress
      zoomProgress.current = Math.min(zoomProgress.current + delta * 0.7, 1); // Adjust speed
      const z = THREE.MathUtils.lerp(
        initialPosition[2],
        zoomedInPosition[2],
        zoomProgress.current
      );

      camera.position.set(0, 0, z);

      if (zoomProgress.current === 1) {
        isZoomComplete.current = true;
        document.body.classList.remove("no-scroll");
      }
    } else {
      // Adjust scroll progress to smoothly continue from the zoom endpoint
      scrollProgress.current = progress; // Use the incoming scroll progress directly

      const z = THREE.MathUtils.lerp(
        zoomedInPosition[2],
        scrolledPosition[2],
        scrollProgress.current
      );

      camera.position.set(0, 0, z);
      camera.rotation.set(0, scrollProgress.current * 2 * Math.PI, 0); // Example rotation
      camera.lookAt(0, 0, 0);
    }

    // Debugging: Log positions and progress
    console.log("Zoom Progress:", zoomProgress.current);
    console.log("Scroll Progress:", scrollProgress.current);
    console.log("Camera Position:", camera.position);
  });

  return null;
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
