//Création d'un modèle Utilisateur pour la base de donnée MongoDB

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = mongoose.Schema({
    email: {type:String, required: true, unique: true},
    password: {type:String, required: true},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Utilisateur', userSchema);


