require('dotenv').config()
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

//Inicializacion
const app = express();

//Configuraciones
//app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.json());
app.use(cors());

//Rutas
const routes = require('./build/routes/index.routes');
app.use(routes);

//Empezar el servidor
app.listen(3001, () => {
    console.log("Running server");
})


