// import React, { useRef, useEffect } from "react";
// import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
// import { useFrame, useThree } from "@react-three/fiber";
// import model from "../assets/colibri2_con.glb"; // Ruta del modelo

// const Model = () => {
//   const { scene } = useGLTF(model);
//   const { viewport } = useThree(); // 📌 Obtiene el tamaño de la pantalla dinámicamente
//   const wingRef = useRef();
//   const bodyPartRef = useRef();
//   const rotationRef = useRef(0); // 📌 Para manejar la rotación sin acumulación

//   useEffect(() => {
//     console.log("📌 Lista de objetos en el modelo:");
//     scene.traverse((obj) => console.log(obj.name));

//     // Reducir tamaño del colibrí
//     scene.scale.set(0.04, 0.04, 0.04);

//     // Posición inicial fuera de la pantalla
//     scene.position.set(-viewport.width , -viewport.height / 2, 0);
//     scene.rotation.y = Math.PI; // Inicia mirando en la dirección correcta

//     // Buscar alas y cuerpo
//     wingRef.current = scene.getObjectByName("BODY_WINGS_0") || null;
//     bodyPartRef.current = scene.getObjectByName("BODY_BODY_0") || null;

//     console.log(wingRef.current ? "✅ Alas encontradas" : "⚠️ Alas no encontradas");
//     console.log(bodyPartRef.current ? "✅ Cuerpo encontrado" : "⚠️ Cuerpo no encontrado");
//   }, [scene, viewport.width, viewport.height]); // 📌 Se actualiza si cambia el tamaño de la pantalla

//   useFrame(({ clock }) => {
//     const elapsed = clock.getElapsedTime();
    
//     // 📌 Movimiento en diagonal basado en el tamaño de la pantalla
//     const t = (Math.sin(elapsed * 0.7) + 1) / 2; // Oscila entre 0 y 1 suavemente

//     const minX = -viewport.width / 2; 
//     const maxX = viewport.width / 2;
//     const minY = -viewport.height / 2;
//     const maxY = viewport.height / 2;

//     const newX = minX + t * (maxX - minX);
//     const newY = minY + t * (maxY - minY);
//     scene.position.set(newX, newY, 0);

//     // 📌 Rotación en el centro sin acumulación infinita

//     if (t > 0.4 && t < 0.6) {
//       scene.rotation.y += 0.2; // Ajusta la velocidad del gir
//     } else {
//         rotationRef.current = 0; // Resetea para la próxima vez
//     }


//     // Movimiento de las alas
//     if (wingRef.current) {
//         wingRef.current.rotation.z = Math.sin(elapsed * 50) * 0.55;
//     }

//     // Movimiento del cuerpo
//     if (bodyPartRef.current) {
//         bodyPartRef.current.rotation.y = Math.cos(elapsed * 18) * 0.15;
//         bodyPartRef.current.rotation.z = Math.cos(elapsed * 0.9) * 0.4;
//     }
//   });
//   useFrame(({ clock }) => {
//     const elapsed = clock.getElapsedTime();
    
//     // Normalizar el tiempo entre 0 y 1 para un ciclo de movimiento
//     const t = (elapsed * 0.2) % 1; // Ajusta la velocidad cambiando 0.2

//     // Tamaño del viewport para hacer que el movimiento sea dinámico
//     const minX = -window.innerWidth / 200; 
//     const maxX = window.innerWidth / 200;
//     const minY = -window.innerHeight / 200;
//     const maxY = window.innerHeight / 200;
// /*
//     if (t < 0.4) {
//         // 📌 Fase 1: Volar hasta el centro
//         const newX = minX + (t / 0.4) * (maxX - minX) / 2;
//         const newY = minY + (t / 0.4) * (maxY - minY) / 2;
//         scene.position.set(newX, newY, 0);
//     } else if (t >= 0.4 && t < 0.6) {
//         // 📌 Fase 2: Se queda en el centro y gira dos vueltas (720°)
//         scene.rotation.y += 0.2; // Ajusta la velocidad del giro
//     } else {
//         // 📌 Fase 3: Continúa volando hacia la esquina superior derecha
//         const progress = (t - 0.6) / 0.4;
//         const newX = (maxX - minX) / 2 + progress * (maxX - (maxX - minX) / 2);
//         const newY = (maxY - minY) / 2 + progress * (maxY - (maxY - minY) / 2);
//         scene.position.set(newX, newY, 0);
//     }*/

