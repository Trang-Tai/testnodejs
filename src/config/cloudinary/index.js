const cloudinary = require('cloudinary').v2;
require('dotenv').config();
// console.log(process.env.API_KEY);

cloudinary.config({ 
    // cloud_name: 'dly4liyhf', 
    // api_key: '313461533944396', 
    // api_secret: 'FPxYQaRAG3_Q9CdbvwH0yQibRuU',
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

module.exports = cloudinary;