const pool=require('../conexonDB');

let Action=function(actions){
    this.id_entradas=actions.id_entradas,
    this.id_usuario=actions.id_usuario,
    this.likes=actions.likes;
    this.dislike=actions.dislike;          
};
const INSERT=('INSERT INTO actions set ?')
const SELECT=("SELECT * from actions where id_actions=?");
const LIST=("SELECT * from actions");
const UPDATE=("UPDATE actions SET id_entradas=? id_usuarios=? likes=? dislike=? WHERE id_actions = ?" );
const DELETE=("DELETE FROM actions WHERE id_actions=?");

Action.crear=function(newaction, result){
    pool.query(INSERT, newaction, (err, res)=>{
        if(err){
            console.log('error:', err);
            result(err, null);
        }else{
            console.log(res.insertId);
            result(null, res.insertId);
        }        
    });
};

Action.listar=function(result){
    pool.query(LIST, (err, res)=>{
        if(err){
            console.log('error:',err);
            result(null, res);
        }else{
            console.log('newaction:',res);
            result (null, res);
        }
        
    });

};

Action.buscar=function( id, result){
    pool.query(SELECT, id, (err, res)=>{
        if(err){
            console.log('error:', err);
            result(null, res);
        }else{
            console.log('newaction:', res);
            result(null, res);
        }

    });
};

Action.editar=function(action, result){
    pool.query(UPDATE, [action.id_entradas, action.id_usuarios, action.likes, action.dislike], (err, res)=>{
        if(err){
            console.log('error:', err);
            result(null, res);
        }else{
            console.log('newaction:', res);
            result(null, res);
        }

    });
};

Action.eliminar=function(id, result){
    pool.query(DELETE, id, (err, res)=>{
        if(err){
            console.log('error:',err);
            result(null, err);
        }else{
            result(null, res);
        }
    });

};
module.exports=Action;