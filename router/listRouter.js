const express = require('express')
const Router = express.Router()
const controller = require('../controller/listController')


Router.post('/create',controller.createList)
Router.get('/get',controller.getList)
Router.delete('/delete/:id',controller.deleteList)
Router.put('/update/:id',controller.updateList)



module.exports = Router