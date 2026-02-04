const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoList = new Schema({
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false
    }],
    toDos: {
        type: String,
        required : true
    },
    date : {
        type: Date,
        required : false
    },
    notes: {
        type: String,
        required: false
    }

}, {timestamps: true})

const List = mongoose.model('List',todoList)
module.exports = List