import './style.css'
import ReactDOM from 'react-dom/client'
// import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

// const created = ({ gl, scene }) => {
    // gl.setClearColor('#ff0000', 1)
    // scene.background = new THREE.Color('pink')
// }

root.render(
    <Canvas
        shadows={false}
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ - 4, 3, 6 ]
        } }
        // onCreated={ created }
    >
        <Experience />
    </Canvas>
)