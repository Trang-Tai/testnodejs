const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    username: { type: String },
    role: { type: String, default: 'user' },
    password: { type: String },
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', User);









