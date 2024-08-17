const express = require('express');
const app = express();

let ADMIN=[];
let USER=[];
let COURSES=[];


//admin auth
const adminAuthentication =(req , res  , next)=>{
/*
this is same as text below written in one line
const username = req.header.username;
const password = req.header.password;
*/
const {username , password} = req.headers;
// If a matching element is found, .find() will return that element, and it will be stored in the admin variable. If no match is found, admin will be undefined.

//In this version, a is clearly the parameter of the anonymous function passed to .find(). The arrow function syntax (a => ...) is just a shorthand way of writing this.

const admin = ADMIN.find(a=>a.username === username && a.password === password);
if(admin)
{
    next();
}
else
{
    res.status(403).json({messege: 'admin authentication failed'});
}
};




//user auth
const userAuthentication =(req , res , next)=>{
    const {username , password} = req.headers;
    const user = USER.find(a=>a.username === username && a.password === password);
    if(user)
    {
        next();
    }
    else
    {
        res.send.status(403).json({messege: 'user authentication failed'});
    }
};




//admin routes/signup
//logic to signup for admin
app.post('/admin/signup' , (req , res )=>{
    const admin =req.body;
    const existingAdmin = ADMIN.find(a=> a.username === admin.username);
    if(existingAdmin)
    {
        res.send.status(403).json({messege: 'admin already exists'});
    }
    else
    {
        ADMIN.push(admin);
        res.send.json({messege: 'admin created successfully'});
    }
});




//admin login 
//write logic to log in for admin
app.post('/admin/login' , userAuthentication , (req , res)=>{
    res.send.json({messege: 'logged in successfully'});
});




//admin course
//write logic for the admin to create course
app.post('/admin/courses' , adminAuthentication ,(req , res)=>{
    const course =req.body;
    //first way to create id through random variable
    //second way to create id through variable increment
    //third way using timestamp
    course.id =Date.now();//use timestamp for course id
    COURSES.push(course);
    res.send.json({messege: 'course creates successfully' , courseId: course.id});
});





//admin course
//write logic for the admin to edit course
app.put('/admin/courses/:courseID' , adminAuthentication , (req , res)=>{
    const courseId = parseInt(req.params.courseID);
    const course =COURSES.find(a=> a.id === courseId)
    if(course)
    {
        //course.title = req.body.title;
        //course.price = req.body.price;
        //or
        //this will remove the original instance of course available previously
        Object.assign(course , req.body);
        res.send.json({messege: 'course updated successfully'});
    }
    else
    {
        res.send.status(404).json({messege: 'course cannot found'});
    }
});





//admin course
//write logic to get all the courses
app.get('/admin/courses' ,  adminAuthentication ,(req , res)=>{
    res.send.json({courses: COURSES});
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