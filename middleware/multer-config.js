const multer = require('multer');

const MIME_TYPES = {
    'image/jpg':'jpg',
    'image/jpeg' : 'jpg',
    'image/png' : 'png',
};

const storage = multer.diskStorage({
    destination: (req, file, callback)=>{
        callback(null, 'images')
    },
    filename:(req, file, callback)=>{
        
        const extension = MIME_TYPES[file.mimetype];
        const name = file.originalname.split(`.${extension}`).join('');

        if(extension == undefined){
            const name = file.originalname;
            callback(null,name);  
        }
        else{
            callback(null,name+'_'+Date.now()+'.'+ extension);
        }
    }
});

module.exports = multer({storage:storage}).single('image');