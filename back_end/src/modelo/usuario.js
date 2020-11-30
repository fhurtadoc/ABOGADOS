const pool=require('../conexonDB');

let Usuario=function(usuario){
    this.nombres=usuario.nombres;
    this.apellidos=usuario.apellidos;
    this.correo=usuario.correo;
    this.telefono=usuario.telefono;    
};

const INSERT=('INSERT INTO usuarios set ?')
const SELECT=("SELECT * from usuarios where id_usuarios=?");
const LIST=("SELECT * from usuarios");
const UPDATE=("UPDATE usuarios SET nombres=?, apellidos=?, correo=?," 
+"telefono=? WHERE id_usuarios=?");
const DELETE=("DELETE FROM usuarios WHERE id_usuarios= ?");

Usuario.crear=function(usuario, result){
    pool.query(INSERT, usuario, (err, res)=>{
        if(err){
            console.log('error:', err);
            result(err, null);
        }else{
            console.log(res.insertId);
            result(null, res.insertId);
        }        
    });
};

Usuario.listar=function(result){
    pool.query(LIST, (err, res)=>{
        if(err){
            console.log('error:',err);
            result(null, res);
        }else{
            console.log('usuario:',res);
            result (null, res);
        }
        
    });

};

Usuario.buscar=function( id, result){
    pool.query(SELECT, id, (err, res)=>{
        if(err){
            console.log('error:', err);
            result(null, res);
        }else{
            console.log('usuario:', res);
            result(null, res);
        }

    });
};

Usuario.editar=function( id_usuarios, usuario, result){
    pool.query(UPDATE, [
        usuario.nombres,
        usuario.apellidos,
        usuario.correo,
        usuario.telefono       
        , id_usuarios], (err, res)=>{
        if(err){
            console.log('error:', err);
            result(null, res);
        }else{
            console.log('usuario:', res);
            result(null, res);
        }

    });
};

Usuario.eliminar=function(id, result){
    pool.query(DELETE, id, (err, res)=>{
        if(err){
            console.log('error:',err);
            result(null, err);
        }else{
            result(null, res);
        }
    });
};
module.exports=Usuario;