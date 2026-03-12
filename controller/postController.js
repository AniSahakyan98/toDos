const services = require('../services/posts')

const createPost = (async(req,res) => {
    const postData = {...req.body}
    try {
        const post = await services.createPost(postData)
        return res.status(201).json(post)
    } catch(error) {return res.status(500).json({error: error.message})}
})

const getPost = (async(req,res) => {
     try {
        const posts = await services.getPost()
        return res.status(201).json(posts)
    } catch(error) {return res.status(500).json({error: error.message})}
})

module.exports = {
    createPost,
    getPost
}