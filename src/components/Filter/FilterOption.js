import React from 'react'
import './FilterOption.css'
const filterOptions = (props) => {
    return (
        <div className="FilterContainer" >
            <button onClick={props.showAll} >All</button>
            <button onClick={props.showPending}>Pending tasks</button>
            <button onClick={props.showFinished}>Finished</button>
        </div>
    )
}
export default filterOptions;