import React, { useState, useRef, useEffect  } from "react";
import Todo from "../components/Todo";
import FormPanel from "../components/FormPanel"
import FilterButton from "../components/FilterButton";
import * as todoService from "../services/todo.service"
import {ListGroup } from 'react-bootstrap';


function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};
function  Home(props) {
    
  const [filter, setFilter] = useState('All');
  const [tasks, setTasks] = useState([]);
  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    )
  );
  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun}`;  

  function updateTasks() {
    todoService.getTasks()
      .then(response => {
      setTasks(response.data.map(task => {
        return {id: task._id , name: task.name , completed: task.completed}
      }))
    })
  }
  useEffect(() => {
    updateTasks();
      
}, []);


  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);
  return (
    <div className="container  separe-margin">
        <div className="separe-margin">
            <h2 >To-do list</h2>
        </div>
        <div className="separe-margin">
            <FormPanel addTask={addTask} />
        </div>
        <FilterButton setFilter={setFilter} />
        <div className="separe-margin text-center">
            <h4 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
                {headingText} 
            </h4>
        </div>
        <ListGroup>
            {taskList }
        </ListGroup>
    </div>
  );

  function addTask(name) {
    const task = {name};
    todoService.newTask(task)
      .then(function (response) {
        updateTasks();
      })
      .catch(function (error) {
        console.log(error);
      });
      
  }

  function toggleTaskCompleted(id , newCompleted) {
    const task = {id: id , completed: !newCompleted};
    todoService.updateTask(task)
      .then(function (response) {
        updateTasks();
      })
      .catch(function (error) {
        console.log(error);
      });
    }
      
  function deleteTask(id) {
    const task = {id}
    todoService.deleteTask(task)
      .then(function (response) {
        updateTasks()
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function editTask(id, newName) {
    const task = {id: id , name: newName};
    todoService.updateTask(task)
      .then(function (response) {
        updateTasks();
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

export default Home;