import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Carousel from './Carousel'
import '../../styles/Carousel.scss'

const CarouselSection = () => {

  const radius =25;
  return (
    <div className='carousel_section'>
        <div>Carousel</div>
        <Canvas camera={{ position: [0, 0, -100], fov: 50 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[50, 50, 50]} intensity={3} />

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