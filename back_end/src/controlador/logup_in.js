const User_abog = require("../modelo/user_abog");
const User = require("../modelo/user_user");
const passport = require('passport');
const encrypt = require("../tools/encrypt");
const User_user = require("../modelo/user_user");
const jwt = require('jsonwebtoken');


//logUp_abog 
/* vamos a utulizar passport para efectuar las autenticaciones por lo que 
//vamos a crear los usuarios con pasport y vamos a utilizar pasport para poder 
validarlos*/

exports.logup = async function (req, res, next) {
    passport.authenticate('local.singup', async function(err, id_user) {        
        if(err) return res.send(err);
        if(!id_user) return res.status(400).send({message: "no se creo el usuario" })
        if(id_user){
            const token=await jwt.sign({id: id_user}, 'process.env.TOKEN_FORGOT');
            res.status(200).json({token});
        }        
    })(req, res, next);
  };

//logIn_abog 

exports.login= async function(req, res, next){
    passport.authenticate('local.singin', async function(err, user_user){
        console.log(user_user);
        if(err) return res.send(err);
        if(!user_user){
            return res.status(400).send({message: "el usuario no es" })
        }else{
            const token=await jwt.sign({user: user_user}, 'process.env.TOKEN_FORGOT');
            res.status(200).json({token});            
        }
        
    })(req, res, next);
};


// cambiar contraseña abog

exports.chancePass= async function (req, res){
    let user=req.id;
    let newPassword=req.body.password 
    password = await encrypt.encryptPassword(newPassword);
    console.log(password, user);
    User_abog.editar( user, password, async(err, result)=>{
        if(err) return res.send(err);
        if(result.affectedRows==0){
            return res.status(400).send({message: "no se cambio la contraseña vuelva a intentarlo desde recordar" });
        }else{
            if(result) return res.status(200).send({ mensaje: "ya se cambio su contraseña" });
        } 
        
     });
};


//autenticacion usuarios 

exports.logupser= async function(req, res, next){
    passport.authenticate('local.singupUser', async function(err, id_user){
        if(err) return res.send({err:err});
        if(!id_user) return res.status(400).send({message: "no se creo el usuario" })
        if(id_user){
            const token=await jwt.sign({user: id_user}, 'process.env.TOKEN_FORGOT');
            res.status(200).json({token});                    
        }
        return res.status(200).send({ id: id_user });
    })(req, res, next);
};


exports.loginUser= async function(req, res, next){
    passport.authenticate('local.singinUser', async function(err, user){
        if(err) return res.send(err);
        if(!user) return res.status(400).send({message: "el usuario no existe" })
        if(user){
            const token=await jwt.sign({user: user}, 'process.env.TOKEN_FORGOT');
            res.status(200).json({token});                    
        }
    })(req, res, next);
};


// cambiar contraseña user

exports.chancePassUser= async function (req, res){
    let user=req.id;
    let newPassword=req.body.password 
    password = await encrypt.encryptPassword(newPassword);
    console.log(password,user);
    User_user.editar( user, password, async(err, result)=>{
        if(err) return res.send(err);
        if(result.affectedRows==0){
            return res.status(400).send({message: "no se cambio la contraseña vuelva a intentarlo desde recordar" });
        }else{
            if(result) return res.status(200).send({ mensaje: "ya se cambio su contraseña" });
        }       
        

     });
};