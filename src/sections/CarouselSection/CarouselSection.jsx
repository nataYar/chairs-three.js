import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Carousel from './Carousel'
import '../../styles/Carousel.scss'

const CarouselSection = () => {
  return (
    <div className='carousel_section'>
        <div>Carousel</div>
        <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[200, 60, 50]} intensity={1} />
            <Suspense fallback={null}>
                <Carousel />
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