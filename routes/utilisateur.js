const express = require('express');
const router = express.Router();
const utilisateurCtrl = require('../controllers/utilisateurs');




// requête POST pour obtenir les données du formulaire d'inscription

router.post('/signup', utilisateurCtrl.signup);
router.post('/login', utilisateurCtrl.login);

  module.exports = router;

// router.post('/',(req, res, next)=>{
//     delete req.body._id;
//    const utilisateur = new Utilisateur({
//     ...req.body
//    });
//    user.save()
//    .then(()=> res.status(201).json({message:"objet Utilisateur enregistré"}))
//    .catch(error=> res.status(400).json({error}));
//     });

// router.use((req, res, next)=>{
//     Utilisateur.find()
//     .then(users => res.status(200).json(users))
//     .catch(error => res.status(400).json({error}));
//     });

  