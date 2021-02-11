import React,{useEffect, useState} from "react";
import Task from "./TodoListComp/Task"
import "./TodoList.css"
import add_task_button from '../img/add_task_button.png'

function TodoList() {

    var dayArr = [];
    var monthArr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var yearArr = [];

    var time = new Date();
    
    const [todoArr,setTodoArr] = useState([]);
    const [filtTodoArr,setfiltTodoArr] = useState([]);
    const [dspMode,setDspMode] = useState("All");
    const [taskInput,setTaskInput] = useState("");
    const [day,setDay] = useState(time.getDate().toString());
    const [month,setMonth] = useState(monthArr[time.getMonth()]);
    const [year,setYear] = useState(time.getFullYear().toString());

    console.log(time.getFullYear());

    for (var i = 1;i <= 31;i++){
        if (i < 10){
            dayArr.push("0"+i.toString());
        }
        else{
            dayArr.push(i.toString());
        }
    }

    for (var i = 2000;i <= 2050;i++){
        yearArr.push(i.toString());
    }

    function textHandler(e){
        setTaskInput(e.target.value);
    }

    function addTaskHandler(e){
        e.preventDefault();
        if (taskInput !== ""){
            setTodoArr([...todoArr,{task:taskInput,day:day,month:month,year:year,isDone:false,id: Math.random()*1000}]);
        }
        setTaskInput("");
    }

    function daySelectHandler(e){
        setDay(e.target.value);
    }

    function monthSelectHandler(e){
        setMonth(e.target.value);
    }
    
    function yearSelectHandler(e){
        setYear(e.target.value);
    }

    function displayModeHandler(e){
        setDspMode(e.target.value);
    }

    function filterList(){
        if (dspMode === "Completed"){
            setfiltTodoArr(todoArr.filter(todo => todo.isDone === true));
        }
        else if (dspMode === "Uncompleted"){
            setfiltTodoArr(todoArr.filter(todo => todo.isDone === false));
        }
        else{
            setfiltTodoArr(todoArr);
        }
    }
    useEffect(() => {
        if (localStorage.getItem("TodoList") === null){
            localStorage.setItem("TodoList",JSON.stringify(todoArr));
        }
        else{
            setTodoArr(JSON.parse(localStorage.getItem("TodoList")))
        }
    },[])

    useEffect(() => {
        filterList();
        localStorage.setItem("TodoList",JSON.stringify(todoArr));
    },[dspMode,todoArr])

    return (
        <div className="todoList">
            <div className="form">
                <input onChange={textHandler} className="taskInput" type="text" value={taskInput}></input>
                <select onChange={daySelectHandler} className="select">
                    {dayArr.map(dayIdx => (day==dayIdx? 
                        <option selected="selected" value={dayIdx} key={dayIdx}>{dayIdx}</option>
                        :<option value={dayIdx} key={dayIdx}>{dayIdx}</option>
                    ))}
                </select>
                <select onChange={monthSelectHandler} className="select">
                    {monthArr.map(monthIdx => (month==monthIdx? 
                        <option selected="selected" value={monthIdx} key={monthIdx}>{monthIdx}</option>
                        :<option value={monthIdx} key={monthIdx}>{monthIdx}</option>
                    ))}
                </select>
                <select onChange={yearSelectHandler} className="select">
                    {yearArr.map(yearIdx => (year==yearIdx? 
                        <option selected="selected" value={yearIdx} key={yearIdx}>{yearIdx}</option>
                        :<option value={yearIdx} key={yearIdx}>{yearIdx}</option>
                    ))}
                </select>
                <button onClick={addTaskHandler} className="addButton"><img className="addButtonIcon" src={add_task_button}/></button>
            </div>

            <br/>
            <select onChange={displayModeHandler} className="select">
                    <option value="All">All</option>
                    <option value="Completed">Completed</option>
                    <option value="Uncompleted">Uncompleted</option>
            </select>

            <div className="taskList">
                <ul>
                    {filtTodoArr.map(task => (
                        <Task
                            key={task.id}
                            task={task}
                            todoArr={todoArr}
                            setTodoArr={setTodoArr}
                        />
                    ))}
                </ul>
            </div>

            <p>{}</p>
        </div>
    );
}

export default TodoList;