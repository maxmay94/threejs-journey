import { Float, Html, OrbitControls, PivotControls, TransformControls, Text, MeshReflectorMaterial } from '@react-three/drei'
import { useRef } from 'react'

export default function Experience() {
    const cube = useRef()
    const sphere = useRef()

    return (
        <>
            <OrbitControls makeDefault />

            <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
            <ambientLight intensity={ 0.5 } />

            <PivotControls 
                anchor={[0, 0, 0,]} 
                depthTest={false} 
                lineWidth={4}
                axisColors={['#9381ff', '#ff4d6d', '#7ae582']}
                scale={1}
                fixed={false}
            >
                <mesh position-x={ - 2 } scale={1} ref={sphere}>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                    <Html 
                        position={[1, 1, 0]}
                        wrapperClass='label'
                        center
                        distanceFactor={6}
                        occlude={[sphere, cube]}
                    >
                        Thats a sphere 👍
                    </Html>
                </mesh>
            </PivotControls>

            <mesh position-x={ 2 } scale={ 1.5 } ref={cube}>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>
            <TransformControls object={cube} mode='translate' />

            <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
                <planeGeometry />
                {/* <meshStandardMaterial color="greenyellow" /> */}
                <MeshReflectorMaterial 
                    resolution={512 * 2} 
                    color='red'
                    blur={[1000, 1000]}
                    mixBlur={1}
                    mirror={0.75}
                />
            </mesh>

            <Float
                speed={5}
                floatIntensity={2}
            >
                <Text
                    font='./bangers-v20-latin-regular.woff'
                    position={[0, 2, -2]}
                    fontSize={1}
                    color='salmon'
                    maxWidth={2}
                    textAlign="center"
                >
                    I LOVE R3F
                    {/* <meshNormalMaterial/> */}
                </Text>
            </Float>


        </>
    )
}