const express = require('express')
const Router = express.Router()
const controller = require('../controller/userController')


Router.post('/createUser', controller.createUser)
Router.delete('/:id', controller.deleteUser)
Router.put('/updateUser/:id', controller.updateUser)

module.exports = Router