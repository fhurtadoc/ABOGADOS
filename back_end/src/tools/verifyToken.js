const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
  const token = req.headers['x-access-token']; 
  if(!token){
     return res.status(401).send('no tiene autorizacion');
  } 
  await jwt.verify(token, "process.env.TOKEN_FORGOT", function (err, decode) {
      if (err) {
        console.log("no se envio token");
      }
      if (!decode) {
        console.log("token esta desactualizado");
      } else {
        if (decode) {
        req.id= decode.id;                
        next();
        }
      }
    });
  }

module.exports = verifyToken;
