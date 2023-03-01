import { useGLTF, useAnimations } from '@react-three/drei'
import { useEffect } from 'react'


export default function Fox(props) {

  const fox = useGLTF('./Fox/glTF/Fox.gltf')
  const animations = useAnimations(fox.animations, fox.scene)

  useEffect(() => {
    animations.actions.Run.play()
    
    window.setTimeout(() => {
      animations.actions.Walk.play()
      animations.actions.Walk.crossFadeFrom(animations.actions.Run, 1)
    }, 2000)
  }, [])

  return(
    <>
      <primitive 
        object={fox.scene} 
        scale={0.02}
        position={[-2.5, 0, 2.5]}
        rotation-y={0.3}
      />
    </>
  )
}