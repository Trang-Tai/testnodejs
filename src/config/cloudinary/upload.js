const cloudinary = require('./index');

const uploadCloudinaryOptions = {
    uploadSingleFile(file) {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(file, { folder: 'imgs', })
                .then((result) => {
                    resolve({
                        url: result.secure_url,
                        id: result.public_id,
                    })
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },

    // Hàm upload multiple đúng chuẩn
    uploadMultipleFile(arrFiles) {
        const resultUploadFiles = arrFiles.map((file) => new Promise((resolve, reject) => {
            this.uploadSingleFile(file)
                .then((fileData) => {
                    resolve(fileData);
                })
        }))
        return Promise.all(resultUploadFiles);
    },
}

module.exports = uploadCloudinaryOptions;





