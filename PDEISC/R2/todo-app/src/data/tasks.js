import { format } from 'date-fns'

const tasks = [
  {
    id: Date.now(), // ID más confiable que autoincremental
    title: "Ejemplo de tarea",
    description: "Esta es una tarea de ejemplo",
    completed: false,
    createdAt: format(new Date(), 'yyyy-MM-dd') // Fecha actual formateada
  }
];

export default tasks