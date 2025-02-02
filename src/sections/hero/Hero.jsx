import React, { Suspense, useRef, useEffect, useState, useLayoutEffect } from "react";
import * as THREE from "three";
import { SpotLightHelper, DirectionalLightHelper } from 'three';
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Plane, OrbitControls, Preload } from '@react-three/drei';
import { useHelper, GizmoHelper, GizmoViewcube, GizmoViewport, } from '@react-three/drei';
import { motion, animate, useSpring,  useScroll, useTransform, useMotionValue, useMotionValueEvent, useAnimation } from "framer-motion";

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


const Hero = ({ progress, updateRange, heroRange, scrollDirection,
  // onProgressUpdate, 
  isHeroAnimatedOut, onHeroAnimationComplete }) => {
  const [isCanvasLoaded, setIsCanvasLoaded] = useState(false);

  const [isNonFixedDelayed, setIsNonFixedDelayed] = useState(false); 
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const containerHeroRef = useRef(null);
  const bottomRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false); 
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  let scrollTimeout = useRef(null); 
  const heroChairRef = useRef(null);
  const canvasRef = useRef(null);
  const [hcprogress, setHCPregress] = useState(0);
  const [heroContainerProgress, setHeroContainerProgress] = useState(0);
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
 
  // useEffect(() => {
  //   window.scrollTo(0, 0); // Scroll the entire page to the top
  //   if (containerHeroRef.current) {
  //    containerHeroRef.current.scrollTop = 0; // Scroll the container to the top
  //   }
  // }, []);

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
  // const heroProgress = useTransform(progress, [0, 0.7], [0, 1]); 

  // console.log(heroRange[1])

  // useEffect(()=>{heroProgress},[heroProgress])

  // useMotionValueEvent(progress, "change", (latest) => {
  //   setHCPregress(latest)
  // })

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

//   useEffect(() => {
//     const transformedValue = hcprogress >= 0.2 ? 1 : hcprogress / 0.2;
//     setHeroContainerProgress(transformedValue);
//   }, [hcprogress]);

//   useEffect(() => {
//     // Map hcprogress from [0, 0.2] to [0, 1]
//     const transformedValue = hcprogress >= 0.2 ? 1 : hcprogress / 0.2;
//     setHeroContainerProgress(transformedValue);
//   }, [hcprogress]);

// useEffect(() => {
//      console.log(hcprogress)
//    }, [hcprogress]);




  // useEffect(() => {
  //   if (progress >= 1) {
  //     // Add a 1-second delay before switching position
  //     const timer = setTimeout(() => {
  //       setIsNonFixedDelayed(true);
  //     }, 1000); 
  //     return () => clearTimeout(timer); // Cleanup timer on unmount or progress change
  //   } else {
  //     setIsNonFixedDelayed(false);
  //   }
  // }, [progress]);

  // const updateViewportSize = (size) => {
  //   setViewportSize(size);
  // };

  // useEffect(() => {
  //   if (progress >= 1) {
  //       onHeroAnimationComplete(prev=>!prev);
  //   }
  // }, [progress]); 
 
