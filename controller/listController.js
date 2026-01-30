const services = require('../services/list')
const List = require('../models/schema')

const createList = (async(req,res) => {
    const parentToDos = req.body.parentToDos

    if(parentToDos){
        const {toDos, notes, date} = req.body
        let parent = await List.findOne({toDos : parentToDos})
        const parentId = parent._id
        const newToDowithParent = {parentId, toDos, notes, date, parentToDos}
        try {
            await services.createList(newToDowithParent);
            res.status(201).json({message:"product created successfully"})
        } catch(error) {
            res.status(500).json({error: error.message})
        }
    } else if (!parentToDos) {
         const {toDos, notes, date} = req.body
         const newToDo = {toDos, notes, date}
        try {
            await services.createList(newToDo);
            res.status(201).json({message:"product created successfully"})
        } catch(error) {
            res.status(500).json({error: error.message})
        }
    }
    
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