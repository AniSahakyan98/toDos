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


user.index({name: 1},{unique:true})

//user.index({name: 1, age: -1})// useful if I search by name and then sort -// Compound index for filtering + sorting

//user.index({name: "text"})// Text index for full-text search


const User = mongoose.model('User',user)
module.exports = User