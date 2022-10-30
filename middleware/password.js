/*Fichier qui permet de vérifier les données saisi dans l'input password lors de l'inscription de l'utilisateur afin d'interdir certaines données*/

const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema     
.has(/[a-zA-Z0-9]+$/)   
.has().not('/','$','[',']','{','}','+','*','=','&','(',')','^','@','°','~','|','!',':','#',';','<','>','%','?','.','_','-')                 
.has().not().oneOf(['Passw0rd', 'Password123'])
.is().min(4);

module.exports = (req,res,next) => {
    if(passwordSchema.validate(req.body.password)){
   console.log(req.body.password,"le password")
   next()
    }
    else{
        return res.status(400)
        .json({error:`Le mot de passe droit contenir min 4 caratères avec soit des Minuscules et ou des Majuscule et ou des Chiffres)`})
    }
}
