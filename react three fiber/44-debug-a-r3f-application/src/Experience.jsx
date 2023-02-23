import { OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'

export default function Experience() {

    const { position, colorSphere, visible } = useControls('sphere',{
        position: {
            value: {x: -2, y: 0},
            min: -4,
            max: 4,
            step: 0.01,
            joystick: 'invertY'
        },
        colorSphere: '#ffc900',
        visible: true,
    })

    const { scale, colorCube } = useControls('cube', {
        scale:{
            value: 1.5,
            step: 0.05,
            min: 0,
            max: 5
        },
        colorCube: 'mediumpurple',
    })

    return (
        <>

            <OrbitControls makeDefault />

            <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
            <ambientLight intensity={ 0.5 } />

            <mesh position={ [position.x, position.y, 0] } visible={visible} >
                <sphereGeometry />
                <meshStandardMaterial color={colorSphere} />
            </mesh>

            <mesh position-x={ 2 } scale={ scale }>
                <boxGeometry />
                <meshStandardMaterial color={colorCube} />
            </mesh>

            <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
                <planeGeometry />
                <meshStandardMaterial color="greenyellow" />
            </mesh>

        </>
    )
}