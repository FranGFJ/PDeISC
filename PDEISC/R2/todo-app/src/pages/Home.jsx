import { useTasks } from '../context/TaskContext'
import TaskCard from '../components/TaskCard'

const Home = () => {
  const { tasks } = useTasks()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Mis tareas</h1>
      {tasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Aun no hay tareas. Crea tu primera</p>
        </div>
      ) : (
        <div>
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home