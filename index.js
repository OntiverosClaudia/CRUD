// Ontiveros Lara Claudia Sarahi
"use strict";

const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const hbs = require('express-handlebars');
const router = require('./routers/routes'); // Acceder a nuestras rutas

const app = express();

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Recursos estaticos publicos
app.use('/static', express.static ('public'));

// Conexion a BD
mongoose.connect(config.db, config.urlParser, (err, res) => {
if (err) {
    return console.log(`Error al conectar en la BD ${err}`);
}
console.log("Conexion exitosa");

  //Motor de busqueda
app.engine('.hbs', hbs({
    defaultLayout : 'index',
    extname : '.hbs'
}))
// Uso
app.set('view engine', '.hbs');

app.listen(config.port, () => {
    console.log("Servidor corriendo");
});
});

// Router our app
app.use('/', router);