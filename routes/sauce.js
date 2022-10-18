
const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sauceCtrl = require('../controllers/sauces'); 




  //Pour poster une nouvelle sauce dans la base de donné
  router.post('/', multer, sauceCtrl.createSauce);
  
  //Pour obtenir le tableau de toute les sauces
  router.get('/', sauceCtrl.getAllSauce);
  
  // Pour obtenir la page d'une sauce selon son id
  router.get('/:id', sauceCtrl.getOneSauce);
  
  //Pour modifier une sauce selon son id
  router.put('/:id', multer, sauceCtrl.modifySauce);
  
  //Pour supprimer une sauce
  router.delete('/:id', multer, sauceCtrl.deleteSauce);
  
  module.exports = router;