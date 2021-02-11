import React,{useState} from "react";
import "./Task.css"
import trash_icon from '../../img/trash_icon.png'

function Task({task,todoArr,setTodoArr}) {

    function checkDoneHandler(){
        setTodoArr(todoArr.map(item => {
            if (item.id === task.id){
                return {
                    ...item, isDone: !item.isDone
                }
            }
            return item;
        }))
        console.log(todoArr);
    }

    function deleteHandler(){
        setTodoArr(todoArr.filter(item => item.id !== task.id))
    }

    return(
        <div className={task.isDone? "doneTask":"task"}>
            <p className="taskDate">{task.day}</p>
            <p className="taskDate">{task.month}</p>
            <p className="taskDate">{task.year}</p>
            <p className="taskName">{task.task}</p>

            <label onClick={checkDoneHandler} className="completedBox">
                <input type="checkbox" checked={task.isDone}/>
                <span></span>
            </label>
            <button onClick={deleteHandler} className="deleteButton"><img className="trashIcon" src={trash_icon}/></button>
        </div>
    );
}
export default Task;