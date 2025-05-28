import React, { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Noise, Vignette  } from '@react-three/postprocessing'
import Carousel from './Carousel'
import { useThree } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';

import { Plane } from '@react-three/drei'

import '../../styles/Carousel.scss'


function FixedBackgroundPlane() {
  const { camera } = useThree();
  const planeRef = useRef();

  useFrame(() => {
    if (planeRef.current) {
      // Move the plane behind the camera
      const dir = new THREE.Vector3();
      camera.getWorldDirection(dir);
      const position = camera.position.clone().add(dir.clone().multiplyScalar(100));
      planeRef.current.position.copy(position);

      // Always face the camera
      planeRef.current.lookAt(camera.position);
    }
  });

  return (
    <mesh ref={planeRef}>
      <planeGeometry args={[500, 500]} />
      <meshBasicMaterial color="#b4b4b4" toneMapped={false} />
    </mesh>
  );
}


const CarouselSection = () => {

  const radius = 41;

  return (
    <div className='carousel_section'>
        <div className='carousel_presection'>
          <h2>Now, meet its unruly cousins.</h2>
          <p> Some came from castles, some from cocktail bars.  </p>
          <p> None are boring.</p>
          <p>Give them a spin. Literally.</p>
        </div>
        <Canvas camera={{ position: [0, 0, -100], fov: 50, near: 1, far: 1000 }} style={{ height: '100vh', background: 'purple' }}>
        <FixedBackgroundPlane />

        <ambientLight intensity={2} />
        <directionalLight position={[0, 30, -50]} intensity={2} />
        
        <EffectComposer disableNormalPass>
          <Noise opacity={2} premultiply />
          <Vignette eskil={false} offset={0.2} darkness={0.6} />
        </EffectComposer> 

        {/* --- CAROUSEL --- */}
        <Suspense fallback={null}>
          <Carousel radius={radius} />
        </Suspense>
 
        {/* <OrbitControls 
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        /> */}
      </Canvas>
    </div>
  )
}

export default CarouselSection