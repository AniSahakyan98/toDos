const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userDetails = new Schema({
    phone:{
        type: Number,
        required: false
    },
    email:{
        type: String,
        required: false
    }
})

const UserDetails = mongoose.connect('UserDetail',userDetails)
module.exports = UserDetails
