
const express = require('express');
// const auth = require('auth');
const router = express.Router();

const sauceCtrl = require('../controllers/sauces'); 



  //Pour poster une nouvelle sauce dans la base de donné
  router.post('/', sauceCtrl.createSauce);
  
  //Pour obtenir le tableau de toute les sauces
  router.get('/', sauceCtrl.getAllSauce);
  
  // Pour obtenir la page d'une sauce selon son id
  router.get('/:id', sauceCtrl.getOneSauce);
  
  //Pour modifier une sauce selon son id
  router.put('/:id', sauceCtrl.modifySauce);
  
  //Pour supprimer une sauce
  router.delete('/:id', sauceCtrl.deleteSauce);
  
  module.exports = router;