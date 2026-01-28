const services = require('../services/list')

const createList = ((req,res) => {
    const newToDo = {...req.body}
    services.createList(newToDo)
                        .then(() => res.status(201).json({message:"product created successfully"}))
                        .catch((error) => res.status(500).json({error: error.message}))
    
})

const getList = ((req,res) => {
    services.getList()
                    .then((data) => res.status(200).json({data}))
                    .catch((err) => res.status(500).json({error: err.message}))
})

const deleteList = ((req,res) => {
    const id = req.params.id
    services.deleteList(id)
                    .then(() => res.status(204).send())
                    .catch((err) => res.status(500).json({error: err.message}))
})

const updateList = ((req,res) => {
    const id = req.params.id
    const data = {...req.body}
    services.updateList(id,data)
                    .then((data) => res.status(200).json({message: "updated product"},data))
                    .catch((err) => res.status(500).json({error: err.message}))
})

module.exports = {
    createList,
    getList,
    deleteList,
    updateList
}