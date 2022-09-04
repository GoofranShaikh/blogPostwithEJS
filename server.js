require("dotenv").config();
const express = require("express")
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const methodOverride = require('method-override')
const articleRoute = require('./routes/article')
const signupRoute = require('./routes/signup')
const articleModel = require('./models/m-article')
const Users = require('./models/m-signup')
const store = require("store2");
const app = express()

app.use(express.urlencoded({ extended: false }))

app.use(express.json())
app.use(methodOverride('_method'))

mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true, useUnifiedTopology: true
})

// set view engine
app.set('view engine', 'ejs')
// app.use('/private',checkHeader)
app.use('/articles', articleRoute)
app.use('/signup', signupRoute)
 async function renderBlogList() {
    console.log('inside render function')
    // app.get('/private/blog-list', async (req, res) => {
        try{
            const article = await articleModel.find().sort({ createdAt: 'desc' })
            console.log(article)
            app.render('articles/index', { articles: article })
        }
        catch(e){
            console.log(e)
        }
      
    // })
}
 async function checkHeader(req,res,next){
    console.log(req.path)
//     if(req.path =='/login' || req.path =='/signup'){
//    next()
// }
// else{
    const authHeader= await req.headers['authorization']
    const token =authHeader && authHeader.split(' ')[1]
    if (token ==null) return res.status(401).send('Unauthorize user')
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.status(403).send("user not valid")
        next()
    })
   
// }

}

app.get('/login', async (req, res) => {
    res.render('articles/login')
})

app.post('/info', async (req, res) => {
    const { email, password } = req.body
    const user = await Users.findOne({ $and: [{ email: email }, { password: password }] })
    if (user) {
        const accessToken = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET)  //user cred, secret key
        const userDetails={
            ...user._doc,
            accessToken: accessToken
        }
        res.set('authorization', `bearer ${userDetails.accessToken}`);
         res.status(200).send(userDetails)
         store.set('userDetails',userDetails)
        //  console.log(store.get('userDetails'))
        
        renderBlogList()
    }
    else {
        return res.status(400).send('Invalid username or password')
    }
    

})



app.listen(4000)