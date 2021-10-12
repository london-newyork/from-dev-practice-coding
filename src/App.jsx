import React, { useState } from 'react'

export default function App () {
    const [ todos, setTodos ] = useState([])
    const [ todo, setTodo ] = useState("")

    function handleInputChange(e){
        setTodo(e.target.value)
    }

    function handleFormSubmit(e){
        e.preventDefault()

        if (todo !=="") {
            setTodos([
                ...todos,
                {
                    id: todos.length + 1,
                    text: todo.trim()
                }
            ])
        }
        setTodo("")
    }

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
