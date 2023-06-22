const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

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

// Add plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete, { deletedAt: true, overrideMethods: true });

module.exports = mongoose.model('Course', Course);
