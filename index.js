const express = require('express');
const app = express();

let ADMIN=[];
let USER=[];
let COURSES=[];


//admin routes
//logic to signup for admin
app.post('/admin/signup' , (req , res)=>{


});


//admin login 
//write logic to log in for admin
app.post('/admin/login' , (req , res)=>{

});

//user routes
//logic to signup for user
app.post('/user/signup' , (req , res)=>{


});


//user login 
//write logic to log in for user
app.post('/user/login' , (req , res)=>{

});

app.listen(3000 , ()=>{
    console.log("server is listening on the port 3000");
})