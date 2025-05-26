const express = require("express");
const path = require("path");
const app = express();
const port = 3040;
const personas = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.post("/submit", (req, res) => {
    console.log(req.body); 
    const persona = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        edad: req.body.edad,
        fecha: req.body.fecha,
        sexo: req.body.sexo,
        dni: req.body.dni,
        ec: req.body.ec,
        nacionalidad: req.body.nacionalidad,
        telefono: req.body.telefono,
        mail: req.body.mail,
        hijos: req.body.hijos,
        canthijos: req.body.canthijos
    };

    personas.push(persona);

    res.send(`
        <p>Persona añadida exitosamente</p>
        <a href="/index.html">Volver</a>
    `);
});


app.get("/personas", (req, res) => {
    res.json(personas); // Enviar la lista de personas como JSON
});


app.listen(port, () => {
    console.log(`Servidor corriendo en http://127.0.0.1:${port}`);
});
