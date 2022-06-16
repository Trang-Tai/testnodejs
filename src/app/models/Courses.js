const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Course = new Schema({
    _id: { type: Number },
    name: { type: String, maxlength: 255 },
    description: { type: String, maxlength: 600 },
    image: { type: String, maxlength: 255 },
    videoId: {type: String},
    level: {type: String},
    slug: { type: String, slug: "name", unique: true },
    // deletedAt: {type: Date}
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now }
}, {
    _id: false,
    timestamps: true,
});

// Add plugin
mongoose.plugin(slug);
// Course.plugin(mongooseDelete);
Course.plugin(mongooseDelete, { 
    deletedAt : true, // save time of deletion
    overrideMethods: 'all', // override find method to show only rows that have delete = false (overrideMethods: ['find'])
}); 
// if you want to override all method, you can assign overrideMethods: 'all'
Course.plugin(AutoIncrement); // add plugin to auto_increment id

module.exports = mongoose.model('Courses', Course);




