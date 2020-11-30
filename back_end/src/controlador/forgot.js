const User_abog = require("../modelo/user_abog");
const jwt= require('jsonwebtoken');
const sendEmail=require('../tools/correo');
const User_user = require("../modelo/user_user");


exports.Abog= async (req, res)=>{
    let emailreq= req.body.email;
    await User_abog.buscarUser(emailreq, async (err, result)=>{
        //resultado es el usario completo 
        if(result.length>0){
          let user_abog=result[0]; 
          let email=(user_abog.email);
          if(!email) console.log('email no existe')
          if(emailreq===email){              
          // Create a Token          
          const token= await jwt.sign({id:user_abog.email}, "process.env.TOKEN_FORGOT", {                
          expiresIn: 60 * 60 * 24 // expires in 24 hours          
          });              
          // enviamos el correo
          let ruta='/change_passAbog/';
          await sendEmail(email, token, ruta, (err, info)=>{
            if(err) res.send(err);
            if(!err) res.send({mensaje: "por favor revise su correo",
                              token: token });
          });
        }        
    }        
    });

};


exports.user= async (req, res)=>{
  let emailreq= req.body.email;
  await User_user.buscarUser(emailreq, async (err, result)=>{
      //resultado es el usario completo 
      if(result.length>0){
        let user_user=result[0]; 
        let email=(user_user.email);        
        if(emailreq===email){              
        // Create a Token          
        const token= await jwt.sign({id:user_user.email}, "process.env.TOKEN_FORGOT", {                
        expiresIn: 60 * 60 * 24 // expires in 24 hours          
        });              
        // enviamos el correo
        const ruta='change_passUser/'
        await sendEmail(email, token, ruta, (err, info)=>{          
          if(err) res.send(err);          
          if(!err) res.send({mensaje: "por favor revise su correo",
                            token: token });
        });
      }        
  } res.send({mensaje: 'email no existe'})      
  });

};

