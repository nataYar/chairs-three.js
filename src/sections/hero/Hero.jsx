import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Plane} from '@react-three/drei';
import { motion, useTransform, useSpring, useMotionValueEvent, useAnimation } from "framer-motion";

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
import HeroZoomAnimation from "./HeroZoomAnimation";

// Styles
import "../../styles/Hero.scss";


const Hero = ({ progress, heroRange, updateRange, 
   scrollDirection,isHeroAnimatedOut, onHeroAnimationComplete 
}) => {

  const [isCanvasLoaded, setIsCanvasLoaded] = useState(false);

  const [isNonFixedDelayed, setIsNonFixedDelayed] = useState(false); 
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const containerHeroRef = useRef(null);
  const bottomRef = useRef(null);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  let scrollTimeout = useRef(null); 
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

  const heroProgress = useTransform(progress, heroRange, [0, 1]); 


  // listen to progress changes and trigger scroll
  useMotionValueEvent(progress, "change", (latest) => {
 
    if (latest >= heroRange[1] && scrollDirection === "down" && !hasScrolledToBottom) {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      // Wait for natural scroll to settle, then scroll to .bottom
      scrollTimeout.current = setTimeout(() => {
        bottomRef.current.scrollIntoView({
          behavior: "smooth", // Smooth scrolling
          block: "start", // Align the element to the top of the viewport
        });
        setHasScrolledToBottom(true); // Prevent further scrolling
      }, 300); // Adjust delay to allow natural scrolling to finish
    }

    // Reset when scrolling back up (Optional)
    if (latest < heroRange[1] && scrollDirection === "up") {
      setHasScrolledToBottom(false); // Allow the scroll to trigger again
    }
  });

  // Cleanup timeout when the component unmounts
  useEffect(() => {
    return () => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
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

  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 0;
  const canvasAnimationVariants = useAnimation();

  return (
    <motion.div className="hero-section_container"
      ref={containerHeroRef}
      >
      <HeroZoomAnimation 
      scrollDirection={scrollDirection}
      isNonFixedDelayed={isNonFixedDelayed}
      heroProgress={heroProgress}
      // onProgressUpdate={onProgressUpdate}
      isDesktop={isDesktop} 
      isMobile={isMobile}
      containerHeroRef={containerHeroRef}
      isCanvasLoaded={isCanvasLoaded} 
      />
      <Suspense fallback={null}>
      <motion.div
        ref={canvasRef}
        className="canvas-container"
        animate={canvasAnimationVariants}
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
        isDesktop={isDesktop} 
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
  <div className="bottom" ref={bottomRef}></div> 
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






// const CameraAnimation = ({ progress, heroRange }) => {
//   const { camera } = useThree();

//   const initialPosition = new THREE.Vector3(0, 0, 5);
//   const initialRotation = new THREE.Euler(0, 0, 0);

//   const adjustedProgress = useTransform(progress, heroRange, [0, 1]);

//   const keyframes = [
//     { progress: 0, position: new THREE.Vector3(0, 0, 5), rotation: new THREE.Euler(0, 0, 0) },
//     { progress: 0.5, position: new THREE.Vector3(0, 10, 3.5), rotation: new THREE.Euler(-0.005, 0, 0) },
//     { progress: 0.7, position: new THREE.Vector3(0, 17, 1.5), rotation: new THREE.Euler(-0.01, 0, 0) },
//     { progress: 1, position: new THREE.Vector3(0, 23, -2), rotation: new THREE.Euler(0, 0, 0) },
//   ];

//   const easeOutQuad = (t) => t * (2 - t);
//   const finalPosition = new THREE.Vector3().copy(keyframes[keyframes.length - 1].position);
//   const finalRotation = new THREE.Euler().copy(keyframes[keyframes.length - 1].rotation);
//   const finalQuaternion = new THREE.Quaternion().setFromEuler(finalRotation);

//   useFrame(() => {
//     const currentProgress = adjustedProgress.get();
//     // console.log(camera.position)

//     if (currentProgress >= 1) {
//       camera.position.copy(finalPosition);
//       camera.quaternion.copy(finalQuaternion);
//       return; // Stop further updates when progress is at or beyond 1
//     }

//     // Ensure smooth transition back to initial state
//     if (currentProgress <= 0.01) {
//       camera.position.lerp(initialPosition, 0.2);
//       camera.quaternion.slerp(new THREE.Quaternion().setFromEuler(initialRotation), 0.2);
//       return;
//     }

//     // Find the two keyframes to interpolate between
//     let startKeyframe, endKeyframe;
//     for (let i = 0; i < keyframes.length - 1; i++) {
//       if (currentProgress >= keyframes[i].progress && currentProgress <= keyframes[i + 1].progress) {
//         startKeyframe = keyframes[i];
//         endKeyframe = keyframes[i + 1];
//         break;
//       }
//     }

//     if (!startKeyframe || !endKeyframe) return;

//     // Compute interpolation factor
//     const t = (currentProgress - startKeyframe.progress) / (endKeyframe.progress - startKeyframe.progress);
//     const easedT = easeOutQuad(t);

//     // Interpolate position and rotation
//     camera.position.lerpVectors(startKeyframe.position, endKeyframe.position, easedT);
//     camera.quaternion.slerpQuaternions(
//       new THREE.Quaternion().setFromEuler(startKeyframe.rotation),
//       new THREE.Quaternion().setFromEuler(endKeyframe.rotation),
//       easedT
//     );
//   });

//   return null;
// };


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
      args={[viewport.width * 30, viewport.width * 10]} // Width = 2x viewport width
      receiveShadow
    >
      <shadowMaterial transparent opacity={0.6} />
    </Plane>
  );
};

export default Hero;
