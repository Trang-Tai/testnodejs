const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'src/public/imgs');
    },
    filename: function(req, file, cb) {
        const suffixFileName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, suffixFileName + '-' + file.originalname);
    }
})

module.exports = multer({ storage: storage });