//   const setInitialPosition = (index, position) => {
//     // console.log(index, position);
//     setChairPositions((prevPositions) => {
//       const updatedPositions = [...prevPositions];
//       updatedPositions[index] = { index, position }; // Store index and position in an object
//       // console.log(index, position);
//       return updatedPositions;
//     });
// };


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
  
  // const canvasAnimationVariants = useAnimation();

  // useMotionValueEvent(progress, "change", 
  //   (latest) => {
  //     console.log(latest)
  //      // Trigger animations at specific points
  //       if (latest >= 0.2) {
  //         canvasAnimationVariants.start({
  //           opacity: 0, 
  //           // y: "-100vh", 
  //           transition: { duration: 1, ease: "easeInOut" },
  //         });
  //       } 
  //       else if (latest < 0.2) {
  //         // setIsJumping(false);
  //         canvasAnimationVariants.start({
  //           opacity: 1, 
  //           // y: 0, 
  //           transition: { duration: 1, ease: "easeInOut" },
  //         });
  //       }
  //     });
  
  

  // const canvasAnimationVariants = {
  //   initial: {
  //     opacity: 1, 
  //     y: 0, 
  //   },
  //   animate: {
  //     opacity: 0, 
  //     y: "-100vh", 
  //     transition: {
  //       delay: 1, 
  //       opacity: {
  //         duration: 2, 
  //         ease: "easeInOut", 
  //       },
  //       y: {
  //         duration: 2, 
  //         ease: "easeInOut", 
  //       },
  //     },
  //   },
  // };

 
  
  // useEffect(() => {
  //   console.log(heroContainerProgress.get())
  // }, [heroContainerProgress])

  // useEffect(() => {
  //   console.log(progress)
  // }, [progress]);

  // const { scrollYProgress } = useScroll();
  // const viewportHeight = window.innerHeight;

  // // Scroll-linked translation of .hero-section_container
  // const containerTranslateY = useTransform(
  //   progress,
  //   [0, 0.2], // Use global scroll progress from 0 to 0.2
  //   [0, -viewportHeight], // Move the container out of the viewport when progress reaches 0.2
  //   { clamp: false } // Allow smooth scroll and scrub effect
  // );

  // const smoothTranslateY = useTransform(containerTranslateY, [0, -window.innerHeight], [0, -window.innerHeight], {
  //   ease: "easeInOut", // Smooth transition for both forward and backward scrolling
  // });
  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 0;
 
const canvasAnimationVariants = useAnimation();
    useMotionValueEvent(heroProgress, "change", (scrollProgress) => {
      if (scrollProgress >= 1) {
        canvasAnimationVariants.start({
          y: -viewportHeight * 2,
          // transition: { duration: 2, ease: "easeInOut" },
        });
      } 
      else if (scrollProgress < 1) {
        canvasAnimationVariants.start({
          y: 0,
          // transition: { duration: 2, ease: "easeInOut" },
        });
      }
    });
  // Transform the Y position of .canvas-container based on progress
  // const canvasY = useTransform(
  //   progress, // Progress value (global scroll)
  //   [heroRange[1] - 0.1, heroRange[1]], 
  //   [0, -viewportHeight], // Output range (move from 0 to -100vh in pixels)
  //   { clamp: true } // Prevent values outside this range
  // );


  return (
    <motion.div className="hero-section_container"
      ref={containerHeroRef}

      // style={{
      //   y: hcprogress >= 0.2 ? containerTranslateY : 0,
      // }} 
      // transition={{
      //   type: "spring", // Smooth easing
      //   stiffness: 80,
      //   damping: 20,  // Smooth return when scrolling back
      //   duration: 5, // Set duration for the animation
      // }}
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
          ease: "easeInOut", // Easing function
        }}
      >
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
        pointerEvents: 'auto',
        }}>
            
       <CameraAnimation progress={progress} heroRange={heroRange} isMobile={isMobile} />
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
        {/* <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
        /> */}
        <ShadowPlane />
      </Canvas>
    </motion.div>
  </Suspense>
  <div className="bottom" ref={bottomRef}></div>
  </motion.div>
  );
};





// const CameraAnimation = ({ progress }) => {
//   const { camera } = useThree();

//   // Initial camera position
//   const initialZ = 5;

//   // Normalize progress for the Hero section (0 to 0.2 => 0 to 1)
//   const adjustedProgress = useTransform(progress, [0, 0.2], [0, 1]);

//   // State to lock the camera when Stage 3 is reached
//   const [isStage3Locked, setIsStage3Locked] = useState(false);

//   useEffect(() => {
//     // Lock camera to Stage 3 when progress >= 0.7
//     const unsubscribe = adjustedProgress.on("change", (currentProgress) => {
//       if (currentProgress >= 1 && !isStage3Locked) {
//         setIsStage3Locked(true);

//         // Animate the camera to the final stage (Stage 3)
//         animate(camera.position, { y: 9, z: 6 }, { duration: 1, ease: "easeOut" });
//         animate(camera.rotation, { x: 0.01 }, { duration: 1, ease: "easeOut" });
//       } else if (currentProgress < 0.7 && isStage3Locked) {
//         setIsStage3Locked(false); // Unlock camera when scrolling back up
//       }
//     });

//     return () => unsubscribe();
//   }, [adjustedProgress, isStage3Locked, camera]);

