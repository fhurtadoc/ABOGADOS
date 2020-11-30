//hacemos la conexion a base de datos 
const mysql=require('mysql');
//luego importamos la libreria util mas especificamente el modulo promisify que nos permite
// hacer promesas con mysql teniendo en cuenta que este no soporta las mimas. 
let {promisify}=require("util");
//ahora hacemos el pool de conecciones
 
let pool=mysql.createPool({
    host:'localhost',
    user: 'root',
    password:'',
    database:'tuderechoya',
    port:'3308'

});
pool.getConnection((err,connection)=>{
    
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.log('conexion a DB esta cerrada');
        }
        if(err.code ==='ER_CON_COUNT_ERROR'){
            console.log('Database tiene este numero de conexiones');
        }
        if(err.code=== 'ECONNREFUSED'){
            console.log('Database consulta rechazada');
        }
    }
    if(connection){
        connection.release();
    }
    console.log('conectado a DB');
    return
});
// ahora utilizamos la variables pool y primisify para convertir promesas a call backs solo cuando 
// se ejecute el query 
pool.query=promisify(pool.query);

module.exports=pool;

