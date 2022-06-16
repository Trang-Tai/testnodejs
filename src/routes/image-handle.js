const express = require('express');
const router = express.Router();

const imageController = require('../app/controllers/ImageController');
const upload = require('../config/multer/multer-disk-config');

router.get('/upload-image', imageController.uploadImage);
router.post('/create', upload.single('image'), imageController.create);
router.post('/create-multiple', upload.array('multipleImages', 3), imageController.createMultiple); // upload tối đa 3 file
router.post('/create-cloud-single', upload.single('cloudImage'), imageController.createCloudSingle);
router.post('/create-cloud-multiple', upload.array('multipleCloudImages', 4), imageController.createCloudMultiple); // upload tối đa 4 file

module.exports = router;