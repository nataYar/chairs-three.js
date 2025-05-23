import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Carousel from './Carousel'
import '../../styles/Carousel.scss'

const CarouselSection = () => {

  const radius =40;
  return (
    <div className='carousel_section'>
        <div>Carousel</div>
        <Canvas camera={{ position: [0, 0, -100], fov: 50 }}
         style={{ 
          // position: 'fixed',
          // top: 0,
          // left: 0,
          // width: '100%',
          height: '100%',
          // zIndex: 2, 
          // pointerEvents: 'auto',
          }}>
          <ambientLight intensity={2} />
          <directionalLight position={[0, 30, -50]} intensity={2} />

            <Suspense fallback={null}>
                <Carousel radius={radius}/>
            </Suspense>
            <OrbitControls 
              enableZoom={false}
              enablePan={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
        </Canvas>
    </div>
  

  )
}

export default CarouselSection