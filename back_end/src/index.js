const morgan=require('morgan');
const express=require("express");
const bodyParser = require('body-parser');
const rutas=require('./rutas/routes');
const rutasblog=require('./rutas/routesblog');
const passport=require('passport');
const session=require('express-session')
const routes_login=require('./rutas/routes_log');

/*ejecutamos express */
const app=express();
require('./controlador/passport');

//configuramos el servidor esta funcion dice si tiene un puerto x
// conectece en el si no conectece al 3500
app.set('port',process.env.PORT || 3500);

//1.iniciamos el servidor 
app.listen(app.get('port'),()=>{

    console.log(`ejecutando en el puerto', ${app.get('port')}`);
    
});

// 2. Middlewares

//sesiones
app.use(session({
    secret: 'kadcksacnsakjflas',
    resave: false,
    saveUninitialized: false    

}));

//-morgan
app.use(morgan("dev"));
//-body parser 
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//pasport 
app.use(passport.initialize());
app.use(passport.session());

//3.rutas

app.use(rutas);
app.use(rutasblog);
app.use(routes_login);


