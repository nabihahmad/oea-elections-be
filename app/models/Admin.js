const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    full_name: String,
    roles: { type: [String], enum: ['registrator', 'voting_agent', 'reporter', 'admin'] },
    password: String,
    ballot_box: Number,
});

module.exports = mongoose.model('Admin', adminSchema);