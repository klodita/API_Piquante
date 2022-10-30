const express = require('express');
const router = express.Router();
const email = require('../middleware/email');
const password = require('../middleware/password');
const utilisateurCtrl = require('../controllers/utilisateurs');





// requête POST pour obtenir les données du formulaire d'inscription

router.post('/signup',email, password, utilisateurCtrl.signup);
router.post('/login', utilisateurCtrl.login);

  module.exports = router;


  