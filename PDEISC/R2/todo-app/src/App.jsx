import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import CreateTask from './pages/CreateTask'
import TaskDetail from './pages/TaskDetail'
import './index.css'
import './App.css'  


function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">Task Manager</Link>
          <Link 
            to="/create" 
            className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition"
          >
            New Task
          </Link>
        </div>
      </nav>
      
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/task/:id" element={<TaskDetail />} />
        </Routes>
      </div>
    </div>
  )
}

export default App