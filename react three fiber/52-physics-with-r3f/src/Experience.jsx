import { OrbitControls, useGLTF } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Physics, RigidBody, Debug, CuboidCollider, BallCollider, CylinderCollider, InstancedRigidBodies } from '@react-three/rapier'
import { useRef, useState, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Experience() {
    const[hitsound] = useState(() => new Audio('./hit.mp3'))
    const cube = useRef()
    const twister = useRef()
    
    const burger = useGLTF('./hamburger.glb')
    
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
        
        const angle = time * 0.5
        const x = Math.cos(angle) * 2
        const z = Math.sin(angle) * 2
        twister.current.setNextKinematicTranslation({x, y: -0.8, z})
    })
    
    const collisionEnter = () => {
        // hitsound.currentTime = 0
        // hitsound.volume = Math.random()
        // hitsound.play()
    }
    
    const cubesCount = 3000
    const cubes = useRef()

    const cubesTransforms = useMemo(() => {
        const positions = []
        const rotations = []
        const scales = []

        for(let i = 0; i < cubesCount; i++) {
            positions.push([ 
                (Math.random() - 0.5) * 8, 
                6 + i * 0.2, 
                (Math.random() - 0.5) * 8, 
            ])
            rotations.push([
                Math.random(),
                Math.random(),
                Math.random()
            ])

            const scale = 0.2 + Math.random() * 0.8
            scales.push([scale, scale, scale])
        }

        return {positions, rotations, scales}
    })
    
    // useEffect(() => {
    //     for(let i = 0; i < cubesCount; i++) {
    //         const matrix = new THREE.Matrix4()
    //         matrix.compose(
    //             new THREE.Vector3(i * 2, 0, 0),
    //             new THREE.Quaternion(),
    //             new THREE.Vector3(1, 1, 1)
    //         )
    //         cubes.current.setMatrixAt(i, matrix)
    //     }
    // }, [])

    return (
        <>

            <Perf position="top-left" />

            <OrbitControls makeDefault />

            <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
            <ambientLight intensity={ 0.5 } />

            <Physics gravity={[0, -9.82, 0 ]}>   

                {/* <Debug /> */}

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
                    onCollisionEnter={ collisionEnter }
                    // onCollisionExit={ () => console.log('exit') }
                    // onSleep={ () => console.log('sleep') }
                    // onWake={ () => console.log('wake up') }
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
                
                <RigidBody colliders={ false } position={[0, 4, 0]}>
                    <primitive object={burger.scene} scale={0.25} />
                    <CylinderCollider args={[0.5, 1.25]} />
                </RigidBody>

                <RigidBody type='fixed'>
                    <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.5]} />
                    <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.5]} />
                    <CuboidCollider args={[0.5, 2, 5]} position={[5.5, 1, 0]} />
                    <CuboidCollider args={[0.5, 2, 5]} position={[-5.5, 1, 0]} />
                </RigidBody>

                <InstancedRigidBodies
                    positions={cubesTransforms.positions}
                    rotations={cubesTransforms.rotations}
                    scales={cubesTransforms.scales}
                >
                    <instancedMesh castShadow ref={cubes} args={[null, null, cubesCount]}>
                        <boxGeometry />
                        <meshStandardMaterial color="tomato" />
                    </instancedMesh>
                </InstancedRigidBodies>

            </Physics>

        </>
    )
}