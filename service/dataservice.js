const jwt = require('jsonwebtoken')

//import db
const db = require('./db')

//register
const register = (username,userid,password)=>{
    return db.User.findOne({
        userid
    }).then(user=>{
        if(user){
            return{
                status : false,
                message : "User already exist. Pls login",
                statusCode : 401
            }
        }
        else{
            //insert to db
            const newUser = new db.User({
                name : username,
                userid,
                password,
                event:[]
            })
            newUser.save()
            return{
                status : true,
                message : "Registered Successfully",
                statusCode : 200
            }
        }
    })
}

//login
const login = (userid,password)=>{
    return db.User.findOne({
        userid,
        password:password
    }).then(user=>{
        if(user){
            currentUser = user.username
            currentUserid = userid
            //token generation
            token = jwt.sign({
                //store userid inside token
                currentUserid : userid
            }, 'secretkey123')
            return{
                status: true,
                message: "Login successful",
                statusCode:200,
                currentUser,
                currentUserid,
                token
            }
        }
        else{
            return{
                status: false,
                message: "Invalid account number or password",
                statusCode:401
            }
        }
    })
}

module.exports={
    register,
    login
}