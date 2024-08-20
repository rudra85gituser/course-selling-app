//the main problem in this logic is as we refresh array starts again empty
//data is not getting stored in memory


//while sending request every one can inspect and see the request in which admin/user is passing the username and passowrd
//to solve this we will use token
//we will hash everything in token
//thats how authentication works in real world

//in jwt.sign and in jwt.verify the sectre key should be the same
//only backend server will be able to decode the token 

const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

let ADMIN=[];
let USERS=[];
let COURSES=[];

const secretkey = "superS3cr3t1"; // replace this with your own secret key

const generateJwt = (user)=>
{
  const payload = { username: user.username , };
  //we are not doing const payload = { username: user.username , password};   because because password can be changed by the user and the username is enough to identify the user
  return jwt.sign(payload , secretkey, {expiresIn: '1h'});
}

//jwt auth
//this will work for both admin auth and the user auth
const authenticateJwt = (req , res , next)=>
{
    // we are getting token data in authorization section of the headerb part 
    const authHeader = req.header.authorization;

    if(authHeader)
    {
        //if there is token present in auth section 
        //then split the bearer form token string
        //bearer is also a word present with token passed by the user 
        // user can also send token also
        const token  = authHeader.split(' ')[1];

        jwt.verify(token , secretkey , (err , user)=>{
            if(err)
            {
                 return res.sendStauts(403);
            }
            req.user = user;
            next();
        });
    }
    else
    {
        res.sendStauts(401);
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
        const token = generateJwt(admin);
        res.send.json({messege: 'admin created successfully' , token});
    }
});




//admin login 
//write logic to log in for admin
app.post('/admin/login' , (req , res)=>{
    const { username, password } = req.headers;
    const admin = ADMINS.find(a => a.username === username && a.password === password);
  
    if (admin) {
      const token = generateJwt(admin);
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Admin authentication failed' });
    }
});




//admin course
//write logic for the admin to create course
app.post('/admin/courses' ,  authenticateJwt ,(req , res)=>{
    const course =req.body;
    course.id = COURSES.length + 1; 
    COURSES.push(course);
    res.send.json({messege: 'course creates successfully' , courseId: course.id});
});





//admin course
//write logic for the admin to edit course
app.put('/admin/courses/:courseID' ,  authenticateJwt , (req , res)=>{
    const courseId = parseInt(req.params.courseID);
    const courseIndex = COURSES.findIndex(c => c.id === courseId);

    if (courseIndex > -1) {
      const updatedCourse = { ...COURSES[courseIndex], ...req.body };
      COURSES[courseIndex] = updatedCourse;
      res.json({ message: 'Course updated successfully' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
});





//admin course
//write logic to get all the courses
app.get('/admin/courses' , authenticateJwt   ,(req , res)=>{
    res.send.json({courses: COURSES});
});






//user routes/signup
//logic to signup for user
app.post('/user/signup' , (req , res)=>{
    const user = req.body;
  const existingUser = USERS.find(u => u.username === user.username);
  if (existingUser) {
    res.status(403).json({ message: 'User already exists' });
  } else {
    USERS.push(user);
    const token = generateJwt(user);
    res.json({ message: 'User created successfully', token });
  }
});





//user login 
//write logic to log in for user
app.post('/user/login' , userAuthentication , (req , res)=>{
    const { username, password } = req.headers;
  const user = USERS.find(u => u.username === username && u.password === password);
  if (user) {
    const token = generateJwt(user);
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'User authentication failed' });
  }
});




//user course
//write logic for the user to enroll in course
app.get('/users/courses', authenticateJwt, (req, res) => {
    res.json({ courses: COURSES });
  });
//or

//this or the above for loop does the same thing
    //filtered courses
    //COURSES.filter(c=> c.published);
    //res.send.json({COURSES.filter(c=> c.published)});





  
//admin course
//write logic for the user to see course
app.post('/users/courses/:courseId', authenticateJwt, (req, res) => {
    const courseId = parseInt(req.params.courseId);
    const course = COURSES.find(c => c.id === courseId);
    if (course) {
      const user = USERS.find(u => u.username === req.user.username);
      if (user) {
        if (!user.purchasedCourses) {
          user.purchasedCourses = [];
        }
        user.purchasedCourses.push(course);
        res.json({ message: 'Course purchased successfully' });
      } else {
        res.status(403).json({ message: 'User not found' });
      }
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  });
  





//admin course
//write logic for the user to see purchased  course
app.get('/users/purchasedCourses', authenticateJwt, (req, res) => {
    const user = USERS.find(u => u.username === req.user.username);
    if (user && user.purchasedCourses) {
      res.json({ purchasedCourses: user.purchasedCourses });
    } else {
      res.status(404).json({ message: 'No courses purchased' });
    }
  });
  



app.listen(3000 , ()=>{
    console.log("server is listening on the port 3000");
})

