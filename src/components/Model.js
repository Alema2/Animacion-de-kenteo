import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei"; // Mejor alternativa a GLTFLoader
import model from "../assets/colibri.glb"; // Ruta del modelo
import {useFrame} from '@react-three/fiber' //para modificar al model

const Model = () => {
  const ref = useRef(); //Referencia al modelo 3D
  const { scene } = useGLTF(model); // Cargar el modelo GLB

  useFrame(({clock})=>{
    if(ref.current){
      ref.current.position.x += (Math.sin(clock.elapsedTime)*2 -ref.current.position.x)*0.1  // Movimiento de un lado a otro
    }
  })
  return <primitive ref={ref}  object={scene} />; // Renderizar el modelo en la escena
};

export default Model;

