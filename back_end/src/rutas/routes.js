const Controlador=require('../controlador/controlador');
const express=require("express");
const router=express.Router()

let multipart = require('connect-multiparty');
let multipartMiddleware = multipart({ uploadDir: "./src/public/imagen_abog"});
let multipartMiddlewareplanntillas = multipart({ uploadDir: "./src/public/plantillas"});
const veryfyToken=require('../tools/verifyToken');

//Abogado
//GET
//OK
//lista de abogados -A

router.get('/abogados', Controlador.listarAbogados);

// buscar abogado 
router.get('/abogado/:id', Controlador.buscarAbogado);
// eliminar abogado 
router.get('/elimianarabogado/:id', Controlador.eliminarAbogado);

//POST 

// crear abogado 
//Ok
router.post('/add/abogado', multipartMiddleware, Controlador.crearAbogado);
//PUT
//OK
// editar informacion genera abogado 
router.put('/actualizadatos/:id', Controlador.editarAbogado);

// editar imagen de un abogado 

router.put('/cambiarimg/:imagen/:id', multipartMiddleware, Controlador.editarImgAbogado);

//_____________________________________________________________________________

//Username_abog

//GET 
//OK
//lista de username 
router.get('/users_abog', Controlador.listarUsers_abog);

// buscar username  
router.get('/user_abog/:id', Controlador.buscarUsers_abog);

// eliminar username 
router.get('/elimianaruser_abog/:id', Controlador.eliminarUsers_abog);

//________________________________________________________________________

//Usuario
//GET 
//OK
//lista de usuarios 
router.get('/usuarios', Controlador.listarUsuarios);

// buscar usuario  
router.get('/usuario/:id', Controlador.buscarUsuario);
// eliminar usuario 
router.get('/elimianarusuario/:id', Controlador.eliminarUsuario);

//POST 

// crear usuario 
//OK
router.post('/add/usuario', Controlador.crearUsuario);

//PUT
//OK
// editar usuario 
//PENDIENTE
router.put('/editusuario/:id', Controlador.editarUsuario);

//_____________________________________________________________________________



//Username_user

//GET 
//OK
//lista de username 
router.get('/users', Controlador.listarUsers_User);

// buscar username  
router.get('/user/:id', Controlador.buscarUsers_User);

// eliminar username 
router.get('/elimianaruser/:id', Controlador.eliminarUsers_User);

//_______________________________________________________________________

//Plantillas
//PENDIENTE
//GET
//lista de plantillas  
router.get('/plantillas', Controlador.listarPlantilla);

// buscar plantilla  
router.get('/plantilla/:id', Controlador.buscarPlantilla);

// eliminar plantilla 
router.get('/elimianarplantilla/:id/:ruta', Controlador.eliminarPlantilla);

//POST 
//OK
// crear plantilla 
router.post('/add/plantilla', multipartMiddlewareplanntillas, Controlador.crearPlantilla);

// editar plantilla 
//PUT
//OK
router.put('/editplantilla/:id/:ruta', multipartMiddlewareplanntillas, Controlador.editarPlantilla);
router.post('/editdata/:id', Controlador.editarDataPlantilla);

//_____________________________________________________________________________

//Consulta
//GET
//OK
//lista de consultas  
router.get('/consultas', Controlador.listarConsultas);

// buscar consultas  
router.get('/consulta/:id', Controlador.buscarConsulta);

// eliminar consultas 
router.get('/elimianarconsulta/:id', Controlador.eliminarConsulta);

//POST 
//OK
// crear consultas 
router.post('/add/consulta', Controlador.crearConsulta);
//PUT
// editar consultas 
//OK
router.put('/editconsulta/:id', Controlador.editarConsulta);
//_____________________________________________________________________________
module.exports=router;