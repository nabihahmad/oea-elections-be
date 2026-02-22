const mongoose = require('mongoose');
const { mongoURI } = require("../config/env");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1); // Stop the app if connection fails
  }
};

module.exports = connectDB;