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

const getUserById = (async(req,res) => {
    try {
        const user = await services.getUserById(req.params.id)
        return res.status(201).json(user)
    } catch(error) {
       return res.status(500).json({error: error.message})
    }
})

const getUserList = (async(req,res) => {
    try {
        let userList = await services.getUserList(req.params.id)
        return res.status(201).json(userList)
    } catch(error) {
       return res.status(500).json({error: error.message})
    }
})

const getUsersCount = (async(req,res) => {
    try {
      const count = await services.getUsersCount()
      return res.status(201).json({
        message: `User count is equal to ${count.totalUsers}`,
        count: count
      })
    } catch(error) { return res.status(500).json({error: error.message})}
})

const getUsersByGender = (async(req,res) => {
    try {
        const user = await services.getUsersByGender()
        return res.status(201).json({
            users: user
        })
    } catch(error) {return res.status(500).json({error: error.message})}
})

const searchByName = (async(req,res) => {
    try {
        const filteredResult = await services.searchByName(req.params.id)
        return res.status(201).json({filteredResult})
    } catch(error) {
        return res.status(500).json({error:error.message})
    }

})

const filterbyAge = (async(req,res) => {
    try {
        const result = await services.filterbyAge(req.params.id)
        return res.status(201).json({result})
    }catch(error) {
        return res.status(500).json({error: error.message})
    }
})

const sortedList = (async(req,res) => {
    try {
        let list = await services.sortedList()
        return res.status(201).json({list})
    } catch(error) {return res.status(500).json({error: error.message})}
})

const avgAge = (async(req,res) => {
    try {
        let age = await services.avgAge()
        return res.status(201).json(age)
    } catch(error) {return res.status(500).json({error: error.message})}
})

const getYoungestAndOldest = (async(req,res) => {
    try {
        let user = await services.getYoungestAndOldest()
        return res.status(201).json(user)
    } catch(error) {return res.status(500).json({error: error.message})}
})

const getWeeklyUsers = (async(req,res) => {
    try {
        let users = await services.getWeeklyUsers()
        return res.status(201).json(users)
    } catch(error) {return res.status(500).json({error: error.message})}
})

const usersNoPost = (async(req,res) => {
    try {
        let result = await services.usersNoPost()
        return res.status(201).json(result)
    } catch(error) {return res.status(500).json({error: error.message})}
})

const oldestUsers = (async(req,res) => {
    try {
        let result = await services.oldestUsers()
        return res.status(201).json(result)
    } catch(error) {return res.status(500).json({error: error.message})}
})

const duplications = (async(req,res) => {
    try {
        let result = await services.duplications()
        return res.status(201).json(result)
    } catch(error) {return res.status(500).json({error: error.message})}
})

const userStatus = (async(req,res) => {
    try {
        let result = await services.userStatus(req.params.id)
        return res.status(200).json(result)
    } catch(error) {return res.status(500).json({error: error.message})}
})

const userNameSearch = (async(req,res) => {
    try {
        const {q} = req.query
        console.log(req.query)
        if (!q) {
            return res.status(400).json({message: "Search query is required"})
        }
        let searchResult = await services.userNameSearch(q)
        return res.status(200).json(searchResult)
    } catch(error) {return res.status(500).json({error: error.message})}
})

const emailSearch = (async(req,res) => {
     try {
        const {q} = req.query
        if (!q) {
            return res.status(400).json({message: "Search query is required"})
        }
        let searchResult = await services.emailSearch(q)
        return res.status(200).json(searchResult)
    } catch(error) {return res.status(500).json({error: error.message})}
})

const groupBy = (async(req,res) => {
    try {
        const {q} = req.query
        if (!q) {
            return res.status(400).json({message: "No search query is found"})
        } 
        let param = await services.groupBy(q)
        if(param.length !== 0) {
            return res.status(200).json(param)
        } else {
            return res.status(400).json({message: "Field does not exist"})
        }
        
    } catch(error) {return res.status(500).json({error: error.message})}
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
    duplications,
    userStatus,
    userNameSearch,
    emailSearch,
    groupBy
}