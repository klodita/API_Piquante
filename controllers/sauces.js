const Sauce = require('../models/Sauce');
const fs = require('fs');



exports.getAllSauce = (req, res, next)=>{
    Sauce.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({error}))
   
  };

  exports.getOneSauce = (req, res,next)=>{
    Sauce.findOne({_id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error=> res.status(404).json({error}));
  };

exports.createSauce = (req,res,next)=>{
   const sauceObjet = JSON.parse(req.body.sauce);

   const {userId,name,manufacturer,description,mainPepper,heat} = sauceObjet;
   const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  
   const sauce = new Sauce({
    userId,
    name,
    manufacturer,
    description,
    mainPepper,
    imageUrl,
    heat,
    likes:0,
    dislikes:0,
    usersLiked:[],
    usersDisliked:[],

   });
   
   sauce.save()
   .then(()=>{res.status(201).json({message:'Sauce créé !'})})
   .catch(error => {res.status(400).json({error})})


  };

  
  exports.modifySauce = (req,res,next)=>{
   const sauceObjet = req.file ? {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
   }:{...req.body};
   delete sauceObjet._userId;
   Sauce.findOne({_id: req.params.id})
   .then((sauce)=>{
    if(sauce.userId != req.auth.userId){
        res.status(401).json({message:'Non-autorisé'});
    }
    else{
        Sauce.updateOne({_id:req.params.id},
        {... sauceObjet, _id: req.params.id})
        .then(()=> res.status(200).json({message:'Sauce modifié'}))
        .catch(error => res.status(400).json({error}));
    }
  
   })
   .catch((error)=> {
    res.status(400).json({error})
   });
  
  };

exports.deleteSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: 'Non-autorisé !' });
      } else {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`./images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => { res.status(200).json({ message: 'Objet supprimé !' }) })
            .catch(error => res.status(403).json({ error }));
        });
       
      }
      
    }) 
    .catch(error => res.status(403).json({ error }))
   
};


//Système de Vote pour les utilisateurs connectés qui lisent l'avis des autres utilisateurs.