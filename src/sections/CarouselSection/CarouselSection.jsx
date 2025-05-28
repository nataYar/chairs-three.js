import React, { Suspense, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Noise, Vignette  } from '@react-three/postprocessing'
import Carousel from './Carousel'
import { useThree } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import { useSpring, useTransform, useMotionValue, useInView} from 'framer-motion';

import '../../styles/Carousel.scss'


function FixedBackgroundPlane({ isInView }) {
  const { camera } = useThree();
  const planeRef = useRef(null);
  const materialRef = useRef(null);  


  const viewValue = useMotionValue(0);
  const spring = useSpring(viewValue, {
    stiffness: 20,  // lower stiffness = slower spring
    damping: 30,  
    mass: 2
  });

  const color = useTransform(spring, [0, 1], ['#000000', '#d0d0d0']);


  useEffect(() => {
    console.log(isInView)
    if (isInView) {
      console.log("isInView must be +")
      // viewValue.set(1);
    }
  }, [isInView]);

  // Trigger animation when isInView becomes true
  useEffect(() => {
    viewValue.set(isInView ? 1 : 0); // Animate both directions
  }, [isInView]);


  useEffect(() => {
    const unsubscribe = color.on('change', (val) => {
      if (materialRef.current) {
        materialRef.current.color.set(val);
      }
    });
    return () => unsubscribe();
  }, [color]);


  useFrame(() => {
    if (planeRef.current && materialRef.current) {
      const dir = new THREE.Vector3();
      camera.getWorldDirection(dir);
      const position = camera.position.clone().add(dir.clone().multiplyScalar(100));
      planeRef.current.position.copy(position);
      planeRef.current.lookAt(camera.position);
    }
  });
 

  return (
    <mesh ref={planeRef}>
      <planeGeometry args={[500, 500]} />
      <meshBasicMaterial ref={materialRef} color="#000000" toneMapped={false} />
    </mesh>
  );
}

const CarouselSection = () => {
  const radius = 41;
  const triggerRef = useRef(null);
  const isInView = useInView(triggerRef);

  return (
    <div className='carousel_section' >
      {/* Invisible trigger div */}
      
      <div className='carousel_presection'>
        <h2>Now, meet its unruly cousins.</h2>
        <p> Some came from castles, some from cocktail bars. </p>
        <p> None are boring.</p>
        <p>Give them a spin. Literally.</p>
      </div>

      {/* Trigger for plane to change color to grey */}
      <div ref={triggerRef} style={{ position: 'absolute', top: '140vh', height: '2px', width: '100%', backgroundColor:"blue" }} ></div>

      <Canvas camera={{ position: [0, 0, -100], fov: 50, near: 1, far: 1000 }} style={{ height: '110vh' }}>
        <FixedBackgroundPlane isInView={isInView} />

        <ambientLight intensity={1.5} />
        <directionalLight position={[0, 30, -50]} intensity={1.5} />

        <EffectComposer disableNormalPass>
          <Noise opacity={0.6} />
          <Vignette eskil={false} offset={0.2} darkness={0.6} />
        </EffectComposer>

        <Suspense fallback={null}>
          <Carousel radius={radius} />
        </Suspense>
      </Canvas>
    </div>
  )
}
export default CarouselSection;