const Abogado = require("../modelo/abogado");
const Usuario = require("../modelo/usuario");
const User_abog = require("../modelo/user_abog");
const User = require("../modelo/user_user");
const Plantilla = require("../modelo/plantilla");
const Consulta = require("../modelo/consulta");
const path = require("path");
const fs = require("fs");

/*______________________________________________________________________-*/
//abogado
//GET
exports.listarAbogados = function (req, res) {
  Abogado.listar((err, abogado) => {
    if (err) {
      res.send(err);
    } else {
      console.log(err, abogado);
      res.send({ abogado });
    }
  });
};

exports.buscarAbogado = function (req, res) {
  var id = req.params.id;
  Abogado.buscar(id, (err, abogado) => {
    if (err) res.send(err);
    if (!abogado)
      return res
        .status(404)
        .send({ message: "No existe el proyecto para actualizar" });
    return res.status(200).send({ abogado: abogado });
  });
};

exports.eliminarAbogado = function (req, res) {
  //eliminamos la imagen del servidor
  let imagen = req.params.imagen;
  let Namepath = path.join(__dirname, "../public/imagen_abog/" + imagen);
  fs.unlink(Namepath, (err) => {
    // eliminamos el abogado de la base de datos
    var id = req.params.id;
    Abogado.eliminar(id, (err, abogados) => {
      if (err)
        return res
          .status(500)
          .send({ message: "No se ha podido borrar el proyecto" });
      if (!abogados)
        return res
          .status(404)
          .send({ message: "No se puede eliminar ese proyecto." });
      return res.status(200).send({ abogados: abogados });
    });
  });
};

//POST

exports.crearAbogado = function (req, res) {
  //guardamos la imagen
  let params = req.body;
  let filePath = req.files.imagen.path;
  let fileSplit = filePath.split("\\");
  let fileName = fileSplit[3];

  params.imagen = fileName;

  let abogadonuevo = new Abogado(params);
  Abogado.crear(abogadonuevo, (err, abogados) => {
    if (err) {
      let imagen = req.file.imagen;
      let Namepath = path.join(__dirname, "../public/imagen_abog/" + imagen);
      fs.unlink(Namepath, (err) => {
        res.send(err);
      });
    }
    return res.status(200).send({ abogados: abogados });
  });
};

exports.editarAbogado = (req, res) => {
  id_abogados = req.params.id;
  Abogado.editar(id_abogados, new Abogado(req.body), (err, abogado) => {
    if (err) return res.status(500).send({ message: "editar la informacion" });
    if (!abogado)
      return res
        .status(404)
        .send({ message: "No se puede editar informacion." });
    return res.status(200).send({
      mensaje: "elemento editado con exito",
      abogado: abogado,
    });
  });
};

exports.editarImgAbogado = (req, res) => {  
  let body = req.body;  
  let filePath = req.files.imagen.path;  
  let fileSplit = filePath.split("\\");
  let fileName = fileSplit[3];
  body.imagen = fileName;  
  let id = req.params.id;  
  Abogado.actializarImg(id, body.imagen,  (err) => {
    if (err) return res.status(500).send({ message: "editar la informacion" });
    if (!body.imagen) {
      return res
        .status(404)
        .send({ message: "No se puede editar informacion." });
    } else {
      let imagen = req.params.imagen;
      let Namepath = path.join(__dirname, "../public/imagen_abog/" + imagen);
      fs.unlink(Namepath, (err) => {
        if (!err) {
           return res.status(200).send({
            mensaje: "elemento editado con exito",
          });
        } else {
          res.send(err);
        }
      });      
    }
  });
};

/*______________________________________________________________________-*/
//username_abog

exports.listarUsers_abog = function (req, res) {
  User_abog.listar((err, username_abog) => {
    if (err) {
      res.send(err);
    } else {
      console.log(err, username_abog);
      res.send({ username_abog });
    }
  });
};

exports.buscarUsers_abog = function (req, res) {
  var id = req.params.id;
  User_abog.buscar(id, (err, username_abog) => {
    if (err) res.send(err);
    if (!username_abog)
      return res
        .status(404)
        .send({ message: "No existe el proyecto para actualizar" });
    return res.status(200).send({ username_abog: username_abog });
  });
};

