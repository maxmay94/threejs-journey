import { OrbitControls, useGLTF, useTexture, Center, Sparkles, shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'

const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('#ffffff'),
        uColorEnd: new THREE.Color('#000000')
    },
    portalVertexShader,
    portalFragmentShader
)

extend({ PortalMaterial })


export default function Experience() {
    const portalMaterial = useRef()

    const { nodes } = useGLTF('./model/portal.glb')

    const bakedTexture = useTexture('./model/baked.jpg')
    bakedTexture.flipY = false

    useFrame((state, delta) => {
        portalMaterial.current.uTime += delta
    })

    return (
        <>
            <color args={['#030202']} attach='background' />
            <OrbitControls makeDefault />

            <Center>
                <mesh geometry={nodes.baked.geometry} texture={bakedTexture}> 
                    <meshBasicMaterial map={bakedTexture} />
                </mesh>

                <mesh 
                    geometry={nodes.poleLightA.geometry}
                    position={nodes.poleLightA.position}    
                > 
                    <meshBasicMaterial color='#ffffe5' />
                </mesh> 

                <mesh 
                    geometry={nodes.poleLightB.geometry}
                    position={nodes.poleLightB.position}    
                > 
                    <meshBasicMaterial color='#ffffe5' />
                </mesh> 

                <mesh
                    geometry={nodes.portalLight.geometry}
                    position={nodes.portalLight.position}
                    rotation={nodes.portalLight.rotation}
                >
                    <portalMaterial ref={portalMaterial} />
                </mesh>

                <Sparkles 
                    size={6}
                    scale={[4, 2, 4]}
                    position={[0, 1, 0]}
                    speed={0.6}
                    count={40}
                />
            </Center>
        </>
    )
}