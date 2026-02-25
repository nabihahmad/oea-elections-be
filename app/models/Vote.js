const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    engineer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Engineer', 
        required: true,
        unique: true
    },
    voted_at: { type: Date },
    recorded_by: String,
});

module.exports = mongoose.model('Vote', voteSchema);