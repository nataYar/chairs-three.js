import React, { useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import { useGesture } from "@use-gesture/react";
import ChairCarousel from "./ChairCarousel";
import { Html } from "@react-three/drei";


const Carousel = ({ radius }) => {
  const groupRef = useRef();
  const [currentAngle, setCurrentAngle] = useState(0);
  const chairConfigs = [
    { url: 'src/assets/chairs/bar_stool.glb', scale: 13 },
    { url: 'src/assets/chairs/red_armchair_new-v1.glb', scale: 9  },
   
    { url: 'src/assets/chairs/medieval_chair.glb', scale: 13 },
    { url: 'src/assets/chairs/zig_zag.glb', scale: 13   },
   
    {url: 'src/assets/chairs/throne_of_iron__stone-v1.glb', scale: 9, }
  ]
  const chairCount = chairConfigs.length;
  const angleStep = (2 * Math.PI) / chairCount;
  const activeIndex = (Math.round(-currentAngle / angleStep) % chairCount + chairCount) % chairCount;


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
       const angle = index * angleStep + Math.PI;

       const x = radius * Math.sin(angle);
       const z = radius * Math.cos(angle);
        const isActive = index === activeIndex;
        const yRotation = angle;



        return (
          <ChairCarousel
          key={chair.url}
            url={chair.url}
            position={[x, -5, z]}
            rotation={[0, yRotation, 0.1]}
            scale={chair.scale}
            isActive={isActive}
            transform={chair.transform}
          />
        )
      })}
      </animated.group>

      {/* {isMobile && ( */}
        <Html fullscreen>
          <div className="carousel-controls">
            <button onClick={goToPreviousChair}>◀</button>
            <button onClick={goToNextChair}>▶</button>
          </div>
        </Html>
      {/* )} */}
    </>
  );
};

export default Carousel;