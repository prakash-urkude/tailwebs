const express = require("express")
const mongoose = require('mongoose')
const route = require('./route/route')
const app = express()

app.use(express.json())

mongoose.connect("mongodb+srv://prakashurkude:prakash1998@cluster0.nuhssqs.mongodb.net/tailwebs")
.then(() => console.log("mongoDb is connected"))
.catch((error) => console.log(error))

app.use('/',route);

app.listen(3000,function(){
    console.log('express app running on port' + 3000)})