import ThreeScene from "./components/ThreeScene";
//import Sphere from "./components/Sphere";
import Model from "./components/Model";
// Importa luces de Three.js
import {Stars } from "@react-three/drei";
//import { OrbitControls} from "@react-three/drei";

function App() {
  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <ThreeScene>
        <color attach="background" args={["#2f4f4f"]} />

        {/* Luz ambiental: ilumina toda la escena de forma uniforme */}
        <ambientLight intensity={0.5} />

        {/* Luz direccional: simula la luz del sol */}
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />

        {/* Luz puntual: ilumina como una bombilla */}
        <pointLight position={[-3, 2, 3]} intensity={1.5} />

        {/* Luz spot: ilumina un área específica */}
        <spotLight position={[0, 5, 0]} angle={0.3} intensity={2} castShadow />

        {/* Objetos en la escena */}
        {/*<Sphere color="#ff0000" position={[-2, 1, -1]} /> {/* Rojo */}  
        {/*<Sphere color="#ff00ff" position={[2, 1, 0]} /> {/* Magenta */}
        <Model />

        {/* Controles y estrellas */}
        {/*<OrbitControls autoRotate />*/}
        <Stars count={1000} factor={3} />
      </ThreeScene>
    </div>
  );
}

export default App;