exports.eliminarUsers_abog = function (req, res) {
  var id = req.params.id;
  User_abog.eliminar(id, (err, username_abog) => {
    if (err)
      return res
        .status(500)
        .send({ message: "No se ha podido borrar el proyecto" });
    if (!username_abog)
      return res
        .status(404)
        .send({ message: "No se puede eliminar ese proyecto." });
    return res.status(200).send({ username_abog: username_abog });
  });
};

//_______________________________________________________________________________
//usuarios

exports.listarUsuarios = function (req, res) {
  Usuario.listar((err, usuario) => {
    if (err) {
      res.send(err);
    } else {
      console.log(err, usuario);
      res.send({ usuario });
    }
  });
};

exports.buscarUsuario = function (req, res) {
  var id = req.params.id;
  Usuario.buscar(id, (err, usuario) => {
    if (err) res.send(err);
    if (!usuario)
      return res
        .status(404)
        .send({ message: "No existe el proyecto para actualizar" });
    return res.status(200).send({ usuario: usuario });
  });
};

exports.eliminarUsuario = function (req, res) {
  var id = req.params.id;
  Usuario.eliminar(id, (err, usuario) => {
    if (err)
      return res
        .status(500)
        .send({ message: "No se ha podido borrar el proyecto" });
    if (!usuario)
      return res
        .status(404)
        .send({ message: "No se puede eliminar ese proyecto." });
    return res.status(200).send({ usuario: usuario });
  });
};

//POST

exports.crearUsuario = function (req, res) {
  let usuarionuevo = new Usuario(req.body);
  Usuario.crear(usuarionuevo, (err, usuario) => {
    if (err) {
      res.send(err);
    }
    return res.status(200).send({ usuario: usuario });
  });
};

exports.editarUsuario = function (req, res) {
  var id = req.params.id;
  let usuarionuevo = new Usuario(req.body);
  Usuario.editar(id, usuarionuevo, (err, usuario) => {
    if (err) return res.status(500).send({ message: "editar la informacion" });
    if (!usuario)
      return res
        .status(404)
        .send({ message: "No se puede editar informacion." });
    return res.status(200).send({
      mensaje: "elemento editado con exito",
      usuario: usuario,
    });
  });
};


/*______________________________________________________________________-*/

//username_user

exports.listarUsers_User = function (req, res) {
  User.listar((err, username_user) => {
    if (err) {
      res.send(err);
    } else {
      console.log(err, username_user);
      res.send({ username_user });
    }
  });
};

exports.buscarUsers_User = function (req, res) {
  var id = req.params.id;
  User.buscar(id, (err, username_user) => {
    if (err) res.send(err);
    if (!username_user)
      return res
        .status(404)
        .send({ message: "No existe el proyecto para actualizar" });
    return res.status(200).send({ username_user: username_user });
  });
};

exports.eliminarUsers_User = function (req, res) {
  var id = req.params.id;
  User.eliminar(id, (err, username_user) => {
    if (err)
      return res
        .status(500)
        .send({ message: "No se ha podido borrar el proyecto" });
    if (!username_user)
      return res
        .status(404)
        .send({ message: "No se puede eliminar ese proyecto." });
    return res.status(200).send({ username_user: username_user });
  });
};

/*______________________________________________________________________-*/
//plantillas

exports.listarPlantilla = function (req, res) {
  Plantilla.listar((err, plantilla) => {
    if (err) {
      res.send(err);
    } else {
      console.log(err, plantilla);
      res.send({ plantilla });
    }
  });
};

exports.buscarPlantilla = function (req, res) {
  var id = req.params.id;
  Plantilla.buscar(id, (err, plantilla) => {
    if (err) res.send(err);
    if (!plantilla)
      return res
        .status(404)
        .send({ message: "No existe el proyecto para actualizar" });
    return res.status(200).send({ plantilla: plantilla });
  });
};

