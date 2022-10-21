const express = require('express');
const app = express();
const mongoose = require('mongoose');
const auth = require('./middleware/auth');
const utilisateurRoutes = require('./routes/utilisateur');
const sauceRoutes = require('./routes/sauce');

const cors = require('cors');
const path = require('path');


//Protection des données mongoDB
const user = process.env.DB_USER;
const passWord = process.env.DB_PASSWORD;

// Connexion avec la base de donnée MongoDB

mongoose.connect(`mongodb+srv://${user}:${passWord}@cluster0.pjzvn5o.mongodb.net/?retryWrites=true&w=majority`,{
   useNewUrlParser: true,
   useUnifiedTopology: true 
})
.then(()=> console.log('Connexion à MongoDB réussie !'))
.catch(()=> console.log('Connexion à MongoDB échouée !'));


app.use(cors());
app.use(express.json());

app.use('/api/auth', utilisateurRoutes);
app.use('/api/sauces', sauceRoutes);
app.use('/images', express.static(path.join(__dirname,'images')));

module.exports = app;