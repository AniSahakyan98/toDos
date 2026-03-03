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


// hamel listov aysinqn paginationov, 1 page u 5 hoqi, 2 page u 6-10 mard@, 3 11-15 u tenc sharunak),
//Basic jsov karas anes paginationner@, heto kanenq db level
//Bayc erp listenq stanum voch

const getUserList = async() => {

}







module.exports = {
    createUser,
    deleteUser,
    updateUser,
    getUserById,
    getUserList
}