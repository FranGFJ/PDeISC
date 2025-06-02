document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('fileInput');
  const uploadForm = document.getElementById('uploadForm');
  const processBtn = document.getElementById('processBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const loadingDiv = document.getElementById('loading');
  const resultsDiv = document.getElementById('results');
  const errorDiv = document.getElementById('error');
  const numbersList = document.getElementById('numbersList');

  // Elementos de estadísticas
  const totalCount = document.getElementById('totalCount');
  const usefulCount = document.getElementById('usefulCount');
  const uselessCount = document.getElementById('uselessCount');
  const percentage = document.getElementById('percentage');

  // Manejar envío del formulario
  uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!fileInput.files.length) {
      showError('Por favor selecciona un archivo');
      return;
    }

    const file = fileInput.files[0];
    if (!file.name.endsWith('.txt')) {
      showError('Solo se permiten archivos .txt');
      return;
    }

    processFile(file);
  });

  // Función para procesar el archivo
  async function processFile(file) {
    try {
      showLoading();
      
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error en el servidor');
      }

      displayResults(data);

    } catch (error) {
      showError(error.message);
      console.error('Error:', error);
    } finally {
      hideLoading();
    }
  }

  // Función para mostrar resultados
  function displayResults(data) {
    totalCount.textContent = data.statistics.total;
    usefulCount.textContent = data.statistics.useful;
    uselessCount.textContent = data.statistics.useless;
    percentage.textContent = data.statistics.percentage;

    numbersList.innerHTML = data.numbers
      .map(num => `<div class="number-item">${num}</div>`)
      .join('');

    downloadBtn.onclick = () => {
      window.location.href = `/api/download/${data.resultFile}`;
    };

    resultsDiv.classList.remove('hidden');
    downloadBtn.classList.remove('hidden');
  }

  // Funciones auxiliares
  function showLoading() {
    loadingDiv.classList.remove('hidden');
    resultsDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');
  }

  function hideLoading() {
    loadingDiv.classList.add('hidden');
  }

  function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
  }
});