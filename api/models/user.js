const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    vaultToken: String,
    type: String,
    site_admin: Boolean,
})

module.exports.User = mongoose.model('users', userSchema)
