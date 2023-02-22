import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './style.css'

const root = createRoot(document.querySelector('#root'))

const toto = 'there'

root.render(
    <>
        <App clickersCount={ 3 }>
            <h1>Cool React App</h1>
            <h2>content content content</h2>
        </App>
    </>
)