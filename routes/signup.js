const express = require('express');
const router = express.Router();
const signupModel = require('../models/m-signup')

router.get('/', async(req,res)=>{
  
    res.render('articles/signup')  //rendering signup page
})

router.post('/new',async(req,res)=>{
    const userDetails= new signupModel({
        name:req.body.name,
        mobile:req.body.mobile,
        email:req.body.email,
        createdAt:req.body.createdAt,
        password:req.body.password
    })
try{
   const result= await userDetails.save()
   console.log(result)
    res.status(200).send('User created successfully')
}
catch(e){
    console.log(e)
    res.status(404).send('Something went wrong')
}

    
})

module.exports =  router