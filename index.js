//import express
const express = require('express')
//import jsonwebtoken
const jwt = require('jsonwebtoken')

//import cors
const cors = require('cors')

//import dataservice
const dataservice = require('./service/dataservice')

//server app creation using express
const app = express()

//cors use in app
app.use(cors({
    origin:"http://localhost:4200"
}))

//parse json data
app.use(express.json())

//Register api
app.post('/register',(req,res)=>{
    dataservice.register(req.body.username,req.body.userid,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

//login api
app.post('/login',(req,res)=>{
    dataservice.login(req.body.userid,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

//set port number
app.listen(3000,()=>{
    console.log("Server started at port 3000");
})