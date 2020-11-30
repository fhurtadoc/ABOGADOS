const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User_abog = require("../modelo/user_abog");
const User=require('../modelo/user_user');
const encrypt = require("../tools/encrypt");
const pool = require("../conexonDB");
//USUARIO ABOGADO
/* LOGIN  */
// creamos un metodo de validacion que haga consultas a la base de datos y
//busque por usuario 
passport.use("local.singin", new LocalStrategy({
      usernameField: "email",
      passwordField: "password",   
      passReqToCallback: true,

}, async(req, email, password, done )=>{    
//ejecutamos el query con un callback 
 User_abog.buscarUser(email, async (err, result)=>{
    //resultado es el usario completo 
    if(result.length>0){
      let user_user=result[0];      
      //validamos el password con el usuario con un metodo que se encuentra en 
      //encrypt.js
      let validPassword=await encrypt.matchPassword(password, user_user.PASSWORD)
      if(!validPassword){
        return done({err: 'pass es incorrecto'});
      }else{        
        return done (null, user_user); 
      } 
    
    }else{
      return done({err: 'el usuario no existe'});
    }
  
  });
  
}));

/* vamos a crear los metodos de para autenticacion al momento en que un usuario o
un abogado registren sus ususarios 
*/
//USUARIO ABOGADO  CREACION DEL USUARIO
passport.use( "local.singup", new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      //le colocamos req to callback para poder agregar cualquier otra informacion adicional
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      let { id_abogado } = req.body;
      password = await encrypt.encryptPassword(password);
      let newusername_abog = new User_abog({
        id_abogado,
        email,
        password,
      });      
      User_abog.crear(newusername_abog, (err, id_user ) => {        
        if (err) {
          return err;
        }return done(null,id_user);            
      });
      return done(null,id_user);            
    }));


passport.serializeUser((id_user, done) => {
    done(null, id_user);
  });
  
passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM username_abog WHERE id = ?', [id]);
  done(null, rows[0]);
  });





   
  
 // USUARIO

 passport.use("local.singinUser", new LocalStrategy({
  usernameField: "email",
  passwordField: "password",   
  passReqToCallback: true,

}, async(req, email, password, done )=>{    
//ejecutamos el query con un callback 
User.buscarUser(email, async (err, result)=>{
//resultado es el usario completo 
if(result.length>0){
  let user_user=result[0];      
  //validamos el password con el usuario con un metodo que se encuentra en 
  //encrypt.js
  let validPassword=await encrypt.matchPassword(password, user_user.PASSWORD)
  if(validPassword){
    return done( null, user_user); 
  }else{
    return done({err: 'pass es incorrecto'});
  }      
}else{
  return done({err: 'el usuario no existe'});
}
});
}));

/* vamos a crear los metodos de para autenticacion al momento en que un usuario o
un abogado registren sus ususarios 
*/
//USUARIO CREACION DE USUARIOS 

passport.use( "local.singupUser", new LocalStrategy(
{
  usernameField: "email",
  passwordField: "password",
  //le colocamos req to callback para poder agregar cualquier otra informacion adicional
  passReqToCallback: true,
},
async (req, email, password, done) => {
  let { id_usuario } = req.body;
  password = await encrypt.encryptPassword(password);
  let newusername_user = new User({
    id_usuario,
    email,
    password,
  });      
  User.crear(newusername_user, (err, id_user ) => {        
    if (err) {
      return err;
    }return done(null,id_user);            
  });
  return done(null,id_user);            
}));

passport.serializeUser((id_user, done) => {
done(null, id_user);
});

passport.deserializeUser(async (id, done) => {
const rows = await pool.query('SELECT * FROM username_user WHERE id = ?', [id]);
done(null, rows[0]);
});
