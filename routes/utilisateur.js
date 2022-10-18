const express = require('express');
const router = express.Router();
const utilisateurCtrl = require('../controllers/utilisateurs');





// requête POST pour obtenir les données du formulaire d'inscription

router.post('/signup', utilisateurCtrl.signup);
router.post('/login', utilisateurCtrl.login);

  module.exports = router;


  