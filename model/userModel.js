const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    is_online: {
        type: Boolean,
        required: true,
        default: '0'
    },

}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);


