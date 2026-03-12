const express = require('express')
const controller = require('../controller/postController')
const Router = express.Router()

Router.post('/create',controller.createPost)

module.exports = Router