const express = require('express')
const Router = express.Router()
const controller = require('../controller/userController')


Router.post('/createUser', controller.createUser)
Router.delete('/:id', controller.deleteUser)
Router.put('/updateUser/:id', controller.updateUser)
Router.get('/averageAge',controller.avgAge)
Router.get('/weeklyUsers',controller.getWeeklyUsers)
Router.get('/count',controller.getUsersCount)
Router.get('/sorting',controller.sortedList)
Router.get('/gender',controller.getUsersByGender)
Router.get('/youngestAndOldest',controller.getYoungestAndOldest)
Router.get('/list/:id',controller.getUserList)
Router.get('/:id',controller.getUserById)
Router.get('/ageRange/:id',controller.filterbyAge)
Router.get('/name/:id', controller.searchByName)


module.exports = Router