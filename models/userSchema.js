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
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    details: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "UserDetails"
    }
},{ timestamps: true })


user.index({name: 1, age: -1})
user.index({name: "text", gender: "text", age: 1})

const User = mongoose.model('User',user)
module.exports = User