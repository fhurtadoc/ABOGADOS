const pool=require('../conexonDB');

let Plantilla=function(plantilla){    
    this.nombre=plantilla.nombre;    
    this.descripcion=plantilla.descripcion;
    this.categoria=plantilla.categoria;    
    this.ruta=plantilla.ruta;     
};

const INSERT=('INSERT INTO plantillas set ?')
const SELECT=("SELECT * from plantillas where id_plantillas=?");
const LIST=("SELECT * from plantillas");
const UPDATE=("UPDATE plantillas SET ruta=? WHERE  id_plantillas=?");
const UPDATEDATA=("UPDATE plantillas SET nombre=?, descripcion=?, categoria=? WHERE id_plantillas=?");
const DELETE=("DELETE FROM plantillas WHERE  id_plantillas=?");

Plantilla.crear=function(plantilla, result){
    pool.query(INSERT, plantilla, (err, res)=>{
        if(err){
            console.log('error:', err);
            result(err, null);
        }else{
            console.log(res.insertId);
            result(null, res.insertId);
        }        
    });
};

Plantilla.listar=function(result){
    pool.query(LIST, (err, res)=>{
        if(err){
            console.log('error:',err);
            result(null, res);
        }else{
            console.log('plantilla:',res);
            result (null, res);
        }
        
    });

};

Plantilla.buscar=function( id, result){
    pool.query(SELECT, id, (err, res)=>{
        if(err){
            console.log('error:', err);
            result(null, res);
        }else{
            console.log('plantilla:', res);
            result(null, res);
        }

    });
};

Plantilla.editData=function(id, plantilla, result){
    pool.query(UPDATEDATA, [plantilla.nombre, plantilla.descripcion, plantilla.categoria, id], 
        (err, res)=>{
        if(err){
            console.log('error:', err);
            result(null, res);
        }else{
            console.log('plantilla:', res);
            result(null, res);
        }
    });
};


Plantilla.editar=function(id, plantilla, result){
    pool.query(UPDATE, [plantilla.ruta, id], (err, res)=>{
        if(err){
            console.log('error:', err);
            result(null, res);
        }else{
            console.log('plantilla:', res);
            result(null, res);
        }

    });
};

Plantilla.eliminar=function(id, result){
    pool.query(DELETE, id, (err, res)=>{
        if(err){
            console.log('error:',err);
            result(null, err);
        }else{
            result(null, res);
        }
    });
};
module.exports=Plantilla;