import { createContext, useState, useContext } from 'react'
import initialTasks from '../data/tasks'

const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(initialTasks)

  const addTask = (newTask) => {
    const taskWithId = {
      ...newTask,
      id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1
    }
    setTasks([...tasks, taskWithId])
  }

  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...updatedTask, id, createdAt: t.createdAt } : t
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export const useTasks = () => useContext(TaskContext);
