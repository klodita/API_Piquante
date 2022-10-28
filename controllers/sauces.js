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
  let imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;


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

   Sauce.findOne({_id: req.params.id})
   .then((sauce)=>{
   
   
    if(sauce.userId != req.auth.userId){
        res.status(401).json({message:'Non-autorisé'});
    }


  

   else { 
 
     /*Pour empêcher à l'utilisateur de changer les informations clés propre à un autre utilisateur 
     et qu'il ne s'amuse pas avec les likes/dislikes et usersLiked/usersDisliked en faissant des
     requête Put via Postman ou autre*/  
     if(sauce.userId == req.body.userId && sauce._id == req.body._id && sauce.likes == req.body.likes && sauce.dislikes == req.body.dislikes 
     && String(sauce.usersLiked) == String(req.body.usersLiked) && String(sauce.usersDisliked) == String(req.body.usersDisliked)
     || sauce.imageUrl == req.body.imagerUrl || sauce.imageUrl !== req.body.imageUrl){
     
      Sauce.updateOne({_id:req.params.id},
        {... sauceObjet, _id: req.params.id})
        .then(()=> { 
          res.status(200).json({message:'Sauce modifié'})})
        .catch(error => res.status(400).json({error}));
    
    }
    else {res.status(401).json({message:'Non-autorisé !!! '});}
        
    const newImg = sauceObjet.imageUrl;
    const filename = sauce.imageUrl.split('/images/')[1];
  
    const {unlink} = require("fs/promises");    
     if(newImg !== undefined){
     
      //fonctionnalité fs.unlink qui permet de supprimer dans le dossier images l'ancienne images (filename)
        unlink("images/"+filename)
        .then((res)=> console.log("image supprimé", res))
        .catch((error)=> console.error("Impossible de supprimer l'image",error))
      
      }
    
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


//Système de Vote pour les utilisateurs connectés qui lisent l'avis des autres utilisateurs
exports.createLike = (req, res, next) => {
Sauce.findOne({_id: req.params.id})
.then((sauce)=> {
let voteUtilisateur;
let userIdVote = req.body.userId;
let like = sauce.usersLiked;
let dislike = sauce.usersDisliked;
let liked = like.includes( userIdVote);
let disliked = dislike.includes( userIdVote);

if(liked === true){
  voteUtilisateur = 1;
}
else if(disliked === true) {
  voteUtilisateur = -1;
}
else {
  voteUtilisateur = 0;
};

if(voteUtilisateur === 0 && req.body.like === 1){
  sauce.likes += 1;
  sauce.usersLiked.push(userIdVote);
}
else if(voteUtilisateur === 1 && req.body.like === 0){
  sauce.likes -= 1;
  const newUserLiked = like.filter((users)=> users !=  userIdVote);
  sauce.usersLiked = newUserLiked;
}
else if(voteUtilisateur === -1 && req.body.like === 0){
  sauce.dislikes -= 1;
  const newUserDisliked = dislike.filter((users)=> users !=  userIdVote);
  sauce.usersDisliked = newUserDisliked;
}
else if(voteUtilisateur === 0 && req.body.like === -1){
  sauce.dislikes += 1;
  sauce.usersDisliked.push(userIdVote);
}
else {
  console.log("le vote n'est pas autorisé")
};

Sauce.updateOne(
{ _id: req.params.id},
{
  likes : sauce.likes,
  dislikes: sauce.dislikes,
  usersLiked: sauce.usersLiked,
  usersDisliked: sauce.usersDisliked,
}
)

.then(() => {res.status(201).json({ message: "Vous avez voté" })
return console.log("Vote comptabilisé !")})
.catch((error) => res.status(403).json({ error }));
})
.catch((error) => res.status(403).json({ error }));

}

