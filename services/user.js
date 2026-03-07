const mongoose = require('mongoose')
const User = require('../models/userSchema');
const UserDetails = require('../models/userDetails');
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



 
module.exports = {
    createUser,
    deleteUser,
    updateUser,
    getUserById,
    getUserList,
    getUsersCount
}