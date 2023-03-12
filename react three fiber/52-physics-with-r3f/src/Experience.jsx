import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Physics, RigidBody, Debug, CuboidCollider, BallCollider } from '@react-three/rapier'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Experience() {
    const cube = useRef()
    const twister = useRef()

    const cubeJump = (event) => {
        const mass = cube.current.mass()
        cube.current.applyImpulse({x: 0, y: 5 * mass, z: 0})
        cube.current.applyTorqueImpulse({
            x: Math.random() - 0.5, 
            y: Math.random() - 0.5, 
            z: Math.random() - 0.5
        }, event.point)
    }

    useFrame((state) => { 
        const time = state.clock.getElapsedTime()
        const eulerRotation = new THREE.Euler(0, time * 3, 0)
        const quaternionRotation = new THREE.Quaternion().setFromEuler(eulerRotation)
        twister.current.setNextKinematicRotation(quaternionRotation)
    })

    return (
        <>

            <Perf position="top-left" />

            <OrbitControls makeDefault />

            <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
            <ambientLight intensity={ 0.5 } />

            <Physics gravity={[0, -9.82, 0 ]}>   

                <Debug />

                <RigidBody colliders="ball" restitution={ 0.5 } >          
                    <mesh castShadow position={ [ -1.5, 2, 0 ] }>
                        <sphereGeometry />
                        <meshStandardMaterial color="orange" />
                    </mesh>
                </RigidBody>


                <RigidBody 
                    ref={cube} 
                    position={[1.5, 2, 0]} 
                    gravityScale={ 1 } 
                    restitution={ 0 } 
                    friction={ 0.7 }
                    mass={ 1 }
                    colliders={ false }
                >
                    <mesh castShadow  onClick={ cubeJump } >
                        <boxGeometry />
                        <meshStandardMaterial color="mediumpurple" />
                    </mesh>
                    <CuboidCollider mass={ 2 } args={ [0.5, 0.5, 0.5]} />
                </RigidBody>


                <RigidBody 
                    type='fixed' 
                    friction={ 0.7 } 
                >
                    <mesh receiveShadow position-y={ - 1.25 }>
                        <boxGeometry args={ [ 10, 0.5, 10 ] } />
                        <meshStandardMaterial color="greenyellow" />
                    </mesh>
                </RigidBody>

                <RigidBody
                    position={[0, -0.8, 0]}
                    friction={0}
                    type='kinematicPosition'
                    ref={twister}
                >
                    <mesh castShadow scale={[ 0.4, 0.4, 3]}>
                        <boxGeometry />
                        <meshStandardMaterial color="red" />
                    </mesh>
                </RigidBody>

            </Physics>

        </>
    )
}