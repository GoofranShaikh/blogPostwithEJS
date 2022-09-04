const express = require('express');
const router = express.Router();
const articleModel= require('../models/m-article')


router.get('/new',(req,res)=>{
    res.render('articles/article')
})

router.get('/:slug',async(req,res)=>{

    const article = await articleModel.findOne({slug:req.params.slug})
    if(article) { 
        res.render('articles/show',{article:article})
    }
    else{
        res.redirect('/')
    }
    
    
})

router.post('/',async(req,res)=>{
    const article=  new articleModel({
    title:req.body.title,
    description:req.body.description,
    markdown:req.body.markdown
    })
    try{
       result= await article.save()
       console.log(result)
       res.redirect(`articles/${result.slug}`)

    }
    catch(e){
       console.log(e)
    }
})

router.delete('/:id',async(req,res)=>{
    await articleModel.findOneAndDelete(req.params.id)
    res.redirect('/')
})




module.exports =  router

