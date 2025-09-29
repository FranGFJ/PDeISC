import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Estado del formulario
  const [formData, setFormData] = useState({
    user_name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    about: ''
  });

  // Errores de validación
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Mostrar notificación
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  // Cargar portfolios al iniciar
  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/portfolios');
      setPortfolios(response.data);
    } catch (error) {
      console.error('Error cargando portfolios:', error);
      showNotification('Error cargando portafolios', 'error');
    }
  };

  // Filtrar portfolios por búsqueda
  const filteredPortfolios = portfolios.filter(portfolio =>
    (portfolio.user_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (portfolio.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (portfolio.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  //validacion
const validate = (data) => {
  const errs = {};

  // Regex que permite solo letras (unicode) y espacios
  const lettersRegex = /^[\p{L}\s]+$/u;

  // Nombre
  if (!data.user_name || data.user_name.trim() === '') {
    errs.user_name = 'El nombre es obligatorio.';
  } else if (data.user_name.trim().length < 3) {
    errs.user_name = 'El nombre debe tener al menos 3 caracteres.';
  } else if (!lettersRegex.test(data.user_name.trim())) {
    errs.user_name = 'El nombre sólo puede contener letras y espacios (sin números).';
  }

  // Título
  if (!data.title || data.title.trim() === '') {
    errs.title = 'El título profesional es obligatorio.';
  } else if (data.title.trim().length < 3) {
    errs.title = 'El título debe tener al menos 3 caracteres.';
  } else if (!lettersRegex.test(data.title.trim())) {
    errs.title = 'El título sólo puede contener letras y espacios (sin números).';
  }

  // About
  if (!data.about || data.about.trim() === '') {
    errs.about = 'La descripción (Sobre mí) es obligatoria.';
  } else if (data.about.trim().length < 10) {
    errs.about = 'La descripción debe tener al menos 10 caracteres.';
  } else if (!lettersRegex.test(data.about.trim())) {
    errs.about = 'La descripcion sólo puede contener letras y espacios (sin números).';
  }

  // Email (opcional pero si está, validar formato)
  if (data.email && data.email.trim() !== '') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      errs.email = 'El correo electrónico no tiene un formato válido.';
    }
  }

  // Teléfono (opcional, validar que tenga al menos 7 dígitos)
  if (data.phone && data.phone.trim() !== '') {
    const digits = data.phone.replace(/\D/g, '');
    if (digits.length < 7) {
      errs.phone = 'El teléfono debe tener al menos 7 dígitos.';
    }
  }

  // Location (opcional) - permitir "Ciudad" o "Ciudad, Provincia" sin números
  if (data.location && data.location.trim() !== '') {
    const loc = data.location.trim();

    if (loc.length > 100) {
      errs.location = 'La ubicación es demasiado larga (máx. 100 caracteres).';
    } else if (/\d/.test(loc)) {
      errs.location = 'La ubicación no puede contener números.';
    } else {
      // Separar por coma: "Ciudad" o "Ciudad, Provincia"
      const parts = loc.split(',').map(p => p.trim()).filter(p => p !== '');
      if (parts.length > 2) {
        errs.location = 'La ubicación debe ser "Ciudad" o "Ciudad, Provincia".';
      } else {
        // Permitir letras unicode, espacios, guiones y apóstrofes
        const partRegex = /^[\p{L}\s'-]+$/u;
        for (const p of parts) {
          if (!partRegex.test(p)) {
            errs.location = 'La ciudad y la provincia sólo pueden contener letras, espacios, guiones o apóstrofes.';
            break;
          }
        }
      }
    }
  }

  return errs;
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validación al vuelo por campo: actualizar sólo ese error
    const fieldErrors = validate({ ...formData, [name]: value });
    setErrors(prev => ({ ...prev, [name]: fieldErrors[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      showNotification('Corrige los errores del formulario antes de continuar.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const portfolioData = {
        user_name: formData.user_name,
        title: formData.title,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        about: formData.about
      };

      if (editingPortfolio) {
        await axios.put(`http://localhost:5000/api/admin/portfolios/${editingPortfolio.id}`, portfolioData);
        showNotification('Portafolio actualizado exitosamente');
      } else {
        await axios.post('http://localhost:5000/api/admin/portfolios', portfolioData);
        showNotification('Portafolio creado exitosamente');
      }
      
      resetForm();
      fetchPortfolios();
    } catch (error) {
      console.error('Error guardando portafolio:', error);
      showNotification('Error guardando portafolio', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      user_name: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      about: ''
    });
    setErrors({});
    setEditingPortfolio(null);
    setShowForm(false);
  };

  const editPortfolio = (portfolio) => {
    setFormData({
      user_name: portfolio.user_name || '',
      title: portfolio.title || '',
      email: portfolio.email || '',
      phone: portfolio.phone || '',
      location: portfolio.location || '',
      about: portfolio.about || ''
    });
    setErrors({});
    setEditingPortfolio(portfolio);
    setShowForm(true);
  };

  const deletePortfolio = async (id, userName) => {
    if (window.confirm(`¿Estás seguro de eliminar el portafolio de ${userName}?`)) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/portfolios/${id}`);
        if (selectedPortfolio?.id === id) {
          setSelectedPortfolio(null);
        }
        fetchPortfolios();
        showNotification('Portafolio eliminado exitosamente');
      } catch (error) {
        console.error('Error eliminando portafolio:', error);
        showNotification('Error eliminando portafolio', 'error');
      }
    }
  };

  const selectPortfolio = (portfolio) => {
    setSelectedPortfolio(portfolio);
  };

  // Función para copiar email al portapapeles
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showNotification('Copiado al portapapeles');
  };

  return (
    <div className="admin-container">
      {/* Notificación */}
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      {/* Header */}
      <div className="admin-header">
        <div className="header-content">
          <h1>📂 Gestor de Portafolios</h1>
          <p>Administra y visualiza todos tus portafolios profesionales</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          <span className="btn-icon">+</span>
          Nuevo Portafolio
        </button>
      </div>

      {/* Barra de búsqueda y estadísticas */}
      <div className="admin-toolbar">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Buscar por nombre, título o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="stats">
          <span className="stat-item">
            <strong>{portfolios.length}</strong> portafolios
          </span>
          <span className="stat-item">
            <strong>{filteredPortfolios.length}</strong> encontrados
          </span>
        </div>
      </div>

      <div className="admin-content">
        {/* Lista de Portafolios */}
        <div className="portfolios-section">
          <h2 className="section-title">Portafolios</h2>
          <div className="portfolios-grid">
            {filteredPortfolios.length === 0 ? (
              <div className="no-portfolios">
                <div className="empty-state">
                  <div className="empty-icon">📁</div>
                  <h3>No hay portafolios</h3>
                  <p>{searchTerm ? 'No se encontraron resultados para tu búsqueda' : 'Comienza creando tu primer portafolio'}</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setShowForm(true)}
                  >
                    Crear primer portafolio
                  </button>
                </div>
              </div>
            ) : (
              filteredPortfolios.map(portfolio => (
                <div 
                  key={portfolio.id} 
                  className={`portfolio-card ${selectedPortfolio?.id === portfolio.id ? 'selected' : ''}`}
                  onClick={() => selectPortfolio(portfolio)}
                >
                  <div className="portfolio-card-header">
                    <div className="avatar">
                      {(portfolio.user_name || '').split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div className="portfolio-info">
                      <h3>{portfolio.user_name}</h3>
                      <span className="portfolio-title">{portfolio.title}</span>
                    </div>
                  </div>
                  
                  <div className="portfolio-card-content">
                    {portfolio.email && (
                      <p 
                        className="portfolio-email clickable"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(portfolio.email);
                        }}
                        title="Haz click para copiar"
                      >
                        📧 {portfolio.email}
                      </p>
                    )}
                    {portfolio.location && (
                      <p className="portfolio-location">📍 {portfolio.location}</p>
                    )}
                  </div>

                  <div className="portfolio-card-actions">
                    <button 
                      className="btn btn-edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        editPortfolio(portfolio);
                      }}
                      title="Editar portafolio"
                    >
                      ✏️ Editar
                    </button>
                    <button 
                      className="btn btn-delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePortfolio(portfolio.id, portfolio.user_name);
                      }}
                      title="Eliminar portafolio"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Vista previa del portafolio seleccionado */}
        {selectedPortfolio && (
          <div className="portfolio-preview">
            <div className="preview-header">
              <h2>👁️ Vista Previa</h2>
              <button 
                className="btn btn-secondary small"
                onClick={() => setSelectedPortfolio(null)}
              >
                ✕ Cerrar
              </button>
            </div>
            <div className="preview-content">
              <div className="preview-avatar">
                {selectedPortfolio.user_name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
              <h3>{selectedPortfolio.user_name}</h3>
              <p className="preview-title">💼 {selectedPortfolio.title}</p>
              <div className="preview-bio">
                <p>{selectedPortfolio.about}</p>
              </div>
              
              <div className="preview-section">
                <h4>📞 Información de Contacto</h4>
                <div className="contact-grid">
                  {selectedPortfolio.email && (
                    <div 
                      className="contact-item clickable"
                      onClick={() => copyToClipboard(selectedPortfolio.email)}
                      title="Haz click para copiar"
                    >
                      <span className="contact-icon">📧</span>
                      <div>
                        <strong>Email</strong>
                        <p>{selectedPortfolio.email}</p>
                      </div>
                    </div>
                  )}
                  {selectedPortfolio.phone && (
                    <div 
                      className="contact-item clickable"
                      onClick={() => copyToClipboard(selectedPortfolio.phone)}
                      title="Haz click para copiar"
                    >
                      <span className="contact-icon">📱</span>
                      <div>
                        <strong>Teléfono</strong>
                        <p>{selectedPortfolio.phone}</p>
                      </div>
                    </div>
                  )}
                  {selectedPortfolio.location && (
                    <div className="contact-item">
                      <span className="contact-icon">📍</span>
                      <div>
                        <strong>Ubicación</strong>
                        <p>{selectedPortfolio.location}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal para agregar/editar portafolio - AHORA ES SUPERPUESTO */}
      {showForm && (
        <div className="modal-overlay active">
          <div className="modal edit-modal">
            <div className="modal-header">
              <h2>{editingPortfolio ? '✏️ Editar Portafolio' : '➕ Nuevo Portafolio'}</h2>
              <button className="close-btn" onClick={resetForm}>×</button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form" noValidate>
              <div className="form-grid">
                <div className="form-group">
                  <label>👤 Nombre completo *</label>
                  <input
                    type="text"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej: Franco Gonzalez"
                  />
                  {errors.user_name && <small className="error">{errors.user_name}</small>}
                </div>

                <div className="form-group">
                  <label>💼 Título profesional *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej: Desarrollador Full Stack"
                  />
                  {errors.title && <small className="error">{errors.title}</small>}
                </div>

                <div className="form-group">
                  <label>📧 Correo electrónico</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="francogonzalez@email.com"
                  />
                  {errors.email && <small className="error">{errors.email}</small>}
                </div>

                <div className="form-group">
                  <label>📱 Teléfono</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="2235274634"
                  />
                  {errors.phone && <small className="error">{errors.phone}</small>}
                </div>

                <div className="form-group">
                  <label>📍 Ubicación</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Mar del Plata, Argentina"
                  />
                  {errors.location && <small className="error">{errors.location}</small>}
                </div>

                <div className="form-group full-width">
                  <label>📝 Descripción (Sobre mí) *</label>
                  <textarea
                    name="about"
                    rows="5"
                    value={formData.about}
                    onChange={handleInputChange}
                    required
                    placeholder="Describe tu experiencia, habilidades y objetivos profesionales..."
                  ></textarea>
                  {errors.about && <small className="error">{errors.about}</small>}
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary large" disabled={submitting}>
                  {submitting ? 'Guardando...' : (editingPortfolio ? '💾 Guardar Cambios' : '✨ Crear Portafolio')}
                </button>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  ❌ Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
