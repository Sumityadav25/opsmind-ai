const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// Create a model named 'User' that maps to the 'users' collection
const User = mongoose.model('User', userSchema);

module.exports = User;
