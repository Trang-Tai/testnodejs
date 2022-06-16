const path = require('path');
const uploadCloud = require('../../config/cloudinary/upload');

const imageController = {
    // [GET] image/upload-image
    uploadImage(req, res, next) {
        res.render('image-handle/upload-image');
    },

    // [POST] image/create
    create(req, res, next) {
        res.render('image-handle/result-image', { image: req.file.filename });
    },

    // [POST] image/create-multiple
    createMultiple(req, res, next) {
        res.render('image-handle/result-image', { images: req.files });
    },

    // [POST] image/create-cloud-single
    createCloudSingle(req, res, next) {
        uploadCloud.uploadSingleFile(req.file.path)
            .then(result => {
                res.render('image-handle/result-image', { url: result.url });
            })
    },

    // [POST] image/create-cloud-multiple
    createCloudMultiple(req, res, next) {
        const arrFiles = req.files.map(file => file.path);
        
        uploadCloud.uploadMultipleFile(arrFiles)
            .then(result => {
                res.render('image-handle/result-image', { url: result });
            })  
    },
}

module.exports = imageController;









