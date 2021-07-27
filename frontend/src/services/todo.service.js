import axios from 'axios';
import env from "react-dotenv";

const URL = env.API_URL + '/todo';

export function getTasks() {
    return axios.get(URL)
}

export function newTask(task) {
    return axios.post(URL, {
        name: task.name,
        completed: false 
      })
}

export function deleteTask(task) {
    return axios.delete(URL + '/' + task.id)
}

export function updateTask(task) {
    return axios.put(URL + '/' + task.id , {
        name: task.name,
        completed: task.completed
    })
}
