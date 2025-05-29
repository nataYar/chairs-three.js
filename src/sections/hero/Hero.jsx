import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Plane} from '@react-three/drei';
import { motion, useTransform, useSpring, useMotionValueEvent, useAnimation } from "framer-motion";
import * as THREE from 'three';

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

const Hero = ({ progress, heroRange, heroTransitionRange, officeRange, afterOfficeRange, slidesRange, isMobile }) => {
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
        progress={progress} 
        heroRange={heroRange}  
        heroTransitionRange={heroTransitionRange}
         officeRange={officeRange}
         afterOfficeRange={afterOfficeRange}
         slidesRange={slidesRange} 
        />
        <Chair1 ref={chairRefs[0].ref}  isMobile={isMobile} />
        <Chair2 ref={chairRefs[1].ref} progress={heroProgress} isMobile={isMobile}  />
        <Chair3 ref={chairRefs[2].ref}  progress={heroProgress} isMobile={isMobile} />
        <Chair4 ref={chairRefs[3].ref} isMobile={isMobile} />
        <Chair5 ref={chairRefs[4].ref}  isMobile={isMobile} />
        <Chair6 ref={chairRefs[5].ref} progress={heroProgress} isMobile={isMobile} />
        <Chair7 ref={chairRefs[6].ref} progress={heroProgress} isMobile={isMobile} />
        <HeroChair ref={heroChairRef} heroProgress={heroProgress}  heroRange={heroRange} progress={progress.get()} heroChairRef={heroChairRef}/>
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
  const zValue = useTransform(smoothProgress, [0, 1], [5, 2]);

  
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

const Lighting = ({
  progress,
  heroRange,
  heroTransitionRange,
  afterOfficeRange,
  officeRange,
  slidesRange,
  isMobile
}) => {
  const directionalLightRef = useRef();
  const ambientLightRef = useRef();

  const hero = useSpring(useTransform(progress, heroRange, [0, 1]));
  const heroTransition = useSpring(useTransform(progress, heroTransitionRange, [0, 1]));
  const afterOffice = useSpring(useTransform(progress, afterOfficeRange, [0, 1]));
  const office = useSpring(useTransform(progress, officeRange, [0, 1]));
  const slides = useSpring(useTransform(progress, slidesRange, [0, 1]));

  const blend = (values, weights) => {
    const total = weights.reduce((a, b) => a + b, 0) || 1;
    return values.reduce((sum, v, i) => sum + v * weights[i], 0) / total;
  };

  
  useFrame(() => {
    const heroVal = hero.get();
    const heroT = heroTransition.get();
    const afterO = afterOffice.get();
    const officeP = office.get();
    const slidesP = slides.get();
  
    const weights = [heroVal, heroT, afterO, officeP, slidesP];
    const keys = ["heroRange", "heroTransitionRange", "afterOfficeRange", "officeRange", "slidesRange"];


    const blend = (values, weights) => {
      const total = weights.reduce((a, b) => a + b, 0);
      if (total === 0) return values[0]; // Fallback to first section
      return values.reduce((sum, v, i) => sum + v * weights[i], 0) / total;
    };

    
  const lightingPresets = {
  heroRange: {
    ambientIntensity: 0.5,
    directionalIntensity: 9,
    // directionalColor: '#ffffff',
  },
  heroTransitionRange: {
    ambientIntensity: 0,
    directionalIntensity: 0,
    // directionalColor: '#ffdede',
  },
  afterOfficeRange: {
    ambientIntensity: 9,
    directionalIntensity: 9,
    // directionalColor: '#fdf6e3',
  },
  officeRange: {
    ambientIntensity: 0,
    directionalIntensity: 0,
    // directionalColor: '#a2d2ff',
  },
  slidesRange: {
    ambientIntensity: 9,
    directionalIntensity: 9,
    // directionalColor: '#caffbf',
  },
};


    const ambient = blend(
      keys.map(k => lightingPresets[k].ambientIntensity),
      weights
    );
    const directionalIntensity = blend(
      keys.map(k => lightingPresets[k].directionalIntensity),
      weights
    );
  
    // Color blending
    // const blendedColor = new THREE.Color(0, 0, 0);
    // keys.forEach((k, i) => {
    //   const color = new THREE.Color(lightingPresets[k].directionalColor);
    //   blendedColor.r += color.r * weights[i];
    //   blendedColor.g += color.g * weights[i];
    //   blendedColor.b += color.b * weights[i];
    // });
    // blendedColor.multiplyScalar(1 / (weights.reduce((a, b) => a + b, 0) || 1));
  
    // Apply values
    if (directionalLightRef.current) {
      directionalLightRef.current.intensity = directionalIntensity;
      // directionalLightRef.current.color = blendedColor;
    }
  
    if (ambientLightRef.current) {
      ambientLightRef.current.intensity = ambient;
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
