const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userDetails = new Schema({
    phone:{
        type: String,
        required: false
    },
    email:{
        type: String,
        required: false
    }
},{ timestamps: true })

const UserDetails = mongoose.model('UserDetail',userDetails)
module.exports = UserDetails
