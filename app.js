const express = require('express');
const app = express();
const cors = require('cors')

const utilisateurRoutes = require('./routes/utilisateur');
const Sauce = require('./models/Sauce');

// Connexion avec la base de donnée MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://adminKamala:yW95nPfzlWf0pYpg@cluster0.pjzvn5o.mongodb.net/?retryWrites=true&w=majority',{
   useNewUrlParser: true,
   useUnifiedTopology: true 
})
.then(()=> console.log('Connexion à MongoDB réussie !'))
.catch(()=> console.log('Connexion à MongoDB échouée !'));


app.use(cors());

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
//   });

app.use(express.json());
app.use('/api/auth', utilisateurRoutes);

//Pour poster une nouvelle sauce dans la base de donné
app.post('/api/sauces', (req,res,next)=>{
  delete req.body._id;
  const sauce = new Sauce({
    ...req.body
  });
  sauce.save()
  .then(()=> res.status(201).json({message:'Sauce enregistré'}))
  .catch(error => res.status(400).json({error}));
  
})

//Pour obtenir le tableau de toute les sauces
app.get('/api/sauces', (req, res, next)=>{
  Sauce.find()
  .then(sauce => res.status(200).json(sauce))
  .catch(error => res.status(400).json({error}))
})


// Pour obtenir la page d'une sauce selon son id
app.get('/api/sauces/:id', (req, res, next)=>{
  Sauce.findOne({_id: req.params.id})
  .then(sauce => res.status(200).json(sauce))
  .catch(error=> res.status(404).json({error}));
})

//Pour modifier une sauce selon son id
app.put('/api/sauces/:id', (req,res,next)=>{
  Sauce.updateOne({_id: req.params.id},
    {
      ...req.body, _id:req.params.id
    })
    .then(()=> res.status(200).json({message:'Sauce modifié !'}))
    .catch(error => res.status(400).json({error}))
});

//Pour supprimer une sauce
app.delete('/api/sauces/:id', (req,res, next)=>{
  Sauce.deleteOne({_id: req.params})
  .then(()=> res.status(200).json({message:'Sauce supprimé'}))
  .catch(error=> res.status(400).json(error));
})




module.exports = app;