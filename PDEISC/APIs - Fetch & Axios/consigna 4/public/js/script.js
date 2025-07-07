function mostrarResultado(data) {
  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.innerHTML = '<h3>Resultado:</h3>';
  
  if (Array.isArray(data)) {
    data.forEach(alumno => {
      const alumnoDiv = document.createElement('div');
      alumnoDiv.className = 'alumno';
      alumnoDiv.innerHTML = `
        <p><strong>ID:</strong> ${alumno.id}</p>
        <p><strong>Nombre:</strong> ${alumno.nombre}</p>
        <p><strong>Curso:</strong> ${alumno.curso}</p>
      `;
      resultadoDiv.appendChild(alumnoDiv);
    });
  } else {
    const dataDiv = document.createElement('div');
    dataDiv.className = 'alumno';
    dataDiv.innerHTML = `
      <p><strong>ID:</strong> ${data.id}</p>
      <p><strong>Nombre:</strong> ${data.nombre}</p>
      <p><strong>Curso:</strong> ${data.curso}</p>
    `;
    resultadoDiv.appendChild(dataDiv);
  }
}

// Usando Fetch
function fetchAlumnos() {
  fetch('/api/alumnos')
    .then(response => response.json())
    .then(data => mostrarResultado(data))
    .catch(error => console.error('Error:', error));
}

// Usando Axios
function axiosAlumnos() {
  axios.get('/api/alumnos')
    .then(response => mostrarResultado(response.data))
    .catch(error => console.error('Error:', error));
}

// Agregar un nuevo alumno
function agregarAlumno() {
  const nombre = prompt('Ingrese el nombre del alumno:');
  const curso = prompt('Ingrese el curso del alumno:');
  
  if (nombre && curso) {
    axios.post('/api/alumnos', { nombre, curso })
      .then(response => {
        alert('Alumno agregado con éxito!');
        mostrarResultado(response.data);
      })
      .catch(error => console.error('Error:', error));
  }
}