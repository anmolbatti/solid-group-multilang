const mongoose = require('mongoose');

const languagesSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
}, {timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }});

module.exports = mongoose.model('languages', languagesSchema);
