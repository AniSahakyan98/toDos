const User = require('../models/userSchema');
const UserDetails = require('../models/userDetails');
const { findById, findByIdAndUpdate } = require('../models/schema');

//createUser, deleteUser, updateUser, findUser

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

//getUser - , ham by id hamel listov aysinqn paginationov, 1 page u 5 hoqi, 2 page u 6-10 mard@, 3 11-15 u tenc sharunak),
//Basic jsov karas anes paginationner@, heto kanenq db level
//Sovorakan get by id jamanak petqa stanal nayev additional info table
//Bayc erp listenq stanum voch


module.exports = {
    createUser,
    deleteUser,
    updateUser
}