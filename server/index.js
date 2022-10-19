// require('dotenv').config()
// const express = require("express");
// const cors = require("cors");
// const morgan = require('morgan')
import express from "express";
import morgan from "morgan";
import cors from "cors";

//Inicializacion
const app = express();

//Configuraciones
//app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//Rutas
// const routes = require('./build/routes/index.routes');
import routes from "../server/build/routes/index.routes.js"
app.use(routes);

//Empezar el servidor
app.listen(3001, () => {
    console.log("Running server");
})


