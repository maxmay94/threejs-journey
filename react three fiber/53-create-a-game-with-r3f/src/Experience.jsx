import { Physics, Debug } from '@react-three/rapier'
import { Level } from './Level.jsx'
import Lights from './Lights.jsx'
import Player from './Player.jsx'

export default function Experience() {
    return (
        <>
            <Physics>
                {/* <Debug /> */}
                <Lights />
                <Level />
                <Player />
            </Physics>
        </>
    )
}