const List = require('../models/schema')

//createList,getList,updateList,deleteList

const createList = (data) => {
    const toDo = new List(data)
    return toDo.save()
}

const getList = () => {
    return List.find()
}

const deleteList = (id) => {
    return List.findByIdAndDelete(id)
}

const updateList = (id,data) => {
    return List.findByIdAndUpdate(id,data, {new :true})
}

module.exports = {
    createList,
    getList,
    deleteList,
    updateList
}