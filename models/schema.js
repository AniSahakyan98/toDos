const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoList = new Schema({
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'List'
    },
    childId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'List'
    },
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
    },
    parentToDos: {
        type: String,
        required: false
    },
    childToDos: {
        type: String,
        required: false
    }

}, {timestamps: true})

const List = mongoose.model('List',todoList)
module.exports = List