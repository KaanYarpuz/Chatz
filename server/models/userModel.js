const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, min: 3, max: 20},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAvatarImageSet: { type: Boolean, default: false },
    profilePicture: { type: String, default: '' },
    coverPicture: { type: String, default: '' }, 
});

module.exports = mongoose.model('Users', userSchema);