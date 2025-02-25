import React, { useRef } from "react";
import * as THREE from "three"; // Importamos Three.js para materiales
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";


const Background = () => {
  const floorRef = useRef();

  const displacementMap = useLoader(TextureLoader, "/assets/water.jpg");


  useFrame(({ clock }) => {
    if (floorRef.current) {
      const material = floorRef.current.material;
      material.displacementScale = Math.sin(clock.elapsedTime) *0.5
      material.color.setHSL(Math.sin(clock.elapsedTime) * 0.1 + 0.5, 0.5, 0.4);
    }
  });

  return (
    <>
      {/* Pared (fondo estático) */}
      <mesh position={[0, 0, -5]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#8a8a8a" />
      </mesh>

      {/* Piso con efecto de ondas */}
      
      <mesh ref={floorRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[10, 10, 50, 50]} />
        <meshStandardMaterial
          color={"#4a4a4a"}
          displacementMap={displacementMap} // Agregar mapa de desplazamiento
          displacementScale={0.3} // Controlar la intensidad del relieve
        />
      </mesh>
    </>
  );
};

export default Background;
