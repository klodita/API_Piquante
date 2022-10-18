const jwt = require('jsonwebtoken');
module.exports = (req, res, next)=>{
    try{
        const token = req.headers.authorizatin.split('')[1];
        const decodeTken = jwt.verify(token,'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };

    }
    catch(error){
        res.status(401).json({error});
    }

};