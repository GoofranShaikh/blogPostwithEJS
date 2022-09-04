const mongoose= require('mongoose')
const slugify = require('slugify')

const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    markdown:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    slug:{
        type:String,
        required:true,
        unique:true
    }
})

articleSchema.pre('validate',function(next){                          // this function will run before validation on schema and create a slug from title
    if(this.title){
        this.slug = slugify(this.title,{lower:true, strict:true})   // strict will remove any special charater from slug
    }
    next()
})

module.exports= mongoose.model('Article',articleSchema)