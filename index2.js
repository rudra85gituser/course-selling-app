//Schema is the object of the library of mongoose
//schema is basically the structutre of the data

const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose  = require("mongoose");
const app = express();

app.use(express.json());

const SECRET = 'SECr3t';

//data model
//defining the mongoose schema
const userSchema = new mongoose.Schema({
    username: String,
    password: string,
    //when we have ot relate data between tow collection 
    purchasedCourses: [{type: mongoose.Schema.Types.ObjectId , ref: 'Course'}]
    //meaning of purchasedCourses  = type of courses is Id and it will refer something in the course
    //we have not used to put whole course data inside courses
}); 

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
  });
  
  const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
  });
  
  // Define mongoose models
  const User = mongoose.model('User', userSchema);//collection name user has userSchma in user model
  const Admin = mongoose.model('Admin', adminSchema);
  const Course = mongoose.model('Course', courseSchema);
  

  const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, SECRET, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };
  
  // Connect to MongoDB
  
  mongoose.connect('mongodb+srv://officialrudra85:Rudra@123@cluster0.kd1st.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" });

// admin signup
//using callback
  app.post('/admin/signup', (req, res) => {
    const { username, password } = req.body;
    function callback(admin) {
      if (admin) {
        res.status(403).json({ message: 'Admin already exists' });
      } else {
        const obj = { username: username, password: password };
        const newAdmin = new Admin(obj);
        newAdmin.save();
        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Admin created successfully', token });
      }
  
    }
    Admin.findOne({ username }).then(callback);
  });


//admin signup 
//using asinc await
  /*
    app.post('/admin/signup', async (req, res) => {
    const { username, password } = req.body;
    //here thread is not stopped using await function it is working for some other function
    const admin = await Admin.findOne({username});
    function callback(admin) {
      if (admin) {
        res.status(403).json({ message: 'Admin already exists' });
      } 
      else {
        const obj = { username: username, password: password };
        const newAdmin = new Admin(obj);
        newAdmin.save();
        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Admin created successfully', token });
      }
  
    }
  });
  */
  