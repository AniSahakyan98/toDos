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
    const parentWithChild = await List.find(
        {children: {$ne: []}}
    )

   const result = await Promise.all(parentWithChild.map(async(docs) => {
       const children = await Promise.all(docs.children.map(async(childId) => {
        
            const child = await List.findById(childId).select("toDos -_id");
            return child.toDos

        }))
        
        return {
            [docs.toDos] : children
        }   
         
    }))

   return result
// return List.findById("6988667183201a9f513c7736")
//   .select("toDos -_id");


       
    //    .map(async(doc) => {
       
    //     const updatedChildren = await doc.children.map((childId) => {
    //         childId = List.findByIdAndUpdate(childId)
    //     })





    //     return {
    //         [docs.toDos] : updatedChildren
    //     }
    //    })
    
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