const mongoose = require('mongoose')
const Schema = mongoose.Schema


const user = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    details: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "UserDetails"
    }
},{ timestamps: true })

const User = mongoose.model('User',user)
module.exports = User