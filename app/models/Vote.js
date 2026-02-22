const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    engineer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Engineer', 
        required: true,
        unique: true
    },
    voted_at: { type: Date, default: Date.now },
    recordedBy: String,
});

module.exports = mongoose.model('Vote', voteSchema);