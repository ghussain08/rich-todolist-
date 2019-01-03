import React from 'react'
import TodoItem from './TodoItem/TodoItem';
const TodoList = (props) => {
    let lists = props.items.map((item, key) => {
        return <TodoItem deleteItem={props.deleteItem} completeTask={props.completeTask} todo={item.item} id={item.id} status={item.isComplete} key={key} />
    })
    return (
        <div style={{ paddingTop: '40px' }} >
            {lists}
        </div>
    )
}
export default TodoList;