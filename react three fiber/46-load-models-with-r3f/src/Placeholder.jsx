export default function Placeholder({scale}) {
  return(
    <mesh position-y={ 0.5 } scale={ scale }>
      <boxGeometry args={ [ 1, 1, 1, 2, 2, 2 ] } />
      <meshBasicMaterial wireframe color="red" />
    </mesh> 
  )
}