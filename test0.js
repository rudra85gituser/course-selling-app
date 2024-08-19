const fs =require("fs");

const jwt =require("jsonwebtoken");

const secret ="superS3cr3t1";

let ans = jwt.sign("abc" , secret);
console.log(ans);

jwt.verify(ans , secret , (err , originalString)=>{
    console.log("asadadsadmk");
    console.log(originalString);
})
