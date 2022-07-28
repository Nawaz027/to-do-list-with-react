import React from 'react';
import './App.css';
import { useState, useRef } from 'react';

function App() {
  const [todoList, setTodoList] = useState([])
  const [currentTask, setCurrentTask] = useState("")
  const inputTask = useRef(null);


  const addTask = (event) => {
    setTodoList([...todoList,{task: currentTask, completed: false }]);
    console.log(todoList);
    inputTask.current.value= "";
    setCurrentTask("")
  }

  const taskCompleted = (taskToComplete) => {
    setTodoList(
      todoList.map((task) => {
        return task.task === taskToComplete
        ? {task : taskToComplete, completed: true}
        : {task : task.task, completed: task.completed ? true : false}
      })
    )
  }

  const deleteTask = (taskToDelete) => {
    setTodoList(
      todoList.filter((task) => {
      return task.task !== taskToDelete;
    }));
  };
  return (
    <div className="App">
      <h1> To-do List</h1>
      <div>
       
        <input 
         ref={inputTask}
        type="text" 
        placeholder="Task..." 
        onKeyDown={(event) => {
          if (event.keyCode === 13)
          addTask();
        }}
        onChange={(event) => {
          setCurrentTask(event.target.value);
        }} />
        <button onClick={addTask}> Add Task </button>

      </div>
      <hr />
      <ul>
        {todoList.map((val,key) => {
          return ( 
          <div id="task">
            <li key={key}> {val.task} </li>
            <button onClick={() => taskCompleted(val.task)}> Completed </button>
            <button onClick={() => deleteTask(val.task)}> Delete </button>
            {val.completed ? (<h3> Task Completed </h3>) : (<h3> Task not Completed </h3>) }
          </div>)
        })}
      </ul>
    </div>
  );
}

export default App;
