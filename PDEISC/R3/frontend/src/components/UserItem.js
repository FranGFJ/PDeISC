import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserItem = ({ user, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit/${user.id}`);
  };

  const handleDelete = () => {
    onDelete(user.id);
  };

  return (
    <tr>
      <td>{user.nombre}</td>
      <td>{user.apellido}</td>
      <td>{user.email}</td>
      <td>{user.celular}</td>
      <td className="text-center">
        <button onClick={handleEdit} className="btn btn-sm btn-outline-primary me-2">
          <i className="bi bi-pencil"></i> Editar
        </button>
        <button onClick={handleDelete} className="btn btn-sm btn-outline-danger">
          <i className="bi bi-trash"></i> Eliminar
        </button>
      </td>
    </tr>
  );
};

export default UserItem;