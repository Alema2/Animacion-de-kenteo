import React, { useRef, useEffect } from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import model from "../assets/colibri2_con.glb"; // Ruta del modelo

const Model = () => {
  const ref = useRef(); // Referencia al modelo completo
  const { scene } = useGLTF(model);
  const wingRef = useRef(); // Referencia a las alas
  const bodyPartRef = useRef(); // Referencia a otra parte del cuerpo
  const rotationRef = useRef(0); // Para controlar la rotación de 360°

  useEffect(() => {
    console.log("📌 Lista de objetos en el modelo:");
    scene.traverse((obj) => {
      console.log(obj.name);
    });

    // Reducir tamaño del colibrí
    scene.scale.set(0.005, 0.005, 0.005);

    // 📍 Posición inicial en la esquina inferior izquierda
    scene.position.set(-5, -2, 0);

    // 🔄 Aplicar rotación de 180° desde el inicio
    scene.rotation.y = Math.PI; // 180° en radianes

    // Buscar alas
    const wings = scene.getObjectByName("BODY_WINGS_0");
    if (wings) {
      wingRef.current = wings;
      console.log("✅ Alas encontradas:", wings);
    } else {
      console.log("⚠️ Alas no encontradas");
    }

    // Buscar otra parte del cuerpo (ejemplo: cola)
    const bodyPart = scene.getObjectByName("BODY_TAIL_0"); // Ajusta el nombre
    if (bodyPart) {
      bodyPartRef.current = bodyPart;
      console.log("✅ Parte del cuerpo encontrada:", bodyPart);
    } else {
      console.log("⚠️ Parte del cuerpo no encontrada");
    }
  }, [scene]);

  useFrame(({ clock }) => {
    const elapsed = clock.elapsedTime;

    // 📌 Movimiento diagonal del colibrí
    if (ref.current) {
      ref.current.position.x = -5 + elapsed * 1.5; // Movimiento en X
      ref.current.position.y = -2 + elapsed * 1.2; // Movimiento en Y

      // 📍 Cuando llega a la mitad (x ≈ 0), inicia la rotación de 360°
      if (ref.current.position.x >= 0 && rotationRef.current < Math.PI * 2) {
        rotationRef.current += 0.1; // Incrementamos el giro
        ref.current.rotation.y = Math.PI + rotationRef.current; // Rotación en Y
      }
    }

    // 🦋 Movimiento de las alas (rápido y pequeño)
    if (wingRef.current) {
      wingRef.current.rotation.z = Math.sin(elapsed * 10) * 0.15;
    }

    // 🌀 Movimiento del cuerpo (lento y más amplio)
    if (bodyPartRef.current) {
      bodyPartRef.current.rotation.x = Math.cos(elapsed * 3) * 0.1;
    }
  });

  return (
    <>
      {/* 💡 Iluminación */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={1.5} />
      <pointLight position={[0, 5, 5]} intensity={2} color="white" />
      <pointLight position={[0, -5, -5]} intensity={1} color="blue" />

      {/* 🌍 Modelo */}
      <primitive ref={ref} object={scene} />

      {/* 🖱️ Controles de cámara */}
      <OrbitControls enableZoom enablePan enableRotate />
    </>
  );
};

export default Model;



