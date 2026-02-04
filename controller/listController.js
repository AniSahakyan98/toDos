const services = require('../services/list')
const List = require('../models/schema')

const createList = (async(req,res) => {

    try {
     const {toDos, notes, date, parentToDo} = req.body
        let parentId = null;

    if(parentToDo) {
        const parent = await List.findOne({toDos: parentToDo}) 
        if(!parent) {
            return res.status(404).json({message: "parent not found"})
        } else {
            parentId = parent._id
        }
    }
        const newList = await services.createList({toDos, notes, parentId})

        if(parentId) {  
           await List.findByIdAndUpdate(parentId, {$push: {children: newList._id}})
        } 
        
        return res.status(201).json({
            message: "to do created successfully",
            toDo: newList
        })
    
  } catch(error) {
    return res.status(500).json({error: error.message})
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