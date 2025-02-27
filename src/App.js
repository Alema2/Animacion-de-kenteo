import ThreeScene from "./components/ThreeScene";
//import Sphere from "./components/Sphere";
import Model from "./components/Model";
// Importa luces de Three.js
import {Stars } from "@react-three/drei";
//import Background from "three/src/renderers/common/Background.js";
import Background from "./components/Background"; 
//import { OrbitControls} from "@react-three/drei";

function App() {
  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <ThreeScene>
        <color attach="background" args={["#000000"]} />

        {/* Luz ambiental para iluminacion en general */}
        <ambientLight intensity={2} />

        {/* Foco grande desde la esquina superior izquierda */}
        <directionalLight 
          position={[-10, 10, 5]} 
          intensity={20} 
          castShadow 
        />

        {/* Foco grande desde la esquina superior derecha */}
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={5} 
          castShadow20
        />

        {/* Luz puntual extra para resaltar detalles */}
        <pointLight position={[0, 5, 5]} intensity={2} />

        {/* Luz spot adicional si necesitas más efectos */}
        <spotLight position={[0, 10, 0]} angle={0.3} intensity={3} castShadow />

        {/* Modelo 3D */}
        <Model />
        <Background />

        {/* Controles y estrellas */}
        {/*<OrbitControls autoRotate />*/}
        <Stars count={1000} factor={3} />
      </ThreeScene>
    </div>
  );
}

export default App;

