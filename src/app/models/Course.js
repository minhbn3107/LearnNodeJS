const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const Course = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        videoId: { type: String, required: true },
        level: { type: String },
        img: { type: String },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

module.exports = mongoose.model('Course', Course);
