import React, { useRef, useEffect } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";

const Background = () => {
  const texture = useLoader(THREE.TextureLoader, "/assets/water.png");
  const meshRef = useRef();
  const { viewport } = useThree(); // Eliminamos `size`, ya no es necesario

  useEffect(() => {
    if (texture) {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.colorSpace = THREE.SRGBColorSpace; // Para colores correctos
    }
  }, [texture]);

  // Mantener la proporción correcta
  const width = viewport.width;
  const height = viewport.height;

  return (
    <mesh ref={meshRef} position={[0, 0, -10]} scale={[width+20, height+20, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} toneMapped={false} />
    </mesh>
  );
};

export default Background;
