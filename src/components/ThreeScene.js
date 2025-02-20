import React from "react";
import { Canvas } from "@react-three/fiber";

const ThreeScene = ({ children }) => {
  return (
    <Canvas>
      {children}  {/* Renderiza los hijos aquí */}
    </Canvas>
  );
};

export default ThreeScene;

