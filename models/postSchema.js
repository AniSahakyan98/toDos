const mongoose = require('mongoose')
const Schema = mongoose.Schema

const post = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: false
    }
},{timestamps: true})

const Post = mongoose.model("POST",post)
module.exports = Post
