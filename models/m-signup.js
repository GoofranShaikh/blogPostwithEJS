const mongoose = require('mongoose')

const signupSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    password:{
        type:String,
        required:true,
        unique:true,
        select: false   //make select false if you dont want this property to be selected while giving response to the client
    }
})
module.exports= mongoose.model('User',signupSchema)