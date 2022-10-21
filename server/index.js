if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}
const express = require("express");
const storage = require('./build/lib/handyStorage')
const connection = require("./build/config/database");
// const { Users } = require("./build/models/users.model");

// const cookieParser = require("cookie-parser");
// const { createTokens, validateToken } = require("./build/config/JWT");

// const jwt = require('jsonwebtoken');
const cors = require("cors");
const sequelizeConnection = require('./build/models/index');

const app = express();
// sequelizeConnection.sync()

// //Configuraciones
app.set('port', process.env.PORT || 3001);
app.use((req, res, next) => {
    res.locals.token = storage.state.token;
    //res.locals.user = storage.state.user.email;
    next();
});

// app.use(function (req, res, next) {
//     req.connection = connection
//     next()
// })


// //Middlewares
app.use(cors());
app.use(express.json());



// app.use(cookieParser());
// // app.use(cookieParser());
// // app.use(bodyParser.json());
// // app.use(bodyParser.urlencoded({ extended: true }));
// // app.use(morgan("dev"));
// // app.use(express.json());
// // app.use(cors());
// // app.use(connectFlash());

// // app.use(session({
// //     secret: 'secret',
// //     resave: true,
// //     saveUninitialized: false
// // }))


// //Rutas
// const routes = require('./build/routes/routes');
const authRoutes = require("./build/routes/authRoutes")
// // import routes from "../server/build/routes/index.routes.js"
// app.use(routes);
app.use(authRoutes);
// // init all web routes
// // const webRoutes = require('./build/routes/index.routes')
// // webRoutes(app);

// //Empezar el servidor

// app.listen(3001, () => {
//     console.log("Running server");
// });

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})