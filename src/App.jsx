import React, { useState, useEffect } from 'react'

export default function App () {
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState({});
    const [ todos, setTodos ] = useState(() => {

    const savedTodos = localStorage.getItem("todos")

    if (savedTodos) {
        return JSON.parse(savedTodos)
    } else {
        return []
    }
    })

    const [ todo, setTodo ] = useState("")

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
      }, [todos])

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

    function handleDeleteClick(id){
        const removeItem = todos.filter((todo) => {
            return todo.id !==id
        })
        setTodos(removeItem)
    }

    function handleEditInputChange(e) {
        setCurrentTodo({ ...currentTodo, text: e.target.value });
        console.log(currentTodo);
    }

    function handleEditClick(todo){
            setIsEditing(true)
            setCurrentTodo({ ...todo })
    }

    function handleEditFormSubmit(e){
        e.preventDefault()
        handleUpdateTodo(currentTodo.id, currentTodo)
    }

    function handleUpdateTodo(id, updatedTodo){
        const updatedItem = todos.map((todo) => {
            return todo.id === id ? updatedTodo : todo
        })

        setIsEditing(false)
        setTodos(updatedItem)
    }

    return (
        <>
        {isEditing ? (
            <form onSubmit = {handleEditFormSubmit}>
                <h2>Edit todo</h2>
                <label htmlFor="editTodo">Edit todo: </label>
                <input
                name="editTodo"
                type="text"
                placeholder="Edit todo"
                value={currentTodo.text}
                onChange={handleEditInputChange}
            />
            </form>
        ):(
            <form onSubmit={handleFormSubmit}>
                <h2>Add Todo</h2>
                <label htmlFor="todo">Add todo: </label>
                <input
                    name="todo"
                    type="text"
                    placeholder="Create a new todo"
                    onChange={handleInputChange}
                />
                <button type="Submit">Add</button>
            </form>
        )}
            <ul className="todo-list">
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.text}
                        <button onClick={() => handleEditClick(todo)}>Edit</button>
                        <button onClick={() => handleDeleteClick(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </>
    )
}
