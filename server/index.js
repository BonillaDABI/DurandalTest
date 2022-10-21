if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}
const express = require("express");
const storage = require('./build/lib/handyStorage')
const connection = require("./build/config/database");

const cors = require("cors");
const sequelizeConnection = require('./build/models/index');

const app = express();


// //Configuraciones
app.set('port', process.env.PORT || 3001);
app.use((req, res, next) => {
    res.locals.token = storage.state.token;
    //res.locals.user = storage.state.user.email;
    next();
});



// //Middlewares
app.use(cors());
app.use(express.json());


// //Rutas
const authRoutes = require("./build/routes/authRoutes")
app.use(authRoutes);

//Servidor
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})