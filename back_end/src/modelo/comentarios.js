const pool=require('../conexonDB');

let Comentario=function(comentario){
    this.id_entradas=comentario.id_entradas
    this.id_usuarios=comentario.id_usuarios
    this.comentario=comentario.comentario
};
const INSERT=('INSERT INTO comentarios set ?')
const SELECT=("SELECT * from comentarios where id=?");
const LIST=("SELECT * from comentarios");
const UPDATE=("UPDATE comentarios SET id_entradas=? id_usuarios=? comentarios=?" +
"WHERE id = ?" );
const DELETE=("DELETE FROM comentarios WHERE id=?");

Comentario.crear=function(newcomentario, result){
    pool.query(INSERT, newcomentario, (err, res)=>{
        if(err){
            console.log('error:', err);
            result(err, null);
        }else{
            console.log(res.insertId);
            result(null, res.insertId);
        }        
    });
};

Comentario.listar=function(result){
    pool.query(LIST, (err, res)=>{
        if(err){
            console.log('error:',err);
            result(null, res);
        }else{
            console.log('newcomentario:',res);
            result (null, res);
        }
        
    });

};

Comentario.buscar=function( id, result){
    pool.query(SELECT, id, (err, res)=>{
        if(err){
            console.log('error:', err);
            result(null, res);
        }else{
            console.log('newcomentario:', res);
            result(null, res);
        }

    });
};

Comentario.editar=function(comentario, result){
    pool.query(UPDATE, [comentario.id_entradas, comentario.id_usuarios, comentario.comentario], (err, res)=>{
        if(err){
            console.log('error:', err);
            result(null, res);
        }else{
            console.log('newcomentario:', res);
            result(null, res);
        }

    });
};

Comentario.eliminar=function(id, result){
    pool.query(DELETE, id, (err, res)=>{
        if(err){
            console.log('error:',err);
            result(null, err);
        }else{
            result(null, res);
        }
    });

};
module.exports=Comentario;