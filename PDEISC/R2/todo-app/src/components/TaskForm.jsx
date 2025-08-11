import "../public/TaskForm.css";
import { useState } from 'react'
import { format } from 'date-fns'

const TaskForm = ({ onSubmit, initialData = {} }) => {
  const [task, setTask] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    completed: initialData.completed || false
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setTask(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newTask = {
      ...task,
      createdAt: format(new Date(), 'yyyy-MM-dd')
    }
    onSubmit(newTask)
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label className="form-label" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={task.title}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      
      <div className="form-group">
        <label className="form-label" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={task.description}
          onChange={handleChange}
          rows="4"
          className="form-input"
          required
        />
      </div>
      
      <div className="form-group checkbox-group">
        <input
          type="checkbox"
          id="completed"
          name="completed"
          checked={task.completed}
          onChange={handleChange}
        />
        <label htmlFor="completed" className="checkbox-label">
          Completed
        </label>
      </div>
      
      <button
        type="submit"
        className="submit-btn"
      >
        {initialData.id ? 'Update Task' : 'Create Task'}
      </button>
    </form>
  )
}

export default TaskForm