import React from 'react'

function TodoItem({
    todo,
    onEditClick,//changed name handleEditClick to onEditClick
    onDeleteClick//changed name handleDeleteClick to onDeleteClick
}) {

    return (
        <>
            <li key={todo.id}>
                {todo.text}
                <button onClick={() => onEditClick(todo)}>Edit</button>
                <button onClick={() => onDeleteClick(todo.id)}>Delete</button>
            </li>
        </>
    )
}

export default TodoItem
