import multer from 'multer'
//Middleware to handle files upload

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (process.env.NODE_ENV === 'test') {
            cb(null, 'testUploads/')
        }
        else {
            cb(null, 'uploads/');
        }
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:|\./g, '') + '-' + file.originalname);  // save img name with today date.
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    }
    else {
        cb(new Error('File not permitted'), false);
    }
}

export var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2 //2mb
    },
    fileFilter: fileFilter
});