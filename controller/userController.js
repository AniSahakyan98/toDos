const services = require('../services/user')


const createUser = (async(req,res) => {
    try {
        const newUser = await services.createUser(req.body)
        return res.status(201).json({
            message: "User created successfully",
            user: newUser
        })
    } catch(error) {
        return res.status(500).json({error:error.message})
    }
})

const deleteUser = (async(req,res) => {
    try {
        const userId = await services.deleteUser(req.params.id)
        return res.status(204).json({message: `user with ${userId} successfully removed`})
    } catch(error) {
        return res.status(500).json({error:error.message})
    }
})


const updateUser = (async(req,res)=> {
        const id = req.params.id
        const data = {...req.body}
        console.log(data)
        services.updateUser(id,data)
                                .then((data) => res.status(200).json({message: "User updated successfully", updatedUser: data}))
                                .catch((error) => res.status(500).json({error: error.message}))
    
})


module.exports = {
    createUser,
    deleteUser,
    updateUser
}