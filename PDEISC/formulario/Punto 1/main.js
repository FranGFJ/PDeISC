const express = require("express");
const path = require("path");
const app = express();
const port = 3030;
const personas = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.post("/submit", (req, res) => {
    console.log(req.body); 
    const persona = {
        usr: req.body.usr,
        pass: req.body.pass
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
