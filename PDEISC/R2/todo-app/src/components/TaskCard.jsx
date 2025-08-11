import "../public/TaskCard.css";
import { useNavigate } from 'react-router-dom';

const TaskCard = ({ task }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`task-card${task.completed ? ' completed' : ''}`}
      onClick={() => navigate(`/task/${task.id}`)}
      tabIndex={0}
      role="button"
      onKeyPress={e => { if (e.key === 'Enter') navigate(`/task/${task.id}`) }}
    >
      <h3 className="task-title">{task.title}</h3>
      <p className="task-description">{task.description.substring(0, 60)}...</p>
      <div className="task-meta">
        <span>Creado: {task.createdAt}</span>
        <span className={`task-status${task.completed ? ' completed' : ' pending'}`}>
          {task.completed ? 'Terminado' : 'Pendiente'}
        </span>
      </div>
    </div>
  )
}

export default TaskCard