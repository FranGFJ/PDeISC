export const initialUserState = {
  nombre: '',
  apellido: '',
  direccion: '',
  telefono: '',
  celular: '',
  fecha_nacimiento: '',
  email: ''
};

export const validateUserFields = (user) => {
  const requiredFields = {
    nombre: 'Nombre es requerido',
    apellido: 'Apellido es requerido',
    celular: 'Celular es requerido',
    fecha_nacimiento: 'Fecha de nacimiento es requerida',
    email: 'Email es requerido'
  };

  const errors = [];
  Object.entries(requiredFields).forEach(([field, message]) => {
    if (!user[field]) errors.push(message);
  });

  if (!user.email.includes('@')) {
    errors.push('Email debe ser válido');
  }

  return errors;
};

export const handleApiError = (error) => {
  return error.response?.data?.error || 
         error.response?.data?.message || 
         'Error al procesar la solicitud';
};