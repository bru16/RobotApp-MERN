import multer from 'multer'
//Middleware to handle files upload

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:|\./g, '') + '-' + file.originalname);
    }
});

export var upload = multer({
    storage: storage, limits: {
        fileSize: 1024 * 1024 * 5 //5mb
    }
});