import React from 'react'
import './TodoForm.css';

const TodoForm = (props) => {
    return (
        <form onSubmit={props.onsubmit} className="TodoForm">
            <input required type="text" name="todo" />
            <button type="submit" >ADD</button>
        </form>
    )
}
export default TodoForm;