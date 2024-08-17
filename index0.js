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
app.post('/admin/courses' , req , res=>{

});


//admin course
//write logic for the admin to edit course
app.put('/admin/courses/:courseID' , req , res=>{

});

//admin course
//write logic to get all the courses
app.get('/admin/courses' , req , res=>{

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
app.get('/user/courses' , req , res=>{

});


//admin course
//write logic for the user to see course
app.post('/user/courses/:courseID' , req , res=>{

});

//admin course
//write logic for the user to see purchased  course
app.get('/user/purchasedCourses' , req , res=>{

});



app.listen(3000 , ()=>{
    console.log("server is listening on the port 3000");
})