const controller = require('../controller/testController')
const express = require('express')
const Router = express.Router()

Router.get('/chunkFiles',controller.test1)
Router.get('/files',controller.test)
Router.get('/messaging',controller.test2)
Router.get('/execFile',controller.test3)





module.exports = Router



