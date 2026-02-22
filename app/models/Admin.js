const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    full_name: String,
    roles: { type: [String], enum: ['registrator', 'voting_agent', 'reporter', 'admin'], default: ['registrator'] },
    password: String,
});

module.exports = mongoose.model('Admin', adminSchema);