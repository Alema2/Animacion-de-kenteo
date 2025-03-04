import React from "react";
import { Canvas } from "@react-three/fiber";
//import Background from "./Background"; 

const ThreeScene = ({ children }) => {
  return (
    <Canvas shadows camera={{ position: [0, 0, 100], fov: 50 }} style={{width: "100vw", height: "100vh"}}>
      {children}  {/* Renderiza los hijos aquí */}
    </Canvas>
  );
};

export default ThreeScene;

