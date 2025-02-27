import React from "react";
import { Canvas } from "@react-three/fiber";
//import Background from "./Background"; 

const ThreeScene = ({ children }) => {
  return (
    <Canvas shadows camera={{ position: [1, 2, 5], fov: 50 }}>
      {children}  {/* Renderiza los hijos aquí */}
    </Canvas>
  );
};

export default ThreeScene;

