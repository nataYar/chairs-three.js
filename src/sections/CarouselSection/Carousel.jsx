import React, { useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import { useGesture } from "@use-gesture/react";
import ChairCarousel from "./ChairCarousel";
import { Html } from "@react-three/drei";


const Carousel = ({ radius = 5 }) => {
  const groupRef = useRef();
  const [currentAngle, setCurrentAngle] = useState(0);
  const chairConfigs = [
    { url: 'src/assets/chairs/victorian_chair.glb' },
    { url: 'src/assets/chairs/rocking_chair.glb' },
   
    { url: 'src/assets/chairs/chair_round.glb' },
    { url: 'src/assets/chairs/patio_chair_reconstruction.glb' },
    // { url: 'src/assets/chairs/chair_round.glb' },
  ]
  const chairCount = chairConfigs.length;
  const angleStep = (2 * Math.PI) / chairCount;
  const activeIndex = Math.round(currentAngle / angleStep) % chairCount;


  const { size } = useThree();
  const isMobile = size.width <= 768;

  
  const [{ rotationY }, api] = useSpring(() => ({ rotationY: 0 }));

  const bind = useGesture(
    {
      onDrag: ({ down, movement: [mx], last }) => {
        const rotationDelta = -mx / 200;
        const newAngle = currentAngle + rotationDelta;
        api.start({ rotationY: newAngle });

        if (last) {
          const snappedIndex = Math.round(newAngle / angleStep);
          const snappedAngle = snappedIndex * angleStep;
          setCurrentAngle(snappedAngle);
          api.start({ rotationY: snappedAngle });
        }
      },
    },
    {
      drag: { axis: "x" },
    }
  );

  const goToPreviousChair = () => {
    const snappedIndex = Math.round(currentAngle / angleStep) - 1;
    const newAngle = snappedIndex * angleStep;
    setCurrentAngle(newAngle);
    api.start({ rotationY: newAngle });
  };

  const goToNextChair = () => {
    const snappedIndex = Math.round(currentAngle / angleStep) + 1;
    const newAngle = snappedIndex * angleStep;
    setCurrentAngle(newAngle);
    api.start({ rotationY: newAngle });
  };

  return (
    <>
      <animated.group ref={groupRef} {...bind()} rotation-y={rotationY}>
      {chairConfigs.map((chair, index) => {
        const angle = index * angleStep
        const x = radius * Math.sin(angle)
        const z = radius * Math.cos(angle)
        const scale = 2
        const isActive = index === ((activeIndex + chairCount) % chairCount);
        const yRotation = angle + (isActive ? 0 : Math.PI);


        return (
          <ChairCarousel
          key={`${chair.url}-${index}`} 
            url={chair.url}
            position={[x, -1, z]}
            rotation={[-0.2, yRotation, 0]}
            scale={scale}
            isActive={isActive}
          />
        )
      })}
      </animated.group>

      {isMobile && (
        <Html center>
          <div className="carousel-controls">
            <button onClick={goToPreviousChair}>◀</button>
            <button onClick={goToNextChair}>▶</button>
          </div>
        </Html>
      )}
    </>
  );
};

export default Carousel;
