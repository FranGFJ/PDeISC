import { useNavigate } from 'react-router-dom'
import { useTasks } from '../context/TaskContext'
import TaskForm from '../components/TaskForm'

const CreateTask = () => {
  const { addTask } = useTasks()
  const navigate = useNavigate()

  const handleSubmit = (newTask) => {
    addTask(newTask)
    navigate('/')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Crear nueva tarea</h1>
      <div className="max-w-lg mx-auto">
        <TaskForm onSubmit={handleSubmit} />
        <button
          type="submit"
          className="submit-btn"
        >
          Crear Tarea
        </button>
      </div>
    </div>
  )
}

export default CreateTask