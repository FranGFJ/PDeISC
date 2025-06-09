// Clase que representa un animal del zoológico
class CZooAnimal {
    constructor(IdAnimal, nombre, JaulaNumero, IdTypeAnimal, peso) {
        this.IdAnimal = IdAnimal; 
        this.nombre = nombre; 
        this.JaulaNumero = JaulaNumero; 
        this.IdTypeAnimal = IdTypeAnimal; 
        this.peso = peso; 
    }
}

// Clase que administra todos los animales del zoológico
class ZooManager {
    constructor() {
        this.animals = []; // Lista donde se guardan todos los animales
    }

    // Genera un número aleatorio para usar como ID de animal
    generateRandomId() {
        return Math.floor(Math.random() * 1000000);
    }

    // Agrega un animal nuevo a la lista
    addAnimal(data) {
        const newAnimal = new CZooAnimal(
            data.IdAnimal, // ID único generado
            data.nombre,
            parseInt(data.JaulaNumero), 
            parseInt(data.IdTypeAnimal), 
            parseFloat(data.peso) 
        );
        this.animals.push(newAnimal); // Agrega el animal a la lista
        return newAnimal; // Devuelve el animal agregado
    }

    // Cuenta cuántos animales hay en la jaula 5 con peso menor a 3kg
    countAnimalsJaula5Under3kg() {
        return this.animals.filter(animal =>
            animal.JaulaNumero === 5 && animal.peso < 3
        ).length;
    }

    // Cuenta cuántos felinos hay en las jaulas 2 a 5
    countFelinosJaula2a5() {
        return this.animals.filter(animal =>
            animal.IdTypeAnimal === 1 && animal.JaulaNumero >= 2 && animal.JaulaNumero <= 5
        ).length;
    }

    // Busca un animal en la jaula 4 con peso menor a 120kg
    findAnimalJaula4Under120kg() {
        const animal = this.animals.find(a =>
            a.JaulaNumero === 4 && a.peso < 120
        );
        // Si lo encuentra, devuelve el nombre. Si no, devuelve 'No encontrado'
        return animal ? animal.nombre : 'No encontrado';
    }

    // Devuelve la lista de todos los animales
    getAllAnimals() {
        return this.animals;
    }

    // Verifica si un ID ya está en uso
    isIdUnique(id) {
        return !this.animals.some(animal => animal.IdAnimal === id);
    }
}

// Crea una instancia del administrador del zoológico
const zooManager = new ZooManager();

// Función para generar un ID único (que no se repita)
async function generateUniqueId(zooManager) {
    let id;
    do {
        id = zooManager.generateRandomId();
    } while (!zooManager.isIdUnique(id)); // Repite hasta que el ID no esté en uso
    return id;
}

// Función para agregar un animal (usada desde otros archivos)
export async function addAnimal(data) {
    const id = await generateUniqueId(zooManager); // Genera un ID único
    // Prepara los datos y fuerza que los números sean del tipo correcto
    const dataWithId = { 
        ...data, 
        IdAnimal: id,
        JaulaNumero: parseInt(data.JaulaNumero),
        IdTypeAnimal: parseInt(data.IdTypeAnimal),
        peso: parseFloat(data.peso)
    };
    return zooManager.addAnimal(dataWithId); // Agrega el animal y lo devuelve
}

// Función para contar animales en jaula 5 con menos de 3kg
export function countAnimalsJaula5Under3kg() {
    return zooManager.countAnimalsJaula5Under3kg();
}

// Función para contar felinos entre jaulas 2 y 5
export function countFelinosJaula2a5() {
    return zooManager.countFelinosJaula2a5();
}

// Función para buscar animal en jaula 4 con menos de 120kg
export function findAnimalJaula4Under120kg() {
    return zooManager.findAnimalJaula4Under120kg();
}

// Función para obtener todos los animales
export function getAllAnimals() {
    return zooManager.getAllAnimals();
}