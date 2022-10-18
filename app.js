const express = require('express');
const app = express();
const cors = require('cors')

const utilisateurRoutes = require('./routes/utilisateur');
const sauceRoutes = require('./routes/sauce');

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
app.use('/api/sauces', sauceRoutes);




module.exports = app;