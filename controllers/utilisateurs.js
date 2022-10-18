
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/Utilisateur');

exports.signup = (req, res, next)=>{
bcrypt.hash(req.body.password, 10)
.then(hash=>{
    const utilisateur = new Utilisateur({
        email: req.body.email,
        password: hash
    });
    utilisateur.save()
    .then(()=> res.status(201).json({message:'Utilisateur créé !'}))
    .catch(error=>res.status(400).json({error}));
})
.catch(error=>res.status(500).json({error}));
};

exports.login = (req, res, next)=>{
    Utilisateur.findOne({email: req.body.email})
    .then(utilisateur =>{
        if(utilisateur === null){
            res.status(401).json({message:'Paire identifiant/mot de pass incorrecte'});
        }
        else{
            bcrypt.compare(req.body.password, utilisateur.password)
            .then(valid =>{
                if(!valid){
                    res.status(401).json({message:'Paire identifiant/mot de pass incorrecte'})
                }
                else{
                    res.status(200).json({
                        userId: utilisateur._id,
                        token: jwt.sign(
                            {
                                userId: utilisateur._id
                            },
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn: '24h'}
                        )
                    });
                }

            })
            .catch(error=>res.status(500).json({error}));
        }
    })
    .catch(error=>res.status(500).json({error}));
    
};