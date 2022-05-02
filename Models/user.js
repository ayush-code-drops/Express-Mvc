
const mongoose = require('mongoose');

const user = new mongoose.Schema({
    "firstName": { type: String, required: true },
    "lastName": { type: String },
    "age": { type: Number, required: true },
    "phoneNo": { type: Number, required: true }
})

module.exports = mongoose.model('user',user);