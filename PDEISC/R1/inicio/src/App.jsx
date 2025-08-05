import React, { useState } from 'react';
import './App.css';

const user = {
  nombre: 'Franco',
  apellido: 'Gonzalez',
  profesion: 'Desarrollador Web',
  imageUrl: `${process.env.PUBLIC_URL}/foto2.jpg`,
};

function Holamundo() {
  return <h2>Hola mundo</h2>;
}

function Presentacion() {
  return (
    <div className="card">
      <img
        src={user.imageUrl}
        alt={`Foto de ${user.nombre} ${user.apellido}`}
        className="profile-img"
      />
      <div className="profile-info">
        <h2>{user.nombre} {user.apellido}</h2>
        <p>{user.profesion}</p>
      </div>
    </div>
  );
}

function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <div className="card">
      <h1>Contador</h1>
      <p className="counter">{contador}</p>
      <div className="button-group">
        <button onClick={() => setContador(contador - 1)}>-</button>
        <button onClick={() => setContador(contador + 1)}>+</button>
      </div>
    </div>
  );
}

function ListaDeTareas() {
  const [tareas, setTareas] = useState([]);
  const [input, setInput] = useState('');

  const agregarTarea = () => {
    if (input.trim() === '') return;
    const nuevaTarea = { texto: input, completada: false };
    setTareas([...tareas, nuevaTarea]);
    setInput('');
  };

  const toggleCompletada = (index) => {
    const nuevasTareas = [...tareas];
    nuevasTareas[index].completada = !nuevasTareas[index].completada;
    setTareas(nuevasTareas);
  };

  return (
    <div className="card">
      <h1>Lista de Tareas</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribí una tarea"
        className="task-input"
      />
      <button onClick={agregarTarea} className="add-button">
        Agregar
      </button>

      <ul className="task-list">
        {tareas.map((tarea, index) => (
          <li
            key={index}
            onClick={() => toggleCompletada(index)}
            className={`task-item ${tarea.completada ? 'completed' : ''}`}
          >
            {tarea.texto}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FormularioUsuario() {
  const [nombre, setNombre] = useState('');
  const [mostrarBienvenida, setMostrarBienvenida] = useState(false);

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim() !== '') {
      setMostrarBienvenida(true);
    }
  };

  return (
    <div className="card">
      <h1>Formulario de Usuario</h1>
      
      {mostrarBienvenida ? (
        <div className="welcome-message">
          <h1>¡Bienvenido, {nombre}!</h1>
          <button 
            onClick={() => setMostrarBienvenida(false)}
            className="back-button"
          >
            Volver
          </button>
        </div>
      ) : (
        <form onSubmit={manejarSubmit}>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingresa tu nombre"
            className="form-input"
          />
          <button type="submit" className="submit-button">
            Enviar
          </button>
        </form>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Bienvenido a mi aplicación</h1>
      <Holamundo />
      <Presentacion />
      <Contador />
      <ListaDeTareas />
      <FormularioUsuario />
    </div>
  );
}

export default App;