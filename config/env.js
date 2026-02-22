require("dotenv").config();

module.exports = {
    port: process.env.PORT || 3000,
    mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/elections",
    jwtSecret: process.env.JWT_SECRET,
};