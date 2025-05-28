import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Plane} from '@react-three/drei';
import { motion, useTransform, useSpring, useMotionValueEvent, useAnimation } from "framer-motion";

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

const Hero = ({ progress, heroRange, updateRange, 
   scrollDirection, isMobile 
}) => {

  const [isCanvasLoaded, setIsCanvasLoaded] = useState(false);

  const [isNonFixedDelayed, setIsNonFixedDelayed] = useState(false); 
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
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

  useEffect(() => {
    if (containerHeroRef.current) {
      const totalScrollHeight = document.body.scrollHeight - window.innerHeight;

      // Get the Hero section's offset and height
      const heroOffsetTop = containerHeroRef.current.offsetTop;
      const heroHeight = containerHeroRef.current.offsetHeight;

      // Calculate the dynamic range for Hero
      const heroStart = heroOffsetTop / totalScrollHeight;
      const heroEnd = (heroOffsetTop + heroHeight) / totalScrollHeight;

      // Pass the range to App.js through the updateRange function
      updateRange(heroStart, heroEnd);
    }
  }, []);

  const heroProgress = useTransform(progress, heroRange, [0, -3000]); 

  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 0;


  const canvasAnimationVariants = {
    moveCanvas: {
      y: heroProgress.get() === 1 ? '-100vh' : '0', // When progress is 1, move the canvas off-screen
      transition: {
        duration: 0.5, // Adjust the duration for a smooth transition
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div className="hero-section_container"
      ref={containerHeroRef}
      >
      <HeroZoomAnimation 
      progress={progress}
      scrollDirection={scrollDirection}
      isNonFixedDelayed={isNonFixedDelayed}
      heroProgress={heroProgress}
      heroRange={heroRange}
      // onProgressUpdate={onProgressUpdate}
      isMobile={isMobile}
      containerHeroRef={containerHeroRef}
      isCanvasLoaded={isCanvasLoaded} 
      />
      <Suspense fallback={null}>
      <motion.div
        ref={canvasRef}
        className="canvas-container"
        animate={canvasAnimationVariants.moveCanvas}
        transition={{
          duration: 0.1, 
          ease: "easeInOut"
        }}
      >
      <Canvas shadows 
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
        zIndex: 2, 
        pointerEvents: 'auto',
        }}>
            
       <CameraAnimation progress={progress} 
       heroRange={heroRange} 
       isMobile={isMobile} />
        {/* <Preload all /> */}
        <Lighting 
        isMobile={isMobile}
        />
        <Chair1 ref={chairRefs[0].ref}  isMobile={isMobile} />
        <Chair2 ref={chairRefs[1].ref} progress={heroProgress} isMobile={isMobile}  />
        <Chair3 ref={chairRefs[2].ref}  progress={heroProgress} isMobile={isMobile} />
        <Chair4 ref={chairRefs[3].ref} isMobile={isMobile} />
        <Chair5 ref={chairRefs[4].ref}  isMobile={isMobile} />
        <Chair6 ref={chairRefs[5].ref} progress={heroProgress} isMobile={isMobile} />
        <Chair7 ref={chairRefs[6].ref} progress={heroProgress} isMobile={isMobile} />
        <HeroChair ref={heroChairRef}  progress={heroProgress}   heroChairRef={heroChairRef}/>
        <ShadowPlane />
      </Canvas>
    </motion.div>
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
  const zValue = useTransform(smoothProgress, [0, 1], [5, 4]);

  
  useFrame(() => {
    const y = yValue.get();
    const z = zValue.get();

    if (typeof y !== 'number' || typeof z !== 'number') return;
    camera.position.set(0, y, z);
    camera.updateProjectionMatrix();
    camera.lookAt(0, y, z - 1); 
  });

  return null;
};


const Lighting = ({ isMobile, isDesktop }) => {
  const light = useRef();
  const { viewport } = useThree();


  return (
    <>
      <ambientLight intensity={.5} />
      <directionalLight 
        ref={light}
        position={isMobile ? [5, 50, -15] : [12, 50, -15]} 
        intensity={isMobile ? 9 : 3} 
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
      args={[viewport.width * 30, viewport.width * 10]}
      receiveShadow
    >
      <shadowMaterial transparent opacity={0.6} />
    </Plane>
  );
};

export default Hero;
