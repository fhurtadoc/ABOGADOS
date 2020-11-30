const pool=require('../conexonDB');

let Entradas=function(entradas){        
    this.id_abogado=entradas.id_abogado;
    this.categoria=entradas.categoria;
    this.titulo=entradas.titulo;
    this.descripcion=entradas.descripcion;
    this.fecha=entradas.fecha;
    this.imagen=entradas.imagen  
};

const INSERT=('INSERT INTO entradas set ?')
const SELECT=("SELECT * from entradas where id_entradas=?");
const LIST=("SELECT * from entradas");
const UPDATE=("UPDATE entradas SET  id_abogado=?, categoria=?, titulo=?, descripcion=?, CURDATE(), imagen=? WHERE id_entradas=?" );
const DELETE=("DELETE FROM entradas WHERE id_entradas=?");

Entradas.crear=function(entradas, result){
    pool.query(INSERT, entradas, (err, res)=>{
        if(err){
            console.log('error:', err);
            result(err, null);
        }else{
            console.log(res.insertId);
            result(null, res.insertId);
        }        
    });
};

Entradas.listar=function(result){
    pool.query(LIST, (err, res)=>{
        if(err){
            console.log('error:',err);
            result(null, res);
        }else{
            console.log('entradas:',res);
            result (null, res);
        }
        
    });

};

Entradas.buscar=function( id, result){
    pool.query(SELECT, id, (err, res)=>{
        if(err){
            console.log('error:', err);
            result(null, res);
        }else{
            console.log('entradas:', res);
            result(null, res);
        }

    });
};

Entradas.editar=function(entradas, result){
    pool.query(UPDATE, [
        entradas.id_abogado,
        entradas.categoria,
        entradas.titulo,
        entradas.descripcion,
        entradas.fecha], (err, res)=>{
        if(err){
            console.log('error:', err);
            result(null, res);
        }else{
            console.log('entradas:', res);
            result(null, res);
        }

    });
};

Entradas.eliminar=function(id, result){
    pool.query(DELETE, id, (err, res)=>{
        if(err){
            console.log('error:',err);
            result(null, err);
        }else{
            result(null, res);
        }
    });
};
module.exports=Entradas;