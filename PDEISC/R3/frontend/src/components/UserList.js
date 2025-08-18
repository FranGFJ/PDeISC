import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, deleteUser } from './UserApi';
import UserItem from './UserItem';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError('Error al cargar usuarios');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    } catch (err) {
      setError('Error al eliminar usuario');
      console.error(err);
    }
  };

  const filteredUsers = users.filter(user =>
    user.nombre.toLowerCase().includes(search.toLowerCase()) ||
    user.apellido.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.celular.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div><div>Cargando usuarios...</div></div>;
  if (error) return <div className="alert alert-danger mt-4">{error}</div>;

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h2 className="mb-0">Lista de Usuarios</h2>
          <button 
            onClick={() => navigate('/new')} 
            className="btn btn-success"
          >
            <i className="bi bi-person-plus"></i> Nuevo Usuario
          </button>
        </div>
        <div className="card-body">
          <div className="mb-4">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Buscar por nombre, apellido, email o celular..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Email</th>
                  <th>Celular</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map(user => (
                    <UserItem 
                      key={user.id} 
                      user={user} 
                      onDelete={handleDelete} 
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">No se encontraron usuarios.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;