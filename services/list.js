const { allLocales } = require('@faker-js/faker');
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

//parent- children- childrenofChild
const getParentAndChild = async() => {
    const all = await List.find()
    let map = new Map()

    for(const docs of all) {
        if(docs.parentId !== null) { 
            const parentName = await List.findOne({_id: docs.parentId})
            map.set(`${docs._id}`,{ parent: parentName.toDos, child : docs.toDos, childId :docs._id})
        }
    }

    let arr = [];

    for(const childOfChild of all) {
            if(childOfChild.parentId !== null) {     

            let result = map.get(`${childOfChild.parentId}`)
            let copy = {...result}
                if(result) {
                     arr.push(childOfChild.parentId)
                     copy.childOfChild = childOfChild.toDos   
                     map.set(copy,copy)
                }
  
            }
            if(childOfChild.children.length === 0) {
                map.set(childOfChild.toDos,{childOfChild: childOfChild.toDos})
            }        
    }


    for(const key of arr){
        map.delete(`${key}`)
    }

    
    return [...map.values().map((val) => {
        if(val.parent !== undefined && val.child !== undefined && val.childOfChild !== undefined) {
            return val = `${val.parent} - ${val.child} - ${val.childOfChild}`
        } else if (val.parent !== undefined && val.child !== undefined && val.childOfChild === undefined) {
            return val = `${val.parent} - ${val.child}`
        } else if (val.parent === undefined && val.child === undefined && val.childOfChild !== undefined){
            return val = `${val.childOfChild}`
        }
    } )]


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
    updateList,
   getParentAndChild
    
}