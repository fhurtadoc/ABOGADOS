const nodemail=require('nodemailer');

let transporter=nodemail.createTransport({
    service:'gmail',
    auth:{
        user: 'derechoamedida@gmail.com',
        pass: 'Mathi142014',
    }
});

async function sendEmail  (email, token, ruta, done ){
    
    var mailOptions={
        from:email,
        to: 'fabiohurtadoc@gmail.com',
        subject: "test",

        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">    
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">    
            
            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>   
            
        </head>
        <body>
        
        <h1> CORDIAL SALUDO DE PARTE DE TU DERECHO YA </h1>
        <h2>ingrese por favor su nueva contraseña</h2>
        <form action="${ruta}${token}" method="POST" class="form-inline">
            <div class="form-group">
        
            <label for="password"> confirme contrseña</label>
            <input type="password" name="password">
            <small id="passwordHelpInline" class="text-muted" class="form-control mx-sm-3" aria-describedby="passwordHelpInline" >
                 8-20 characters de largo.
            </small>
            <input type="submit" value="enviar" >          
            </div>
        </form>

        </body>
        </html>
       `
    }

    await transporter.sendMail ( mailOptions, (err, info)=>{
        if(err)return err;                
        if(!err)return done();            
    });   
    return done();
}


module.exports=sendEmail;