import React from 'react'
import './TodoItem.css'
import deleteIcon from './delete.png';
const TodoItem = (props) => {

    let classes = (props.status) ? ['TodoItem', 'completed'].join(' ') : 'TodoItem';
    return (
        <div data-id={props.id} data-status={props.status} className={classes} >
            <input checked={props.status} onChange={props.completeTask} type="checkbox" name="complete" />
            <p>{props.todo}</p>
            <img onClick={props.deleteItem} src={deleteIcon} alt="Delete icon" />
        </div>

    )
}
export default TodoItem;