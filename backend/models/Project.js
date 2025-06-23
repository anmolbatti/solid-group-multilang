const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    status: {
        type: String,
    },
    space:{
        type: String,
    },
    beds: {
        type: String,
    },
    baths: {
        type: String,
    },
    featuredImage: {
        type: String,
        required: true
    },
    galleryImages: {
        type: [String],
    },
    slug: {
        type: String,
        required: true
    },
    galleryTitle1: {
        type: String,
    },
    galleryDesc1: {
        type: String,
    },
    galleryBannerImage: {
        type: String,
    },
    galleryTitle2: {
        type: String,
    },
    galleryDesc2: {
        type: String,
    },
    amenities: {
        type: Array,
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    isHomePageFeatured: {
        type: Boolean,
        default: false
    },
    isDetailPageFeatured: {
        type: Boolean,
        default: false
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

module.exports = mongoose.model('projects', ProjectSchema);
