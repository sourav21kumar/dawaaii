const express = require('express');
const mongoose = require('mongoose');
const { route } = require('./routes/file');
const routeFile = require('./routes/file') 


const app =  express();
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


const DBURI = 'mongodb+srv://ypritwani:Yash2904%40@knowledgehub-database-zu4vn.mongodb.net/Upload555?retryWrites=true&w=majority'
mongoose.connect(DBURI,{useNewUrlParser: true,useUnifiedTopology: true})
.then((result)=>{
    app.listen(3000,()=>{
        console.log('listening at port 3000')
    })
}).catch(err=>{console.log(err)});


app.get('/',(req,res)=>{
    res.status(200).send({message:'true'})
})

app.use(routeFile)
