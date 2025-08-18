import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchUser, createUser, updateUser } from './UserApi';
import { initialUserState, validateUserFields, handleApiError } from './UserHelpers';


const UserForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(initialUserState);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      const loadUser = async () => {
        try {
          const userData = await fetchUser(id);
          setUser(userData);
        } catch (err) {
          setError('Error al cargar usuario: ' + handleApiError(err));
        }
      };
      loadUser();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateUserFields(user);
    
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '));
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      if (id) {
        await updateUser(id, user);
      } else {
        await createUser(user);
      }
      navigate('/');
    } catch (err) {
      setError(handleApiError(err));
      console.error('Error detallado:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">{id ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={user.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Apellido</label>
              <input
                type="text"
                className="form-control"
                name="apellido"
                value={user.apellido}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Dirección</label>
              <input
                type="text"
                className="form-control"
                name="direccion"
                value={user.direccion}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input
                type="text"
                className="form-control"
                name="telefono"
                value={user.telefono}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Celular</label>
              <input
                type="text"
                className="form-control"
                name="celular"
                value={user.celular}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Fecha de nacimiento</label>
              <input
                type="date"
                className="form-control"
                name="fecha_nacimiento"
                value={user.fecha_nacimiento}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-success" disabled={isSubmitting}>
              {id ? 'Actualizar' : 'Crear'}
            </button>
            <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/')}>
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;