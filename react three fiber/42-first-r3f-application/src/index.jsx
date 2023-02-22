import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import Experience from './Experience.jsx'
import './style.css'
import ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        // flat
        // orthographic
        gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            outputEncoding: THREE.sRGBEncoding,
        }}
        camera={{
            fov: 45,
            // zoom: 100,
            near: 0.1,
            far: 200,
            position: [ 3, 2, 6 ]
        }}
    >    
        <Experience />
    </Canvas>
)