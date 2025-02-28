import React, { useRef, useEffect } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";

const Background = () => {
  const texture = useLoader(THREE.TextureLoader, "/assets/water.png");
  const meshRef = useRef();
  const { viewport, size } = useThree(); // Obtener el tamaño de la ventana

  useEffect(() => {
    if (texture) {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
    }
  }, [texture]);

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
};

export default Background;
