import React from 'react'
import { auth } from '../firebase'

export default function Home() {
    return (
        <div>
            <h1>Homepage</h1>
            <button onClick={()=>auth.signOut()}>Sign out</button>
        </div>
    )
}
