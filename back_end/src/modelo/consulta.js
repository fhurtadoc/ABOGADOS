const pool=require('../conexonDB');

let Consultas=function(consultas){
    this.id_usuario=consultas.id_usuario;
    this.id_abogado=consultas.id_abogado;
    this.costo=consultas.costo;
    this.horas=consultas.horas;
};

const INSERT=('INSERT INTO consultas set ?')
const SELECT=("SELECT * from consultas where id_consultas = ?");
const LIST=("SELECT * from consultas");
const UPDATE=("UPDATE consultas SET id_usuario=?, id_abogado=?, costo=?, horas=? WHERE id_consultas=?");
const DELETE=("DELETE FROM consultas WHERE id_consultas=?");

Consultas.crear=function(consultas, result){
    pool.query(INSERT, consultas, (err, res)=>{
        if(err){
            console.log('error:', err);
            result(err, null);
        }else{
            console.log(res.insertId);
            result(null, res.insertId);
        }        
    });
};

Consultas.listar=function(result){
    pool.query(LIST, (err, res)=>{
        if(err){
            console.log('error:',err);
            result(null, res);
        }else{
            console.log('consultas:',res);
            result (null, res);
        }
        
    });

};

Consultas.buscar=function( id, result){
    pool.query(SELECT, id, (err, res)=>{
        if(err){
            console.log('error:', err);
            result(null, res);
        }else{
            console.log('consultas:', res);
            result(null, res);
        }

    });
};

Consultas.editar=function(id, consulta, result){
    pool.query(UPDATE, [
        consulta.id_usuario, 
        consulta.id_abogado, 
        consulta.costo,
        consulta.horas,
        id], (err, res)=>{
        if(err){
            console.log('error:', err);
            result(null, res);
        }else{
            console.log('consultas:', res);
            result(null, res);
        }

    });
};

Consultas.eliminar=function(id, result){
    pool.query(DELETE, id, (err, res)=>{
        if(err){
            console.log('error:',err);
            result(null, err);
        }else{
            result(null, res);
        }
    });
};
module.exports=Consultas;