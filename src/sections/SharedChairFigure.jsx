import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useSpring, a } from '@react-spring/three'
import { useThree  } from "@react-three/fiber";
// import chairModel from "src/assets/chairs/office_chair.glb";

export default function SharedChairFigure({ progress, officeRange, carouselRange, warholRange, isMobile }) {
  const group = useRef()
  const { scene } = useGLTF("src/assets/chairs/office_chair.glb");
  const { viewport } = useThree();

    // Normalize progress to 0 → 1 within the animation section (Office to Warhol)
    //   const normalized = (() => {
    //     const min = officeRange[1]
    //     const max = warholRange[1]
    //     const clamped = Math.min(Math.max(progress.get(), min), max)
    //     return (clamped - min) / (max - min)
    //   })()

    const initialScale = isMobile ? 0.027 : 0.2;
    const rotation = [-0.2, 3.2, 0];
   
    const initialPosition = isMobile
    ?  [ viewport.width * -0.44, 
        -viewport.height * 0.55, 
        1]
    : [viewport.width * -0.37, 
        -viewport.height * 0.7, 
        1 ]


    // Chair position animation across sections
    // const { position  } = useSpring({
    //     position: initialPosition,
    //     scale: initialScale,
    //     scale: normalized < 0.8 ? [1, 1, 1] : [0.3, 0.3, 0.3],
    //     config: { mass: 1, tension: 120, friction: 30 }
    // })

    // Hide chair before Office or after Warhol
    // const isVisible = progress.get() >= officeRange[1] && progress.get() < warholRange[1]
    // if (!isVisible) return null

    return (
        <a.group 
        ref={group} 
        position={initialPosition} 
        scale={initialScale }
        rotation={rotation} 
        >
        <primitive object={scene} />
      </a.group>
    )
}
