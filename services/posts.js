const Post = require('../models/postSchema')

const createPost = (async(data) => {
    return Post.create(data)
})

const getPost = (async() => {
    const posts = await Post.find()
    return posts
})

module.exports = {
    createPost,
    getPost
}


////Exercise 9
//Create a new entity Posts and connect it to users.
//Example idea:
//One user can have multiple posts.