//   // Update camera position dynamically (during scrolling)
//   useFrame(() => {
//     if (!isStage3Locked) {
//       const currentProgress = adjustedProgress.get();

//       // Determine the current phase of animation
//       let variant;
//       if (currentProgress <= 0.5) {
//         // Phase 1: Initial zoom and tilt
//         variant = {
//           y: 6 * currentProgress,
//           z: initialZ - currentProgress * 0.3,
//           rotationX: -0.01 * currentProgress,
//         };
//       } else if (currentProgress <= 0.7) {
//         // Phase 2: Smooth transition
//         const phaseProgress = (currentProgress - 0.5) / 0.2;
//         variant = {
//           y: phaseProgress * 2 + 3,
//           z: initialZ - 0.15 - phaseProgress * 0.5,
//           rotationX: phaseProgress * 0.005 - 0.005,
//         };
//       } else {
//         // Phase 3: Final zoom out
//         const phaseProgress = (currentProgress - 0.7) / 0.3;
//         variant = {
//           y: 5 + phaseProgress * 4,
//           z: initialZ + phaseProgress,
//           rotationX: 0.01,
//         };
//       }

//       // Apply the variant to the camera
//       camera.position.y = variant.y;
//       camera.position.z = variant.z;
//       camera.rotation.x = variant.rotationX;
//     }
//   });

//   return null; // No visible elements to render
// };


const CameraAnimation = ({ progress, heroRange }) => {
  const { camera } = useThree();

  // Initial camera position and rotation
  const initialPosition = new THREE.Vector3(0, 0, 5);
  const initialRotation = new THREE.Euler(0, 0, 0);

  // Normalize progress for the Hero section (0 to 0.2 => 0 to 1)
  const adjustedProgress = useTransform(progress, heroRange, [0, 1]);

  // Keyframes for camera position and rotation
  const keyframes = [
    {
      progress: 0, // Start
      position: new THREE.Vector3(0, 0, 5),
      rotation: new THREE.Euler(0, 0, 0),
    },
    {
      progress: 0.5, // Midway
      position: new THREE.Vector3(0, 3, 4.7),
      rotation: new THREE.Euler(-0.005, 0, 0),
    },
    {
      progress: 0.7, // Transition
      position: new THREE.Vector3(0, 5, 3.5),
      rotation: new THREE.Euler(-0.01, 0, 0),
    },
    {
      progress: 1, // End
      position: new THREE.Vector3(0, 10, 2),
      rotation: new THREE.Euler(0, 0, 0),
    },
  ];

  const easeOutQuad = (t) => t * (2 - t);

  useFrame(() => {
    const currentProgress = adjustedProgress.get();
  
    // Ensure smooth transition back to initial state
    if (currentProgress <= 0.01) {
      camera.position.lerp(initialPosition, 0.2);
      camera.quaternion.slerp(new THREE.Quaternion().setFromEuler(initialRotation), 0.2);
      return;
    }
  
    // Prevent jump at progress = 1
    if (currentProgress >= 0.99) {
      camera.position.copy(keyframes[keyframes.length - 1].position);
      camera.quaternion.copy(new THREE.Quaternion().setFromEuler(keyframes[keyframes.length - 1].rotation));
      return;
    }
  
    // Find the two keyframes to interpolate between
    let startKeyframe, endKeyframe;
    for (let i = 0; i < keyframes.length - 1; i++) {
      if (currentProgress >= keyframes[i].progress && currentProgress <= keyframes[i + 1].progress) {
        startKeyframe = keyframes[i];
        endKeyframe = keyframes[i + 1];
        break;
      }
    }
  
    if (!startKeyframe || !endKeyframe) return;
  
    // Compute interpolation factor
    const t = (currentProgress - startKeyframe.progress) / (endKeyframe.progress - startKeyframe.progress);
    const easedT = easeOutQuad(t);
  
    // Interpolate position and rotation
    camera.position.lerpVectors(startKeyframe.position, endKeyframe.position, easedT);
    camera.quaternion.slerpQuaternions(
      new THREE.Quaternion().setFromEuler(startKeyframe.rotation),
      new THREE.Quaternion().setFromEuler(endKeyframe.rotation),
      easedT
    );
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
