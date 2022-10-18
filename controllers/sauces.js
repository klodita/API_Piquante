const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.createSauce = (req,res)=>{
   const sauceObjet = JSON.parse(req.body.sauce);
   delete sauceObjet._id;
   delete sauceObjet._userId;
   const sauce = new Sauce({
    ...sauceObjet,
    userId: req.body.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
   });
   
   sauce.save()
   .then(()=>{res.status(201).json({message:'Sauce créé !'})})
   .catch(error => {res.status(400).json({error})})
console.log('sauce', sauce)

  };


  exports.getAllSauce = (req, res)=>{
    Sauce.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({error}))
  
  };


  exports.getOneSauce = (req, res)=>{
    Sauce.findOne({_id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error=> res.status(404).json({error}));
  
  };

  exports.modifySauce = (req,res)=>{
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


  exports.deleteSauce = (req,res)=>{
    Sauce.findOne({_id: req.params.id})
    .then(sauce =>{
        if (sauce.userId != req.auth.userId){
            res.status(401).json({message:'Non-autorisé'})
        }
        else{
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`,()=>{
                Sauce.deleteOne({_id: req.params.id})
                .then(()=>{
                    res.status(200).json({message:'Sauce supprimé !'})
                })
                .catch(error=>{res.status(500).json({error})})
            });
        }
    })
   
  
  };
  