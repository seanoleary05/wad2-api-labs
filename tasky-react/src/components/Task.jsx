



const Task = (props) => {
    

        return (
            <div className ="card"style={{backgroundColor: props.done ? 'lightgrey' : '#be3921ff'}}>
            <p className ="title">{props.title}</p>
            <p>Due: {props.deadline}</p>
            <p>{props.description}</p>
            <p>{props.children}</p>
            <p className="prio" style={{backgroundColor: props.prio == "Low" ? 'green' : props.prio == "Medium" ? '#FFEE8C' : props.prio == "High" ? 'red': 'black'}}>{props.prio}</p>
            <button onClick={props.markDone} className="doneButton">Done</button>
            <button onClick={props.deleteTask} className='deleteButton'>Delete</button>

            </div>
            

        )
}

export default Task;