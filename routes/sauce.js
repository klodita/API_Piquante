const express = require('express');
const sauceCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router = express.Router();



  //Pour obtenir le tableau de toute les sauces
  router.get('/',auth, sauceCtrl.getAllSauce);
  
  // Pour obtenir la page d'une sauce selon son id
  router.get('/:id',auth, sauceCtrl.getOneSauce);

  //Pour poster une nouvelle sauce dans la base de donné
  router.post('/', auth, multer, sauceCtrl.createSauce);
  
  //Pour modifier une sauce selon son id
  router.put('/:id', auth, multer, sauceCtrl.modifySauce);
  
  //Pour supprimer une sauce
  router.delete('/:id', auth, multer,sauceCtrl.deleteSauce);
  
  
  //Système de vote 
  
  //Pour poster un vote Like/Dislike
  router.post('/:id/like', auth, sauceCtrl.createLike);
  
  //Pour poster un vote Like
  // router.post('/', auth, sauceCtrl.createDislike);
  
  module.exports = router;