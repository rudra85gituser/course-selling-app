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
    const user={
        username: req.body.username,
        password: req.body.password,
        purchasedCourses: []
    }
USER.push(user);
res.send.json({messege: "user created successfully"});
});





//user login 
//write logic to log in for user
app.post('/user/login' , userAuthentication , (req , res)=>{
    res.send.json({messege: "user logged in successfully"});
});




//user course
//write logic for the user to enroll in course
app.get('/user/courses' , userAuthentication ,  req , res=>{

    //suppose COURSE array consist of these objects
    /*
    const COURSES = [
        { title: "JavaScript Basics", published: true },
        { title: "Advanced Python", published: false },
        { title: "Web Development", published: true }
    ];
    */
     let filteredCourses =[];
     for(let i=0;i<COURSES.length;i++)
     {
        if(COURSES[i].published)
        {
            filteredCourses.push(COURSES[i]);
        }
     }
    res.send.json({courses: filteredCourses});
});




  
//admin course
//write logic for the user to see course
app.post('/user/courses/:courseID' , userAuthentication , req , res=>{
    const courseId = Number(res.params.courseID);
    const course   = COURSES.find(c=> c.id === courseId && c.published);
    if(course){
    req.user.purchasedCourses.push(courseId);
    res.send.json({messege: 'course purchased successfully'});
    }
    else
    {
    res.status(404).json({ message: 'Course not found or not available' });   
    }
});

//admin course
//write logic for the user to see purchased  course
app.get('/user/purchasedCourses' , userAuthentication , req , res=>{
// const purchasedCourses = COURSES.filter(c => req.user.purchasedCourses.includes(c.id));
// We need to extract the complete course object from COURSES
// which have ids which are present in req.user.purchasedCourses    
var purchasedCourseIds = req.user.purchasedCourses; [1, 4];
var purchasedCourses = [];
for (let i = 0; i<COURSES.length; i++) {
  if (purchasedCourseIds.indexOf(COURSES[i].id) !== -1) {
    purchasedCourses.push(COURSES[i]);
  }
}

res.json({ purchasedCourses });

});



app.listen(3000 , ()=>{
    console.log("server is listening on the port 3000");
})