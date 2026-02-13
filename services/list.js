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

const getParentAndChild = async() => {
    const all = await List.find()
    
   const result = await Promise.all(all.map(async(docs) => {

    if(docs.children.length !== 0) {
       const childrenAll = await Promise.all(docs.children.map(async(childId) => {
        
            const child = await List.findById(childId)
            return child.toDos 

        }))
              
        
        return await Promise.all(childrenAll.map(async(child) => {
            const childOfChild = await List.findOne({toDos: child})
                const childrenId = childOfChild.children
                    if(childrenId.length !== 0) {
                       return await Promise.all(childrenId.map(async(childId) => {
                        const childOfChildNaming = await List.findOne({_id: childId})
                       //is there a need for the if below ?
                        if(childOfChildNaming) {
                            const childOfChildName = childOfChildNaming.toDos 
                            return `${docs.toDos} - ${child} - ${childOfChildName} `
                        }
                        }))
                    }
                    return `${docs.toDos} - ${child} `
        }))
    }  
        return `${docs.toDos}`
    
    

    }))

   return result
    
};



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