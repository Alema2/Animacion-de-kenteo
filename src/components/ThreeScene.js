import React from "react";
import { Canvas } from "@react-three/fiber";
import Background from "./Background"; 

const ThreeScene = ({ children }) => {
  return (
    <Canvas shadows>
      {children}  {/* Renderiza los hijos aquí */}
    </Canvas>
  );
};

export default ThreeScene;

