const mongoose = require('mongoose')
const User = require('../models/userSchema');
const UserDetails = require('../models/userDetails');
const Post = require('../models/postSchema')
const { findById, findByIdAndUpdate } = require('../models/schema');


//createUser, deleteUser, updateUser, findUserbyId, getUserList

const createUser = async({name,age,gender,phone,email}) => {
    let details = await UserDetails.create({phone,email})
    let newUser;
    if(details) {
        newUser = await User.create({name,age,gender,details: details._id})
    } else {
        newUser = await User.create({name,age,gender})
    }   

    return newUser
}


const deleteUser = async(id) => {
    const user = await User.findByIdAndDelete(id)
    const details = await UserDetails.findByIdAndDelete(user.details)
    if(details) {
        UserDetails.findByIdAndDelete(user.details)
    }
    return 
}

const updateUser = async(id,data) => {
    const user = await User.findByIdAndUpdate(id,data,{new: true})
    await UserDetails.findByIdAndUpdate(user.details,data,{new: true})
    
    return user
}

const getUsersCount  = async() => {
    const count = await User.aggregate([
        {$count: "totalUsers"}
    ])

    return count[0]
}

const getUserById = async(id) => {

    const user = await User.aggregate([
        {$match : {
            _id : new mongoose.Types.ObjectId(id)
        }},

        {$lookup: {
            from: "userdetails",
            localField: "details",
            foreignField: "_id",
            as : "userDetails"
        
        }}, 
        {
            $unwind: "$userDetails"
        },
        {$project: {
            name: 1,
            age: 1,
            gender: 1,
            phone: "$userDetails.phone",
            email: "$userDetails.email"
        }}
    ])

    return user
    // const user = await User.findById(id)
    // const userInfo = {name: user.name,age: user.age,gender: user.gender}
    // const details = await UserDetails.findById(user.details)
    // const result = {phone: details.phone, email:details.email}
    // return {...userInfo,...result}
}



//limit, offset
const getUserList = async(pages) => {
    let endpoint = pages.split("-")[1]

    const users = await User.aggregate([
        {$sort: {createdAt: -1}},
        {$skip: +endpoint},
        {$limit:5}
    ])

    return users

//    const users = await User.find()
//    const newArr = []
//    let startpoint = pageLimit.slice(0,pageLimit.indexOf("-"))
//    let endpoint = pageLimit.split("-")[1]
   
//    for(let i = startpoint; i < users.length; i++) {
//         newArr.push(users[i])
        
//         if(i === +endpoint) {
//             return {newArr}
//         }   
//    }
//    return {newArr}
}


//Using MongoDB Aggregation, do the following:
//Group users by gender
//For each gender calculate:
//total number of users
//average age

const getUsersByGender = async () => {
    const users = await User.aggregate([
        {$group: {_id: "$gender",totalUsers: {$sum: 1},averageAge: {$avg: "$age"}, names : {$push: "$name"} }},
    ])

    return users
}

//Exercise 1 --- Add the ability to search users by name.
const searchByName = async (name) => {
    const filteredName = await User.aggregate([
        {$match : {name: name}}
    ])

    return filteredName
}

//Exercise 2
// Allow users to filter the user list by age range.
// Example idea: users between X and Y.

const  filterbyAge = async (range) => {
    const startpoint = range.slice(0,range.indexOf("-"))
    const endpoint = range.split("-")[1]
    //console.log(startpoint)
    //console.log(endpoint)

    const result = await User.aggregate([
        {$match : {age : {$gte: +startpoint, $lte : +endpoint}}}
    ])

    return result

}

//Exercise 3
//Add sorting to the user list (ascending and descending).

const sortedList = async() => {
    const list = await User.aggregate([
        {$sort: {age : 1}}
    ])
    return list
}

//Exercise 5
//Create an endpoint that returns the average age of all users.

const avgAge = (async() => {
    const avgAge = await User.aggregate([
        {$group : {
            _id: null,
            averageAge: {$avg: "$age"}
        }},
        {$project : {averageAge:1,_id:0}}
    ])
    return avgAge
})

//Exercise 6
//Return the youngest and oldest user in the system.

const getYoungestAndOldest = (async() => {
    const youngestAndOldest = await User.aggregate([
        {$group: {
        _id: null,
         youngest: {$min : "$age"},
         oldest: {$max: "$age"}
        }},
        {$project : {youngest:1,oldest:1,_id:0}}
    ])
    return youngestAndOldest
})

//Exercise 8
//Create an endpoint that returns how many users were created in the last 7 days.

const getWeeklyUsers = (async() => {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
   
    const weeklyUsers = await User.aggregate([
        {$match: {
            createdAt: {$gt: sevenDaysAgo}
        }}
    ])

    return weeklyUsers
})


//Exercise 11
//Create an endpoint that returns users who have no posts.


const usersNoPost = (async() => {
    let posts = await Post.find() // [{},{}]
    let usersPosts = posts.map((post) => post.userId)
    let usersWithNoPost = []


    const Users = await User.find()
    for(const user of Users) {
        if(!usersPosts.some(id => id.equals(user._id))){
            usersWithNoPost.push(user)
        }
    }
    
    return usersWithNoPost

})

//Exercise 13
// Add a soft delete system where deleted users are not actually removed.-eht kganq sran

// Exercise 14 - Create an endpoint that returns the top 3 oldest users.

const oldestUsers = (async () => {
    const users = await User.aggregate([   
        {$sort: {age: -1}},
        {$limit: 3}
    ])

    return users
})

//Exercise 15 - Create an endpoint that returns duplicate names in the database.

const duplications = (async () => {
    const map = new Map()

    const users = await User.find()
    const userNames = users.map(user => user.name)

    for(const name of userNames) {
        (map.has(name) ? map.set(name,map.get(name) + 1) : map.set(name,1))
    }

    const resultArr = [];
    for (const [key,value] of map) {
        if (value > 1) {
            resultArr.push(key)
        }
    }

    return resultArr
})

module.exports = {
    createUser,
    deleteUser,
    updateUser,
    getUserById,
    getUserList,
    getUsersCount,
    getUsersByGender,
    searchByName,
    filterbyAge,
    sortedList, 
    avgAge,
    getYoungestAndOldest,
    getWeeklyUsers,
    usersNoPost,
    oldestUsers,
    duplications
}

