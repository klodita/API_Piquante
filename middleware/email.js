/*Fichier qui permet de vérifier les données saisi dans l'input email lors de l'inscription de l'utilisateur afin d'avoir une adresse email correcte'*/

const validator = require('validator');

module.exports = (req,res,next)=>{
    const {email} = req.body;
  if(validator.isEmail(email)){
    next()
  }
  else{
    return res.status(403)
    .json({error:"Veuillez entrer une adresse email correcte, merci"})
  }
}