exports.eliminarPlantilla = function (req, res) {
    //elimino la plantilla de la base de datos
    var id = req.params.id;
    Plantilla.eliminar(id, (err, plantilla) => {
      if (err)
        return res
          .status(500)
          .send({ message: "No se ha podido borrar el proyecto" });
      if (!plantilla){
        return res
          .status(404)
          .send({ message: "No se puede eliminar ese proyecto." });
      }else{
        // elimino la plantilla del servidor
        let nombre = req.params.ruta;
        let Namepath = path.join(__dirname, "../public/plantillas/" + nombre);
        fs.unlink(Namepath, (err) => {
          if(err){
             res.send(err)
          }else{
            return res.status(200).send({ plantilla: 'plantilla eliminada' });
          }
        });        
      }
    });  
};
//POST

exports.crearPlantilla = function (req, res) {
  let params = req.body;
  let filePath = req.files.ruta.path;
  let fileSplit = filePath.split("\\");
  let fileName = fileSplit[3];
  params.ruta = fileName;
  let nuevaplantilla = new Plantilla(params);
  Plantilla.crear(nuevaplantilla, (err, plantilla) => {
    if (err) {
      res.send(err);
    }
    return res.status(200).send({ plantilla: plantilla });
  });
};

exports.editarDataPlantilla=function(req, res){
  let plantilla=new Plantilla(req.body);      
  let id =req.params.id;  

  Plantilla.editData(id, plantilla, (err, plantilla)=>{
   
    if (err) return res.status(500).send({ message: "editar la informacion" });
    if (!plantilla)
      return res
        .status(404)
        .send({ message: "No se puede editar informacion." });
    return res.status(200).send({
      mensaje: "elemento editado con exito",
      plantilla: plantilla,
    });
  });
};

exports.editarPlantilla = function (req, res) {  
  let body = req.body;
  let filePath = req.files.ruta.path;
  let fileSplit = filePath.split("\\");
  let fileName = fileSplit[3];
  body.ruta = fileName;
  let id = req.params.id;        
  Plantilla.editar(id, body.ruta, (err) => {
    if (err) return res.status(500).send({ message: "editar la informacion" });
    if (!body.ruta){
      return res
        .status(404)
        .send({ message: "No se puede editar informacion." });
    }else{
      let oldruta=req.params.ruta;
      let namePath=path.join(__dirname, "../public/plantillas/" + oldruta)      
      fs.unlink(namePath, (err)=>{
        if(!err){
          return res.status(200).send({mensaje: 'elemenro editado con exito'});
        }else{
          res.send(err);
        }
      })
    }      
  });
};

/*______________________________________________________________________-*/
//consultas

exports.listarConsultas = function (req, res) {
  Consulta.listar((err, consulta) => {
    if (err) {
      res.send(err);
    } else {
      console.log(err, consulta);
      res.send({ consulta });
    }
  });
};

exports.buscarConsulta = function (req, res) {
  var id = req.params.id;
  Consulta.buscar(id, (err, consulta) => {
    if (err) res.send(err);
    if (!consulta)
      return res
        .status(404)
        .send({ message: "No existe el proyecto para actualizar" });
    return res.status(200).send({ consulta: consulta });
  });
};

exports.eliminarConsulta = function (req, res) {
  var id = req.params.id;
  Consulta.eliminar(id, (err, consulta) => {
    if (err)
      return res
        .status(500)
        .send({ message: "No se ha podido borrar el proyecto" });
    if (!consulta)
      return res
        .status(404)
        .send({ message: "No se puede eliminar ese proyecto." });
    return res.status(200).send({ consulta: consulta });
  });
};

//POST

exports.crearConsulta = function (req, res) {
  let nuevaconsulta = new Consulta(req.body);
  Consulta.crear(nuevaconsulta, (err, consulta) => {
    if (err) {
      res.send(err);
    }
    return res.status(200).send({ consulta: consulta });
  });
};

exports.editarConsulta = function (req, res) {
  let id = req.params.id;
  let nuevaconsulta = new Consulta(req.body);
  Consulta.editar(id, nuevaconsulta, (err, consulta) => {
    if (err) return res.status(500).send({ message: "editar la informacion" });
    if (!consulta)
      return res
        .status(404)
        .send({ message: "No se puede editar informacion." });
    return res.status(200).send({
      mensaje: "elemento editado con exito",
      consulta: consulta,
    });
  });
};
/*______________________________________________________________________-*/
