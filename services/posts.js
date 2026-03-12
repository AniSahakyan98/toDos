const Post = require('../models/postSchema')

const createPost = (async(data) => {
    return Post.create(data)
})

module.exports = {
    createPost
}