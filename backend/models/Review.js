const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    featuredImage: {
        type: String,
        required: true
    },
    language: {
        type: String
    },
    translations: {
        type: Array,
        default: []
    },
    parentId: {
        type: mongoose.Schema.ObjectId,
        ref: "projects",
        default: null
    },
}, {timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }});

module.exports = mongoose.model('review', ReviewSchema);
