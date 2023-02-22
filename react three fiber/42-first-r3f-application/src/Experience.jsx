import { useFrame } from "@react-three/fiber"

export default function Experience() {

  

  return(
    <group>
      <mesh scale={1} position-x={-2} >
          <sphereGeometry />
          <meshBasicMaterial color="orange" />
      </mesh>
      <mesh scale={1.5} position-x={2} rotation-y={2} >
          <boxGeometry />
          <meshBasicMaterial color="mediumpurple" />
      </mesh>
      <mesh scale={10} rotation-x={ - Math.PI * 0.5 } position-y={-1}>
        <planeGeometry />
        <meshBasicMaterial color="yellowgreen"/>
      </mesh>
    </group>
  )
}