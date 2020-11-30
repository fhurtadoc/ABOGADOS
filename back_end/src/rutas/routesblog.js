const ControladorBlog=require('../controlador/controladorblog');
const express=require("express");
const router=express.Router()


// get 
//OK
// entradas 
router.get('/entradas', ControladorBlog.listarEntradas);

router.get('/entrada/:id', ControladorBlog.buscarEntrada);

router.get('/elimianrentrada/:id', ControladorBlog.eliminarEntrada);

// post 

// entradas

router.post('/newentrada', ControladorBlog.crearEntrada);

router.post('edit/entradas', ControladorBlog.editarEntrada);

//action
// get 

router.get('/acciones', ControladorBlog.listarAccions);

//post

router.post('/newaccion', ControladorBlog.crearAction);

router.post('/editaccion', ControladorBlog.editarAction);


// comentarios 
//GET
//OK
router.get('/comentarios', ControladorBlog.listarComentarios);

router.get('/comentario/:id', ControladorBlog.buscarComentario);

router.get('/elimianarcomentario/:id', ControladorBlog.eliminarComentario);

// post 

// comentarios

router.post('/newcomentario', ControladorBlog.crearComentario);

router.post('edit/comentario', ControladorBlog.editarComentario);

module.exports=router;