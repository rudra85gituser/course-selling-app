const express = require('express');
const app = express();

let ADMIN=[];
let USER=[];
let COURSES=[];


//admin routes/signup
//logic to signup for admin
app.post('/admin/signup' , (req , res)=>{


});


//admin login 
//write logic to log in for admin
app.post('/admin/login' , (req , res)=>{

});

//admin course
//write logic for the admin to create course
app.post('/admin/course' , req , res=>{

});


//admin course
//write logic for the admin to edit course
app.post('/admin/courseID' , req , res=>{

});


//user routes/signup
//logic to signup for user
app.post('/user/signup' , (req , res)=>{


});


//user login 
//write logic to log in for user
app.post('/user/login' , (req , res)=>{

});

//user course
//write logic for the user to enroll in course
app.post('/user/course' , req , res=>{

});

//admin course
//write logic for the admin to see course
app.post('/user/courseID' , req , res=>{

});



app.listen(3000 , ()=>{
    console.log("server is listening on the port 3000");
})