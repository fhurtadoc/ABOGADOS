const Entrada=require('../modelo/entradas');
const Action=require('../modelo/entradas');
const Comentario=require('../modelo/comentarios');

//entradas

//GET

exports.listarEntradas=function(req, res){
    Entrada.listar((err, entrada)=>{

        if(err){
            res.send(err);
        }else{
            console.log(err, entrada);
            res.send({entrada});
        }
    });
}

exports.buscarEntrada=function(req, res){
    var id=req.params.id;
    Entrada.buscar(id, (err, entrada, )=>{
        if(err) res.send(err);
        if(!entrada) return res.status(404).send({message: 'No existe el proyecto para actualizar'});
        return res.status(200).send({entrada:entrada});
    });
};
exports.eliminarEntrada=function(req, res){
    var id=req.params.id;
    Entrada.eliminar(id, (err, entrada)=>{
        if(err) return res.status(500).send({message: 'No se ha podido borrar el proyecto'});
        if(!entrada) return res.status(404).send({message: "No se puede eliminar ese proyecto."});
        return res.status(200).send({entrada: entrada });
    });
};

//POST

exports.crearEntrada=function(req, res){
    let entradanueva=new Entrada(req.body);
    Entrada.crear(entradanueva, (err, entrada)=>{
        if(err){
            res.send(err);
        }
        return res.status(200).send({entrada: entrada});
    });    
};

exports.editarEntrada=function(req, res){
    let id=req.params.id;
    let entradanueva=new Entrada(req.body);

    Entrada.editar(id, entradanueva, (err, entrada)=>{
    if(err) return res.status(500).send({message: 'editar la informacion'});
    if(!entrada) return res.status(404).send({message: "No se puede editar informacion."});
    return res.status(200).send({
        mensaje:'elemento editado con exito', 
        entrada: entrada
    });
    });
};

// acciones
//GET
exports.listarAccions=function(req, res){
    Action.listar((err, action)=>{

        if(err){
            res.send(err);
        }else{
            console.log(err, action);
            res.send({action});
        }
    });
}



//POST

exports.crearAction=function(req, res){
    let accionanueva=new Action(req.body);
    Action.crear(accionanueva, (err, action)=>{
        if(err){
            res.send(err);
        }
        return res.status(200).send({action: action});
    });    
};

exports.editarAction=function(req, res){
    let id=req.params.id;
    let accionnueva=new Action(req.body);

    Action.editar(id, accionnueva, (err, action)=>{
    if(err) return res.status(500).send({message: 'editar la informacion'});
    if(!action) return res.status(404).send({message: "No se puede editar informacion."});
    return res.status(200).send({
        mensaje:'elemento editado con exito', 
        action: action
    });
    });
};

// comentarios

exports.listarComentarios=function(req, res){
    Comentario.listar((err, comentarios)=>{

        if(err){
            res.send(err);
        }else{
            console.log(err, comentarios);
            res.send({comentarios});
        }
    });
}

exports.buscarComentario=function(req, res){
    var id=req.params.id;
    Comentario.buscar(id, (err, comentario, )=>{
        if(err) res.send(err);
        if(!comentario) return res.status(404).send({message: 'No existe el proyecto para actualizar'});
        return res.status(200).send({comentario:comentario});
    });
};

exports.eliminarComentario=function(req, res){
    var id=req.params.id;
    Comentario.eliminar(id, (err, comentario)=>{
        if(err) return res.status(500).send({message: 'No se ha podido borrar el proyecto'});
        if(!comentario) return res.status(404).send({message: "No se puede eliminar ese proyecto."});
        return res.status(200).send({comentario: comentario });
    });
};

//POST

exports.crearComentario=function(req, res){
    let comentarioNuevo=new Comentario(req.body);
    Comentario.crear(comentarioNuevo, (err, entrada)=>{
        if(err){
            res.send(err);
        }
        return res.status(200).send({comentarionuevo: comentarionuevo});
    });    
};

exports.editarComentario=function(req, res){
    let id=req.params.id;
    let comentarionuevo=new Comentario(req.body);

    Comentario.editar(id, comentarionuevo, (err, entrada)=>{
    if(err) return res.status(500).send({message: 'editar la informacion'});
    if(!comentarionuevo) return res.status(404).send({message: "No se puede editar informacion."});
    return res.status(200).send({
        mensaje:'elemento editado con exito', 
        comentarionuevo: comentarionuevo
    });
    });
};
