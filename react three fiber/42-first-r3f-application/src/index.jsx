import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import './style.css'
import ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas>    
        <Experience />
    </Canvas>
)