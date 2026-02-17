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
        //plan holidays - ticket 
        //plan holidays - accomodation
        //accomodation - book
        //accomodation - Cancel the rest of the
        //plan budget
        //book
        //Cancel the rest of the
        //ticket

    const all = await List.find()
    let map = new Map()

    for(const docs of all) {
    
        if(docs.children.length !== 0) { 
            for(const childId of docs.children) {
                const child = await List.findById(childId)
                    if(child) {
                        map.set(`${docs.toDos} - ${child.toDos}`)  
                            if(child.children.length !== 0){
                                map.delete(`${docs.toDos} - ${child.toDos}`)
                                for(const childOfChildId of child.children) {
                                        const childOfChild = await List.findById(childOfChildId)
                                        
                                        if(childOfChild){
                                            map.set(`${docs.toDos} - ${child.toDos} - ${childOfChild.toDos}`)
                                        }
                                } 
                            }              
                     }       
            }  
        } else {
           map.set(docs.toDos,docs.toDos)
        }
    }     
    
    
   return [...map.keys()]

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