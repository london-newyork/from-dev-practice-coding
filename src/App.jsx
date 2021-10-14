import React, { useState, useEffect } from 'react'
import TodoItem from './components/TodoItem';
import AddTodoForm from './components/AddTodoForm';
import EditForm from './components/EditForm';

export default function App () {

    const [ todos, setTodos ] = useState(() => {

        const savedTodos = localStorage.getItem("todos")

        if (savedTodos) {
            return JSON.parse(savedTodos)
        } else {
            return []
        }
    })

    const [ todo, setTodo ] = useState("")
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState({});

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
      }, [todos])

    function handleAddInputChange(e){
        setTodo(e.target.value)
    }//

    function handleAddFormSubmit(e){
        e.preventDefault()

        if (todo !=="") {
            setTodos([
                ...todos,
                {
                    id: new Date(),
                    text: todo.trim()
                }
            ])
        }
        setTodo("")
    }//

    function handleDeleteClick(id){
        const removeItem = todos.filter((todo) => {
            return todo.id !==id
        })
        setTodos(removeItem)
    }//

    function handleEditInputChange(e) {
        setCurrentTodo({ ...currentTodo, text: e.target.value });
        console.log(currentTodo);
    }//

    function handleEditClick(todo){
            setIsEditing(true)
            setCurrentTodo({ ...todo })
    }//

    function handleEditFormSubmit(e){
        e.preventDefault()
        handleUpdateTodo(currentTodo.id, currentTodo)
    }//

    function handleUpdateTodo(id, updatedTodo){
        const updatedItem = todos.map((todo) => {
            return todo.id === id ? updatedTodo : todo
        })

        setIsEditing(false)
        setTodos(updatedItem)
    }//

    return (
        <>
        {isEditing ? (
            <EditForm
                currentTodo={currentTodo}
                setIsEditing={setIsEditing}
                onEditInputChange={handleEditInputChange}
                onEditFormSubmit={handleEditFormSubmit}
            />
        ):(
           <AddTodoForm
                todo={todo}
                onAddInputChange={handleAddInputChange}
                onAddFormSubmit={handleAddFormSubmit}
           />
        )}
            <ul className="todo-list">
                {todos.map((todo) => (
                    <TodoItem
                        todo={todo}
                        onEditClick={handleEditClick}
                        onDeleteClick={handleDeleteClick}
                    />
                ))}
            </ul>
        </>
    )
}
