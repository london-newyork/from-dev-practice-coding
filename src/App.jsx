import React, { useState } from 'react'
import "./styles.css"

export default function App () {
    const [ todos, setTodos ] = useState([])
    const [ todo, setTodo ] = useState("")
    return (
        <>
            <div className="App">
                <h1>Todo App</h1>
            </div>
        </>
    )
}
