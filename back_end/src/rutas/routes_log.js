const logup=require('../controlador/logup_in');
const forgot=require('../controlador/forgot'); 
const veryfyToken=require('../tools/verifyToken');
const express=require("express");
const router=express.Router()


// abogados 
router.post('/logup', logup.logup);

router.post('/login', logup.login)

//usuarios 

router.post('/logup_user', logup.logupser);

router.post('/login_user', logup.loginUser);

//RECUPERAR CONTRASEÑA ABOGADOS

router.post('/fogot_abog', forgot.Abog);

router.post('/change_passAbog/:token', veryfyToken, logup.chancePass);

//RECUPERAR CONTRASEÑA USUARIOS12

router.post('/fogot_user', forgot.user);

router.post('/change_passUser/:token', veryfyToken, logup.chancePassUser);



module.exports=router;
