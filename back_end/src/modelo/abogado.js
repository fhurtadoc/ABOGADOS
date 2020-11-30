const pool=require('../conexonDB');

let Abogado=function(abogado){    
    this.nombres=abogado.nombres;
    this.apellidos=abogado.apellidos;
    this.tarjetaP=abogado.tarjetaP;
    this.especialidad=abogado.especialidad;    
    this.telefono=abogado.telefono;
    this.costohora=abogado.costohora;
    this.imagen=abogado.imagen;
};

// consultas

const INSERT=('INSERT INTO abogados set ?');
const LIST=("SELECT * from abogados");
const SELECT=("SELECT * from abogados WHERE id_abogados=?");
const UPDATE=("UPDATE * SET nombres=?, apellidos=?, tarjetaP=?," 
+"especialidad=?, telefono=?, costohora=? WHERE id_abogados = ?" );
const UPDATEIMG=('UPDATE abogados SET imagen=? WHERE id_abogados=?');
const DELETE=("DELETE FROM abogados WHERE id_abogados=?");


Abogado.crear=function(nuevoabogado, result){

    pool.query(INSERT, nuevoabogado, (err, res)=>{
        if(err){
            console.log('error', err);;
            result(err, null);
        }else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

Abogado.listar=function(result){
    pool.query(LIST, (err, res)=>{
        if(err){
            console.log('error:', err);
            result (null, res);
        }else{
            console.log('abogado:', res);
            result(null, res);
        }
    });
};

Abogado.buscar=function(id, result){
    pool.query(SELECT, id, (err, res)=>{
        if(err){
            console.log('error:', err);
            result (null, res);
        }
        else{
            console.log('abogado:', res);
            result(null, res);
        }
    });
};

Abogado.editar=function(id_abogados, abogado, result){
    pool.query(UPDATE, [abogado.nombres, abogado.apellidos, abogado.tarjetaP,
        abogado.especialidad, abogado.telefono, 
        abogado.costohora, id_abogados], (err, res)=>{
            if(err){
                console.log('error:', err);
                result(null, err);
            }else{
                result(null, res);
            }
        });
};

Abogado.actializarImg=function(id_abogados, abogado, result){
    pool.query(UPDATEIMG, [abogado.imagen, id_abogados], (err, res)=>{
        if(err){
            console.log('erro:', err);
            result(null, err);
        }else{
            result(null,res);
        }
    });
};

Abogado.eliminar=function(id, result){
    pool.query(DELETE, id, (err, res)=>{
        if(err){
            console.log('error:',err);
            result(null, err);
        }else{
            result(null, res);
        }

    });
};

module.exports=Abogado;
