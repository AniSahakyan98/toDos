const express = require('express')
const Router = express.Router()
const controller = require('../controller/userController')


Router.post('/createUser', controller.createUser)
Router.get('/missingPosts', controller.usersNoPost)
Router.get('/oldestUsers',controller.oldestUsers)
Router.get('/duplicatedNames',controller.duplications)
Router.delete('/:id', controller.deleteUser)
Router.put('/updateUser/:id', controller.updateUser)
Router.patch('/deactivateUser/:id',controller.userStatus)
Router.get('/averageAge',controller.avgAge)
Router.get('/weeklyUsers',controller.getWeeklyUsers)
Router.get('/count',controller.getUsersCount)
Router.get('/sorting',controller.sortedList)
Router.get('/gender',controller.getUsersByGender)
Router.get('/youngestAndOldest',controller.getYoungestAndOldest)
Router.get('/list/:id',controller.getUserList)
Router.get('/search', controller.userSearch)

Router.get('/:id',controller.getUserById)
Router.get('/ageRange/:id',controller.filterbyAge)
Router.get('/name/:id', controller.searchByName)

module.exports = Router