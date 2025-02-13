const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const TERR_FILE = "./territorios.json";

// Leer datos del JSON
const leerTerritorios = () => {
    if (!fs.existsSync(TERR_FILE)) fs.writeFileSync(TERR_FILE, "[]");
    return JSON.parse(fs.readFileSync(TERR_FILE));
};


// Guardar datos en el JSON
const guardarTerritorios = (data) => {
    fs.writeFileSync(TERR_FILE, JSON.stringify(data, null, 2));
};


// Endpoint GET: devuelve los territorios
app.get("/territorios", (req, res) => {
    res.json(leerTerritorios());
});


// Endpoint POST: agrega un nuevo territorio
app.post("/territorios", (req, res) => {
    const territorios = leerTerritorios();
    const nuevoTerritorio = req.body;

    // Asignar ID único basado en el último ID existente
    const ultimoId = territorios.length > 0 ? territorios[territorios.length - 1].id : 0;
    nuevoTerritorio.id = ultimoId + 1;

    territorios.push(nuevoTerritorio);
    guardarTerritorios(territorios);

    res.status(201).json({ mensaje: "Dato guardado", dato: nuevoTerritorio });
});

// Iniciar servidor en Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
