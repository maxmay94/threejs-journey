import { RigidBody, useRapier } from "@react-three/rapier"
import { useFrame } from "@react-three/fiber"
import { useKeyboardControls } from "@react-three/drei"
import { useRef, useEffect, useState } from "react"
import * as THREE from "three"

export default function Player() {
  const body = useRef()
  const [ subscribeKeys, getKeys ] = useKeyboardControls()
  const { rapier, world } = useRapier()
  const rapierWorld = world.raw()

  const [ smoothCameraPosition ] = useState(() => new THREE.Vector3(10, 10, 10))
  const [ smoothCameraTarget ] = useState(() => new THREE.Vector3())


  const jump = () => {
    const origin = body.current.translation()
    origin.y -= 0.31

    const direction = { x: 0, y: -1, z: 0 }
    const ray = new rapier.Ray(origin, direction)
    const hit = rapierWorld.castRay(ray, 10, true)

    if(hit.toi < 0.15) {
      body.current.applyImpulse({ x: 0, y: 0.5, z: 0 })
    }
  }

  useEffect(() => {
    const unsubscribeJump = subscribeKeys(
      (state) => state.jump, 
      (value) => {
        if(value) {
          jump()
        }
      }
    )

    return () => {
      unsubscribeJump()
    }
  }, [])

  useFrame((state, delta) => {

    /**
     * Controls
     */
    const { forward, backward, leftward, rightward } = getKeys()

    const impulse = { x: 0, y: 0, z: 0 }
    const torque = { x: 0, y: 0, z: 0 }

    const impulseStrength = 0.6 * delta
    const torqueStrength = 0.2 * delta

    if(forward) {
      impulse.z -= impulseStrength
      torque.x -= torqueStrength
    }
    if(backward) {
      impulse.z += impulseStrength
      torque.x += torqueStrength
    }
    if(leftward) {
      impulse.x -= impulseStrength
      torque.z += torqueStrength
    }
    if(rightward) {
      impulse.x += impulseStrength
      torque.z -= torqueStrength
    }

    body.current.applyImpulse(impulse)
    body.current.applyTorqueImpulse(torque)

    /**
     * Camera
     */
    const bodyPosition = body.current.translation()

    const cameraPosition = new THREE.Vector3()
    cameraPosition.copy(bodyPosition)
    cameraPosition.z += 2.25
    cameraPosition.y += 0.65

    const cameraTarget = new THREE.Vector3()
    cameraTarget.copy(bodyPosition)
    cameraTarget.y += 0.25

    smoothCameraPosition.lerp(cameraPosition, 5 * delta)
    smoothCameraTarget.lerp(cameraTarget, 5 * delta)

    state.camera.position.copy(smoothCameraPosition)
    state.camera.lookAt(smoothCameraTarget)
  })

  return(
    <>
      <RigidBody 
        ref={body} 
        colliders="ball" 
        position={[0, 1, 0]} 
        restitution={0.2} 
        friction={1} 
        linearDamping={0.5}
        angularDamping={0.5}
      >
        <mesh castShadow >
          <icosahedronGeometry args={[0.3, 1]} />
          <meshStandardMaterial flatShading color="hotpink" />
        </mesh>
      </RigidBody>
    </>
  )
}