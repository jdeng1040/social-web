import React, {useState} from 'react'
import { auth } from '../firebase'

export default function Home() {
    const [counter, setCounter] = useState(0);
    return (
        <div>
            <h1>Homepage</h1>
            
            <button onClick={() => {
                auth.signOut()
            }}>Sign out</button>

            <h3>{counter}</h3>
            <button onClick={() => {
                setCounter(1 + counter);
            }}>Add 1</button>
            <button onClick={() => {
                setCounter(counter - 1);
            }}>Minus 1</button>
        </div>
    )
}
