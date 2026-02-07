const List = require('../models/schema')

//createList,getList,updateList,deleteList

const createList = async({toDos,parentToDo}) => {
    let parentId = null;

    if(parentToDo){
        let parent = await List.findOne({toDos: parentToDo})
        if(!parent) {
           throw new Error("Parent_not_found")
        } else {
            parentId = parent._id
        } 
    }

    let newList = await List.create({toDos,parentId})

    if(parentId) {
        await List.findByIdAndUpdate(parentId,{$push: {children: newList._id}})
    }

    return newList
    
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