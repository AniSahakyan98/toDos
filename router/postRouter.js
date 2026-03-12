const express = require('express')
const controller = require('../controller/postController')
const Router = express.Router()


Router.post('/create',controller.createPost)
Router.get('/all',controller.getPost)


module.exports = Router