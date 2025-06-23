const mongoose = require('mongoose');

const translationsSchema = new mongoose.Schema({
    translations: {
        type: Array,
        default: []
    },
    page: {
        type: String,
        unique: true
    },
}, {timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }});

module.exports = mongoose.model('translations', translationsSchema);
