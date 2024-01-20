const multer = require('multer');

// where to store file which is uploaded and name of the file
const storageConfig = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images/')
    },
    filename:(req,file,cb)=>{
        const name = Date.now()+"_"+file.originalname;
        cb(null,name)
    }
})

const uploadFile = multer({
    storage:storageConfig
})
module.exports =uploadFile;