import React, { useState } from 'react'

export default function App () {
    const [ todos, setTodos ] = useState([])
    const [ todo, setTodo ] = useState("")

    return (
        <>
            <form>
                <input
                name="todo"
                type="text"
                placeholder="Create a new todo"
                />
            </form>
            <ul className="todo-list">
                {todos.map((todo) => (
                    <li>{todo}</li>
                ))}
            </ul>
        </>
    )
}
