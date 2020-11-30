const pool=require('../conexonDB');

let User_abog=function(user_abog){
    this.id_abogado=user_abog.id_abogado
    this.email=user_abog.email
    this.password=user_abog.password
}

const INSERT=('INSERT INTO username_abog set ?')
const SELECT=("SELECT * from username_abog WHERE id=?");
const SELECTUSER=("SELECT * from username_abog WHERE email=?");
const LIST=("SELECT * from username_abog");
const UPDATE=("UPDATE username_abog SET  password=? WHERE email=?");
const DELETE=("DELETE FROM username_abog WHERE id=?");

User_abog.crear=function(user_abog, result){
    pool.query(INSERT, user_abog, (err, res)=>{
        if(err){
            console.log('error:', err);
            result(err, null);
        }else{
            console.log(res.insertId);
            result(null, res.insertId);
        }        
    });
};

User_abog.listar=function(result){
    pool.query(LIST, (err, res)=>{
        if(err){
            console.log('error:',err);
            result(null, res);
        }else{
            console.log('user_abog:',res);
            result (null, res);
        }
        
    });

};

User_abog.buscarUser=function(user, result){
    pool.query(SELECTUSER, user, (err, res)=>{
        if(err){
            console.log('error', err);
            result(null, res)
        }else{
            console.log( 'user:', res);
            result (null, res)
        }        
    });
};

User_abog.buscar=function( id, result){
    pool.query(SELECT, id, (err, res)=>{
        if(err){
            console.log('error:', err);
            result(null, res);
        }else{
            console.log('user_abog:', res);
            result(null, res);
        }

    });
};

User_abog.editar=function(email, password, result){
    pool.query(UPDATE, [                
        password,        
        email ], (err, res)=>{
        if(err){
            console.log('error:', err);
            result(null, res);
        }else{
            console.log('user_abog:', res);
            result(null, res);
        }

    });
};

User_abog.eliminar=function(id, result){
    pool.query(DELETE, id, (err, res)=>{
        if(err){
            console.log('error:',err);
            result(null, err);
        }else{
            result(null, res);
        }
    });
};
module.exports=User_abog;