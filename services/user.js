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

const getUserById = async(id) => {
    const user = await User.findById(id)
    const userInfo = {name: user.name,age: user.age,gender: user.gender}
    const details = await UserDetails.findById(user.details)
    const result = {phone: details.phone, email:details.email}
    return {...userInfo,...result}
}



//pls check is this correct, it's working like this, when I pass "0-4" , "5-9" ,etc, or it should be 1-5, 5-10
const getUserList = async(pageLimit) => {
   const users = await User.find()
   const newArr = []
   let startpoint = pageLimit.slice(0,pageLimit.indexOf("-"))
   let endpoint = pageLimit.split("-")[1]
   
   for(let i = startpoint; i < users.length; i++) {
        newArr.push(users[i])
        
        if(i === +endpoint) {
            return {newArr}
        }   
   }
   return {newArr}
}

 
module.exports = {
    createUser,
    deleteUser,
    updateUser,
    getUserById,
    getUserList
}