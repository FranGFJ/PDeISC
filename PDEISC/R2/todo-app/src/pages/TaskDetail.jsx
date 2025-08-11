import { useParams, useNavigate } from 'react-router-dom'
import { useTasks } from '../context/TaskContext'
import TaskForm from '../components/TaskForm'

const TaskDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { tasks, updateTask, deleteTask } = useTasks()
  
  const task = tasks.find(t => t.id === parseInt(id))
  
  if (!task) {
    return <div className="text-center py-8">Task not found</div>
  }

  const handleUpdate = (updatedTask) => {
    updateTask(task.id, updatedTask)
    navigate('/')
  }

  const handleDelete = () => {
    deleteTask(task.id)
    navigate('/')
  }

  return (
    <div>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">{task.title}</h1>
        <p className="text-gray-600 mb-4">{task.description}</p>
        
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm text-gray-500">Creada: {task.createdAt}</span>
          <span className={`px-3 py-1 rounded-full text-sm ${
            task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {task.completed ? 'Completed' : 'Pending'}
          </span>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Editar Tarea</h2>
          <TaskForm onSubmit={handleUpdate} initialData={task} />
        </div>
        
        <button
          onClick={handleDelete}
          className="delete-btn"
        >
          Eliminar Tarea
        </button>
      </div>
    </div>
  )
}

export default TaskDetail