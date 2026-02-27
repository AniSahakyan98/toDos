const mongoose = require('mongoose')
const Schema = mongoose.Schema


const user = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: Boolean,
        required: true
    },
    phone: {
        type: Number,
        required: false
    },
    email: {
        type: String,
        required: false
    }
})

const User = mongoose.model('User',user)
module.exports = User