import React, { useRef, useEffect } from "react";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import model from "../assets/colibri2_con.glb"; // Ruta del modelo

const Model = () => {
  const ref = useRef(); // Referencia al modelo completo
  const { scene } = useGLTF(model);
  const wingRef = useRef();
  const bodyPartRef = useRef();
  const rotationRef = useRef(0);

  // Límites de movimiento
  const minX = -5;
  const maxX = 3; // Ajusta el límite derecho donde quieres que se detenga
  const minY = -2;
  const maxY = 2;

  useEffect(() => {
    console.log("📌 Lista de objetos en el modelo:");
    scene.traverse((obj) => console.log(obj.name));

    // Reducir tamaño del colibrí
    scene.scale.set(0.005, 0.005, 0.005);

    // Posición inicial
    scene.position.set(minX, 1, 0);
    scene.rotation.y = Math.PI;

    // Buscar alas
    wingRef.current = scene.getObjectByName("BODY_WINGS_0") || null;
    bodyPartRef.current = scene.getObjectByName("BODY_BODY_0") || null;

    if (wingRef.current) console.log("✅ Alas encontradas:", wingRef.current);
    else console.log("⚠️ Alas no encontradas");

    if (bodyPartRef.current) console.log("✅ Parte del cuerpo encontrada:", bodyPartRef.current);
    else console.log("⚠️ Parte del cuerpo no encontrada");
  }, [scene]);

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
        obj.material.needsUpdate = true;
        obj.material.toneMapped = false;
      }
    });
  }, [scene]);

  useFrame(({ clock }) => {
    const elapsed = clock.elapsedTime;

    if (ref.current) {
      // Actualizar la posición
      ref.current.position.x = minX + elapsed * 1.5;
      ref.current.position.y = minY + elapsed * 1.2;

      // 📌 Limitar el movimiento en X
      if (ref.current.position.x >= maxX) {
        ref.current.position.x = maxX; // Detener el movimiento en X
      }

      // 📌 Limitar el movimiento en Y
      if (ref.current.position.y >= maxY) {
        ref.current.position.y = maxY; // Detener el movimiento en Y
      }

      if (rotationRef.current >= Math.PI * 2) {
        rotationRef.current = 0;
      }
    }

    // Movimiento de las alas
    if (wingRef.current) {
      wingRef.current.rotation.z = Math.sin(elapsed * 90) * 0.55;
    }

    // Movimiento del cuerpo
    if (bodyPartRef.current) {
      bodyPartRef.current.rotation.y = Math.cos(elapsed * 18) * 0.15;
      bodyPartRef.current.rotation.z = Math.cos(elapsed * 0.9) * 0.4;
    }
  });

  return (
    <>
      {/* Iluminación optimizada */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={1.5} />
      <pointLight position={[0, 5, 5]} intensity={1.5} color="white" />
      <pointLight position={[0, -5, -5]} intensity={0.5} color="#222222" />

      {/* Entorno HDR para iluminación realista */}
      <Environment preset="sunset" />

      {/* Modelo */}
      <primitive ref={ref} object={scene} />

      {/* Controles de cámara */}
      <OrbitControls enableZoom enablePan enableRotate />
    </>
  );
};

export default Model;


