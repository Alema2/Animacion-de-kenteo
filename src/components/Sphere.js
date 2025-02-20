import React from "react";

const Sphere = ({color, position}) => {
  return (
    <mesh position={position}> {/* mesh en minúsculas */}
      <sphereGeometry args={[1, 32, 32]} /> {/* Usa args para definir parámetros */}
      <meshStandardMaterial color={color} wireframe />
    </mesh>
  );
};

export default Sphere;

