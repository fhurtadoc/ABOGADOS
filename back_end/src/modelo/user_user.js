const pool=require('../conexonDB');

let User_user=function(user_user){
    this.id_usuario=user_user.id_usuario
    this.email=user_user.email
    this.password=user_user.password
}

const INSERT=('INSERT INTO username_user set ?')
const SELECT=("SELECT * from username_user WHERE id=?");
const SELECTUSER=('SELECT * from username_user WHERE email=?');
const LIST=("SELECT * from username_user");
const UPDATE=("UPDATE username_user SET  password=? WHERE id_usuario=?");
const DELETE=("DELETE FROM username_user WHERE id=?");

User_user.crear=function(user_user, result){
    pool.query(INSERT, user_user, (err, res)=>{
        if(err){
            console.log('error:', err);
            result(err, null);
        }else{
            console.log(res.insertId);
            result(null, res.insertId);
        }        
    });
};

User_user.listar=function(result){
    pool.query(LIST, (err, res)=>{
        if(err){
            console.log('error:',err);
            result(null, res);
        }else{
            console.log('user_user:',res);
            result (null, res);
        }
        
    });

};

User_user.buscar=function( id, result){
    pool.query(SELECT, id, (err, res)=>{
        if(err){
            console.log('error:', err);
            result(null, res);
        }else{
            console.log('user_user:', res);
            result(null, res);
        }

    });
};

User_user.buscarUser=function(user, result){
    pool.query(SELECTUSER, user, (err, res)=>{
        if(err){
            console.log('error:', err);
            result(null, res);
        }else{
            console.log('user_user:', res);
            result(null, res);
        }
    });
}

User_user.editar=function(email, password, result){
    pool.query(UPDATE, [                
        password,        
        email ], (err, res)=>{
        if(err){
            console.log('error:', err);
            result(null, res);
        }else{
            console.log('user_user:', res);
            result(null, res);
        }

    });
};
User_user.eliminar=function(id, result){
    pool.query(DELETE, id, (err, res)=>{
        if(err){
            console.log('error:',err);
            result(null, err);
        }else{
            result(null, res);
        }
    });
};


module.exports=User_user;