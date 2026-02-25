const mongoose = require('mongoose');

const engineerSchema = new mongoose.Schema({
    oea_number: { type: Number, unique: true },
    full_name: String,
    registered_at: Date,
    settlement_year: Number,
    birthday: Date,
    university: String,
    degree: String,
    graduation_year: Number,
    branch: String,
    mobile: String,
    mobile_updated_at: { type: Date },
    mobile_updated_by: String,
    checked_in_at: { type: Date },
    checked_in_by: String,
});

module.exports = mongoose.model('Engineer', engineerSchema);