//     // Movimiento de las alas
//     if (wingRef.current) {
//         wingRef.current.rotation.z = Math.sin(elapsed * 50) * 0.55;
//     }

//     // Movimiento del cuerpo
//     if (bodyPartRef.current) {
//         bodyPartRef.current.rotation.y = Math.cos(elapsed * 18) * 0.15;
//         bodyPartRef.current.rotation.z = Math.cos(elapsed * 0.9) * 0.4;
//     }
// });

//   return (
//     <>
//       {/* Iluminación */}
//       <ambientLight intensity={1.5} />
//       <directionalLight position={[5, 5, 5]} intensity={2} castShadow />
//       <directionalLight position={[-5, 5, -5]} intensity={1.5} />
//       <pointLight position={[0, 5, 5]} intensity={1.5} color="white" />
//       <pointLight position={[0, -5, -5]} intensity={0.5} color="#222222" />

//       {/* Entorno HDR */}
//       <Environment preset="sunset" />

//       {/* Modelo */}
//       <primitive object={scene} />

//       {/* Controles de cámara */}
//       <OrbitControls enableZoom enablePan enableRotate />
//     </>
//   );
// };

// export default Model;



import React, { useRef, useEffect } from "react";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import model from "../assets/colibri2_con.glb"; // Ruta del modelo

const Model = () => {
  const { scene } = useGLTF(model);
  const { viewport } = useThree(); // 📌 Obtiene el tamaño de la pantalla dinámicamente
  const wingRef = useRef();
  const bodyPartRef = useRef();
  const startTime = useRef(null);

  useEffect(() => {
    console.log("📌 Lista de objetos en el modelo:");
    scene.traverse((obj) => console.log(obj.name));

    // Reducir tamaño del colibrí
    scene.scale.set(0.04, 0.04, 0.04);

    // 📌 Posición inicial en la parte inferior izquierda
    scene.position.set(-viewport.width / 2, -viewport.height / 2, 0);
    scene.rotation.y = Math.PI; // Inicia mirando en la dirección correcta

    // Buscar alas y cuerpo
    wingRef.current = scene.getObjectByName("BODY_WINGS_0") || null;
    bodyPartRef.current = scene.getObjectByName("BODY_BODY_0") || null;

    console.log(wingRef.current ? "✅ Alas encontradas" : "⚠️ Alas no encontradas");
    console.log(bodyPartRef.current ? "✅ Cuerpo encontrado" : "⚠️ Cuerpo no encontrado");
  }, [scene, viewport.width, viewport.height]); // 📌 Se actualiza si cambia el tamaño de la pantalla

  useFrame(({ clock }) => {
    if (startTime.current === null) startTime.current = clock.getElapsedTime();
    const elapsed = clock.getElapsedTime() - startTime.current;

    const minX = -viewport.width / 2;
    const maxX = viewport.width / 2;
    const minY = -viewport.height / 2;
    const maxY = viewport.height / 2;

    if (elapsed < 1.5) {
      // 📌 Fase 1: De la parte inferior izquierda al centro (1.5s)
      const progress = elapsed / 1.5;
      scene.position.set(minX + progress * (0 - minX), minY + progress * (0 - minY), 0);
    } else if (elapsed >= 1.5 && elapsed < 2.5) {
      // 📌 Fase 2: Dar exactamente dos vueltas en el centro (1s)
      const progress = (elapsed - 1.5) / (2.5 - 1.5); // Normaliza entre 0 y 1
      const totalRotation = 3 * Math.PI ; // 720°
      scene.rotation.y = totalRotation * progress; // Calcula en base al progreso
    } 
    
    

    // Movimiento de las alas
    if (wingRef.current) {
      wingRef.current.rotation.z = Math.sin(elapsed * 50) * 0.55;
    }

    // Movimiento del cuerpo
    if (bodyPartRef.current) {
      bodyPartRef.current.rotation.y = Math.cos(elapsed * 18) * 0.15;
      bodyPartRef.current.rotation.z = Math.cos(elapsed * 0.9) * 0.4;
    }
  });

  return (
    <>
      {/* Iluminación */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={1.5} />
      <pointLight position={[0, 5, 5]} intensity={1.5} color="white" />
      <pointLight position={[0, -5, -5]} intensity={0.5} color="#222222" />

      {/* Entorno HDR */}
      <Environment preset="sunset" />

      {/* Modelo */}
      <primitive object={scene} />

      {/* Controles de cámara */}
      <OrbitControls enableZoom enablePan enableRotate />
    </>
  );
};

export default Model;

